"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CATEGORY_STYLE,
  CATEGORY_LABELS,
  CATEGORY_BAR_COLOR,
  formatDate,
  calcReadTime,
} from "@/lib/blog-utils";

interface Post {
  slug: string;
  title: string;
  meta: string;
  content: string;
  category: string;
  created_at: string;
}

const TABS = ["all", "zodiac", "love", "career", "education", "kculture"] as const;

const TAB_LABELS: Record<string, string> = {
  all: "All",
  ...CATEGORY_LABELS,
};

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-900/30"
                  : "bg-[#1A1A2E] text-gray-400 border border-[#2A2A4A] hover:border-[#7C3AED]/50 hover:text-gray-200"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      {filtered.length === 0 ? (
        /* Empty / Skeleton state */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-2 w-full bg-[#2A2A4A]" />
              <div className="p-6 space-y-3">
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-[#2A2A4A]" />
                  <div className="h-6 w-20 rounded bg-[#2A2A4A]" />
                </div>
                <div className="h-5 w-3/4 rounded bg-[#2A2A4A]" />
                <div className="h-4 w-full rounded bg-[#2A2A4A]" />
                <div className="h-4 w-2/3 rounded bg-[#2A2A4A]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => {
            const catStyle =
              CATEGORY_STYLE[post.category] ??
              "bg-gray-900/40 text-gray-300 border-gray-700/30";
            const barColor =
              CATEGORY_BAR_COLOR[post.category] ?? "bg-gray-600";
            const readTime = calcReadTime(post.content);

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl overflow-hidden hover:border-[#7C3AED]/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Color bar */}
                <div className={`h-2 w-full ${barColor}`} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Badge + date + read time */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle}`}
                    >
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {formatDate(post.created_at)}
                    </span>
                    <span className="text-gray-600 text-xs">·</span>
                    <span className="text-gray-500 text-xs">
                      {readTime} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-[#C4B5FD] transition-colors duration-200 flex-1">
                    {post.title}
                  </h3>

                  {/* Description */}
                  {post.meta && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.meta}
                    </p>
                  )}

                  {/* Read more */}
                  <p className="text-[#7C3AED] text-sm font-semibold group-hover:text-[#A78BFA] transition-colors">
                    Read more →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
