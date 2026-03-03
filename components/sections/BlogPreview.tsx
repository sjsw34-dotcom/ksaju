import Link from "next/link";
import { sql } from "@/lib/db";

const CATEGORY_STYLE: Record<string, string> = {
  zodiac:    "bg-purple-900/40 text-purple-300 border-purple-700/30",
  education: "bg-blue-900/40 text-blue-300 border-blue-700/30",
  love:      "bg-pink-900/40 text-pink-300 border-pink-700/30",
  career:    "bg-green-900/40 text-green-300 border-green-700/30",
  kculture:  "bg-yellow-900/40 text-yellow-300 border-yellow-700/30",
};

interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  meta: string;
  created_at: string;
}

export default async function BlogPreview() {
  let posts: Post[] = [];

  try {
    const { rows } = await sql`
      SELECT id, slug, title, category, meta, created_at
      FROM blog_posts
      ORDER BY created_at DESC
      LIMIT 3
    `;
    posts = rows as Post[];
  } catch {
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-2">
              From the Blog
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Saju Wisdom & Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[#7C3AED] hover:text-[#A78BFA] text-sm font-semibold transition-colors hidden sm:block"
          >
            View All Posts →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => {
            const catStyle =
              CATEGORY_STYLE[post.category] ??
              "bg-gray-900/40 text-gray-300 border-gray-700/30";
            const date = new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6 hover:border-[#7C3AED]/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Category + date */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-gray-600 text-xs">{date}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-[#C4B5FD] transition-colors duration-200 flex-1">
                  {post.title}
                </h3>

                {/* Meta */}
                {post.meta && (
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.meta}
                  </p>
                )}

                {/* Read more */}
                <p className="text-[#7C3AED] text-sm font-semibold group-hover:text-[#A78BFA] transition-colors">
                  Read more →
                </p>
              </Link>
            );
          })}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden text-center mt-6">
          <Link
            href="/blog"
            className="text-[#7C3AED] hover:text-[#A78BFA] text-sm font-semibold transition-colors"
          >
            View All Posts →
          </Link>
        </div>

      </div>
    </section>
  );
}
