import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { FloatingCTABar } from "@/components/sections/FloatingCTABar";
import { HomeChairReveal } from "@/components/sections/HomeChairReveal";
import { PageHeroSection } from "@/components/sections/PageHeroSection";
import { ChairCTASection } from "@/components/sections/ChairCTASection";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { WhatWeDoTimelineSection } from "@/components/sections/WhatWeDoTimelineSection";
import { testimonials, whatWeDoPage } from "@/lib/content";
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

      <WhatWeDoTimelineSection />

      <FloatingCTABar />

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
