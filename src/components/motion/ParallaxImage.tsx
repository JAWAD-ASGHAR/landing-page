"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  label: string;
  className?: string;
  speed?: number;
};

export function ParallaxImage({
  label,
  className,
  speed = 0.15,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`],
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-2xl", className)}
    >
      <motion.div
        style={reducedMotion ? undefined : { y }}
        className="placeholder-skeleton absolute inset-0 min-h-full w-full"
      >
        [Image Placeholder: {label}]
      </motion.div>
    </div>
  );
}
