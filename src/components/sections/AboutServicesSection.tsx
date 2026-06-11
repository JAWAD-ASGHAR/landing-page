"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { services } from "@/lib/content";

function serviceEyebrow(shortTitle: string) {
  return shortTitle.split("|")[0]?.trim() ?? shortTitle;
}

function ServiceGlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const setGlow = useCallback(
    (x: number, y: number, opacity: number) => {
      const card = cardRef.current;
      if (!card) return;

      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
      card.style.setProperty("--glow-opacity", String(opacity));
    },
    [],
  );

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setGlow(x, y, 1);
  };

  const handleLeave = () => {
    setGlow(50, 50, 0);
  };

  const handleEnter = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) {
      setGlow(50, 50, 0.35);
      return;
    }

    handleMove(event);
  };

  return (
    <div
      ref={cardRef}
      className={`service-glow-card${className ? ` ${className}` : ""}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="service-glow-card-shine" aria-hidden />
      <div className="service-glow-card-spotlight" aria-hidden />
      <div className="service-glow-card-content">{children}</div>
    </div>
  );
}

export function AboutServicesSection() {
  return (
    <section
      className="section-padding overflow-hidden bg-dark text-white"
      aria-labelledby="about-services-heading"
    >
      <div className="container-main">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/45">
              What We Offer
            </p>
            <h2
              id="about-services-heading"
              className="heading-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]"
            >
              Support across every stage of practice growth
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.06} className="h-full">
              <ServiceGlowCard className="h-full">
                <article className="flex h-full flex-col p-6 sm:p-7">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                    {serviceEyebrow(service.shortTitle)}
                  </p>
                  <h3 className="heading-display mt-3 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {service.description}
                  </p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2">
                    {service.details.benefits.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="relative pl-3.5 text-sm leading-relaxed text-white/45 before:absolute before:left-0 before:top-[0.55em] before:size-1 before:rounded-full before:bg-accent-blue"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/what-we-do#${service.id}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    Learn more
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </article>
              </ServiceGlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
