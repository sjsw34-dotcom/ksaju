"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

const PREMIUM_FEATURES = [
  "Complete 10-year fortune cycle analysis",
  "Detailed compatibility & relationship guidance",
  "Career timing & wealth luck periods",
  "Monthly fortune calendar for 2025–2026",
  "Personalized PDF report — delivered within 24h",
];

export default function OrderClient() {
  const searchParams = useSearchParams();

  const searchYear  = searchParams.get("year")   ?? "";
  const searchMonth = searchParams.get("month")  ?? "";
  const searchDay   = searchParams.get("day")    ?? "";
  const searchHour  = searchParams.get("hour")   ?? "unknown";
  const gender      = searchParams.get("gender") ?? "";

  const prefillDate = searchYear
    ? `${searchYear}-${searchMonth.padStart(2, "0")}-${searchDay.padStart(2, "0")}`
    : "";

  const [name, setName]           = useState(searchParams.get("name") ?? "");
  const [email, setEmail]         = useState("");
  const [birthDate, setBirthDate] = useState(prefillDate);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const birthTime = searchHour === "unknown" ? "Unknown" : `${searchHour.padStart(2, "0")}:00`;

  const handlePay = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!birthDate) {
      setError("Please enter your date of birth.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create order record in DB
      const orderRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, birthDate, birthTime, gender }),
      });

      if (!orderRes.ok) {
        const err = (await orderRes.json()) as { error?: string };
        throw new Error(err.error ?? "Failed to create order");
      }

      const { orderId } = (await orderRes.json()) as { orderId: string };

      // 2. Load Toss and request payment
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!
      );
      const payment = tossPayments.payment({ customerKey: ANONYMOUS });

      await payment.requestPayment({
        method: "PAYPAL" as "CARD",
        amount: { currency: "USD", value: 35 },
        orderId,
        orderName: "Unmyung Therapy Premium Saju Report",
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
        customerName: name,
        customerEmail: email,
      });
    } catch (err) {
      // User cancelled or payment failed
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
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Your Full Destiny Report
        </h1>
        <p className="text-gray-400 text-sm">
          Crafted by master readers · Delivered within 24 hours
        </p>
      </div>

      {/* Features */}
      <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-6 mb-6">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          What&apos;s included
        </p>
        <ul className="space-y-3">
          {PREMIUM_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
              <span className="text-[#7C3AED] mt-0.5 shrink-0">✦</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="border-t border-[#2A2A4A] mt-6 pt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 line-through mb-0.5">$65</p>
            <p className="text-3xl font-bold">
              $35
              <span className="text-base font-normal text-gray-400 ml-2">one-time</span>
            </p>
          </div>
          <span className="bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold px-3 py-1 rounded-full">
            SAVE 46%
          </span>
        </div>
      </div>

      {/* Birth info summary (read-only) */}
      {birthDate && (
        <div className="bg-[#0A0A0F] border border-[#2A2A4A] rounded-xl px-4 py-3 mb-6 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="text-gray-500">Birth date: <span className="text-gray-300">{birthDate}</span></span>
          {searchHour !== "unknown" && (
            <span className="text-gray-500">Time: <span className="text-gray-300">{birthTime}</span></span>
          )}
          {gender && (
            <span className="text-gray-500">Gender: <span className="text-gray-300 capitalize">{gender}</span></span>
          )}
        </div>
      )}

      {/* Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full bg-[#1A1A2E] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Email <span className="text-[#F59E0B]">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Report will be sent here"
            className="w-full bg-[#1A1A2E] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>

        {/* Birth date — show as editable if not passed via URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Date of Birth <span className="text-[#F59E0B]">*</span>
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-[#1A1A2E] border border-[#2A2A4A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full py-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg transition-colors"
      >
        {loading ? "Redirecting to PayPal..." : "Pay $35 via PayPal →"}
      </button>

      <p className="text-center text-gray-600 text-xs mt-4">
        Secure payment via PayPal · SSL encrypted
      </p>
    </div>
  );
}
