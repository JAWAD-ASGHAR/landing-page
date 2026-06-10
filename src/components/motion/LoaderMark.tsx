"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import loadingAnimation from "@/assets/loading-animation.json";
import { useDeviceCapabilities } from "@/lib/use-device-capabilities";

function StaticLoaderMark() {
  return (
    <div
      className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
      aria-hidden
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
    </div>
  );
}

export function LoaderMark() {
  const reducedMotion = useReducedMotion();
  const { isMobile } = useDeviceCapabilities();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (reducedMotion || isMobile) {
      lottieRef.current?.goToAndStop(0, true);
    }
  }, [isMobile, reducedMotion]);

  if (reducedMotion || isMobile) {
    return <StaticLoaderMark />;
  }

  return (
    <div className="relative w-[min(22rem,88vw)] max-w-md">
      <Lottie
        lottieRef={lottieRef}
        animationData={loadingAnimation}
        loop
        autoplay
        aria-hidden
        className="h-auto w-full"
      />
    </div>
  );
}
