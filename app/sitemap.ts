import type { MetadataRoute } from "next";
import { sql } from "@/lib/db";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://ksaju.vercel.app";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/free-reading`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/order`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { rows } = await sql`
      SELECT slug, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
    `;
    blogRoutes = rows.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug as string}`,
      lastModified: new Date(post.created_at as string),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB not ready — return static routes only
  }

  return [...staticRoutes, ...blogRoutes];
}
