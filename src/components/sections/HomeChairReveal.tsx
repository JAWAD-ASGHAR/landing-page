"use client";

import { useReducedMotion } from "framer-motion";
import { useDeviceCapabilities } from "@/lib/use-device-capabilities";
import { cn } from "@/lib/utils";

export function HomeChairReveal({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { useHeavyMotion } = useDeviceCapabilities();

  return (
    <div
      className={cn(
        !reducedMotion && useHeavyMotion && "home-chair-reveal",
      )}
    >
      {children}
    </div>
  );
}
