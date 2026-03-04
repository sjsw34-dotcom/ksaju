"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const UPSELL_FEATURES = [
  "Core personality & natural talents",
  "Career path and best timing for success",
  "Love life & relationship patterns",
  "Wealth potential & financial fortune",
  "Health tendencies to watch",
  "This year's fortune forecast",
  "Full 10-Year Fortune Cycle & yearly breakdown",
  "60+ page personalized PDF, delivered within 24 hours",
];

const LOADING_MESSAGES = [
  "Mapping your Four Pillars...",
  "Reading the Heavenly Stems...",
  "Aligning the Earthly Branches...",
  "Calculating elemental balance...",
  "Consulting the cosmic energies...",
  "Interpreting your destiny chart...",
  "Weaving your fortune tapestry...",
  "Finalizing your reading...",
];

function UpsellCard({ queryString }: { queryString: string }) {
  return (
    <div className="mt-12 bg-[#1A1A2E] border border-[#7C3AED] rounded-2xl p-8 animate-[fadeUp_0.6s_ease_forwards]">
      <div className="text-center mb-6">
        <p className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-2">
          Unlock Your Full Destiny
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Premium Saju Report
        </h2>
        <p className="text-gray-400 text-sm">
          A certified Korean Saju master with 15+ years of experience reveals
          your full destiny blueprint.
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

      <p className="text-center text-gray-400 text-xs mt-4">
        Secure payment · Delivered within 24h · 100% satisfaction guarantee
      </p>
    </div>
  );
}

function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Mystical orb animation */}
      <div className="relative w-28 h-28 mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#7C3AED]/30 animate-[spin_8s_linear_infinite]" />
        {/* Mid ring */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#F59E0B]/20 animate-[spin_6s_linear_infinite_reverse]" />
        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-[#7C3AED]/10 animate-[pulse_2s_ease-in-out_infinite]" />
        {/* Center symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl animate-[pulse_2s_ease-in-out_infinite]">
            ✦
          </span>
        </div>
        {/* Floating dots */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#7C3AED] animate-[pulse_1.5s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F59E0B] animate-[pulse_1.5s_ease-in-out_0.5s_infinite]" />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C4B5FD] animate-[pulse_1.5s_ease-in-out_1s_infinite]" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#A78BFA] animate-[pulse_1.5s_ease-in-out_0.75s_infinite]" />
      </div>

      {/* Message */}
      <p
        key={message}
        className="text-gray-200 text-lg font-medium text-center animate-[fadeUp_0.4s_ease_forwards]"
      >
        {message}
      </p>
      <p className="text-gray-500 text-sm mt-3">
        This usually takes 10–15 seconds
      </p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-[#2A2A4A] rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#F59E0B] rounded-full animate-[loading_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

export default function ResultClient() {
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [phase, setPhase] = useState<"loading" | "reveal" | "error">(
    "loading"
  );
  const [showUpsell, setShowUpsell] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const abortRef = useRef<AbortController | null>(null);
  const contentRef = useRef("");

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

  // Rotate loading messages
  useEffect(() => {
    if (phase !== "loading") return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, [phase]);

  const fetchReading = async () => {
    if (!name || !gender || !birthDate) {
      setError(
        "Missing birth information. Please go back and fill in the form."
      );
      setPhase("error");
      return;
    }

    abortRef.current = new AbortController();
    contentRef.current = "";
    setContent("");
    setPhase("loading");
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
            // All content received — reveal!
            setContent(contentRef.current);
            setPhase("reveal");
            setTimeout(() => setShowUpsell(true), 800);
            return;
          }
          try {
            const parsed = JSON.parse(raw) as {
              text?: string;
              error?: string;
            };
            if (parsed.error) {
              setError(parsed.error);
              setPhase("error");
              return;
            }
            if (parsed.text) {
              contentRef.current += parsed.text;
            }
          } catch {
            // skip malformed line
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("Something went wrong. Please try again.");
      setPhase("error");
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading {
          0%   { width: 0%; }
          50%  { width: 80%; }
          100% { width: 0%; }
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
        {phase === "loading" && <LoadingScreen message={loadingMsg} />}

        {/* Error state */}
        {phase === "error" && error && (
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

        {/* Reading content — revealed all at once */}
        {phase === "reveal" && content && (
          <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-8 animate-[fadeUp_0.6s_ease_forwards]">
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
          </div>
        )}

        {/* Upsell card */}
        {showUpsell && <UpsellCard queryString={queryString} />}

        {/* Back link */}
        <div className="text-center mt-8">
          <a
            href="/free-reading"
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            ← Try a different birth date
          </a>
        </div>
      </div>
    </div>
  );
}
