import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Anthropic from "@anthropic-ai/sdk";
import { sql } from "@/lib/db";
import { BLOG_TOPICS } from "@/lib/blog-topics";
import { notifyGoogleIndexing } from "@/lib/google-indexing";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a Korean Saju (Four Pillars of Destiny) expert writing SEO-optimised blog posts for a global English-speaking audience.

Rules:
- Length: 1500–2000 words
- Use H2 and H3 markdown headings (no H1)
- Tone: engaging, mystical, GenZ-friendly — not academic
- Include exactly ONE internal link to the free reading page
- End the post with a CTA link to the order page
- No disclaimer, no "as an AI" phrases

Respond in this EXACT format (no extra text before or after):
TITLE: (50–60 characters)
META: (under 155 characters, compelling summary)
CONTENT:
(full markdown article, no H1)`;

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function parseResponse(raw: string): {
  title: string;
  meta: string;
  content: string;
} | null {
  const titleMatch = raw.match(/^TITLE:\s*(.+)$/m);
  const metaMatch  = raw.match(/^META:\s*(.+)$/m);
  const contentMatch = raw.match(/^CONTENT:\n([\s\S]+)$/m);

  if (!titleMatch || !metaMatch || !contentMatch) return null;

  return {
    title:   titleMatch[1].trim(),
    meta:    metaMatch[1].trim(),
    content: contentMatch[1].trim(),
  };
}

export async function GET(req: NextRequest) {
  // ── Auth: Accept header OR query param (for manual testing) ──
  const authHeader = req.headers.get("authorization") ?? "";
  const querySecret = req.nextUrl.searchParams.get("secret") ?? "";
  const cronSecret  = process.env.CRON_SECRET ?? "";

  const validHeader = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const validQuery  = cronSecret && querySecret === cronSecret;

  if (!validHeader && !validQuery) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ── Find an unused topic ──
    const { rows } = await sql`SELECT topic FROM blog_posts`;
    const usedTopics = new Set(rows.map((r) => r.topic as string));

    const unused = BLOG_TOPICS.filter((t) => !usedTopics.has(t.topic));
    if (unused.length === 0) {
      return NextResponse.json({ success: false, message: "All topics already generated" });
    }

    const pick = unused[Math.floor(Math.random() * unused.length)];

    // ── Generate with Claude ──
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";
    const systemWithUrls = SYSTEM_PROMPT
      .replace("the free reading page", `[free reading](${baseUrl}/free-reading)`)
      .replace("the order page", `[Get your full Saju report →](${baseUrl}/order)`);

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: systemWithUrls,
      messages: [{ role: "user", content: `Write a blog post about: ${pick.topic}` }],
    });

    const raw = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    const parsed = parseResponse(raw);
    if (!parsed) {
      console.error("[blog/generate] Failed to parse Claude response:\n", raw);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const slug = toSlug(parsed.title);

    // ── Insert into DB ──
    await sql`
      INSERT INTO blog_posts (slug, title, meta, content, category, topic)
      VALUES (
        ${slug},
        ${parsed.title},
        ${parsed.meta},
        ${parsed.content},
        ${pick.category},
        ${pick.topic}
      )
    `;

    // ── Invalidate blog list cache immediately ──
    revalidatePath("/blog");

    // ── Notify Google (non-blocking) ──
    notifyGoogleIndexing(`${baseUrl}/blog/${slug}`).catch(() => {});

    return NextResponse.json({ success: true, slug, title: parsed.title });
  } catch (err) {
    console.error("[blog/generate] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
