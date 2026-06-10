"use client";

import { motion, useReducedMotion } from "framer-motion";

export function LoaderMark() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative flex h-28 w-28 items-center justify-center"
      style={{ perspective: 720 }}
    >
      {/* Ambient halo */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/[0.04] blur-2xl"
        animate={reducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outer orbit ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute h-full w-full"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.75"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="18 246"
        />
      </motion.svg>

      {/* Inner counter-orbit */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute h-[62%] w-[62%]"
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="64 200"
        />
      </motion.svg>

      {/* 3D diamond core */}
      <motion.div
        className="relative h-5 w-5"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reducedMotion
            ? undefined
            : { rotateX: [0, 360], rotateY: [0, 360] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute inset-0 rotate-45 border border-white/70" />
        <span
          className="absolute inset-0 rotate-45 border border-white/30"
          style={{ transform: "translateZ(8px)" }}
        />
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      </motion.div>

      {/* Orbiting speck */}
      {!reducedMotion && (
        <motion.div
          className="absolute h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-white/90" />
        </motion.div>
      )}
    </div>
  );
}
