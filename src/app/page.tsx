import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { DarkFeaturesSection } from "@/components/sections/DarkFeaturesSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import {
  HeroSection,
} from "@/components/sections/HeroSection";
import { HomeIntroSection } from "@/components/sections/HomeIntroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { StackedServicesSection } from "@/components/sections/StackedServicesSection";
import { ChairCTASection } from "@/components/sections/ChairCTASection";
import { HomeChairReveal } from "@/components/sections/HomeChairReveal";
import { faqs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <HomeIntroSection />

      <StackedServicesSection />

      <ImpactSection />

      <DarkFeaturesSection />

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <h2 className="heading-display mb-12 text-center text-3xl font-semibold sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={faqs.slice(0, 4)} />
          </div>
        </div>
      </section>

      <HomeChairReveal>
        <ChairCTASection />
      </HomeChairReveal>
    </>
  );
}
