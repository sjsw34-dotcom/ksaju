const STEPS = [
  {
    number: "1",
    title: "Enter Your Info",
    description: "Name, birth date, time, and gender",
  },
  {
    number: "2",
    title: "Get Your Reading",
    description: "Your Four Pillars are carefully analyzed by a certified Saju master",
  },
  {
    number: "3",
    title: "Transform Your Life",
    description: "Receive your 60+ page personalized report and navigate life with clarity",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 sm:mb-12">
          How It Works
        </h2>

        {/* Mobile: vertical stepper */}
        <div className="flex flex-col gap-0 sm:hidden">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex gap-4">
              {/* Left: circle + line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center text-lg font-bold shrink-0">
                  {step.number}
                </div>
                {index < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-[#2A2A4A] my-1" />
                )}
              </div>
              {/* Right: text */}
              <div className={`pb-8 ${index === STEPS.length - 1 ? "pb-0" : ""}`}>
                <h3 className="text-lg font-bold mb-1 mt-2.5">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet + Desktop: horizontal grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6 sm:gap-8 relative">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center relative">
              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-px bg-[#2A2A4A]">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7C3AED] text-sm">
                    →
                  </span>
                </div>
              )}

              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#7C3AED] flex items-center justify-center text-xl sm:text-2xl font-bold mb-3 sm:mb-4 z-10">
                {step.number}
              </div>

              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
