export const metadata = { title: "Privacy Policy | Unmyung Therapy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, including your name, date of birth, birth time, gender, and email address when you use our reading services or place an order.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>Your information is used solely to provide personalized Saju readings and deliver your premium report. We do not sell or share your personal data with third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Data Security</h2>
            <p>All data is stored securely and transmitted over SSL. Payment processing is handled by Toss Payments and we do not store any card information.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:unmyungtherapy@gmail.com" className="text-[#7C3AED] hover:underline">unmyungtherapy@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
