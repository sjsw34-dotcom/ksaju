import { Suspense } from "react";
import LoveReadingClient from "./LoveReadingClient";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

export const metadata: Metadata = {
  title: "Saju Love Reading | Your Romantic Destiny Decoded | Sajumuse",
  description:
    "Discover your love personality, ideal partner type, and romantic timing through Korean Four Pillars astrology. Personalized Saju love report — $19.",
  openGraph: {
    title: "Saju Love Reading | Your Romantic Destiny Decoded",
    description:
      "Your birth chart holds the secret to your love life. Find out your Peach Blossom Star, ideal match, and when love will find you.",
    url: `${BASE_URL}/love-reading`,
    images: [{ url: `${BASE_URL}/images/love/love2.jpg`, width: 1200, height: 630 }],
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
