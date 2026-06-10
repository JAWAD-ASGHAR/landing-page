"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useDeviceCapabilities } from "@/lib/use-device-capabilities";

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  /** Scroll shift strength. Negative values move opposite to scroll. */
  speed?: number;
};

function ParallaxLayerMotion({
  children,
  className,
  speed,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const magnitude = Math.abs(speed ?? 0.12);
  const sign = (speed ?? 0.12) < 0 ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-sign * magnitude * 100}%`, `${sign * magnitude * 100}%`],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.12,
}: ParallaxLayerProps) {
  const reducedMotion = useReducedMotion();
  const { useHeavyMotion } = useDeviceCapabilities();

  if (reducedMotion || !useHeavyMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ParallaxLayerMotion className={className} speed={speed}>
      {children}
    </ParallaxLayerMotion>
  );
}
