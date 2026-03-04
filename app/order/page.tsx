import { Suspense } from "react";
import OrderClient from "./OrderClient";

export const metadata = {
  title: "Premium Report | Sajumuse",
  description: "Get your full Four Pillars Saju report delivered within 24 hours.",
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Content */}
      <div className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
            <OrderClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
