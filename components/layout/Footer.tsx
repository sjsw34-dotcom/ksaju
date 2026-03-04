import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A4A] mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <span>© 2026 Sajumuse</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
        </div>
      </div>
      <div className="border-t border-[#2A2A4A] text-center text-xs text-gray-500 py-4 px-4 leading-relaxed">
        운명테라피 · 대표 김재관 · 경기도 화성시 경기대로 1014, 6층 603-120호 · 010.4539.1776
      </div>
    </footer>
  );
}
