import { sql } from "@/lib/db";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

export const revalidate = 3600;

export async function GET() {
  let posts: { slug: string; title: string; meta: string; created_at: string }[] = [];

  try {
    const { rows } = await sql`
      SELECT slug, title, meta, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
      LIMIT 50
    `;
    posts = rows as typeof posts;
  } catch {
    // DB not ready
  }

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.meta}]]></description>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SajuMuse Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Discover your destiny through Korean Saju astrology - zodiac insights, love compatibility, career guidance, and K-culture connections.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
