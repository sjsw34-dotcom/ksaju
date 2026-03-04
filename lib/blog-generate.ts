import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export function pickModel(): string {
  // 20% Opus 4.6, 80% Sonnet 4.6
  return Math.random() < 0.2 ? "claude-opus-4-6" : "claude-sonnet-4-6";
}

const SYSTEM_PROMPT = `You are a Korean Saju (Four Pillars of Destiny) expert writing SEO-optimised blog posts for a global English-speaking audience.

The topic given is the TARGET SEARCH KEYWORD. Optimize the article for this keyword:
- Include the keyword (or close variations) naturally in: the title, meta description, first paragraph, and at least 2 subheadings
- Use semantically related terms throughout (e.g., "Korean astrology", "Four Pillars of Destiny", "birth chart", "fortune reading")
- Answer the search intent directly — if someone googled this topic, your article should be THE best answer they find
- For birth-year topics: include the specific year, animal sign, and element in the title and throughout

Rules:
- Length: 1500-2000 words
- Use H2 and H3 markdown headings (no H1)
- Tone: engaging, mystical, GenZ-friendly - not academic
- Include exactly ONE internal link to the free reading page
- End the post with a CTA link to the order page
- No disclaimer, no "as an AI" phrases

Respond in this EXACT format (no extra text before or after):
TITLE: (50-60 characters, must include the primary keyword)
META: (under 155 characters, compelling summary with keyword)
CONTENT:
(full markdown article, no H1)`;

export function getSystemPrompt(): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";
  return SYSTEM_PROMPT.replace(
    "the free reading page",
    `[free reading](${baseUrl}/free-reading)`
  ).replace(
    "the order page",
    `[Get your full Saju report →](${baseUrl}/order)`
  );
}

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function parseResponse(raw: string): {
  title: string;
  meta: string;
  content: string;
} | null {
  const titleMatch = raw.match(/^TITLE:\s*(.+)$/m);
  const metaMatch = raw.match(/^META:\s*(.+)$/m);
  const contentMatch = raw.match(/^CONTENT:\n([\s\S]+)$/m);

  if (!titleMatch || !metaMatch || !contentMatch) return null;

  return {
    title: titleMatch[1].trim(),
    meta: metaMatch[1].trim(),
    content: contentMatch[1].trim(),
  };
}

/**
 * AI quality gate: scores a blog post 1-10.
 * Returns { score, published } where published = score >= 7.
 */
export async function evaluateQuality(
  title: string,
  meta: string,
  content: string
): Promise<{ score: number; published: boolean; reason: string }> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: `You are a strict blog quality reviewer for a Korean Saju astrology site targeting English-speaking GenZ users.

Score the blog post from 1 to 10 based on:
- Accuracy of Saju/Korean astrology concepts
- Engaging writing quality (not generic or robotic)
- SEO optimization (proper headings, good meta)
- Value to the reader (actionable insights, not filler)
- Proper length (1500-2000 words)

Respond in EXACTLY this format:
SCORE: (number 1-10)
REASON: (one sentence explanation)`,
      messages: [
        {
          role: "user",
          content: `Review this blog post:\n\nTITLE: ${title}\nMETA: ${meta}\n\n${content}`,
        },
      ],
    });

    const raw = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    const scoreMatch = raw.match(/^SCORE:\s*(\d+)/m);
    const reasonMatch = raw.match(/^REASON:\s*(.+)$/m);

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 5;
    const reason = reasonMatch ? reasonMatch[1].trim() : "No reason provided";

    return { score, published: score >= 7, reason };
  } catch (err) {
    console.error("[quality-check] error:", err);
    // On failure, default to draft to be safe
    return { score: 0, published: false, reason: "Quality check failed" };
  }
}
