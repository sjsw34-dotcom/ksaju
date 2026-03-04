import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Anthropic from "@anthropic-ai/sdk";
import { notifyGoogleIndexing } from "@/lib/google-indexing";
import {
  pickModel,
  getSystemPrompt,
  toSlug,
  parseResponse,
  evaluateQuality,
} from "@/lib/blog-generate";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  // ── Auth ──
  const authHeader = req.headers.get("authorization") ?? "";
  const cronSecret = process.env.CRON_SECRET ?? "";
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows: topicRows } = await sql`
      SELECT * FROM blog_topics WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1
    `;

    if (topicRows.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No pending topics. Add more topics first.",
      });
    }

    const pick = topicRows[0] as {
      id: number;
      topic: string;
      category: string;
    };

    const model = pickModel();
    console.log(`[admin/generate] Using model: ${model}`);

    const message = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      system: getSystemPrompt(),
      messages: [
        {
          role: "user",
          content: `Write a blog post about: ${pick.topic}`,
        },
      ],
    });

    const raw = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    const parsed = parseResponse(raw);
    if (!parsed) {
      await sql`UPDATE blog_topics SET status = 'error' WHERE id = ${pick.id}`;
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    // ── AI Quality Gate ──
    const quality = await evaluateQuality(
      parsed.title,
      parsed.meta,
      parsed.content
    );
    console.log(
      `[admin/generate] Quality score: ${quality.score}/10 - ${quality.reason}`
    );

    // ── Slug collision check ──
    let slug = toSlug(parsed.title);
    const { rows: existing } = await sql`
      SELECT slug FROM blog_posts WHERE slug = ${slug} LIMIT 1
    `;
    if (existing.length > 0) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

    await sql`
      INSERT INTO blog_posts (slug, title, meta, content, category, topic, published)
      VALUES (${slug}, ${parsed.title}, ${parsed.meta}, ${parsed.content}, ${pick.category}, ${pick.topic}, ${quality.published})
    `;

    await sql`UPDATE blog_topics SET status = 'generated' WHERE id = ${pick.id}`;

    if (quality.published) {
      revalidatePath("/blog");
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
    console.error("[admin/generate] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
