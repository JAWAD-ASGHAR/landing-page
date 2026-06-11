import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutFounderSection } from "@/components/sections/AboutFounderSection";
import { AboutServicesSection } from "@/components/sections/AboutServicesSection";
import { AboutValuesSection } from "@/components/sections/AboutValuesSection";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { HomeChairReveal } from "@/components/sections/HomeChairReveal";
import { HowItWorks, HowItWorksIntro } from "@/components/sections/HowItWorks";
import { PageHeroSection } from "@/components/sections/PageHeroSection";
import { ChairCTASection } from "@/components/sections/ChairCTASection";
import {
  aboutPage,
  faqs,
  testimonials,
} from "@/lib/content";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
} from "@/lib/seo";

const aboutDescription =
  "Learn about Practice Pro Solutions — supporting Australian healthcare since 2003. Meet founder Dr. Faisal Khan, MBBS, FRACGP, FAMAC.";

const aboutFaqs = faqs.slice(5);

export const metadata = createPageMetadata({
  title: "About Us",
  description: aboutDescription,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
          faqPageJsonLd(aboutFaqs),
        ]}
      />

      <PageHeroSection
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        titleAccent={aboutPage.titleAccent}
        description={aboutPage.description}
        highlights={aboutPage.highlights}
        tall
      />

      <section className="section-padding overflow-hidden bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5">Our Mission</p>
              <h2 className="heading-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                Patient care at the heart of what we do
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Running a medical practice comes with real challenges. Our services
                are designed to make your day easier — streamlining admin,
                protecting patient data, and improving communication — so your
                team can deliver the care your community depends on.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AboutServicesSection />

      <AboutFounderSection />

      <AboutValuesSection />

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

      <section className="section-padding overflow-hidden bg-dark text-white">
        <div className="container-main">
          <HowItWorksIntro />
          <div className="mt-16">
            <HowItWorks />
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="about-faq-heading"
        className="section-padding bg-white"
      >
        <div className="container-main">
          <ScrollReveal>
            <h2
              id="about-faq-heading"
              className="heading-display mb-12 text-center text-3xl font-semibold sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={aboutFaqs} />
          </div>
        </div>
      </section>

      <HomeChairReveal>
        <ChairCTASection />
      </HomeChairReveal>
    </>
  );
}
