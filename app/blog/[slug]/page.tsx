import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sql } from "@/lib/db";
import type { Metadata } from "next";
import {
  CATEGORY_STYLE,
  CATEGORY_LABELS,
  CATEGORY_BAR_COLOR,
  formatDate,
  calcReadTime,
  extractHeadings,
  extractThumbnail,
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

  // Extract first content image for additional OG image
  const firstImg = post.content.match(/!\[.*?\]\((.+?)\)/);
  const ogImages: { url: string; width: number; height: number }[] = [
    { url: ogImage, width: 1200, height: 630 },
  ];
  if (firstImg) {
    ogImages.push({ url: `${BASE_URL}${firstImg[1]}`, width: 760, height: 507 });
  }

  return {
    title: `${post.title} | Sajumuse`,
    description: post.meta,
    openGraph: {
      title: post.title,
      description: post.meta,
      type: "article",
      publishedTime: post.created_at,
      url: `${BASE_URL}/blog/${post.slug}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta,
      images: [ogImage],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
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
  const thumbnail = extractThumbnail(post.content);
  const catStyle =
    CATEGORY_STYLE[post.category] ??
    "bg-gray-900/40 text-gray-300 border-gray-700/30";

  // Collect all images from content for structured data
  const contentImages: string[] = [];
  const imgRegex = /!\[.*?\]\((.+?)\)/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(post.content)) !== null) {
    contentImages.push(`${BASE_URL}${imgMatch[1]}`);
  }
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${post.category}`;

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
    image: [ogImage, ...contentImages],
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  // Extract FAQ pairs for FAQPage schema
  const faqPairs: { q: string; a: string }[] = [];
  const faqSection = post.content.match(/## Frequently Asked Questions\n([\s\S]*?)(?=\n## |\n---|\Z)/i);
  if (faqSection) {
    const faqContent = faqSection[1];
    const qRegex = /### (.+)\n\n([\s\S]*?)(?=\n### |\n## |$)/g;
    let faqMatch;
    while ((faqMatch = qRegex.exec(faqContent)) !== null) {
      faqPairs.push({ q: faqMatch[1].trim(), a: faqMatch[2].trim() });
    }
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqLd = faqPairs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPairs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16 px-4 sm:px-6">

      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* JSON-LD: Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* JSON-LD: FAQ (if present) */}
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <article className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-8 transition-colors"
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

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-5 text-gray-900">
            {post.title}
          </h1>

          {/* Share buttons */}
          <ShareButtons url={postUrl} title={post.title} />
        </header>

        {/* Table of Contents */}
        {headings.length >= 3 && (
          <nav className="mb-10 bg-white shadow-sm border border-gray-200 rounded-2xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              In this article
            </p>
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-gray-600 hover:text-[#7C3AED] transition-colors"
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
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm text-center">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[#7C3AED]/10 text-[#7C3AED] text-xs uppercase tracking-wider">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
              tr: ({ children }) => (
                <tr className="hover:bg-gray-50 transition-colors">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 font-semibold whitespace-nowrap text-center border-b border-gray-200">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-gray-700 text-center">{children}</td>
              ),
              h2: ({ children }) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
                return (
                  <h2
                    id={id}
                    className="text-xl font-bold text-[#7C3AED] mt-8 mb-3 scroll-mt-24"
                  >
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-[#6D28D9] mt-6 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-7 mb-4">{children}</p>
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
                <li className="text-gray-700 leading-7">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-[#F59E0B] font-semibold">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="text-[#7C3AED] italic">{children}</em>
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
              img: ({ src, alt }) => (
                <figure className="my-6">
                  <img
                    src={src}
                    alt={alt || "Korean Saju astrology illustration"}
                    title={alt || "Korean Saju astrology"}
                    width={760}
                    height={507}
                    className="w-full max-w-lg mx-auto rounded-2xl shadow-md"
                    loading="lazy"
                    decoding="async"
                  />
                  {alt && (
                    <figcaption className="text-center text-xs text-gray-400 mt-2">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#7C3AED] pl-4 my-4 text-gray-500 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* CTA */}
        <div className="mt-14 bg-white shadow-sm border border-[#7C3AED] rounded-2xl p-8 text-center">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-2">
            Discover Your Destiny
          </p>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            Curious about your own chart?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
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
              className="px-6 py-3 border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 rounded-full font-bold transition-colors"
            >
              Full Report — $29
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-700 mb-5">
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
                const rThumbnail = extractThumbnail(r.content);

                return (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex flex-col bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden hover:border-[#7C3AED] hover:-translate-y-1 transition-all duration-300"
                  >
                    {rThumbnail ? (
                      <div className="h-32 w-full overflow-hidden">
                        <img
                          src={rThumbnail}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className={`h-2 w-full ${rBarColor}`} />
                    )}
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
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#7C3AED] transition-colors line-clamp-2 flex-1">
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
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
