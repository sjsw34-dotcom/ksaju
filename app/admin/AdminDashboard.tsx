"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Tab = "topics" | "posts" | "write";

interface Topic {
  id: number;
  topic: string;
  category: string;
  status: "pending" | "generated";
  created_at: string;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  created_at: string;
}

const CATEGORIES = ["zodiac", "education", "love", "career", "kculture"];

const CATEGORY_COLORS: Record<string, string> = {
  zodiac: "text-purple-400",
  education: "text-blue-400",
  love: "text-pink-400",
  career: "text-green-400",
  kculture: "text-yellow-400",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("topics");
  const router = useRouter();

  // ── Topics state ──
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [newTopic, setNewTopic] = useState("");
  const [newCategory, setNewCategory] = useState("education");
  const [addingTopic, setAddingTopic] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateMsg, setGenerateMsg] = useState("");

  // ── Posts state ──
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // ── Write state ──
  const [writeTitle, setWriteTitle] = useState("");
  const [writeCategory, setWriteCategory] = useState("education");
  const [writeMeta, setWriteMeta] = useState("");
  const [writeImageUrl, setWriteImageUrl] = useState("");
  const [writeContent, setWriteContent] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState("");

  const loadTopics = useCallback(async () => {
    setTopicsLoading(true);
    const res = await fetch("/api/admin/topics");
    const data = (await res.json()) as { topics?: Topic[] };
    setTopics(data.topics ?? []);
    setTopicsLoading(false);
  }, []);

  const loadPosts = useCallback(async () => {
    setPostsLoading(true);
    const res = await fetch("/api/admin/posts");
    const data = (await res.json()) as { posts?: Post[] };
    setPosts(data.posts ?? []);
    setPostsLoading(false);
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  useEffect(() => {
    if (tab === "posts") loadPosts();
  }, [tab, loadPosts]);

  const handleAddTopic = async () => {
    if (!newTopic.trim()) return;
    setAddingTopic(true);
    await fetch("/api/admin/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: newTopic, category: newCategory }),
    });
    setNewTopic("");
    await loadTopics();
    setAddingTopic(false);
  };

  const handleDeleteTopic = async (id: number) => {
    if (!confirm("Delete this topic?")) return;
    await fetch("/api/admin/topics", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTopics((prev) => prev.filter((t) => t.id !== id));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerateMsg("");
    const res = await fetch("/api/admin/generate", { method: "POST" });
    const data = (await res.json()) as {
      success?: boolean;
      title?: string;
      slug?: string;
      message?: string;
      error?: string;
    };
    if (data.success) {
      setGenerateMsg(`✓ Generated: "${data.title ?? ""}"`);
      await loadTopics();
    } else {
      setGenerateMsg(data.message ?? data.error ?? "Failed");
    }
    setGenerating(false);
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await fetch("/api/admin/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePublish = async () => {
    if (!writeTitle.trim() || !writeContent.trim()) {
      setPublishMsg("Title and content are required.");
      return;
    }
    setPublishing(true);
    setPublishMsg("");
    const res = await fetch("/api/admin/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: writeTitle,
        category: writeCategory,
        meta: writeMeta,
        imageUrl: writeImageUrl,
        content: writeContent,
      }),
    });
    const data = (await res.json()) as { success?: boolean; slug?: string; error?: string };
    if (data.success) {
      setPublishMsg(`✓ Published! /blog/${data.slug ?? ""}`);
      setWriteTitle("");
      setWriteMeta("");
      setWriteImageUrl("");
      setWriteContent("");
    } else {
      setPublishMsg(data.error ?? "Failed to publish.");
    }
    setPublishing(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const pending = topics.filter((t) => t.status === "pending");
  const generated = topics.filter((t) => t.status === "generated");

  return (
    <div className="min-h-screen bg-[#0A0A0F] py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-1">
              Sajumuse
            </p>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1A1A2E] border border-[#2A2A4A] rounded-xl p-1 mb-6">
          {(["topics", "posts", "write"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
                tab === t
                  ? "bg-[#7C3AED] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t === "topics"
                ? `Topics (${pending.length} pending)`
                : t === "posts"
                ? "Posts"
                : "Write"}
            </button>
          ))}
        </div>

        {/* ── TOPICS TAB ── */}
        {tab === "topics" && (
          <div className="space-y-4">
            {/* Add topic form */}
            <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-5">
              <p className="text-sm font-semibold text-gray-300 mb-3">Add New Topic</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
                  placeholder="e.g. How Saju Predicts Your Career Success"
                  className="flex-1 bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <button
                  onClick={handleAddTopic}
                  disabled={addingTopic || !newTopic.trim()}
                  className="px-4 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 rounded-xl text-sm font-semibold transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Generate button */}
            <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-300">
                  Generate Next Post
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {pending.length > 0
                    ? `Next: "${pending[0].topic.slice(0, 50)}..."`
                    : "No pending topics"}
                </p>
                {generateMsg && (
                  <p className={`text-xs mt-1 ${generateMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                    {generateMsg}
                  </p>
                )}
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating || pending.length === 0}
                className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 text-black rounded-xl text-sm font-bold transition-colors whitespace-nowrap"
              >
                {generating ? "Generating..." : "Generate Now ✦"}
              </button>
            </div>

            {/* Topic list */}
            {topicsLoading ? (
              <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
            ) : (
              <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-[#2A2A4A] flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-300">
                    All Topics ({topics.length})
                  </p>
                  <p className="text-xs text-gray-500">
                    {pending.length} pending · {generated.length} generated
                  </p>
                </div>
                {topics.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No topics yet.</p>
                ) : (
                  <ul className="divide-y divide-[#2A2A4A]">
                    {topics.map((t) => (
                      <li
                        key={t.id}
                        className="px-5 py-3 flex items-center gap-3"
                      >
                        <span className="text-sm">
                          {t.status === "pending" ? "⏳" : "✅"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-200 truncate">{t.topic}</p>
                          <p className={`text-xs ${CATEGORY_COLORS[t.category] ?? "text-gray-400"}`}>
                            {t.category}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteTopic(t.id)}
                          className="text-gray-600 hover:text-red-400 text-xs transition-colors shrink-0"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── POSTS TAB ── */}
        {tab === "posts" && (
          <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#2A2A4A]">
              <p className="text-sm font-semibold text-gray-300">
                Published Posts ({posts.length})
              </p>
            </div>
            {postsLoading ? (
              <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
            ) : posts.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No posts yet.
              </p>
            ) : (
              <ul className="divide-y divide-[#2A2A4A]">
                {posts.map((p) => (
                  <li key={p.id} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200 truncate">{p.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <span className={CATEGORY_COLORS[p.category] ?? "text-gray-400"}>
                          {p.category}
                        </span>
                        {" · "}
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      className="text-[#7C3AED] hover:text-[#A78BFA] text-xs transition-colors shrink-0"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeletePost(p.id)}
                      className="text-gray-600 hover:text-red-400 text-xs transition-colors shrink-0"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── WRITE TAB ── */}
        {tab === "write" && (
          <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6 space-y-4">
            <p className="text-sm font-semibold text-gray-300 mb-1">Write New Post</p>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Title *</label>
              <input
                type="text"
                value={writeTitle}
                onChange={(e) => setWriteTitle(e.target.value)}
                placeholder="Post title"
                className="w-full bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Category</label>
                <select
                  value={writeCategory}
                  onChange={(e) => setWriteCategory(e.target.value)}
                  className="w-full bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">
                  Meta description
                </label>
                <input
                  type="text"
                  value={writeMeta}
                  onChange={(e) => setWriteMeta(e.target.value)}
                  placeholder="SEO description (optional)"
                  className="w-full bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Image URL <span className="text-gray-600">(optional, shows at top of card)</span>
              </label>
              <input
                type="url"
                value={writeImageUrl}
                onChange={(e) => setWriteImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Content * (Markdown)
              </label>
              <textarea
                value={writeContent}
                onChange={(e) => setWriteContent(e.target.value)}
                placeholder="## Introduction&#10;&#10;Write your content here in Markdown..."
                rows={16}
                className="w-full bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors resize-y font-mono"
              />
            </div>

            {publishMsg && (
              <p className={`text-sm ${publishMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                {publishMsg}
              </p>
            )}

            <button
              onClick={handlePublish}
              disabled={publishing}
              className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 rounded-xl font-bold transition-colors"
            >
              {publishing ? "Publishing..." : "Publish Post ✦"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
