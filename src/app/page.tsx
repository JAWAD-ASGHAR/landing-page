import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";
import { DarkFeaturesSection } from "@/components/sections/DarkFeaturesSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import {
  HeroSection,
} from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { StackedServicesSection } from "@/components/sections/StackedServicesSection";
import { faqs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5">The Solution</p>
              <h2 className="heading-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                The Smarter Way to Support Your Medical Practice
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Running a medical practice in Australia means balancing patient
                care with endless admin, compliance, and operational demands. At
                Practice Pro Solutions, we take that weight off your shoulders —
                so you can focus on what matters most: your patients.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

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

      <CTASection
        title="Ready to simplify your practice operations?"
        description="Book a free consultation and explore how Practice Pro Solutions can support your clinic — from media and reception to bookkeeping, supplies, and practice transitions."
      />
    </>
  );
}
