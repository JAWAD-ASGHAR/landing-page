"use client";

import Image from "next/image";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { impactQuote, stats } from "@/lib/content";

export function ImpactSection() {
  const primaryStats = stats.slice(0, 2);

  return (
    <section className="section-padding-follow-stack bg-white">
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <p className="eyebrow mb-5">Our Impact</p>
            <h2 className="heading-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
              The Fastest Way To Achieve Practice Growth & Support
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Because results speak louder than introductions. At Practice Pro
              Solutions, we help Australian medical practices cut through
              complexity with smart, practical support — from Practice Media and
              bookkeeping to virtual reception and practice management.
            </p>
            <div className="mt-12 flex gap-12">
              {primaryStats.map((stat) => (
                <div key={stat.label}>
                  <p className="heading-display text-5xl font-semibold sm:text-6xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative">
              <div className="relative aspect-[4/5] min-h-[28rem] overflow-hidden">
                <Image
                  src="/Practice Growth.jpg"
                  alt="Healthcare professional preparing for patient care"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 max-w-[16rem] bg-dark p-6 sm:max-w-xs sm:p-8">
                <p className="quote-serif text-lg leading-snug text-white sm:text-xl">
                  &ldquo;{impactQuote}&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
