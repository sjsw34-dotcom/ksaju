import Link from "next/link";

const FREE_FEATURES = [
  "Career overview",
  "Personality traits",
  "Current energy",
  "Year forecast",
];

const PREMIUM_FEATURES = [
  "Everything in Free",
  "Relationship compatibility",
  "5-year roadmap",
  "Lucky dates & timing",
  "Career pivot guidance",
  "Personal element analysis",
];

export default function Pricing() {
  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 bg-[#1A1A2E]/30">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4">
          Choose Your Path
        </h2>
        <p className="text-gray-400 text-center text-sm sm:text-base mb-8 sm:mb-12">
          Start free, upgrade when you&apos;re ready for deeper insight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {/* Free card */}
          <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6 sm:p-8 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Free Mini Reading</h3>
            <p className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-6">
              $0{" "}
              <span className="text-sm sm:text-base font-normal text-gray-400">forever</span>
            </p>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
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
              $35{" "}
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

            <Link
              href="/order"
              className="block text-center py-3 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              Get Premium Report
            </Link>

            <p className="text-center text-xs sm:text-sm text-gray-400 mt-3">
              Delivered within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
