import Image from "next/image";
import { Suspense } from "react";
import OrderClient from "./OrderClient";

export const metadata = {
  title: "Premium Report | Sajumuse",
  description: "Get your full Four Pillars Saju report delivered within 24 hours.",
};

export default function OrderPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0F]">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/bg-3.jpg"
          fill
          className="object-cover object-center opacity-15"
          alt=""
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
            <OrderClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
