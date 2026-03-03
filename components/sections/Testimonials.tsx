"use client";

interface Testimonial {
  name: string;
  age: number;
  role: string;
  location: string;
  initials: string;
  color: string;
  rating: number;
  tag: string;
  text: string;
}

const ROW1: Testimonial[] = [
  {
    name: "Emma Rodriguez",
    age: 26,
    role: "Product Designer",
    location: "New York, USA",
    initials: "ER",
    color: "#7C3AED",
    rating: 5,
    tag: "Personality & Career",
    text: "The personality section made me tear up — it described internal struggles I've never told anyone. The 10-Year Fortune Cycle explained exactly why the last 3 years have felt impossible, and showed me what's shifting next. This isn't horoscope fluff.",
  },
  {
    name: "James Kim",
    age: 33,
    role: "Entrepreneur",
    location: "Singapore",
    initials: "JK",
    color: "#F59E0B",
    rating: 5,
    tag: "Career & Wealth",
    text: "I used the timing window in my reading to decide when to launch my second business. Launched in March as the reading suggested — hit revenue targets in the first month. I don't need to explain it. I just know it works.",
  },
  {
    name: "Sophie Williams",
    age: 28,
    role: "Secondary Teacher",
    location: "London, UK",
    initials: "SW",
    color: "#EC4899",
    rating: 5,
    tag: "Love & Relationships",
    text: "The relationship compatibility section was uncomfortably accurate about patterns I keep repeating. The master didn't sugarcoat anything — she named exactly which element type I'm incompatible with and why. Finally starting to break the cycle.",
  },
  {
    name: "Mia Tanaka",
    age: 31,
    role: "Registered Nurse",
    location: "Melbourne, AU",
    initials: "MT",
    color: "#10B981",
    rating: 5,
    tag: "Health Tendencies",
    text: "I work in healthcare, so I read the health section critically. It flagged digestive and nervous system vulnerabilities — exactly what I manage personally. The timing windows for energy dips are now on my calendar. Unsettlingly precise.",
  },
];

const ROW2: Testimonial[] = [
  {
    name: "Aisha Johnson",
    age: 24,
    role: "Marketing Manager",
    location: "Toronto, Canada",
    initials: "AJ",
    color: "#6366F1",
    rating: 5,
    tag: "Free → Premium",
    text: "The free reading blew me away — more accurate than astrology readings I've paid $100+ for. Upgraded to premium the same day. The monthly fortune calendar for 2026 is something I reference every single week. Best $35 I've ever spent.",
  },
  {
    name: "Lucas Moreau",
    age: 30,
    role: "Financial Analyst",
    location: "Paris, France",
    initials: "LM",
    color: "#F59E0B",
    rating: 5,
    tag: "Wealth Potential",
    text: "I went in completely skeptical — I approach everything with data. But the wealth potential section mapped precisely onto the financial decisions I've made, including where I lost money. The five-element logic actually holds up under scrutiny.",
  },
  {
    name: "Isabella Garcia",
    age: 27,
    role: "Startup Founder",
    location: "Miami, USA",
    initials: "IG",
    color: "#EC4899",
    rating: 5,
    tag: "Personality",
    text: "Ordered premium reports for myself and three close friends as a birthday gift experiment. Every single one of us said it was the most accurate personality assessment we'd ever received — more than MBTI, more than StrengthsFinder. Remarkable.",
  },
  {
    name: "Ryan Park",
    age: 29,
    role: "UX Designer",
    location: "Seoul, Korea",
    initials: "RP",
    color: "#7C3AED",
    rating: 5,
    tag: "Authenticity",
    text: "I've had traditional Korean 사주 readings done by masters in Seoul. This English service matches that quality — the depth of interpretation is real, not watered-down. And it's explained in a way that actually resonates with someone under 35.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[340px] shrink-0 bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-7 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-gray-500">
            {t.role} · {t.location}
          </p>
        </div>
      </div>

      {/* Stars */}
      <Stars count={t.rating} />

      {/* Text */}
      <p className="text-gray-300 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

      {/* Tag */}
      <span
        className="self-start text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{
          background: `${t.color}20`,
          color: t.color,
        }}
      >
        {t.tag}
      </span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .row-left  { animation: scroll-left  32s linear infinite; }
        .row-right { animation: scroll-right 32s linear infinite; }
        .row-left:hover,
        .row-right:hover { animation-play-state: paused; }
      `}</style>

      {/* Section header */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center mb-12">
        <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
          Client Stories
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
          Real People. Real Readings.
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
          What clients say after receiving their premium Saju report.
        </p>
      </div>

      {/* Row 1 — scroll left */}
      <div className="overflow-hidden mb-5">
        <div className="row-left flex gap-6 w-max px-6">
          {[...ROW1, ...ROW1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div className="overflow-hidden">
        <div className="row-right flex gap-6 w-max px-6">
          {[...ROW2, ...ROW2].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
