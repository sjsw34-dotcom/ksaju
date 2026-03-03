import { Suspense } from "react";
import type { Metadata } from "next";
import ResultClient from "./ResultClient";

export const metadata: Metadata = {
  title: "Your Saju Reading | K-Fortune",
  description:
    "Your personalized Saju (Korean Four Pillars) reading powered by ancient wisdom and AI.",
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="text-center">
        <div
          style={{
            width: 48,
            height: 48,
            border: "3px solid #2A2A4A",
            borderTopColor: "#7C3AED",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <p className="text-gray-400">Loading your reading...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultClient />
    </Suspense>
  );
}
