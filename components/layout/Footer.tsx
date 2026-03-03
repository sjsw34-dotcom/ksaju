import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A4A] mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <span>© 2025 Unmyung Therapy</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
