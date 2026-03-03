import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { sql } from "@/lib/db";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Post {
  slug: string;
  title: string;
  meta: string;
  content: string;
  category: string;
  created_at: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const { rows } = await sql`
      SELECT slug, title, meta, content, category, created_at
      FROM blog_posts
      WHERE slug = ${slug} AND published = true
      LIMIT 1
    `;
    return (rows[0] as Post) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Unmyung Therapy`,
    description: post.meta,
    openGraph: {
      title: post.title,
      description: post.meta,
      type: "article",
      publishedTime: post.created_at,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0F] py-16 px-4 sm:px-6">
      <article className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors"
        >
          ← All posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
            {post.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-400 text-sm">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </header>

        {/* Content */}
        <div className="prose-custom">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-[#C4B5FD] mt-8 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-[#A78BFA] mt-6 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 leading-7 mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300 leading-7">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-[#F59E0B] font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-[#A78BFA] italic">{children}</em>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[#7C3AED] hover:text-[#A78BFA] underline transition-colors"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#7C3AED] pl-4 my-4 text-gray-400 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* CTA */}
        <div className="mt-14 bg-[#1A1A2E] border border-[#7C3AED] rounded-2xl p-8 text-center">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-2">
            Discover Your Destiny
          </p>
          <h2 className="text-2xl font-bold mb-3">
            Curious about your own chart?
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Get a free mini reading, then unlock your full Four Pillars report.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/free-reading"
              className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-bold transition-colors"
            >
              Free Reading ✦
            </Link>
            <Link
              href="/order"
              className="px-6 py-3 border border-[#7C3AED] hover:bg-[#7C3AED]/10 rounded-full font-bold transition-colors"
            >
              Full Report — $35
            </Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
