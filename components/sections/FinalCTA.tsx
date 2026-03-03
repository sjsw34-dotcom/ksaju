import Link from "next/link";

export default function FinalCTA() {
  return (
    <div className="py-24 px-4 sm:px-6 border-t border-b border-[#2A2A4A] bg-gradient-to-r from-[#7C3AED]/20 to-[#F59E0B]/20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">
          Your destiny is written in the stars.
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Start with a free reading — no credit card needed.
        </p>
        <Link
          href="/free-reading"
          className="inline-flex items-center px-10 py-5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xl transition-colors"
        >
          Get Your Free Reading →
        </Link>
      </div>
    </div>
  );
}
