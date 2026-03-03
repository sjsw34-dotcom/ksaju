export const metadata = { title: "Contact | Unmyung Therapy" };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] py-16 px-4 sm:px-6">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
          Get in Touch
        </p>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 mb-10">
          Have a question about your reading or order? We&apos;re here to help.
        </p>

        <div className="bg-[#1A1A2E] border border-[#2A2A4A] rounded-2xl p-8 text-left space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
            <a
              href="mailto:support@unmyungtherapy.com"
              className="text-[#7C3AED] hover:underline text-lg"
            >
              support@unmyungtherapy.com
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Response Time</p>
            <p className="text-gray-300">Within 24 hours on business days</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Order Issues</p>
            <p className="text-gray-300 text-sm">
              If you haven&apos;t received your premium report within 24 hours, please email us with your order confirmation and we&apos;ll resolve it immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
