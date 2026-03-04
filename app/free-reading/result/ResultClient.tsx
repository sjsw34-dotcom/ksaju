"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const FREE_COVERED = [
  "Basic personality overview",
  "Surface love insights",
  "General career direction",
  "This year's snapshot",
];

const PREMIUM_LOCKED = [
  "Deep personality & hidden talents",
  "Love compatibility patterns",
  "Career timing & best moves",
  "Wealth & financial fortune",
  "Health tendencies to watch",
  "Full 10-Year Fortune Cycle",
  "1 personal question answered",
  "60+ page personalized PDF",
];

const TESTIMONIALS = [
  {
    text: "I didn't expect to be this moved. It felt like someone finally understood the patterns I've been living through.",
    author: "J.K., 29",
    detail: "Career & Relationship Reading",
  },
  {
    text: "The 10-year cycle section was scary accurate. It predicted my career change timing almost to the month.",
    author: "S.M., 34",
    detail: "Premium Report Client",
  },
  {
    text: "60 pages of insights I keep coming back to whenever I face a big decision. Worth every penny.",
    author: "A.R., 27",
    detail: "Repeat Client",
  },
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

function UpsellSection({ queryString }: { queryString: string }) {
  return (
    <div className="mt-12 space-y-6 animate-[fadeUp_0.6s_ease_forwards]">
      {/* 1. Emotional Bridge */}
      <div className="text-center px-2">
        <p className="text-gray-300 text-sm leading-relaxed">
          What you just read was an{" "}
          <span className="text-white font-semibold">AI-generated surface glimpse</span>.
          <br />
          Your Four Pillars contain patterns that take a certified master
          <br />
          <span className="text-[#F59E0B] font-semibold">15+ years of training</span> to fully decode.
        </p>
      </div>

      {/* 2. Free vs Premium Comparison */}
      <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6">
        <h3 className="text-center font-bold text-lg mb-5">
          What You Got vs What You&apos;re Missing
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Free column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Free Reading
            </p>
            <ul className="space-y-2.5">
              {FREE_COVERED.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-400 text-xs mt-0.5 shrink-0">✓</span>
                  <span className="text-gray-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Premium column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B] mb-3">
              Premium Report
            </p>
            <ul className="space-y-2.5">
              {PREMIUM_LOCKED.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#7C3AED] text-xs mt-0.5 shrink-0">✦</span>
                  <span className="text-gray-200 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Master Credibility */}
      <div className="bg-[#1A1A2E] border border-[#7C3AED]/50 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center shrink-0">
            <span className="text-lg">✦</span>
          </div>
          <div>
            <p className="font-bold text-white mb-1">
              Analyzed by a Certified Saju Master
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Level 1 Myeongri Psychology Counselor · Level 1 Family Psychology Counselor
              · 15+ years of classical training · 138+ verified client reviews
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#2A2A4A]">
          <p className="text-gray-300 text-sm leading-relaxed">
            This free reading was AI-generated in seconds. Your Premium Report is{" "}
            <span className="text-white font-semibold">personally analyzed by a human master</span> who
            examines every elemental interaction, every timing cycle, every hidden
            pattern — the same care as a face-to-face consultation.
          </p>
        </div>
      </div>

      {/* 4. Testimonials */}
      <div className="space-y-3">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            className="bg-[#1A1A2E]/60 border border-[#2A2A4A] rounded-xl p-5"
          >
            <p className="text-gray-200 text-sm leading-relaxed mb-3 italic">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#F59E0B] text-xs">★★★★★</span>
              <span className="text-gray-400 text-xs">
                {t.author} · {t.detail}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Sample Report Preview */}
      <a
        href="/sample.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 bg-[#1A1A2E] border border-[#F59E0B]/30 rounded-xl hover:border-[#F59E0B]/60 transition-colors group"
      >
        <div className="w-11 h-13 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-[#F59E0B] text-xs font-bold">PDF</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#F59E0B] group-hover:text-[#FBBF24] transition-colors">
            Preview a Sample Report →
          </p>
          <p className="text-xs text-gray-400">
            See what 60+ pages of master analysis looks like
          </p>
        </div>
      </a>

      {/* 6. Price + CTA */}
      <div className="bg-[#1A1A2E] border border-[#7C3AED] rounded-2xl p-8 text-center">
        <p className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-3">
          Unlock Your Full Destiny
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">
          Premium Saju Report
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          Delivered to your inbox within 24 hours
        </p>

        <div className="mb-6">
          <p className="text-gray-500 text-sm line-through">$65</p>
          <p className="text-4xl font-bold">
            $29{" "}
            <span className="text-lg text-gray-400 font-normal">one-time</span>
          </p>
        </div>

        <a
          href={`/order?${queryString}`}
          className="block w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-bold text-lg text-center transition-colors"
        >
          Get My Full Report ✦
        </a>

        <p className="text-gray-500 text-xs mt-4">
          Secure PayPal payment · Delivered within 24h · Personally analyzed, not AI-generated
        </p>
      </div>
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

  const cacheKey = `saju-reading-${name}-${gender}-${birthDate}-${birthTime}`;

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
            // All content received — cache & reveal!
            try { sessionStorage.setItem(cacheKey, contentRef.current); } catch {}
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
    // Restore cached result on refresh
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setContent(cached);
        setPhase("reveal");
        setTimeout(() => setShowUpsell(true), 800);
        return;
      }
    } catch {}
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
        {showUpsell && <UpsellSection queryString={queryString} />}

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
