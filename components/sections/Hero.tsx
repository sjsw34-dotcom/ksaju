import Link from "next/link";

const STARS = [
  { top: "5%", left: "8%", delay: "0s", duration: "3s" },
  { top: "12%", left: "22%", delay: "0.5s", duration: "4s" },
  { top: "8%", left: "45%", delay: "1s", duration: "3.5s" },
  { top: "15%", left: "67%", delay: "0.3s", duration: "5s" },
  { top: "6%", left: "83%", delay: "1.5s", duration: "3s" },
  { top: "22%", left: "5%", delay: "0.8s", duration: "4.5s" },
  { top: "30%", left: "15%", delay: "2s", duration: "3s" },
  { top: "18%", left: "35%", delay: "0.2s", duration: "4s" },
  { top: "25%", left: "55%", delay: "1.2s", duration: "3.5s" },
  { top: "20%", left: "75%", delay: "0.7s", duration: "5s" },
  { top: "28%", left: "90%", delay: "1.8s", duration: "4s" },
  { top: "40%", left: "3%", delay: "0.4s", duration: "3s" },
  { top: "45%", left: "18%", delay: "1.1s", duration: "4.5s" },
  { top: "38%", left: "40%", delay: "2.2s", duration: "3.5s" },
  { top: "42%", left: "60%", delay: "0.6s", duration: "4s" },
  { top: "35%", left: "78%", delay: "1.4s", duration: "3s" },
  { top: "48%", left: "92%", delay: "0.9s", duration: "5s" },
  { top: "60%", left: "7%", delay: "1.7s", duration: "4s" },
  { top: "55%", left: "28%", delay: "0.1s", duration: "3.5s" },
  { top: "65%", left: "48%", delay: "2.5s", duration: "3s" },
  { top: "58%", left: "70%", delay: "1.3s", duration: "4.5s" },
  { top: "63%", left: "88%", delay: "0.5s", duration: "4s" },
  { top: "75%", left: "12%", delay: "1.9s", duration: "3s" },
  { top: "70%", left: "32%", delay: "0.3s", duration: "5s" },
  { top: "78%", left: "52%", delay: "1.6s", duration: "3.5s" },
  { top: "72%", left: "72%", delay: "2.1s", duration: "4s" },
  { top: "80%", left: "95%", delay: "0.8s", duration: "3s" },
  { top: "88%", left: "20%", delay: "1.0s", duration: "4.5s" },
  { top: "85%", left: "60%", delay: "2.3s", duration: "3.5s" },
  { top: "92%", left: "80%", delay: "0.4s", duration: "4s" },
];

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A0F] via-[#1A1A2E] to-[#0A0A0F]">
      {/* Purple radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Stars */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center py-24">
        <p className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-4">
          Korean Fortune Telling · AI-Powered
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #C4B5FD 50%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Discover Your Destiny Through Ancient Korean Wisdom
          </span>
        </h1>

        <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
          Ancient wisdom meets modern AI. Your birth data holds the blueprint of your life.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/free-reading"
            className="inline-flex items-center px-8 py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-lg transition-colors"
          >
            Try Free Reading →
          </Link>
          <Link
            href="/order"
            className="inline-flex items-center px-8 py-4 rounded-full border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10 font-semibold text-lg transition-colors"
          >
            Get Full Report — $35
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">No credit card needed for free reading</p>
      </div>
    </div>
  );
}
