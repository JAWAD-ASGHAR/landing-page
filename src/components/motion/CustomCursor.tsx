"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useMounted } from "@/lib/use-mounted";

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], summary, .cursor-pointer, [data-cursor-hover]';

const BASE_SIZE = 30;
const HOVER_SCALE = 1.18;
const CLICK_SCALE = 0.82;

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

export function CustomCursor() {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [tone, setTone] = useState<CursorTone>("on-light");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { damping: 28, stiffness: 420, mass: 0.45 });
  const y = useSpring(cursorY, { damping: 28, stiffness: 420, mass: 0.45 });

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
      setHovering(Boolean(target?.closest(CLICKABLE_SELECTOR)));
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

  const targetScale = clicking
    ? CLICK_SCALE
    : hovering
      ? HOVER_SCALE
      : 1;

  return (
    <motion.div
      aria-hidden
      className={`custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] custom-cursor--${tone}`}
      style={{
        x,
        y,
        width: BASE_SIZE,
        height: BASE_SIZE,
        marginLeft: -BASE_SIZE / 2,
        marginTop: -BASE_SIZE / 2,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: targetScale,
      }}
      transition={
        clicking
          ? { scale: { duration: 0.09, ease: [0.4, 0, 0.2, 1] } }
          : {
              scale: {
                type: "spring",
                stiffness: 520,
                damping: 16,
                mass: 0.55,
              },
              opacity: { duration: 0.15 },
            }
      }
    >
      <span className="custom-cursor__ring" />
    </motion.div>
  );
}
