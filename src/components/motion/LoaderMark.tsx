"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import loadingAnimation from "@/assets/loading-animation.json";

function StaticLoaderMark() {
  return (
    <div
      className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
      aria-hidden
    >
      <span className="h-8 w-8 rounded-full border-2 border-white/20 border-t-white/70" />
    </div>
  );
}

type LoaderMarkProps = {
  forceStatic?: boolean;
};

export function LoaderMark({ forceStatic = false }: LoaderMarkProps) {
  const reducedMotion = useReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const useStatic = forceStatic || reducedMotion;

  useEffect(() => {
    if (useStatic) {
      lottieRef.current?.goToAndStop(0, true);
    }
  }, [useStatic]);

  if (useStatic) {
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
