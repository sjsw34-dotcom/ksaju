import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAF9F6]">

      {/* Left image panel — tablet(md): 20%, desktop(lg): 32% */}
      <div className="absolute left-0 top-0 h-full w-[20%] lg:w-[32%] hidden md:block">
        <Image
          src="/images/bg-1.jpg"
          alt="Korean traditional culture"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1024px) 20vw, 32vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(250,249,246,0.05) 0%, rgba(250,249,246,0.6) 70%, rgba(250,249,246,1) 100%)",
          }}
        />
      </div>

      {/* Right image panel */}
      <div className="absolute right-0 top-0 h-full w-[20%] lg:w-[32%] hidden md:block">
        <Image
          src="/images/bg-3.jpg"
          alt="Korean traditional culture"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1024px) 20vw, 32vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(250,249,246,0.05) 0%, rgba(250,249,246,0.6) 70%, rgba(250,249,246,1) 100%)",
          }}
        />
      </div>

      {/* Mobile: subtle top decorative strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] via-[#F59E0B] to-[#7C3AED] md:hidden" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-5 sm:px-6 text-center py-16 sm:py-20 md:py-24">
        <p className="text-[#F59E0B] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">
          Korean Four Pillars · Master Readers
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-[#1A1A2E]">
          Discover Your Destiny Through{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #9D6AE8 55%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ancient Korean Wisdom
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-sm sm:max-w-xl mx-auto">
          Over a thousand years of wisdom, now in your hands. Your birth data holds the blueprint of your life — analyzed by a certified Korean Saju master.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            href="/free-reading"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base sm:text-lg transition-colors"
          >
            Try Free Reading →
          </Link>
          <Link
            href="/order"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-[#F59E0B] text-[#7C3AED] hover:bg-[#F59E0B]/10 font-semibold text-base sm:text-lg transition-colors"
          >
            Get Full Report · $29
          </Link>
        </div>

        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          No credit card needed for free reading
        </p>
      </div>
    </div>
  );
}
