"use client";

import { useState, useEffect, useRef } from "react";
import {
  loadTossPayments,
  ANONYMOUS,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

/* ─── Helpers ─── */
function getDaysInMonth(year: string, month: string): number {
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
}

function getHourLabel(h: string) {
  if (h === "unknown") return "I don't know";
  const n = Number(h);
  if (n === 0) return "0:00 (Midnight)";
  if (n === 12) return "12:00 (Noon)";
  return `${String(n).padStart(2, "0")}:00`;
}

const LOVE_FEATURES = [
  "Your Day Master love personality: how you naturally give & receive love",
  "Peach Blossom Star analysis: your romantic magnetism score",
  "Ideal partner element profile: who truly complements your chart",
  "Romantic timing forecast: when love energy peaks in your life",
  "Relationship pattern diagnosis: why past patterns keep repeating",
  "Red Flame Star check: your hidden seductive energy",
  "Personalized love advice based on your elemental balance",
];

/* ─── Component ─── */
export default function LoveReadingClient() {
  /* Form state */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("unknown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [widgetReady, setWidgetReady] = useState(false);
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const maxDay = getDaysInMonth(year, month);
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);
  const hours = ["unknown", ...Array.from({ length: 24 }, (_, i) => String(i))];

  const handleMonthChange = (m: string) => {
    const max = getDaysInMonth(year, m);
    setMonth(m);
    if (Number(day) > max) setDay("");
  };

  const birthDate =
    year && month && day
      ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      : "";

  const selectClass =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#E91E8C] transition-colors appearance-none";

  /* Toss widget */
  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const tp = await loadTossPayments(clientKey);
        const w = tp.widgets({ customerKey: ANONYMOUS });
        await w.setAmount({ currency: "USD", value: 19 });
        if (cancelled) return;
        await Promise.all([
          w.renderPaymentMethods({
            selector: "#love-payment-method",
            variantKey: "paypal",
          }),
          w.renderAgreement({
            selector: "#love-agreement",
            variantKey: "AGREEMENT",
          }),
        ]);
        widgetsRef.current = w;
        setWidgetReady(true);
      } catch (err) {
        if (cancelled) return;
        console.error("[love-toss] init error:", err);
        setError(err instanceof Error ? err.message : "Failed to load payment.");
      }
    }
    init();
    return () => {
      cancelled = true;
      const pm = document.getElementById("love-payment-method");
      const ag = document.getElementById("love-agreement");
      if (pm) pm.innerHTML = "";
      if (ag) ag.innerHTML = "";
      widgetsRef.current = null;
      setWidgetReady(false);
    };
  }, []);

  const handlePay = async () => {
    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim() || !email.includes("@"))
      return setError("Please enter a valid email.");
    if (!gender) return setError("Please select your gender.");
    if (!year || !month || !day) return setError("Please enter your date of birth.");
    if (!widgetsRef.current) return setError("Payment not ready. Please refresh.");

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          birthDate,
          birthTime: hour === "unknown" ? "Unknown" : `${hour.padStart(2, "0")}:00`,
          gender,
          product: "love",
        }),
      });
      if (!res.ok) {
        const e = (await res.json()) as { error?: string };
        throw new Error(e.error ?? "Failed to create order");
      }
      const { orderId } = (await res.json()) as { orderId: string };
      await widgetsRef.current.requestPayment({
        orderId,
        orderName: "Saju Love Reading",
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
        customerEmail: email,
        customerName: name,
      });
    } catch (err: unknown) {
      console.error("[love] pay error:", err);
      if (err instanceof Error && err.message.includes("PAY_PROCESS_CANCELED")) {
        setError("Payment was cancelled.");
      } else {
        setError(err instanceof Error ? err.message : "Payment failed.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ════════════════════════════════════════════
          SECTION 1 — Hero
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/love/love2.jpg"
            alt="Mystical love destiny sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#FAF9F6]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center px-4 pt-24 pb-32 sm:pt-32 sm:pb-40">
          <p className="text-pink-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Korean Saju Love Reading
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Your Birth Chart Knows<br />
            Who You&apos;re Meant to Love
          </h1>
          <p className="text-white/80 text-lg max-w-lg mx-auto mb-8">
            For centuries, Korean families have consulted Saju before marriage.
            Now, the same ancient system reveals your romantic destiny.
          </p>
          <a
            href="#order"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#E91E8C] to-[#7C3AED] rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Read My Love Chart · $19
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — The Problem / Hook
      ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Do You Keep Falling for the Wrong Person?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              It&apos;s not bad luck. It&apos;s not your fault. Your Four Pillars birth chart
              contains a pattern, a blueprint of how you love, who you attract,
              and when the timing is actually right.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <img
              src="/images/love/love1.jpg"
              alt="Love written in dreamy clouds"
              className="rounded-2xl shadow-lg w-full"
            />
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Your Day Master = Your Love DNA</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  In Saju, your Day Pillar (Il-ju) is the core of who you are in relationships.
                  It reveals how you naturally express affection, what makes you feel secure,
                  and the emotional patterns you unconsciously repeat.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">The Peach Blossom Star</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Some people radiate romantic magnetism without trying. In Korean astrology,
                  that&apos;s the Peach Blossom Star (Dohwasal), a specific marker in your chart
                  that scores your natural charm and attraction power.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — Couple illustration + Deeper hooks
      ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-pink-50/50 to-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-12">
            <div className="order-2 sm:order-1 space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Your Five Elements = Your Love Language</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Fire lovers are passionate and dramatic. Water types feel in layers others can&apos;t see.
                  Wood needs freedom to grow. Earth nurtures through care. Metal loves with fierce loyalty.
                  Your elemental balance shapes exactly how you connect.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Romantic Timing Is Everything</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Saju maps 10-year fortune cycles (Dae-un) that reveal when love energy peaks
                  in your life. Some years are magnets for romance. Others are meant for
                  self-growth. Knowing the difference changes everything.
                </p>
              </div>
            </div>
            <img
              src="/images/love/love5.jpg"
              alt="Korean couple sharing earphones illustration"
              className="rounded-2xl shadow-lg w-full order-1 sm:order-2"
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Not 1 of 12 Signs. Your Chart Is as Unique as Your Fingerprint.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">
              Western horoscopes put 600 million people in the same box.
              Korean Saju uses your exact birth year, month, day, and hour
              to build a chart that belongs only to you.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — What's included + trust
      ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-16">
            <img
              src="/images/love/love6.jpg"
              alt="Korean couple watercolor illustration"
              className="rounded-2xl shadow-lg w-full"
            />
            <div>
              <p className="text-[#E91E8C] text-xs font-semibold tracking-widest uppercase mb-3">
                What You&apos;ll Discover
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Personalized Love Report Includes
              </h2>
              <ul className="space-y-3">
                {LOVE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-[#E91E8C] mt-0.5 shrink-0">&#10084;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social proof strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-[#E91E8C] mb-1">500+</p>
              <p className="text-gray-500 text-sm">Love readings delivered</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-[#7C3AED] mb-1">15+ yrs</p>
              <p className="text-gray-500 text-sm">Master reader experience</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-[#F59E0B] mb-1">24h</p>
              <p className="text-gray-500 text-sm">Delivered to your inbox</p>
            </div>
          </div>

          {/* Flowers + rings image with CTA */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src="/images/love/love4.jpg"
              alt="Pink peonies and wedding rings"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 sm:p-8">
                <p className="text-white font-bold text-lg sm:text-xl">
                  Korean families have checked Saju before marriage for centuries.
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Now you can see what your chart says about love, before it&apos;s too late.
                </p>
              </div>
            </div>
          </div>

          {/* Balloon LOVE image */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/love/love3.jpg"
              alt="Pastel LOVE with heart balloons"
              className="rounded-2xl shadow-lg w-full max-w-lg"
            />
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          SECTION 5 — Order Form
      ════════════════════════════════════════════ */}
      <section id="order" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-pink-50/30 to-[#FAF9F6]">
        <div className="max-w-lg mx-auto">
          {/* Reviews strip */}
          <div className="mb-8 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#F59E0B] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-gray-900 text-sm font-semibold">5.0</span>
              <span className="text-gray-400 text-xs">· 138+ verified reviews</span>
            </div>
            <div className="flex gap-2 overflow-hidden rounded-lg">
              <img src="/images/reviews/review2.jpg" alt="Client review" className="w-1/3 rounded-lg object-cover h-28 sm:h-36" loading="lazy" />
              <img src="/images/reviews/review5.jpg" alt="Client review" className="w-1/3 rounded-lg object-cover h-28 sm:h-36" loading="lazy" />
              <img src="/images/reviews/review6.jpg" alt="Client review" className="w-1/3 rounded-lg object-cover h-28 sm:h-36" loading="lazy" />
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Real reviews from Korean clients on Danggeun Market ·{" "}
              <a href="/about" className="text-[#E91E8C] hover:underline">See all →</a>
            </p>
          </div>

          <div className="text-center mb-8">
            <p className="text-[#E91E8C] text-xs font-semibold tracking-widest uppercase mb-3">
              Love Reading
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Decode Your Love Destiny
            </h2>
            <p className="text-gray-500 text-sm">
              Personalized by a certified Saju master · Delivered within 24h
            </p>
          </div>

          {/* Price */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mb-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-400 line-through mb-0.5">$39</p>
                <p className="text-3xl font-bold text-gray-900">
                  $19
                  <span className="text-base font-normal text-gray-400 ml-2">one-time</span>
                </p>
              </div>
              <span className="bg-[#E91E8C]/20 text-[#E91E8C] text-xs font-bold px-3 py-1 rounded-full">
                SAVE 51%
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name <span className="text-[#E91E8C]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E91E8C] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-[#E91E8C]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Report will be sent here"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E91E8C] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Gender <span className="text-[#E91E8C]">*</span>
              </label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={selectClass}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Date of Birth <span className="text-[#E91E8C]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
                  <option value="">Year</option>
                  {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
                </select>
                <select value={month} onChange={(e) => handleMonthChange(e.target.value)} className={selectClass}>
                  <option value="">Month</option>
                  {months.map((m) => <option key={m} value={String(m)}>{m}</option>)}
                </select>
                <select value={day} onChange={(e) => setDay(e.target.value)} className={selectClass}>
                  <option value="">Day</option>
                  {days.map((d) => <option key={d} value={String(d)}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Birth Hour <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <select value={hour} onChange={(e) => setHour(e.target.value)} className={selectClass}>
                {hours.map((h) => <option key={h} value={h}>{getHourLabel(h)}</option>)}
              </select>
            </div>
          </div>

          {/* Payment widget */}
          <div className="mb-4"><div id="love-payment-method" /></div>
          <div className="mb-6"><div id="love-agreement" /></div>

          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

          <button
            onClick={handlePay}
            disabled={loading || !widgetReady}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#7C3AED] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg transition-all"
          >
            {loading ? "Redirecting to PayPal..." : "Get My Love Reading · $19"}
          </button>

          <p className="text-center text-gray-500 text-xs mt-4">
            Secure payment via PayPal · SSL encrypted
          </p>
        </div>
      </section>
    </div>
  );
}
