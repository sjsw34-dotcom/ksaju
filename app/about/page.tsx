import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Sajumuse",
  description:
    "Meet a certified Korean Saju master with 15+ years of experience. Learn how the ancient Four Pillars of Destiny can reveal your unique life blueprint.",
};

const STATS = [
  { value: "15+", label: "Years of Practice" },
  { value: "500+", label: "Years of Tradition" },
  { value: "60+", label: "Pages Per Report" },
  { value: "∞", label: "Paths Revealed" },
];

const CREDENTIALS = [
  {
    icon: "✦",
    title: "Certified Myeongri Psychology Counselor",
    desc: "Level 1 certified in Myeongri, the scholarly study of destiny science rooted in Korean metaphysics.",
  },
  {
    icon: "✦",
    title: "Certified Family Psychology Counselor",
    desc: "Level 1 certified to guide individuals and families through life transitions using Saju wisdom.",
  },
  {
    icon: "✦",
    title: "15+ Years of Real Consultations",
    desc: "Thousands of real readings. Not algorithms, not templates. Every word written personally for you.",
  },
];

const WHAT_YOU_GET = [
  { label: "Core personality & natural talents" },
  { label: "Career path & best timing for success" },
  { label: "Love life & relationship patterns" },
  { label: "Wealth potential & financial fortune" },
  { label: "Health tendencies to watch" },
  { label: "This year's fortune forecast" },
  { label: "Full 10-Year Fortune Cycle breakdown" },
  { label: "60+ page personalized PDF report" },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-white">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/bg-2.jpg"
          fill
          className="object-cover object-center opacity-15"
          alt=""
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/50 via-transparent to-[#0A0A0F]" />
      </div>

      <div className="relative z-10">

        {/* ── Hero ── */}
        <section className="pt-24 pb-16 px-4 sm:px-6 text-center max-w-3xl mx-auto">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Certified Korean Saju Master
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            500 Years of Ancient Wisdom.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#F59E0B]">
              Your Future, Decoded.
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Saju reads the exact cosmic energy at your birth: year, month, day, and hour.
            It reveals a life blueprint unique to <em>you</em>. Not a generic horoscope.
            Not a one-size-fits-all prediction. A map that was written the moment you arrived.
          </p>
        </section>

        {/* ── Stats ── */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="bg-[#1A1A2E]/80 border border-[#2A2A4A] rounded-2xl p-5 text-center backdrop-blur-sm"
              >
                <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7C3AED] to-[#F59E0B]">
                  {value}
                </p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What is Saju ── */}
        <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <div className="bg-[#1A1A2E]/60 border border-[#2A2A4A] rounded-2xl p-8 sm:p-10 backdrop-blur-sm">
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
              The Ancient Science
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-5">
              Why Saju Hits Different
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                While Western astrology uses your sun sign, <strong className="text-white">Saju (사주팔자)</strong> builds
                a full chart from four pillars (your birth year, month, day, and hour), each carrying
                a Heavenly Stem and an Earthly Branch. That's eight characters encoding the five
                elements flowing through your entire life.
              </p>
              <p>
                Saju shares roots with Chinese BaZi, but Korean masters have refined their own
                interpretation system over <strong className="text-white">500+ years</strong>,
                one that's more nuanced in reading emotional patterns, family karma, and timing cycles.
              </p>
              <p>
                The result? A reading that doesn't just tell you who you are.
                It tells you <strong className="text-white">when to move, when to wait, and why certain patterns keep repeating.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ── Credentials ── */}
        <section className="py-8 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3 text-center">
            Your Guide
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            The Master Behind Your Reading
          </h2>
          <div className="space-y-4">
            {CREDENTIALS.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-5 bg-[#1A1A2E]/60 border border-[#2A2A4A] rounded-2xl p-6 backdrop-blur-sm"
              >
                <span className="text-[#7C3AED] text-2xl mt-0.5 shrink-0">{icon}</span>
                <div>
                  <p className="font-semibold text-white mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What you receive ── */}
        <section className="py-8 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#2D1B69]/60 to-[#1A1A2E]/60 border border-[#7C3AED]/50 rounded-2xl p-8 sm:p-10 backdrop-blur-sm">
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
              Premium Report
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              What Your 60-Page Report Covers
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              No birth time? No problem. A powerful reading is still possible with date alone.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {WHAT_YOU_GET.map(({ label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="text-[#F59E0B] mt-0.5 shrink-0">✓</span>
                  <span className="text-gray-300 text-sm">{label}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/order"
                className="flex-1 text-center py-4 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full font-bold transition-colors"
              >
                Get My Full Report · $35 ✦
              </Link>
              <Link
                href="/free-reading"
                className="flex-1 text-center py-4 border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 rounded-full font-semibold transition-colors"
              >
                Try Free First
              </Link>
            </div>
          </div>
        </section>

        {/* ── Bottom quote ── */}
        <section className="py-16 px-4 sm:px-6 text-center max-w-2xl mx-auto">
          <p className="text-2xl sm:text-3xl font-bold leading-relaxed text-gray-200">
            &ldquo;Your destiny is not a mystery to hide from.
            It&apos;s a map to <span className="text-[#F59E0B]">navigate with confidence.</span>&rdquo;
          </p>
        </section>

      </div>
    </div>
  );
}
