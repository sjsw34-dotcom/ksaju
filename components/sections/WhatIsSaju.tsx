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
    <div className="py-20 px-4 sm:px-6 bg-[#1A1A2E]/30">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">What is Saju?</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 text-lg">
          Saju (사주) is a traditional Korean fortune-telling system based on the Four Pillars of
          Destiny. By analyzing the year, month, day, and hour of your birth, it reveals the cosmic
          forces that shape your personality, relationships, and life path.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
