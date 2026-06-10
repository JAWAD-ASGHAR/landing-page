"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

import { HERO_VIDEOS, HERO_POSTER } from "@/lib/hero-videos";
const CROSSFADE_MS = 9000;
const FADE_DURATION_MS = 1800;

type HeroVideoProps = {
  className?: string;
};

export function HeroVideo({ className }: HeroVideoProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_VIDEOS.length);
    }, CROSSFADE_MS);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        void video.play().catch(() => undefined);
      }
    });
  }, [activeIndex, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={cn("absolute inset-0", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden>
      {HERO_VIDEOS.map((src, index) => (
        <video
          key={src}
          ref={(element) => {
            videoRefs.current[index] = element;
          }}
          src={src}
          poster={HERO_POSTER}
          autoPlay={index === 0}
          muted
          loop
          playsInline
          preload="auto"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
        />
      ))}
    </div>
  );
}
