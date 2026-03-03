"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const UPSELL_FEATURES = [
  "Complete 10-year fortune cycle analysis",
  "Detailed compatibility & relationship guidance",
  "Career timing & wealth luck periods",
  "Monthly fortune calendar for 2025–2026",
  "Personalized PDF report delivered within 24 hours",
];

function UpsellCard({ queryString }: { queryString: string }) {
  return (
    <div
      className="mt-12 bg-[#1A1A2E] border border-[#7C3AED] rounded-2xl p-8"
      style={{ animation: "fadeIn 0.6s ease forwards" }}
    >
      <div className="text-center mb-6">
        <p className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-2">
          Unlock Your Full Destiny
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Premium Saju Report
        </h2>
        <p className="text-gray-400 text-sm">
          Go deeper with a full Four Pillars analysis from our master readers.
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {UPSELL_FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="text-[#7C3AED] mt-0.5 flex-shrink-0">✦</span>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm line-through mb-1">$65</p>
        <p className="text-4xl font-bold">
          $35{" "}
          <span className="text-lg text-gray-400 font-normal">one-time</span>
        </p>
      </div>

      <a
        href={`/order?${queryString}`}
        className="block w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-bold text-lg text-center transition-colors"
      >
        Get My Full Report ✦
      </a>

      <p className="text-center text-gray-500 text-xs mt-4">
        Secure payment · Delivered within 24h · 100% satisfaction guarantee
      </p>
    </div>
  );
}

export default function ResultClient() {
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const name = searchParams.get("name") ?? "";
  const gender = searchParams.get("gender") ?? "";
  const year = searchParams.get("year") ?? "";
  const month = searchParams.get("month") ?? "";
  const day = searchParams.get("day") ?? "";
  const hour = searchParams.get("hour") ?? "unknown";

  const queryString = searchParams.toString();

  const birthDate = year
    ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    : "";
  const birthTime =
    hour === "unknown" ? "Unknown" : `${hour.padStart(2, "0")}:00`;

  const fetchReading = async () => {
    if (!name || !gender || !birthDate) {
      setError("Missing birth information. Please go back and fill in the form.");
      setIsLoading(false);
      return;
    }

    abortRef.current = new AbortController();
    setContent("");
    setIsLoading(true);
    setIsComplete(false);
    setShowUpsell(false);
    setError(null);

    try {
      const res = await fetch("/api/free-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gender, birthDate, birthTime }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") {
            setIsComplete(true);
            setTimeout(() => setShowUpsell(true), 500);
            return;
          }
          try {
            const parsed = JSON.parse(raw) as { text?: string; error?: string };
            if (parsed.error) {
              setError(parsed.error);
              return;
            }
            if (parsed.text) {
              setContent((prev) => prev + parsed.text);
            }
          } catch {
            // skip malformed line
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    abortRef.current?.abort();
    fetchReading();
  };

  useEffect(() => {
    fetchReading();
    return () => {
      abortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] py-16 px-4 sm:px-6">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-3">
            Your Reading
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {name ? `${name}'s Saju Reading` : "Your Saju Reading"}
          </h1>
          <p className="text-gray-400 text-sm">
            {birthDate
              ? `${birthDate}${hour !== "unknown" ? ` · ${birthTime}` : ""}`
              : ""}
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-20">
            <div
              style={{
                width: 56,
                height: 56,
                border: "3px solid #2A2A4A",
                borderTopColor: "#7C3AED",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            />
            <p className="text-gray-300 text-lg font-medium">
              Consulting the ancient wisdom...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Calculating your Four Pillars
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-950/40 border border-red-700/50 rounded-2xl p-8 text-center">
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Reading content */}
        {!isLoading && !error && content && (
          <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-8">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2
                    style={{
                      color: "#C4B5FD",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      marginTop: "1.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    style={{
                      color: "#A78BFA",
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginTop: "1rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p
                    style={{
                      color: "#D1D5DB",
                      lineHeight: "1.75",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul
                    style={{
                      paddingLeft: "1.25rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li
                    style={{
                      color: "#D1D5DB",
                      lineHeight: "1.75",
                      marginBottom: "0.25rem",
                      listStyleType: "disc",
                    }}
                  >
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: "#F59E0B", fontWeight: 600 }}>
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em style={{ color: "#A78BFA", fontStyle: "italic" }}>
                    {children}
                  </em>
                ),
              }}
            >
              {content}
            </ReactMarkdown>

            {/* Blinking cursor while streaming */}
            {!isComplete && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  background: "#7C3AED",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "blink 1s step-end infinite",
                }}
              />
            )}
          </div>
        )}

        {/* Upsell card */}
        {showUpsell && <UpsellCard queryString={queryString} />}

        {/* Back link */}
        <div className="text-center mt-8">
          <a
            href="/free-reading"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            ← Try a different birth date
          </a>
        </div>
      </div>
    </div>
  );
}
