/* ── Shared blog constants & helpers ── */

export const CATEGORY_STYLE: Record<string, string> = {
  zodiac:    "bg-purple-900/40 text-purple-300 border-purple-700/30",
  education: "bg-blue-900/40 text-blue-300 border-blue-700/30",
  love:      "bg-pink-900/40 text-pink-300 border-pink-700/30",
  career:    "bg-green-900/40 text-green-300 border-green-700/30",
  kculture:  "bg-yellow-900/40 text-yellow-300 border-yellow-700/30",
};

export const CATEGORY_LABELS: Record<string, string> = {
  zodiac:    "Zodiac",
  education: "Learn Saju",
  love:      "Love",
  career:    "Career",
  kculture:  "K-Culture",
};

export const CATEGORY_BAR_COLOR: Record<string, string> = {
  zodiac:    "bg-purple-600",
  education: "bg-blue-600",
  love:      "bg-pink-600",
  career:    "bg-green-600",
  kculture:  "bg-yellow-600",
};

/** Format date as "Mar 4, 2026" */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Estimate reading time from text content */
export function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

/** Extract H2 headings from markdown for TOC */
export function extractHeadings(markdown: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /^## (.+)$/gm;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text });
  }
  return headings;
}
