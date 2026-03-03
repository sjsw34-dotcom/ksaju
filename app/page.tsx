import SectionWrapper from "@/components/ui/SectionWrapper";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import WhatIsSaju from "@/components/sections/WhatIsSaju";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
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
      <SectionWrapper id="pricing">
        <Pricing />
      </SectionWrapper>
      <SectionWrapper>
        <FAQ />
      </SectionWrapper>
      <SectionWrapper>
        <FinalCTA />
      </SectionWrapper>
    </>
  );
}
