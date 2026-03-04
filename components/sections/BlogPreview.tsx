import Link from "next/link";
import Image from "next/image";
import { sql } from "@/lib/db";
import { CATEGORY_STYLE, CATEGORY_BAR_COLOR, formatDate } from "@/lib/blog-utils";

interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  meta: string;
  image_url: string | null;
  created_at: string;
}

export default async function BlogPreview() {
  let posts: Post[] = [];

  try {
    // Add image_url column if it doesn't exist yet
    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT`;
    const { rows } = await sql`
      SELECT id, slug, title, category, meta, image_url, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
      LIMIT 3
    `;
    posts = rows as Post[];
  } catch {
    // show placeholder on DB error
  }

  const isEmpty = posts.length === 0;

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
        {isEmpty ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { cat: "education", title: "What Is Saju? A Beginner's Guide to Korean Four Pillars" },
              { cat: "love",      title: "Saju Compatibility: Which Elements Make the Best Partners" },
              { cat: "career",    title: "Career Luck in Saju: How Your Birth Chart Reveals Your Path" },
            ].map((p) => (
              <div
                key={p.title}
                className="flex flex-col bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6 opacity-50"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_STYLE[p.cat] ?? ""}`}>
                    {p.cat}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 flex-1">{p.title}</h3>
                <p className="text-gray-500 text-sm">Coming soon...</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => {
              const catStyle =
                CATEGORY_STYLE[post.category] ??
                "bg-gray-900/40 text-gray-300 border-gray-700/30";
              const date = formatDate(post.created_at);
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl overflow-hidden hover:border-[#7C3AED]/50 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image or gradient banner */}
                  {post.image_url ? (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className={`h-2 w-full ${CATEGORY_BAR_COLOR[post.category] ?? "bg-gray-600"}`} />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle}`}>
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{date}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-[#C4B5FD] transition-colors duration-200 flex-1">
                      {post.title}
                    </h3>
                    {post.meta && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {post.meta}
                      </p>
                    )}
                    <p className="text-[#7C3AED] text-sm font-semibold group-hover:text-[#A78BFA] transition-colors">
                      Read more →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

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
