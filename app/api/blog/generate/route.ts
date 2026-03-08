import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Anthropic from "@anthropic-ai/sdk";
import { sql } from "@/lib/db";
import { notifyGoogleIndexing } from "@/lib/google-indexing";
import {
  pickModel,
  getSystemPrompt,
  toSlug,
  parseResponse,
  evaluateQuality,
  insertBlogImages,
  generateNewTopic,
} from "@/lib/blog-generate";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function GET(req: NextRequest) {
  // ── Auth: Accept header OR query param ──
  const authHeader = req.headers.get("authorization") ?? "";
  const querySecret = req.nextUrl.searchParams.get("secret") ?? "";
  const cronSecret = process.env.CRON_SECRET ?? "";

  const validHeader = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const validQuery = cronSecret && querySecret === cronSecret;

  if (!validHeader && !validQuery) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ── Pick first pending topic ──
    const { rows: topicRows } = await sql`
      SELECT * FROM blog_topics WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1
    `;

    let pick: { id: number; topic: string; category: string };

    if (topicRows.length === 0) {
      // ── Auto-generate a new topic ──
      console.log("[blog/generate] No pending topics — auto-generating new topic");
      const { rows: allTopics } = await sql`
        SELECT topic FROM blog_topics ORDER BY created_at DESC
      `;
      const existingTopics = allTopics.map((r) => r.topic as string);
      const newTopic = await generateNewTopic(existingTopics);

      if (!newTopic) {
        return NextResponse.json(
          { error: "Failed to auto-generate topic" },
          { status: 500 }
        );
      }

      const { rows: inserted } = await sql`
        INSERT INTO blog_topics (topic, category, status)
        VALUES (${newTopic.topic}, ${newTopic.category}, 'pending')
        RETURNING *
      `;
      pick = inserted[0] as { id: number; topic: string; category: string };
      console.log(`[blog/generate] Auto-generated topic: ${pick.topic} [${pick.category}]`);
    } else {
      pick = topicRows[0] as { id: number; topic: string; category: string };
    }

    // ── Generate with Claude ──
    const model = pickModel();
    console.log(`[blog/generate] Using model: ${model}`);

    const message = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      system: getSystemPrompt(),
      messages: [
        { role: "user", content: `Write a blog post about: ${pick.topic}` },
      ],
    });

    const raw = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    const parsed = parseResponse(raw);
    if (!parsed) {
      console.error("[blog/generate] Failed to parse response:\n", raw);
      // Mark topic as error so it doesn't block the next run
      await sql`UPDATE blog_topics SET status = 'error' WHERE id = ${pick.id}`;
      return NextResponse.json(
        { error: "Failed to parse AI response", topicId: pick.id },
        { status: 500 }
      );
    }

    // ── Insert random blog images with SEO alt text ──
    parsed.content = insertBlogImages(parsed.content, pick.topic);

    // ── AI Quality Gate ──
    const quality = await evaluateQuality(
      parsed.title,
      parsed.meta,
      parsed.content
    );
    console.log(
      `[blog/generate] Quality score: ${quality.score}/10 - ${quality.reason}`
    );

    // ── Slug collision check ──
    let slug = toSlug(parsed.title);
    const { rows: existing } = await sql`
      SELECT slug FROM blog_posts WHERE slug = ${slug} LIMIT 1
    `;
    if (existing.length > 0) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // ── Insert (published based on quality score) ──
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

    await sql`
      INSERT INTO blog_posts (slug, title, meta, content, category, topic, published)
      VALUES (
        ${slug},
        ${parsed.title},
        ${parsed.meta},
        ${parsed.content},
        ${pick.category},
        ${pick.topic},
        ${quality.published}
      )
    `;

    // ── Mark topic as generated ──
    await sql`UPDATE blog_topics SET status = 'generated' WHERE id = ${pick.id}`;

    // ── Only invalidate cache & notify Google if published ──
    if (quality.published) {
      revalidatePath("/blog");
      revalidatePath("/");
      notifyGoogleIndexing(`${baseUrl}/blog/${slug}`).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      slug,
      title: parsed.title,
      model,
      quality: {
        score: quality.score,
        published: quality.published,
        reason: quality.reason,
      },
    });
  } catch (err) {
    console.error("[blog/generate] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
