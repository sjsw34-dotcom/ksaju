const STEPS = [
  {
    number: "1",
    title: "Enter Your Info",
    description: "Name, birth date, time, and gender",
  },
  {
    number: "2",
    title: "Get Your Reading",
    description: "AI analyzes your Four Pillars instantly",
  },
  {
    number: "3",
    title: "Transform Your Life",
    description: "Use ancient wisdom to navigate modern challenges",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-20 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              {/* Connector arrow between steps (desktop only) */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px bg-[#2A2A4A]">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7C3AED]">
                    →
                  </span>
                </div>
              )}

              {/* Number circle */}
              <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center text-2xl font-bold mb-4 z-10">
                {step.number}
              </div>

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
