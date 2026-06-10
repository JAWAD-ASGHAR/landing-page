"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Asterisk } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

const STICKY_BASE = 88;
const STICKY_STEP = 20;

function serviceTags(shortTitle: string) {
  return shortTitle
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function StackedServicesSection() {
  const reducedMotion = useReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = stackRef.current?.querySelectorAll<HTMLElement>("[data-stack-card]");
    if (!cards?.length) return;

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, index) => {
      const shell = card.querySelector<HTMLElement>("[data-stack-shell]");
      const nextCard = cards[index + 1];
      if (!shell || !nextCard) return;

      const nextStickyTop = STICKY_BASE + (index + 1) * STICKY_STEP;

      const tween = gsap.fromTo(
        shell,
        { filter: "brightness(1)" },
        {
          filter: "brightness(0.82)",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: `top top+=${nextStickyTop}`,
            scrub: 0.45,
          },
        },
      );

      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  return (
    <section className="stack-section bg-white pt-8">
      <div className="container-main">
        <div className="mb-14 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <ScrollReveal>
            <p className="eyebrow mb-4">Our Services</p>
            <h2 className="heading-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
              Our Specialized Solutions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent-blue"
            >
              View All Solutions
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>

        {reducedMotion ? (
          <div className="space-y-6 pb-24">
            {services.map((service) => (
              <article
                key={service.id}
                className="overflow-hidden rounded-[2rem]"
                style={{ backgroundColor: service.stackColor }}
              >
                <div className="grid min-h-[24rem] gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_min(36%,20rem)]">
                  <StackedServiceContent service={service} />
                  <StackServiceImage label={service.stackImageLabel} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div ref={stackRef} className="overflow-visible pb-8">
            {services.map((service, index) => (
              <article
                key={service.id}
                data-stack-card
                className={cn("stack-card mx-auto w-full max-w-[80rem]")}
                style={{
                  top: STICKY_BASE + index * STICKY_STEP,
                  zIndex: index + 1,
                }}
                aria-label={`${service.title} service`}
              >
                <div
                  data-stack-shell
                  className="stack-card-shell"
                  style={{ backgroundColor: service.stackColor }}
                  aria-hidden
                />
                <div className="stack-card-content grid h-full gap-8 px-8 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1fr_min(36%,22rem)] lg:px-14 lg:py-12">
                  <StackedServiceContent service={service} />
                  <StackServiceImage label={service.stackImageLabel} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StackServiceImage({ label }: { label: string }) {
  return (
    <div
      className="placeholder-skeleton min-h-[12rem] rounded-2xl border-white/10 lg:min-h-0 lg:self-stretch"
      role="img"
      aria-label={label}
    >
      [Image Placeholder: {label}]
    </div>
  );
}

function StackedServiceContent({
  service,
}: {
  service: (typeof services)[number];
}) {
  const tags = serviceTags(service.shortTitle);

  return (
    <div className="flex min-h-0 flex-col justify-between">
      <div className="flex items-start justify-between gap-6">
        <h3 className="heading-display max-w-4xl text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] text-white">
          {service.title}
        </h3>
        {service.comingSoon && (
          <span className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/55">
            Coming Soon
          </span>
        )}
      </div>

      <div className="mt-auto pt-10 lg:pt-16">
        <ul className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/45"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6">
          <p className="flex max-w-2xl gap-3 text-sm leading-relaxed text-white/72 sm:text-base">
            <Asterisk
              size={14}
              strokeWidth={1.5}
              className="mt-1 shrink-0 text-white/35"
              aria-hidden
            />
            <span>{service.description}</span>
          </p>

          <Link
            href={`/what-we-do#${service.id}`}
            className="inline-flex w-fit items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-white"
          >
            Learn More
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
