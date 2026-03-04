import { Suspense } from "react";
import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import WhatIsSaju from "@/components/sections/WhatIsSaju";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Sajumuse | Korean Saju Reading for Global GenZ",
  description:
    "Discover your destiny through ancient Korean Saju astrology. Free mini reading + premium 60-page report by a certified master with 15+ years of experience.",
  openGraph: {
    title: "Sajumuse | Korean Saju Reading for Global GenZ",
    description:
      "Discover your destiny through ancient Korean Saju astrology. Free mini reading + premium 60-page report by a certified master.",
    type: "website",
    url: "/",
    images: [{ url: "/api/og?title=Discover+Your+Destiny+Through+Ancient+Korean+Wisdom", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajumuse | Korean Saju Reading for Global GenZ",
    description:
      "Discover your destiny through ancient Korean Saju astrology. Free mini reading + premium report by a certified master.",
    images: ["/api/og?title=Discover+Your+Destiny+Through+Ancient+Korean+Wisdom"],
  },
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sajumuse",
  url: BASE_URL,
  logo: `${BASE_URL}/api/og?title=Sajumuse`,
  description:
    "Korean Saju (Four Pillars) astrology reading service by a certified master with 15+ years of experience.",
  sameAs: [],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly is Saju?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saju (\uC0AC\uC8FC) means 'Four Pillars' in Korean. It's a traditional destiny analysis system that uses your birth year, month, day, and hour to map the cosmic energies present at your exact moment of birth. Unlike Western astrology which focuses primarily on your birth month, Saju creates a unique chart from all four time pillars -- making it deeply personal to you.",
      },
    },
    {
      "@type": "Question",
      name: "How is Sajumuse different from other online Saju sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most online Saju services generate reports automatically using algorithms. At Sajumuse, every Premium Report is personally analyzed by a certified Saju master with 15+ years of experience and credentials in both Myeongri Psychology and Family Psychology. This means your reading captures nuances that automated systems miss. It's also why our reports reach 60+ pages.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is a Saju reading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saju has been refined over centuries using the Manseryeok, Korea's astronomical calendar system. While no system can predict the future with certainty, Saju provides remarkably detailed insights into personality patterns, relationship dynamics, career timing, and life cycles.",
      },
    },
    {
      "@type": "Question",
      name: "What information do I need to provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll need your birth date (year, month, day), birth time (as exact as possible), and gender. If you don't know your exact birth time, we can still provide a reading based on your date alone -- though having the time makes the analysis significantly more detailed.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the Premium Report take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Premium Reports are delivered within 48 hours. Because each report is personally analyzed -- not auto-generated -- we take the time to thoroughly examine every aspect of your chart. The result is a 60+ page PDF covering personality, career, love, wealth, health, and your 10-year fortune cycle.",
      },
    },
    {
      "@type": "Question",
      name: "Can I ask personal questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Premium Report includes 3 personal questions. You can ask about career timing, relationship compatibility, health, or anything else you'd like deeper insight on.",
      },
    },
    {
      "@type": "Question",
      name: "Is Saju the same as Chinese BaZi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They share the same historical origin, but Korean masters have developed distinct interpretation methods refined over 500+ years. Korean Saju places particular emphasis on psychological patterns, relationship dynamics, and practical life guidance -- making it especially relevant for modern decisions.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionWrapper>
        <Hero />
      </SectionWrapper>
      <SectionWrapper>
        <PainPoints />
      </SectionWrapper>
      <SectionWrapper>
        <WhatIsSaju />
      </SectionWrapper>
      <SectionWrapper>
        <HowItWorks />
      </SectionWrapper>
      <SectionWrapper>
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper id="pricing">
        <Pricing />
      </SectionWrapper>
      <Suspense fallback={null}>
        <SectionWrapper>
          <BlogPreview />
        </SectionWrapper>
      </Suspense>
      <SectionWrapper>
        <FAQ />
      </SectionWrapper>
      <SectionWrapper>
        <FinalCTA />
      </SectionWrapper>
    </>
  );
}
