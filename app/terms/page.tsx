export const metadata = { title: "Terms of Service | Sajumuse" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Service Description</h2>
            <p>Sajumuse provides Saju (Korean Four Pillars) readings for entertainment and self-reflection purposes. Readings are not a substitute for professional advice.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Payments & Refunds</h2>
            <p>Premium reports are $29 USD (one-time). Due to the nature of digital content, refunds are not available once a report has been delivered. If you have not received your report within 24 hours, contact us for a full refund.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Delivery</h2>
            <p>Premium reports are delivered to the email address provided at checkout within 24 hours of payment confirmation.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Limitation of Liability</h2>
            <p>Sajumuse is not liable for decisions made based on readings. All readings are for personal insight and entertainment purposes only.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Contact</h2>
            <p>Questions? Reach us at <a href="mailto:sajumuse@gmail.com" className="text-[#7C3AED] hover:underline">sajumuse@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
