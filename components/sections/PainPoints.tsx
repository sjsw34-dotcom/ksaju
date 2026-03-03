const PAIN_POINTS = [
  {
    emoji: "😔",
    title: "Career feels stuck",
    description: "You're working hard but not moving forward. The path isn't clear.",
  },
  {
    emoji: "💔",
    title: "Relationship doubts",
    description: "Why do you keep attracting the same type? What's the pattern?",
  },
  {
    emoji: "🔄",
    title: "Repeating the same patterns",
    description: "Same mistakes, different faces. There's a deeper reason.",
  },
];

export default function PainPoints() {
  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          Sound familiar?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PAIN_POINTS.map((point, index) => (
            <div
              key={point.title}
              className={`bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-5 sm:p-6
                ${index === PAIN_POINTS.length - 1 ? "sm:col-span-2 sm:max-w-sm sm:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0" : ""}`}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{point.emoji}</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{point.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
