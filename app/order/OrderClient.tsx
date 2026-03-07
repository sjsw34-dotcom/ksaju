"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { loadTossPayments, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

const PREMIUM_FEATURES = [
  "Core personality & natural talents",
  "Career path and best timing for success",
  "Love life & relationship patterns",
  "Wealth potential & financial fortune",
  "Health tendencies to watch",
  "This year's fortune forecast",
  "Full 10-Year Fortune Cycle & yearly breakdown",
  "60+ page personalized PDF report",
  "1 personal question answered",
];

function getDaysInMonth(year: string, month: string): number {
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
}

export default function OrderClient() {
  const searchParams = useSearchParams();

  const paramName   = searchParams.get("name")   ?? "";
  const paramGender = searchParams.get("gender") ?? "";
  const paramYear   = searchParams.get("year")   ?? "";
  const paramMonth  = searchParams.get("month")  ?? "";
  const paramDay    = searchParams.get("day")    ?? "";
  const paramHour   = searchParams.get("hour")   ?? "unknown";

  const [name, setName]     = useState(paramName);
  const [email, setEmail]   = useState("");
  const [gender, setGender] = useState(paramGender);
  const [year, setYear]     = useState(paramYear);
  const [month, setMonth]   = useState(paramMonth);
  const [day, setDay]       = useState(paramDay);
  const [hour, setHour]     = useState(paramHour);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [widgetReady, setWidgetReady] = useState(false);
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);

  const hasParams = !!(paramName && paramGender && paramYear && paramMonth && paramDay);
  const [showFullForm, setShowFullForm] = useState(false);
  const compactMode = hasParams && !showFullForm;

  // Derived values
  const currentYear = new Date().getFullYear();
  const years  = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const maxDay = getDaysInMonth(year, month);
  const days   = Array.from({ length: maxDay }, (_, i) => i + 1);
  const hours  = ["unknown", ...Array.from({ length: 24 }, (_, i) => String(i))];

  const getHourLabel = (h: string) => {
    if (h === "unknown") return "I don't know";
    const n = Number(h);
    if (n === 0) return "0:00 (Midnight)";
    if (n === 12) return "12:00 (Noon)";
    return `${String(n).padStart(2, "0")}:00`;
  };

  const handleMonthChange = (newMonth: string) => {
    const max = getDaysInMonth(year, newMonth);
    setMonth(newMonth);
    if (Number(day) > max) setDay("");
  };

  const birthDate = year && month && day
    ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    : "";

  const selectClass = (hasError: boolean) =>
    `w-full bg-white border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#7C3AED] transition-colors appearance-none ${
      hasError ? "border-red-500" : "border-gray-200"
    }`;

  // Initialize Toss Payments widget with API individual key
  useEffect(() => {
    let cancelled = false;

    const initWidgets = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({ customerKey: "ANONYMOUS" });

        await widgets.setAmount({ currency: "USD", value: 29 });

        if (cancelled) return;

        await Promise.all([
          widgets.renderPaymentMethods({
            selector: "#payment-method",
          }),
          widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          }),
        ]);

        widgetsRef.current = widgets;
        setWidgetReady(true);
      } catch (err) {
        if (cancelled) return;
        console.error("[toss] widget init error:", err);
        setError("Failed to load payment widget. Please refresh.");
      }
    };

    initWidgets();

    return () => {
      cancelled = true;
      const pmEl = document.getElementById("payment-method");
      const agEl = document.getElementById("agreement");
      if (pmEl) pmEl.innerHTML = "";
      if (agEl) agEl.innerHTML = "";
      widgetsRef.current = null;
      setWidgetReady(false);
    };
  }, []);

  const handlePay = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!year || !month || !day) {
      setError("Please enter your date of birth.");
      return;
    }
    if (!widgetsRef.current) {
      setError("Payment widget not ready. Please refresh.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create order record in DB
      const orderRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          birthDate,
          birthTime: hour === "unknown" ? "Unknown" : `${hour.padStart(2, "0")}:00`,
          gender,
        }),
      });

      if (!orderRes.ok) {
        const err = (await orderRes.json()) as { error?: string };
        throw new Error(err.error ?? "Failed to create order");
      }

      const { orderId } = (await orderRes.json()) as { orderId: string };

      // 2. Request payment via widget
      await widgetsRef.current.requestPayment({
        orderId,
        orderName: "Saju Premium Reading",
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
        customerEmail: email,
        customerName: name,
      });
    } catch (err) {
      if (err instanceof Error && err.message.includes("PAY_PROCESS_CANCELED")) {
        setError("Payment was cancelled.");
      } else {
        setError(
          err instanceof Error ? err.message : "Payment failed. Please try again."
        );
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
          Premium Report
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
          Your Full Destiny Report
        </h1>
        <p className="text-gray-500 text-sm">
          Certified Myeongri Master · 15+ Years Experience · Delivered within 48h
        </p>
      </div>

      {/* Features */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mb-6">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          What&apos;s included
        </p>
        <ul className="space-y-3">
          {PREMIUM_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-[#7C3AED] mt-0.5 shrink-0">✦</span>
              {f}
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-400 mt-4">
          Personally analyzed by a certified master — not auto-generated
        </p>
        <a
          href="/sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mt-4 p-3 bg-[#FAF9F6] border border-[#F59E0B]/30 rounded-xl hover:border-[#F59E0B]/60 transition-colors group"
        >
          <div className="w-10 h-12 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-[#F59E0B] text-xs font-bold">PDF</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#F59E0B] group-hover:text-[#FBBF24] transition-colors">
              Preview Sample Report →
            </p>
            <p className="text-xs text-gray-400">Excerpt from a 60+ page report</p>
          </div>
        </a>

        <div className="border-t border-gray-200 mt-6 pt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-400 line-through mb-0.5">$65</p>
            <p className="text-3xl font-bold text-gray-900">
              $29
              <span className="text-base font-normal text-gray-400 ml-2">one-time</span>
            </p>
          </div>
          <span className="bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold px-3 py-1 rounded-full">
            SAVE 46%
          </span>
        </div>
      </div>

      {/* Form */}
      {compactMode ? (
        <div className="space-y-4 mb-6">
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Your Info</p>
              <button
                type="button"
                onClick={() => setShowFullForm(true)}
                className="text-xs text-[#7C3AED] hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              <span className="text-gray-400">Name</span>
              <span className="text-gray-900">{name}</span>
              <span className="text-gray-400">Born</span>
              <span className="text-gray-900">
                {birthDate}
                {hour !== "unknown" ? ` · ${getHourLabel(hour)}` : ""}
              </span>
              <span className="text-gray-400">Gender</span>
              <span className="text-gray-900 capitalize">{gender}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-[#F59E0B]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Report will be sent to this email"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-colors"
              autoFocus
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Name <span className="text-[#F59E0B]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-[#F59E0B]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Report will be sent here"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-colors"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Gender <span className="text-[#F59E0B]">*</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={selectClass(false)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date of Birth <span className="text-[#F59E0B]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={selectClass(false)}
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => handleMonthChange(e.target.value)}
                className={selectClass(false)}
              >
                <option value="">Month</option>
                {months.map((m) => (
                  <option key={m} value={String(m)}>{m}</option>
                ))}
              </select>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={selectClass(false)}
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d)}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Birth hour */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Birth Hour{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className={selectClass(false)}
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {getHourLabel(h)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Toss Payment Widget */}
      <div className="mb-4">
        <div id="payment-method" />
      </div>
      <div className="mb-6">
        <div id="agreement" />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={loading || !widgetReady}
        className="w-full py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg transition-colors"
      >
        {loading ? "Redirecting to PayPal..." : "Pay $29 via PayPal →"}
      </button>

      <p className="text-center text-gray-500 text-xs mt-4">
        Secure payment via PayPal · SSL encrypted
      </p>
    </div>
  );
}
