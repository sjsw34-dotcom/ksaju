import Link from "next/link";

const FREE_FEATURES = [
  "Career overview",
  "Personality traits",
  "Current energy",
  "Year forecast",
];

const PREMIUM_FEATURES = [
  "Everything in Free",
  "Love & relationship patterns",
  "Wealth & financial fortune",
  "Health tendencies to watch",
  "10-Year Fortune Cycle",
  "60+ page personalized PDF",
  "1 personal question answered",
];

export default function Pricing() {
  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 bg-[#FAF9F6]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900">
          Choose Your Path
        </h2>
        <p className="text-gray-600 text-center text-sm sm:text-base mb-8 sm:mb-12">
          Start free, upgrade when you&apos;re ready for deeper insight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {/* Free card */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Free Mini Reading</h3>
            <p className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 text-gray-900">
              $0{" "}
              <span className="text-sm sm:text-base font-normal text-gray-500">forever</span>
            </p>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <span className="text-[#7C3AED] font-bold shrink-0">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/free-reading"
              className="block text-center py-3 px-6 rounded-full border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 font-semibold text-sm sm:text-base transition-colors"
            >
              Start Free Reading
            </Link>
          </div>

          {/* Premium card */}
          <div className="relative bg-gradient-to-b from-[#2D1B69] to-[#1A1A2E] border border-[#7C3AED] rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="absolute top-4 right-4 bg-[#F59E0B] text-black text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
              MOST POPULAR
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-2">Premium Report</h3>
            <p className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-6">
              $29{" "}
              <span className="text-sm sm:text-base font-normal text-gray-400">one-time</span>
            </p>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
              {PREMIUM_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <span className="text-[#F59E0B] font-bold shrink-0">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="text-xs text-gray-400 text-center mb-3">
              Personally analyzed by a certified master (not auto-generated)
            </p>
            <a
              href="/sample.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 mb-4 bg-[#0A0A0F]/40 border border-[#F59E0B]/30 rounded-xl hover:border-[#F59E0B]/60 transition-colors group"
            >
              <div className="w-9 h-11 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#F59E0B] text-[10px] font-bold">PDF</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F59E0B] group-hover:text-[#FBBF24] transition-colors">
                  Preview Sample Report →
                </p>
                <p className="text-[10px] text-gray-400">Excerpt from a 60+ page report</p>
              </div>
            </a>

            <Link
              href="/order"
              className="block text-center py-3 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              Get Premium Report
            </Link>

            <p className="text-center text-xs sm:text-sm text-gray-400 mt-3">
              Delivered within 48 hours. Real analysis takes time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
