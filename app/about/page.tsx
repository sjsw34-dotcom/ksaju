import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Sajumuse",
  description:
    "Meet a certified Korean Saju master with 15+ years of experience. Learn how the ancient Four Pillars of Destiny can reveal your unique life blueprint.",
};

const CREDENTIALS = [
  {
    icon: "\uD83D\uDCDC",
    title: "Level 1 Myeongri Psychology Counselor",
    desc: 'Certified by Korea\'s Education & Certification Authority (\uD55C\uAD6D\uAD50\uC721\uC778\uC99D\uD3C9\uAC00\uC6D0)',
  },
  {
    icon: "\uD83D\uDCDC",
    title: "Level 1 Family Psychology Counselor",
    desc: 'Certified by Korea\'s Education & Certification Authority (\uD55C\uAD6D\uAD50\uC721\uC778\uC99D\uD3C9\uAC00\uC6D0)',
  },
  {
    icon: "\uD83D\uDCC5",
    title: "15+ Years of Study & Practice",
    desc: "Classical Korean Four Pillars analysis -- not self-taught shortcuts",
  },
  {
    icon: "\u2B50",
    title: "138+ Verified Client Reviews",
    desc: "Built on Danggeun Market, Korea's most trusted peer-to-peer platform",
  },
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

        {/* ── Section 1: Hero ── */}
        <section className="pt-24 pb-16 px-4 sm:px-6 text-center max-w-3xl mx-auto">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            About Sajumuse
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            The Master Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#F59E0B]">
              Your Reading
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Certified. Experienced. Dedicated to accuracy.
          </p>
        </section>

        {/* ── Section 2: Credentials ── */}
        <section className="py-8 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3 text-center">
            Credentials & Experience
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Why You Can Trust This Reading
          </h2>

          {/* Credential cards — 2x2 desktop, 1 col mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {CREDENTIALS.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 bg-[#1A1A2E]/60 border border-[#2A2A4A] rounded-2xl p-6 backdrop-blur-sm"
              >
                <span className="text-2xl mt-0.5 shrink-0">{icon}</span>
                <div>
                  <p className="font-semibold text-white mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate image placeholder */}
          <div className="max-w-lg mx-auto">
            <div className="relative bg-gradient-to-br from-[#2D1B69]/40 to-[#1A1A2E]/60 border-2 border-[#7C3AED]/30 rounded-2xl p-3 backdrop-blur-sm">
              <div className="relative aspect-[4/3] bg-[#0A0A0F]/50 rounded-xl border border-[#2A2A4A] overflow-hidden">
                <Image
                  src="/images/certificate.jpg"
                  fill
                  className="object-contain"
                  alt="Official certification documents — Myeongri Psychology Counselor and Family Psychology Counselor"
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                Nationally recognized certifications issued by Korea&apos;s Education & Certification Authority
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: Philosophy ── */}
        <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <div className="bg-[#1A1A2E]/60 border border-[#2A2A4A] rounded-2xl p-8 sm:p-10 backdrop-blur-sm">
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
              Philosophy
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              How I Read Your Chart
            </h2>
            <div className="space-y-5 text-gray-300 leading-relaxed">
              <p>
                This is not psychic guessing. Every reading is grounded in classical Saju methodology
                using the Manseryeok ({"\uB9CC\uC138\uB825"}) -- Korea&apos;s thousand-year astronomical calendar
                that maps the precise cosmic energies at your moment of birth.
              </p>
              <p>
                I don&apos;t skim charts or rely on automated interpretations. I examine each
                client&apos;s Four Pillars with the same care I would give in a face-to-face
                consultation -- analyzing every elemental interaction, every timing cycle, every
                hidden pattern.
              </p>
              <p>
                As a certified psychology counselor, I also bring an understanding of human behavior
                and emotional patterns to every reading. This combination of traditional Saju wisdom
                and modern psychological insight is what sets each report apart.
              </p>
              <p className="font-semibold text-white">
                That&apos;s why your Premium Report reaches 60+ pages. Real depth requires real time and care.
              </p>
            </div>
            <a
              href="/sample.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 mt-6 p-4 bg-[#0A0A0F]/40 border border-[#F59E0B]/30 rounded-xl hover:border-[#F59E0B]/60 transition-colors group"
            >
              <div className="w-12 h-14 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#F59E0B] text-sm font-bold">PDF</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F59E0B] group-hover:text-[#FBBF24] transition-colors">
                  Preview a Sample Report →
                </p>
                <p className="text-xs text-gray-400">Excerpt from a 60+ page report</p>
              </div>
            </a>
          </div>
        </section>

        {/* ── Section 4: CTA ── */}
        <section className="py-16 px-4 sm:px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Ready to discover what your birth chart reveals?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/free-reading"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base sm:text-lg transition-colors"
            >
              Start Free Reading
            </Link>
            <Link
              href="/order"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-[#F59E0B] text-[#7C3AED] hover:bg-[#F59E0B]/10 font-semibold text-base sm:text-lg transition-colors"
            >
              Get Premium Report · $35
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
