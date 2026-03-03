import Image from "next/image";
import { ReadingForm } from "@/components/free-reading/ReadingForm";

export const metadata = {
  title: "Free Saju Reading | Sajumuse",
  description: "Enter your birth details for a free personalized Saju reading.",
};

export default function FreeReadingPage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0F]">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/bg-1.jpg"
          fill
          className="object-cover object-center opacity-15"
          alt=""
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-3 text-center">
            Free Reading
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
            Discover Your Destiny
          </h1>
          <p className="text-gray-400 text-center mb-10">
            Enter your birth details for a personalized Saju analysis.
          </p>
          <ReadingForm />
        </div>
      </div>
    </div>
  );
}
