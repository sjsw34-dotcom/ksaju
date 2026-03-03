import Image from "next/image";

const FEATURES = [
  {
    icon: "✦",
    title: "Four Pillars",
    description: "Year, Month, Day, Hour of birth mapped to cosmic elements",
  },
  {
    icon: "🏛️",
    title: "1,000+ Years of Wisdom",
    description: "Refined over millennia in East Asia",
  },
  {
    icon: "🎯",
    title: "Deeply Personal",
    description: "Not generic horoscopes — unique to your exact birth moment",
  },
];

export default function WhatIsSaju() {
  return (
    <div className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg-2.jpg"
          alt="Korean traditional art"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0A0F]/78" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 text-white">
          What is Saju?
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base lg:text-lg">
          Saju (사주) is a traditional Korean fortune-telling system based on the Four Pillars of
          Destiny. By analyzing the year, month, day, and hour of your birth, it reveals the cosmic
          forces that shape your personality, relationships, and life path.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-6 text-center text-white
                ${index === FEATURES.length - 1 ? "sm:col-span-2 sm:max-w-sm sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0" : ""}`}
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
