"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";
import { preloadHeroContent } from "@/lib/hero-videos";
import { LoaderMark } from "@/components/motion/LoaderMark";
import { useDeviceCapabilities } from "@/lib/use-device-capabilities";

type Phase = "loading" | "exit" | "done";

const EXIT_MS = 1150;
const MOBILE_EXIT_MS = 350;

export function SiteLoader({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { useHeavyMotion } = useDeviceCapabilities();
  const [phase, setPhase] = useState<Phase>("loading");
  const simpleLoader = reducedMotion || !useHeavyMotion;

  useEffect(() => {
    let cancelled = false;

    preloadHeroContent().then(() => {
      if (!cancelled) setPhase("exit");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;

    const timer = window.setTimeout(
      () => setPhase("done"),
      simpleLoader ? MOBILE_EXIT_MS : EXIT_MS,
    );

    return () => window.clearTimeout(timer);
  }, [phase, simpleLoader]);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const isExiting = phase === "exit";

  const sheetTransition = simpleLoader
    ? { duration: 0.3, ease: "easeOut" as const }
    : { duration: 1.05, ease: [0.76, 0, 0.24, 1] as const };

  const wingTransition = simpleLoader
    ? { duration: 0.3, ease: "easeOut" as const }
    : { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      {children}

      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            key="site-loader"
            className="fixed inset-0 z-[200] overflow-hidden"
            style={simpleLoader ? undefined : { perspective: 1400 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden={phase === "exit"}
            aria-live="polite"
            aria-busy={phase === "loading"}
          >
            {simpleLoader ? (
              <motion.div
                className="absolute inset-0 z-10 bg-[#080808]"
                animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                transition={sheetTransition}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[22vw] max-w-[280px] origin-left bg-gradient-to-r from-[#121212] via-[#0c0c0c] to-transparent"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={
                    isExiting
                      ? {
                          rotateY: -32,
                          x: "-8%",
                          scale: 1.18,
                          opacity: 0,
                        }
                      : { rotateY: 0, x: 0, scale: 1, opacity: 1 }
                  }
                  transition={{ ...wingTransition, delay: 0.04 }}
                />

                <motion.div
                  className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[22vw] max-w-[280px] origin-right bg-gradient-to-l from-[#121212] via-[#0c0c0c] to-transparent"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={
                    isExiting
                      ? {
                          rotateY: 32,
                          x: "8%",
                          scale: 1.18,
                          opacity: 0,
                        }
                      : { rotateY: 0, x: 0, scale: 1, opacity: 1 }
                  }
                  transition={{ ...wingTransition, delay: 0.04 }}
                />

                <motion.div
                  className="absolute inset-0 z-10 bg-[#080808]"
                  style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
                  animate={
                    isExiting
                      ? {
                          y: "-108%",
                          rotateX: -14,
                          scale: 1.06,
                          opacity: 1,
                        }
                      : { y: 0, rotateX: 0, scale: 1, opacity: 1 }
                  }
                  transition={sheetTransition}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
                </motion.div>
              </>
            )}

            <motion.div
              className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-8"
              animate={
                isExiting
                  ? {
                      opacity: 0,
                      scale: simpleLoader ? 1 : 0.94,
                      y: simpleLoader ? 0 : -24,
                    }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: simpleLoader ? 0.25 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoaderMark />
              <p className="nav-link text-white/35">{site.name}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
