import Image from "next/image";
import Link from "next/link";
import { sql } from "@/lib/db";

export const revalidate = 3600;

export const metadata = {
  title: "Saju Blog | Sajumuse",
  description: "Explore Korean Four Pillars of Destiny — zodiac insights, love compatibility, career luck, and more.",
};

const CATEGORY_LABELS: Record<string, string> = {
  zodiac:    "Zodiac",
  education: "Learn Saju",
  love:      "Love",
  career:    "Career",
  kculture:  "K-Culture",
};

interface Post {
  slug: string;
  title: string;
  meta: string;
  category: string;
  created_at: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const { rows } = await sql`
      SELECT slug, title, meta, category, created_at
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
    <div className="relative min-h-screen bg-[#0A0A0F]">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/bg-2.jpg"
          fill
          className="object-cover object-center opacity-15"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
              Saju Insights
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Destiny & Fortune Blog
            </h1>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Explore the ancient wisdom of Korean Four Pillars — decoded for the modern world.
            </p>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg mb-2">First posts are being crafted...</p>
              <p className="text-sm">Check back soon.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block bg-[#1A1A2E]/90 backdrop-blur-sm border border-[#2A2A4A] hover:border-[#7C3AED] rounded-2xl p-6 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </span>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-[#C4B5FD] transition-colors mb-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-2">{post.meta}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">Ready to discover your own destiny?</p>
            <Link
              href="/free-reading"
              className="inline-block px-8 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-bold transition-colors"
            >
              Get Your Free Reading ✦
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
