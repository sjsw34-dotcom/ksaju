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
    <div className="py-20 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Sound familiar?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.title}
              className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{point.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{point.title}</h3>
              <p className="text-gray-400">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
