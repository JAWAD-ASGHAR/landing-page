import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { services, testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Explore Practice Pro Solutions services — Practice Media, Virtual Receptionists, GP Sale & Purchase, Medical Consumables, Virtual Practice Management, and Accounting & Bookkeeping.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <section className="section-padding overflow-hidden bg-white">
        <div className="container-main">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <p className="eyebrow mb-5">What We Do</p>
              <h1 className="heading-display text-4xl font-semibold text-foreground sm:text-5xl lg:text-[3.25rem]">
                We Run All Kinds Of Services From Technologies
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Supporting General Practices Across Australia with tailored
                solutions that ease the administrative burden and let doctors
                focus on what matters most — their patients.
              </p>
              <div className="mt-8">
                <Button href="/contact">Book Consultation</Button>
              </div>
            </ScrollReveal>
            <ParallaxImage
              label="Australian medical practice team at work"
              className="aspect-[4/3] min-h-[20rem]"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-main">
          <SectionHeading
            eyebrow="Overview"
            title="Comprehensive Support for Every Stage of Practice Growth"
            description="From building your brand to managing daily operations, finances, and supplies — every service is designed to make your practice more efficient, compliant, and patient-focused."
            align="center"
            className="mx-auto"
          />
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceDetailSection key={service.id} service={service} index={index} />
      ))}

      <section className="section-padding bg-muted/50">
        <div className="container-main">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Clients Say"
            align="center"
            className="mx-auto mb-12"
          />
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <CTASection
        title="Let's find the right support for your practice"
        description="Book a free consultation to explore any of our services — media, bookkeeping, reception, management, or medical supplies."
      />
    </>
  );
}
