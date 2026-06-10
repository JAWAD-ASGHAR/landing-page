import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeChairReveal } from "@/components/sections/HomeChairReveal";
import { PageHeroSection } from "@/components/sections/PageHeroSection";
import { ChairCTASection } from "@/components/sections/ChairCTASection";
import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { services, testimonials, whatWeDoPage } from "@/lib/content";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  servicesItemListJsonLd,
} from "@/lib/seo";

const whatWeDoDescription =
  "Explore Practice Pro Solutions services — Practice Media, Virtual Receptionists, GP Sale & Purchase, Medical Consumables, Virtual Practice Management, and Accounting & Bookkeeping.";

export const metadata = createPageMetadata({
  title: "What We Do",
  description: whatWeDoDescription,
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "What We Do", path: "/what-we-do" },
          ]),
          servicesItemListJsonLd(),
        ]}
      />

      <PageHeroSection
        eyebrow={whatWeDoPage.eyebrow}
        title={whatWeDoPage.title}
        titleAccent={whatWeDoPage.titleAccent}
        description={whatWeDoPage.description}
        highlights={whatWeDoPage.highlights}
        tall
      />

      <section className="section-padding overflow-hidden bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5">Overview</p>
              <h2 className="heading-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                Comprehensive support for every stage of practice growth
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                From building your brand to managing daily operations, finances,
                and supplies — every service is designed to make your practice
                more efficient, compliant, and patient-focused.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceDetailSection key={service.id} service={service} index={index} />
      ))}

      <section className="section-padding overflow-hidden bg-[#e6e6ea]">
        <div className="container-main">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5">Testimonials</p>
              <h2 className="heading-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                What our clients say
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-12">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      <HomeChairReveal>
        <ChairCTASection />
      </HomeChairReveal>
    </>
  );
}
