import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    paymentKey?: string;
    orderId?: string;
    amount?: string;
  }>;
}

async function confirmPayment(paymentKey: string, orderId: string, amount: number) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/payment/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentKey, orderId, amount }),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = (await res.json()) as { error?: string };
    throw new Error(err.error ?? "Confirmation failed");
  }
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { paymentKey, orderId, amount } = params;

  let errorMessage: string | null = null;

  if (!paymentKey || !orderId || !amount) {
    errorMessage = "Invalid payment parameters.";
  } else {
    try {
      await confirmPayment(paymentKey, orderId, parseInt(amount));
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : "Payment confirmation failed.";
    }
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
          <p className="text-gray-400 mb-8 text-sm">{errorMessage}</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        {/* Success card */}
        <div className="bg-[#1A1A2E] border border-[#7C3AED]/50 rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✦</span>
          </div>

          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
            Payment Confirmed
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Your Report is on its Way
          </h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Our master readers are preparing your full Four Pillars analysis.
            Check your inbox — your personalized report will arrive within{" "}
            <span className="text-white font-semibold">24 hours</span>.
          </p>

          {/* What happens next */}
          <div className="bg-[#0A0A0F] rounded-xl p-5 text-left mb-8 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              What happens next
            </p>
            {[
              "Our readers review your Four Pillars chart",
              "A detailed 20+ page report is crafted",
              "Delivered to your email within 24 hours",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#7C3AED]/30 text-[#7C3AED] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-300 text-sm">{step}</p>
              </div>
            ))}
          </div>

          <Link
            href="/free-reading"
            className="block w-full py-3 rounded-full border border-[#2A2A4A] text-gray-400 hover:text-white hover:border-[#7C3AED] text-sm font-medium transition-colors"
          >
            Try Another Free Reading
          </Link>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Questions? Contact us at{" "}
          <a href="mailto:unmyungtherapy@gmail.com" className="text-gray-400 hover:text-white">
            unmyungtherapy@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
