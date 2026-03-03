import { Suspense } from "react";
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

export default function Home() {
  return (
    <>
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
