"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { isMobileDevice } from "@/lib/device-capabilities";
import { services } from "@/lib/content";
import { useSiteLoaderReady } from "@/lib/site-loader-ready";
import { useDeviceCapabilities } from "@/lib/use-device-capabilities";
import { useMounted } from "@/lib/use-mounted";

const STICKY_BASE = 72;
const STICKY_STEP = 14;
const SCALE_STEP = 0.03;
const Z_STEP = 48;
const BRIGHTNESS_STEP = 0.09;
const MOBILE_VIDEO_DELAY_MS = 500;
const MOBILE_GSAP_DELAY_MS = MOBILE_VIDEO_DELAY_MS * 2;

function stickyTop(index: number) {
  return STICKY_BASE + index * STICKY_STEP;
}

function serviceTags(shortTitle: string) {
  return shortTitle
    .split("|")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getActiveCardIndex(cards: HTMLElement[]) {
  let active = 0;
  for (let i = 0; i < cards.length; i++) {
    const top = cards[i].getBoundingClientRect().top;
    if (top <= stickyTop(i) + 4) active = i;
  }
  return active;
}

const BRIGHTNESS_MIN = 0.62;
const BRIGHTNESS_MAX = 1;
const OPACITY_MIN = 0.5;
const OPACITY_MAX = 1;

function brightnessToOpacity(brightness: number) {
  const t =
    (brightness - BRIGHTNESS_MIN) / (BRIGHTNESS_MAX - BRIGHTNESS_MIN);
  return OPACITY_MIN + t * (OPACITY_MAX - OPACITY_MIN);
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

type Service = (typeof services)[number];

export function StackedServicesSection() {
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const siteLoaderReady = useSiteLoaderReady();
  const { isMobile } = useDeviceCapabilities();
  const [gsapAllowed, setGsapAllowed] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setGsapAllowed(true);
      return;
    }

    if (!siteLoaderReady) {
      setGsapAllowed(false);
      return;
    }

    const timer = window.setTimeout(
      () => setGsapAllowed(true),
      MOBILE_GSAP_DELAY_MS,
    );

    return () => window.clearTimeout(timer);
  }, [siteLoaderReady, isMobile]);

  const staticStack =
    !mounted || reducedMotion || (isMobile && !gsapAllowed);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (staticStack || !stackRef.current) return;

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

    const isMobileGsap = isMobileDevice();

    const setters = decks.map((deck) => ({
      scale: gsap.quickSetter(deck, "scale"),
      z: gsap.quickSetter(deck, "z"),
      filter: isMobileGsap ? null : gsap.quickSetter(deck, "filter"),
      opacity: isMobileGsap ? gsap.quickSetter(deck, "opacity") : null,
    }));

    let scrollIdleTimer: number | undefined;

    const setWillChange = (value: "transform" | "auto") => {
      decks.forEach((deck) => {
        deck.style.willChange = value;
      });
    };

    const updateDeck = () => {
      setWillChange("transform");

      const active = getActiveCardIndex(cards);

      cards.forEach((card, index) => {
        const depth = active - index;
        const { scale, z, brightness } = deckTransform(depth);

        setters[index].scale(scale);
        setters[index].z(z);

        if (isMobileGsap) {
          setters[index].opacity!(brightnessToOpacity(brightness));
        } else {
          setters[index].filter!(`brightness(${brightness})`);
        }

        decks[index].classList.toggle("stack-card-deck--front", depth === 0);
        card.style.pointerEvents = depth === 0 ? "auto" : "none";
      });

      if (scrollIdleTimer) window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => setWillChange("auto"), 150);
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

    const images = stackRef.current.querySelectorAll("img");
    const refreshLayout = () => ScrollTrigger.refresh();
    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", refreshLayout, { once: true });
      }
    });
    window.addEventListener("orientationchange", refreshLayout);

    return () => {
      if (scrollIdleTimer) window.clearTimeout(scrollIdleTimer);
      setWillChange("auto");
      trigger.kill();
      ScrollTrigger.removeEventListener("refreshInit", updateDeck);
      window.removeEventListener("orientationchange", refreshLayout);
    };
  }, [staticStack]);

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

        {staticStack ? (
          <div className="space-y-6 pb-12">
            {services.map((service) => (
              <article
                key={service.id}
                className="mx-auto min-h-[min(var(--stack-card-height),var(--stack-card-max-height))] overflow-hidden rounded-[2rem]"
                style={{
                  backgroundColor: service.stackColor,
                  width: "var(--stack-card-width)",
                }}
              >
                <StackedServiceCardBody service={service} />
              </article>
            ))}
          </div>
        ) : (
          <div ref={stackRef} className="stack-perspective overflow-visible">
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
                  <StackedServiceCardBody service={service} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StackedServiceCardBody({ service }: { service: Service }) {
  const tags = serviceTags(service.shortTitle);
  const highlights = service.details.benefits.slice(0, 2);

  return (
    <div className="stack-card-content grid h-full grid-rows-[auto_14rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-1">
      <div className="flex h-full flex-col justify-between px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9 xl:px-12">
        <div className="flex flex-col gap-5 lg:gap-6">
          <h3 className="heading-display text-[clamp(1.625rem,3.2vw,2.625rem)] font-semibold leading-[1.05] text-white">
            {service.title}
          </h3>

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white/70"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-3">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-white/80">
              {service.description}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              {service.details.intro}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:gap-6">
          <ul className="space-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-snug text-white/70"
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/45"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={`/what-we-do#${service.id}`}
            className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111] transition-colors hover:bg-white/90"
          >
            Learn More
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <div className="relative min-h-0 overflow-hidden lg:h-full">
        <Image
          src={service.stackImage}
          alt={service.stackImageLabel}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent lg:from-black/45 lg:via-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/20 lg:via-transparent lg:to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
