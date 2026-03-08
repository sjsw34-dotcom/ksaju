import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export function pickModel(): string {
  // 20% Opus 4.6, 80% Sonnet 4.6
  return Math.random() < 0.2 ? "claude-opus-4-6" : "claude-sonnet-4-6";
}

const SYSTEM_PROMPT = `You are a seasoned Korean Saju (Four Pillars of Destiny) practitioner who has been doing readings for 15+ years. You write blog posts sharing your real experience and knowledge with a global English-speaking audience.

The topic given is the TARGET SEARCH KEYWORD. Optimize the article for this keyword:
- Include the keyword (or close variations) naturally in: the title, meta description, first paragraph, and at least 2 subheadings
- Use semantically related terms throughout (e.g., "Korean astrology", "Four Pillars of Destiny", "birth chart", "fortune reading")
- Answer the search intent directly — if someone googled this topic, your article should be THE best answer they find
- For birth-year topics: include the specific year, animal sign, and element in the title and throughout

Writing style — THIS IS CRITICAL:
- Write like a real human expert sharing personal knowledge, NOT like a content generator
- Use first person occasionally ("I've seen this pattern in many clients", "In my experience")
- Include specific anecdotes or examples (make them feel real and grounded)
- Vary sentence length — mix short punchy lines with longer explanations
- Use casual transitions ("Here's the thing.", "So what does this actually mean?", "Let me break this down.")
- Avoid overused AI phrases: "delve", "tapestry", "realm", "landscape", "embark", "journey", "unlock", "discover", "comprehensive", "Moreover", "Furthermore", "In conclusion"
- Avoid starting multiple paragraphs the same way
- Include occasional imperfect, conversational phrasing — real writers aren't perfectly polished
- Express genuine opinions ("Honestly, this is one of the most misunderstood concepts in Saju")
- Reference real-world context (seasons, current trends, modern life situations)

Rules:
- Length: 1500-2000 words
- Use H2 and H3 markdown headings (no H1)
- Tone: engaging, mystical, GenZ-friendly - not academic
- Include exactly ONE internal link to the free reading page
- End the post with a CTA link to the order page
- No disclaimer, no "as an AI" phrases, no "as a language model". You are a Saju expert, period
- NEVER use em dashes (—) or double hyphens (--). Use commas, periods, colons, or parentheses instead
- MUST include a "## Frequently Asked Questions" section near the end with 3-4 Q&A pairs using H3 for each question (this helps Google featured snippets)
- Write a strong, keyword-rich opening paragraph (first 160 chars are critical for SERP)
- Use short paragraphs (2-3 sentences max) for readability

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
 * Auto-generate a new blog topic when all pending topics are exhausted.
 * Checks existing topics/posts to avoid duplicates.
 */
export async function generateNewTopic(
  existingTopics: string[]
): Promise<{ topic: string; category: string } | null> {
  try {
    const categories = ["zodiac", "education", "love", "career", "kculture"];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const recentList = existingTopics.slice(-50).map((t, i) => `${i + 1}. ${t}`).join("\n");

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: `You are an SEO keyword strategist for a Korean Saju (Four Pillars of Destiny) astrology blog targeting English-speaking GenZ users worldwide.

Generate ONE new blog topic that:
- Is a long-tail search keyword someone would actually type into Google
- Falls under the category: "${category}"
- Is NOT similar to any existing topic listed below
- Targets a specific, niche question or angle (not broad/generic)
- Sounds natural as a search query, not like a textbook chapter title

Category guidelines:
- zodiac: birth year readings, animal signs, element personalities, yearly forecasts
- education: how Saju works, beginner guides, concepts explained, comparisons
- love: compatibility, relationship timing, dating advice through Saju lens
- career: job fit, money luck, business timing, work style by element
- kculture: Saju in Korean pop culture, K-drama, K-pop, modern Korean life

Respond with ONLY this format (nothing else):
TOPIC: (the full topic/keyword phrase)`,
      messages: [
        {
          role: "user",
          content: `Here are existing topics — do NOT repeat or closely overlap:\n${recentList}`,
        },
      ],
    });

    const raw = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    const topicMatch = raw.match(/^TOPIC:\s*(.+)$/m);
    if (!topicMatch) return null;

    return { topic: topicMatch[1].trim(), category };
  } catch (err) {
    console.error("[auto-topic] error:", err);
    return null;
  }
}

/**
 * Insert 1-2 random blog images into markdown content after H2 headings.
 */
const BLOG_IMAGES = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30,32,33,34,35,36,37,38,39,40,41,42,43,44,45,
];

export function insertBlogImages(content: string, topic: string): string {
  // Pick 1 or 2 random images (no duplicates)
  const count = Math.random() < 0.5 ? 1 : 2;
  const shuffled = [...BLOG_IMAGES].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, count);

  // SEO-friendly alt text variants using the topic keyword
  const altTexts = [
    `Korean Saju reading illustration for ${topic}`,
    `Four Pillars of Destiny chart related to ${topic}`,
    `Saju astrology visual guide - ${topic}`,
    `Korean fortune telling concept - ${topic}`,
  ].sort(() => Math.random() - 0.5);

  // Find all H2 positions (lines starting with "## ")
  const lines = content.split("\n");
  const h2Indices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) h2Indices.push(i);
  }

  if (h2Indices.length < 2) {
    // Fallback: insert after first H2 or at top
    const pos = h2Indices[0] ?? 0;
    const imgMarkdown = picks
      .map((n, idx) => `\n![${altTexts[idx]}](/images/blog/ksaju${n}.jpg)\n`)
      .join("");
    lines.splice(pos + 1, 0, imgMarkdown);
    return lines.join("\n");
  }

  // Insert images after different H2s (skip first H2, use later ones for variety)
  const candidateIndices = h2Indices.slice(1); // skip first H2
  const selectedPositions = candidateIndices
    .sort(() => Math.random() - 0.5)
    .slice(0, picks.length)
    .sort((a, b) => b - a); // insert from bottom to top to preserve indices

  for (let i = 0; i < selectedPositions.length; i++) {
    const pos = selectedPositions[i];
    const imgMarkdown = `\n![${altTexts[i]}](/images/blog/ksaju${picks[i]}.jpg)\n`;
    lines.splice(pos + 1, 0, imgMarkdown);
  }

  return lines.join("\n");
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
