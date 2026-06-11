"use client";

import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  const reducedMotion = useReducedMotion();
  const useReveal = isHome && !reducedMotion;

  return (
    <>
      <ScrollToTop />
      <Header placement="site" />
      <main
        className={cn(
          "min-h-0 flex-1 overflow-visible",
          !isHome && "pt-[4.5rem]",
          useReveal && "home-main-reveal",
        )}
      >
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}
