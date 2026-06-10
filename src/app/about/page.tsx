import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import {
  aboutValues,
  faqs,
  founder,
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
      <section className="section-padding bg-white">
        <div className="container-main">
          <ScrollReveal>
            <p className="eyebrow mb-5">About Us</p>
            <h1 className="heading-display max-w-4xl text-4xl font-semibold text-foreground sm:text-5xl lg:text-[3.25rem]">
              Supporting Australian Healthcare Since 2003
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              At Practice Pro Solutions, we&apos;re dedicated to helping medical
              practices run smarter, smoother, and more sustainably. For over 23
              years, we&apos;ve partnered with GPs, clinics, and healthcare
              providers across Australia to deliver tailored solutions that ease
              the administrative burden and let doctors focus on what matters
              most — their patients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main">
          <SectionHeading
            eyebrow="Our Services"
            title="Support Across Every Stage of Practice Growth"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Get seamless patient support through our Virtual Receptionists",
              "Simplify daily operations with Virtual Practice Management",
              "Stay financially secure with Accounting & Bookkeeping",
              "Confident ownership with GP Sale & Purchase",
              "Affordable supplies with Medical E-commerce",
              "Build and grow your brand with Practice Media",
            ].map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.06}>
                <li className="flex items-start gap-3 rounded-xl border border-border bg-white p-5 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue-light text-xs font-semibold text-accent-blue">
                    ✓
                  </span>
                  {item}
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal direction="left">
              <ImagePlaceholder
                label="Dr. Faisal Khan — Founder portrait"
                aspectRatio="aspect-[4/5]"
              />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <p className="eyebrow mb-4">Founder & GP Specialist</p>
              <h2 className="heading-display text-3xl font-semibold text-foreground sm:text-4xl">
                {founder.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-accent-blue">
                {founder.credentials}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{founder.title}</p>
              <blockquote className="quote-serif mt-8 border-l-2 border-dark pl-6 text-2xl leading-snug text-foreground">
                &ldquo;{founder.quote}&rdquo;
              </blockquote>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {founder.bio}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {founder.extendedBio}
              </p>
              <div className="mt-8">
                <Button href="/contact">Book a Free Consultation</Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main">
          <SectionHeading
            eyebrow="Values & Mission"
            title="Patient Care at the Heart of What We Do"
            description="Running a medical practice comes with challenges. Our services are designed to make your day easier — streamlining admin, protecting patient data, and improving communication."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutValues.map((value, index) => (
              <ScrollReveal key={value} delay={index * 0.05}>
                <div className="rounded-xl border border-border bg-white p-5 text-sm text-muted-foreground">
                  {value}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
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

      <section className="section-padding bg-surface">
        <div className="container-main">
          <SectionHeading
            eyebrow="Process"
            title="We Follow Simple Steps To Deliver Effective Solutions"
            description="Each step is designed to ensure your operations run smoothly while keeping patient care front and centre."
            align="center"
            className="mx-auto mb-14"
          />
          <HowItWorks />
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="about-faq-heading"
        className="section-padding"
      >
        <div className="container-main">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            align="center"
            className="mx-auto mb-12"
            titleId="about-faq-heading"
          />
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={aboutFaqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Partner with a team that understands general practice"
        description="Since 2003, we've helped Australian GPs streamline operations across six core service areas. Let's talk about your practice."
      />
    </>
  );
}
