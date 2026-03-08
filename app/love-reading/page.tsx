import { Suspense } from "react";
import LoveReadingClient from "./LoveReadingClient";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

export const metadata: Metadata = {
  title: "Saju Love Reading — Who Are You Meant to Love? | Sajumuse",
  description:
    "Korean Four Pillars (Saju) reveals your love personality, ideal partner type & romantic timing. Get a personalized love report from a certified master — only $19.",
  keywords: [
    "saju love reading",
    "korean astrology love compatibility",
    "four pillars love reading",
    "saju romantic destiny",
    "korean fortune telling love",
    "peach blossom star saju",
    "birth chart love analysis",
  ],
  openGraph: {
    title: "Saju Love Reading — Who Are You Meant to Love?",
    description:
      "Your Korean birth chart reveals your love DNA, ideal partner element & when romance peaks. 500+ readings delivered by a 15-year master.",
    url: `${BASE_URL}/love-reading`,
    type: "website",
    images: [{ url: `${BASE_URL}/images/love/love2.jpg`, width: 1200, height: 630, alt: "Saju Love Reading — Korean astrology love compatibility report" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saju Love Reading — Who Are You Meant to Love?",
    description:
      "Korean Four Pillars astrology reveals your love personality, ideal match & romantic timing. Personalized report by a certified Saju master.",
    images: [`${BASE_URL}/images/love/love2.jpg`],
  },
  alternates: { canonical: `${BASE_URL}/love-reading` },
};

export default function LoveReadingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      <LoveReadingClient />
    </Suspense>
  );
}
