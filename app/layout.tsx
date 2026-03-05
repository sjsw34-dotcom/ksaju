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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sajumuse - Korean Saju Astrology & Four Pillars Reading",
    template: "%s | Sajumuse",
  },
  description:
    "Discover your destiny through Korean Saju (Four Pillars of Destiny) astrology. Free mini reading + premium report crafted by master readers.",
  applicationName: "Sajumuse",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Sajumuse",
    title: "Sajumuse - Korean Saju Astrology & Four Pillars Reading",
    description:
      "Discover your destiny through Korean Saju astrology. Free mini reading + premium report crafted by master readers.",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/api/og?title=Sajumuse%20-%20Korean%20Saju%20Reading&category=default`,
        width: 1200,
        height: 630,
        alt: "Sajumuse - Korean Saju Astrology",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajumuse - Korean Saju Astrology & Four Pillars Reading",
    description:
      "Discover your destiny through Korean Saju astrology. Free mini reading + premium report.",
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

// Structured data for Google Search: site name, logo, search box
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sajumuse",
  alternateName: ["SajuMuse", "Saju Muse"],
  url: BASE_URL,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sajumuse",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo-512.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/logo-512.png`,
  sameAs: [],
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
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
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
