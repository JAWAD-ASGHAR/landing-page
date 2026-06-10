"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, Asterisk } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { services } from "@/lib/content";

const STICKY_BASE = 72;
const STICKY_STEP = 14;
const SCALE_STEP = 0.03;
const Z_STEP = 48;
const BRIGHTNESS_STEP = 0.09;

function stickyTop(index: number) {
  return STICKY_BASE + index * STICKY_STEP;
}

function serviceTags(shortTitle: string) {
  return shortTitle
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/** Which card is currently in focus (sticky at its pin point). */
function getActiveCardIndex(cards: HTMLElement[]) {
  let active = 0;
  for (let i = 0; i < cards.length; i++) {
    const top = cards[i].getBoundingClientRect().top;
    if (top <= stickyTop(i) + 4) active = i;
  }
  return active;
}

function deckTransform(depth: number) {
  if (depth < 0) {
    const approach = Math.min(1, Math.abs(depth));
    return {
      scale: 0.96 + approach * 0.04,
      z: -30 + approach * 30,
      brightness: 0.88 + approach * 0.12,
    };
  }
  if (depth === 0) {
    return { scale: 1, z: 0, brightness: 1 };
  }
  return {
    scale: Math.max(0.82, 1 - depth * SCALE_STEP),
    z: -depth * Z_STEP,
    brightness: Math.max(0.62, 1 - depth * BRIGHTNESS_STEP),
  };
}

export function StackedServicesSection() {
  const reducedMotion = useReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !stackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = Array.from(
      stackRef.current.querySelectorAll<HTMLElement>("[data-stack-card]"),
    );
    const decks = cards.map(
      (card) => card.querySelector<HTMLElement>("[data-stack-deck]")!,
    );

    decks.forEach((deck) => {
      gsap.set(deck, {
        transformPerspective: 1500,
        force3D: true,
        transformOrigin: "50% 0%",
      });
    });

    const setters = decks.map((deck) => ({
      scale: gsap.quickSetter(deck, "scale"),
      z: gsap.quickSetter(deck, "z"),
      filter: gsap.quickSetter(deck, "filter"),
    }));

    const updateDeck = () => {
      const active = getActiveCardIndex(cards);

      cards.forEach((card, index) => {
        const depth = active - index;
        const { scale, z, brightness } = deckTransform(depth);

        setters[index].scale(scale);
        setters[index].z(z);
        setters[index].filter(`brightness(${brightness})`);

        decks[index].classList.toggle("stack-card-deck--front", depth === 0);
        card.style.pointerEvents = depth === 0 ? "auto" : "none";
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: stackRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: updateDeck,
    });

    updateDeck();
    ScrollTrigger.addEventListener("refreshInit", updateDeck);
    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      ScrollTrigger.removeEventListener("refreshInit", updateDeck);
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
                className="mx-auto overflow-hidden rounded-[2rem]"
                style={{
                  backgroundColor: service.stackColor,
                  width: "var(--stack-card-width)",
                }}
              >
                <div className="grid min-h-[20rem] gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_min(36%,14rem)]">
                  <StackedServiceContent service={service} />
                  <StackServiceImage
                    src={service.stackImage}
                    alt={service.stackImageLabel}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div ref={stackRef} className="stack-perspective overflow-visible pb-8">
            {services.map((service, index) => (
              <article
                key={service.id}
                data-stack-card
                className="stack-card"
                style={{
                  top: stickyTop(index),
                  zIndex: index + 1,
                }}
                aria-label={`${service.title} service`}
              >
                <div
                  data-stack-deck
                  className="stack-card-deck"
                  style={{ transformOrigin: "50% 0%" }}
                >
                  <div
                    className="stack-card-shell"
                    style={{ backgroundColor: service.stackColor }}
                    aria-hidden
                  />
                  <div className="stack-card-content grid h-full gap-6 px-6 py-8 sm:px-10 sm:py-9 lg:grid-cols-[1fr_min(38%,15rem)] lg:px-12 lg:py-10">
                    <StackedServiceContent service={service} />
                    <StackServiceImage
                    src={service.stackImage}
                    alt={service.stackImageLabel}
                  />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StackServiceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative min-h-[9rem] overflow-hidden rounded-xl border border-white/10 lg:min-h-0 lg:self-stretch">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 15rem, 40vw"
      />
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
      <div className="flex items-start justify-between gap-4">
        <h3 className="heading-display text-[clamp(1.625rem,3.2vw,2.625rem)] font-semibold leading-[1.05] text-white">
          {service.title}
        </h3>
        {service.comingSoon && (
          <span className="shrink-0 rounded-full border border-white/20 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/55">
            Coming Soon
          </span>
        )}
      </div>

      <div className="mt-auto pt-6 lg:pt-8">
        <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-white/45"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4">
          <p className="flex gap-2.5 text-sm leading-relaxed text-white/72">
            <Asterisk
              size={13}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-white/35"
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
