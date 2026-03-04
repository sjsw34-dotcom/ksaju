import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LiveOrderToast from "@/components/ui/LiveOrderToast";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const pretendard = localFont({
  src: "../public/fonts/Pretendard-1.3.9/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com"
  ),
  title: "Sajumuse | Saju Reading for Global GenZ",
  description:
    "Discover your destiny through Korean Saju astrology. Free mini reading + premium report crafted by master readers.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable} style={{ colorScheme: "only dark" }}>
      <head>
        <meta name="color-scheme" content="only dark" />
        <meta name="darkreader-lock" />
      </head>
      <body className="bg-[#0A0A0F] text-white min-h-screen flex flex-col antialiased">
        <GoogleAnalytics />
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
