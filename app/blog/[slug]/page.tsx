import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { sql } from "@/lib/db";
import type { Metadata } from "next";
import {
  CATEGORY_STYLE,
  CATEGORY_LABELS,
  CATEGORY_BAR_COLOR,
  formatDate,
  calcReadTime,
  extractHeadings,
} from "@/lib/blog-utils";
import ShareButtons from "@/components/blog/ShareButtons";

export const revalidate = 3600;

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

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

async function getRelatedPosts(
  category: string,
  excludeSlug: string
): Promise<Post[]> {
  try {
    const { rows } = await sql`
      SELECT slug, title, meta, content, category, created_at
      FROM blog_posts
      WHERE category = ${category}
        AND slug != ${excludeSlug}
        AND published = true
      ORDER BY created_at DESC
      LIMIT 3
    `;
    return rows as Post[];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const { rows } = await sql`SELECT slug FROM blog_posts WHERE published = true`;
    return rows.map((r) => ({ slug: r.slug as string }));
  } catch {
    return [];
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

  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${post.category}`;

  return {
    title: `${post.title} | Sajumuse`,
    description: post.meta,
    openGraph: {
      title: post.title,
      description: post.meta,
      type: "article",
      publishedTime: post.created_at,
      url: `${BASE_URL}/blog/${post.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    getPost(slug),
    getPost(slug).then((p) => (p ? getRelatedPosts(p.category, slug) : [])),
  ]);

  if (!post) notFound();

  const readTime = calcReadTime(post.content);
  const headings = extractHeadings(post.content);
  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  const catStyle =
    CATEGORY_STYLE[post.category] ??
    "bg-gray-900/40 text-gray-300 border-gray-700/30";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta,
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: {
      "@type": "Organization",
      name: "Sajumuse",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sajumuse",
      url: BASE_URL,
    },
    url: postUrl,
    image: `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${post.category}`,
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] py-16 px-4 sm:px-6">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/bg-1.jpg"
          fill
          className="object-cover object-center opacity-15"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]/80" />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative z-10 max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-300 text-sm mb-8 transition-colors"
        >
          ← All posts
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle}`}
            >
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(post.created_at)}
            </span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-500 text-sm">{readTime} min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
            {post.title}
          </h1>

          {/* Share buttons */}
          <ShareButtons url={postUrl} title={post.title} />
        </header>

        {/* Table of Contents */}
        {headings.length >= 3 && (
          <nav className="mb-10 bg-[#1A1A2E]/80 border border-[#2A2A4A] rounded-2xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              In this article
            </p>
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-gray-300 hover:text-[#C4B5FD] transition-colors"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content */}
        <div>
          <ReactMarkdown
            components={{
              h2: ({ children }) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                return (
                  <h2
                    id={id}
                    className="text-xl font-bold text-[#C4B5FD] mt-8 mb-3 scroll-mt-24"
                  >
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-[#A78BFA] mt-6 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 leading-7 mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 mb-4 space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300 leading-7">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-[#F59E0B] font-semibold">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="text-[#A78BFA] italic">{children}</em>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[#7C3AED] hover:text-[#A78BFA] underline transition-colors"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
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
              Try your free reading →
            </Link>
            <Link
              href="/order"
              className="px-6 py-3 border border-[#7C3AED] hover:bg-[#7C3AED]/10 rounded-full font-bold transition-colors"
            >
              Full Report — $35
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-300 mb-5">
              Related posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => {
                const rCatStyle =
                  CATEGORY_STYLE[r.category] ??
                  "bg-gray-900/40 text-gray-300 border-gray-700/30";
                const rBarColor =
                  CATEGORY_BAR_COLOR[r.category] ?? "bg-gray-600";
                const rReadTime = calcReadTime(r.content);

                return (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex flex-col bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl overflow-hidden hover:border-[#7C3AED]/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className={`h-2 w-full ${rBarColor}`} />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${rCatStyle}`}
                        >
                          {CATEGORY_LABELS[r.category] ?? r.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {rReadTime} min read
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#C4B5FD] transition-colors line-clamp-2 flex-1">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
