"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FloatingCTABarProps = {
  message?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function FloatingCTABar({
  message = "Need more info?",
  buttonLabel = "Book a Consultation",
  buttonHref = "/contact",
}: FloatingCTABarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.45);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "floating-cta-bar pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-500 ease-out sm:px-6 sm:pb-6",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-full border border-border/80 bg-white/95 px-5 py-3 shadow-[0_8px_32px_rgba(10,10,10,0.12)] backdrop-blur-md sm:px-6 sm:py-3.5">
        <p className="text-sm font-medium text-foreground sm:text-[0.9375rem]">
          {message}
        </p>
        <Button
          href={buttonHref}
          className="shrink-0 rounded-full px-5 py-2.5 sm:px-6"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
