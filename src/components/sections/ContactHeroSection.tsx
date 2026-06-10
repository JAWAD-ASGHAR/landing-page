"use client";

import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { contactPage } from "@/lib/content";

export function ContactHeroSection() {
  return (
    <section className="page-hero relative -mt-[4.5rem] min-h-[min(88vh,46rem)] overflow-hidden bg-dark text-white">
      <div className="absolute inset-0">
        <ParallaxImage
          src="/contact/phone.jpg"
          alt=""
          className="h-full min-h-full"
          imageClassName="object-cover"
          speed={0.08}
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/35"
          aria-hidden
        />
      </div>

      <div className="container-main relative z-10 flex min-h-[min(88vh,46rem)] flex-col justify-end pb-16 pt-[calc(4.5rem+7rem)] sm:pb-20 sm:pt-[calc(4.5rem+8rem)]">
        <ParallaxLayer speed={0.04}>
          <ScrollReveal>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/60">
              {contactPage.eyebrow}
            </p>
            <h1 className="heading-display max-w-4xl text-[clamp(2.75rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {contactPage.title}
              <span className="quote-serif mt-2 block text-[0.92em] font-normal italic text-white/90">
                {contactPage.titleAccent}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {contactPage.description}
            </p>
          </ScrollReveal>
        </ParallaxLayer>

        <ScrollReveal delay={0.12}>
          <dl className="mt-12 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3 sm:gap-8">
            {contactPage.highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/45">
                  {item.label}
                </dt>
                <dd className="heading-display mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
