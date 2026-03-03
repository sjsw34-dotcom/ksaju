"use client";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  initials: string;
  rating: number;
  text: string;
}

const ROW1: Testimonial[] = [
  {
    name: "Emma R.",
    role: "Product Designer",
    location: "New York",
    initials: "ER",
    rating: 5,
    text: "It predicted my job change 3 months before it happened. I don't know how, but I'm obsessed.",
  },
  {
    name: "Sophie W.",
    role: "Teacher",
    location: "London",
    initials: "SW",
    rating: 5,
    text: "Described me better than I could describe myself. I literally sent it to my therapist.",
  },
  {
    name: "Aisha J.",
    role: "Marketing",
    location: "Toronto",
    initials: "AJ",
    rating: 5,
    text: "Ordered for myself, ended up buying three more for friends. Now it's a group chat obsession.",
  },
];

const ROW2: Testimonial[] = [
  {
    name: "Lucas M.",
    role: "Analyst",
    location: "Paris",
    initials: "LM",
    rating: 5,
    text: "I went in skeptical. Came out genuinely unsettled. It knew things I'd never said out loud.",
  },
  {
    name: "Mia T.",
    role: "Nurse",
    location: "Melbourne",
    initials: "MT",
    rating: 5,
    text: "The health section flagged my exact weak spots. As a nurse, I took that very seriously.",
  },
  {
    name: "Ryan P.",
    role: "Designer",
    location: "Seoul",
    initials: "RP",
    rating: 5,
    text: "I've had readings done in Korea. This matches that quality — finally in English.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="w-[360px] shrink-0 bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-7 flex flex-col">
      <Stars />
      <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED]/50 flex items-center justify-center text-xs font-bold text-[#C4B5FD] shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-gray-500">{t.role} · {t.location}</p>
        </div>
      </div>
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
        .trow-left  { animation: scroll-left  28s linear infinite; }
        .trow-right { animation: scroll-right 28s linear infinite; }
        .trow-left:hover,
        .trow-right:hover { animation-play-state: paused; }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center mb-12">
        <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
          Client Stories
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Real People. Real Readings.
        </h2>
      </div>

      <div className="overflow-hidden mb-5">
        <div className="trow-left flex gap-5 w-max">
          {[...ROW1, ...ROW1, ...ROW1].map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="trow-right flex gap-5 w-max">
          {[...ROW2, ...ROW2, ...ROW2].map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
