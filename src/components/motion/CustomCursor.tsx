"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import {
  CLICKABLE_SELECTOR,
  resolveCursorLabel,
} from "@/lib/cursor-labels";
import { useMounted } from "@/lib/use-mounted";

const HOVER_SCALE = 1.12;
const CLICK_SCALE = 0.88;

type CursorTone = "on-light" | "on-dark";

function parseCssColor(color: string) {
  const match = color.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/,
  );
  if (!match) return null;

  const alpha = match[4] === undefined ? 1 : Number(match[4]);
  if (alpha < 0.08) return null;

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: alpha,
  };
}

function relativeLuminance(r: number, g: number, b: number) {
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  );
}

function resolveCursorTone(element: Element | null): CursorTone {
  let current: Element | null = element;

  while (current) {
    const { backgroundColor } = getComputedStyle(current);
    const rgb = parseCssColor(backgroundColor);

    if (rgb) {
      return relativeLuminance(rgb.r, rgb.g, rgb.b) > 0.55
        ? "on-light"
        : "on-dark";
    }

    current = current.parentElement;
  }

  return "on-light";
}

function CursorPointer() {
  return (
    <svg
      className="custom-cursor__svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden
    >
      <path
        d="M3.5 2.5 L3.5 14.25 L7.75 10.75 L10.25 16.75 L12.25 15.75 L9.75 9.75 L15.25 9.75 Z"
        className="custom-cursor__shape"
      />
    </svg>
  );
}

export function CustomCursor() {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [tone, setTone] = useState<CursorTone>("on-light");
  const [label, setLabel] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasFinePointer || !hasHover) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      const target = document.elementFromPoint(event.clientX, event.clientY);
      const clickable = target?.closest(CLICKABLE_SELECTOR) ?? null;

      setHovering(Boolean(clickable));
      setLabel(clickable ? resolveCursorLabel(target) : null);
      setTone(resolveCursorTone(target));
      setVisible(true);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);
    const press = () => setClicking(true);
    const release = () => setClicking(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, [mounted, reducedMotion, cursorX, cursorY]);

  if (!mounted || reducedMotion || !enabled) return null;

  const pointerScale = clicking ? CLICK_SCALE : hovering ? HOVER_SCALE : 1;

  return (
    <motion.div
      aria-hidden
      className={`custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] custom-cursor--${tone}${hovering ? " custom-cursor--hover" : ""}`}
      style={{ x: cursorX, y: cursorY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      <div className="custom-cursor__inner">
        <motion.div
          className="custom-cursor__pointer"
          animate={{ scale: pointerScale }}
          transition={
            clicking
              ? { duration: 0.09, ease: [0.4, 0, 0.2, 1] }
              : {
                  type: "spring",
                  stiffness: 520,
                  damping: 16,
                  mass: 0.55,
                }
          }
        >
          <CursorPointer />
        </motion.div>

        <AnimatePresence mode="wait">
          {hovering && label ? (
            <motion.span
              key={label}
              className="custom-cursor__label"
              initial={{ opacity: 0, x: -6, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -4, scale: 0.96 }}
              transition={{
                duration: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
