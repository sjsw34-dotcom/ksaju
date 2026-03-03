import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    code?: string;
    message?: string;
    orderId?: string;
  }>;
}

export default async function FailPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const message = params.message ?? "The payment could not be completed.";
  const isCancelled = params.code === "PAY_PROCESS_CANCELED";

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-5">{isCancelled ? "🚫" : "⚠️"}</div>

          <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-3">
            {isCancelled ? "Payment Cancelled" : "Payment Failed"}
          </p>
          <h1 className="text-2xl font-bold mb-3">
            {isCancelled ? "Payment was cancelled" : "Something went wrong"}
          </h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            {isCancelled
              ? "No worries — you haven't been charged. Try again whenever you're ready."
              : `${message} Please try again or contact support if the issue persists.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/order"
              className="flex-1 block py-3 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm text-center transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="flex-1 block py-3 rounded-full border border-[#2A2A4A] text-gray-400 hover:text-white hover:border-[#7C3AED] font-semibold text-sm text-center transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Need help?{" "}
          <a href="mailto:sajumuse@gmail.com" className="text-gray-400 hover:text-white">
            sajumuse@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
