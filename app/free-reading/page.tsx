import { ReadingForm } from "@/components/free-reading/ReadingForm";

export const metadata = {
  title: "Free Saju Reading | Sajumuse",
  description: "Enter your birth details for a free personalized Saju reading.",
};

export default function FreeReadingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Content */}
      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          <p className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-3 text-center">
            Free Reading
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-900">
            Discover Your Destiny
          </h1>
          <p className="text-gray-500 text-center mb-10">
            Enter your birth details for a personalized Saju analysis.
          </p>
          <ReadingForm />
        </div>
      </div>
    </div>
  );
}
