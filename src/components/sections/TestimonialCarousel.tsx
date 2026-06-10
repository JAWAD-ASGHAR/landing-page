"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: readonly Testimonial[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <ScrollReveal>
      <div className="relative">
        <div className="overflow-hidden border border-border bg-white" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="min-w-0 flex-[0_0_100%] px-8 py-12 sm:px-14 sm:py-16"
              >
                <Quote
                  className="mb-6 text-accent-blue/30"
                  size={36}
                  strokeWidth={1.5}
                />
                <blockquote className="heading-display max-w-3xl text-2xl font-medium leading-snug text-foreground sm:text-3xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className="mt-8">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
                </footer>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-all hover:border-accent-blue hover:text-accent-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-all hover:border-accent-blue hover:text-accent-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}
