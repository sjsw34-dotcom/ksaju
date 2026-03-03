import Link from "next/link";

export default function FinalCTA() {
  return (
    <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 border-t border-b border-[#2A2A4A] bg-gradient-to-r from-[#7C3AED]/20 to-[#F59E0B]/20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4">
          Your destiny is written in the stars.
        </h2>
        <p className="text-base sm:text-lg text-gray-400 mb-7 sm:mb-10">
          Start with a free reading — no credit card needed.
        </p>
        <Link
          href="/free-reading"
          className="inline-flex items-center px-7 py-4 sm:px-10 sm:py-5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-base sm:text-xl transition-colors"
        >
          Get Your Free Reading →
        </Link>
      </div>
    </div>
  );
}
