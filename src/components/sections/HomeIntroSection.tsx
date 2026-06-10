"use client";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function HomeIntroSection() {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container-main">
        <ParallaxLayer speed={0.06}>
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
        </ParallaxLayer>
      </div>
    </section>
  );
}
