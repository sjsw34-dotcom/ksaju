import Link from "next/link";
import { sql } from "@/lib/db";
import BlogListClient from "@/components/blog/BlogListClient";

export const revalidate = 3600;

export const metadata = {
  title: "Saju Blog | Sajumuse",
  description:
    "Explore Korean Four Pillars of Destiny: zodiac insights, love compatibility, career luck, and more.",
};

interface Post {
  slug: string;
  title: string;
  meta: string;
  content: string;
  category: string;
  created_at: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const { rows } = await sql`
      SELECT slug, title, meta, content, category, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
    `;
    return rows as Post[];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Content */}
      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
              Saju Insights
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
              Destiny & Fortune Blog
            </h1>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Explore the ancient wisdom of Korean Four Pillars, decoded for the
              modern world.
            </p>
          </div>

          {/* Interactive list with filter */}
          <BlogListClient posts={posts} />

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Ready to discover your own destiny?
            </p>
            <Link
              href="/free-reading"
              className="inline-block px-8 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-bold transition-colors"
            >
              Get Your Free Reading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
