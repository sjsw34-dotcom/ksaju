import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LiveOrderToast from "@/components/ui/LiveOrderToast";

const pretendard = localFont({
  src: "../public/fonts/Pretendard-1.3.9/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "K-Fortune — Saju Reading for Global GenZ",
  description: "Discover your destiny through Korean Saju astrology. Free mini reading + premium report crafted by master readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body className="bg-[#0A0A0F] text-white min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <LiveOrderToast />
      </body>
    </html>
  );
}
