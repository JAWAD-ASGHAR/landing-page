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
  findClickableUnderCursor,
  resolveCursorLabel,
} from "@/lib/cursor-labels";
import { useMounted } from "@/lib/use-mounted";

const RING_SIZE = 36;
const LABEL_SIDE_GAP = 10;
const LABEL_OFFSET = RING_SIZE / 2 + LABEL_SIDE_GAP;
const LABEL_EDGE_BUFFER = 16;

const HOVER_SCALE = 1.22;
const CLICK_SCALE = 0.8;

const SPRING_RING = { type: "spring" as const, stiffness: 480, damping: 22, mass: 0.62 };
const SPRING_LABEL = { type: "spring" as const, stiffness: 420, damping: 26, mass: 0.55 };

const MEASURE_CLASS = "custom-cursor__label-measure";

type CursorTone = "on-light" | "on-dark";
type LabelPlacement = "left" | "right";

function getRingRadius(isHovering: boolean) {
  return (RING_SIZE * (isHovering ? HOVER_SCALE : 1)) / 2;
}

function resolveLabelPlacement(
  clientX: number,
  labelWidth: number,
  isHovering: boolean,
): LabelPlacement {
  const ringHalf = getRingRadius(isHovering);
  const needed = ringHalf + LABEL_SIDE_GAP + labelWidth + LABEL_EDGE_BUFFER;
  const fitsRight = window.innerWidth - clientX >= needed;
  const fitsLeft = clientX >= needed;

  if (fitsRight) return "right";
  if (fitsLeft) return "left";
  return window.innerWidth - clientX >= clientX ? "right" : "left";
}

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
  const [label, setLabel] = useState<string | null>(null);
  const [labelPlacement, setLabelPlacement] = useState<LabelPlacement>("right");
  const [rippleKey, setRippleKey] = useState(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasFinePointer || !hasHover) return;

    const measureEl = document.createElement("span");
    measureEl.className = MEASURE_CLASS;
    measureEl.setAttribute("aria-hidden", "true");
    measureEl.hidden = true;
    document.body.appendChild(measureEl);

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    let activeLabel: string | null = null;

    const measureLabelWidth = (text: string) => {
      measureEl.hidden = false;
      measureEl.textContent = text;
      const width = measureEl.getBoundingClientRect().width;
      measureEl.hidden = true;
      measureEl.textContent = "";
      return width;
    };

    const updateFromPointer = (clientX: number, clientY: number) => {
      const radius = getRingRadius(true);
      const clickable = findClickableUnderCursor(clientX, clientY, radius);
      const pointerTarget =
        clickable ?? document.elementFromPoint(clientX, clientY);
      const nextLabel = clickable ? resolveCursorLabel(pointerTarget) : null;

      activeLabel = nextLabel;
      setHovering(Boolean(clickable));
      setLabel(nextLabel);
      if (nextLabel) {
        setLabelPlacement(
          resolveLabelPlacement(
            clientX,
            measureLabelWidth(nextLabel),
            Boolean(clickable),
          ),
        );
      }
      setTone(resolveCursorTone(pointerTarget));
    };

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      updateFromPointer(event.clientX, event.clientY);
      setVisible(true);
    };

    const onResize = () => {
      if (!activeLabel) return;
      setLabelPlacement(
        resolveLabelPlacement(
          cursorX.get(),
          measureLabelWidth(activeLabel),
          true,
        ),
      );
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    const press = (event: MouseEvent) => {
      if (event.button !== 0) return;

      setClicking(true);
      setRippleKey((current) => current + 1);

      const radius = getRingRadius(true);
      const ringClickable = findClickableUnderCursor(
        event.clientX,
        event.clientY,
        radius,
      );
      const centerTarget = document.elementFromPoint(event.clientX, event.clientY);
      const centerClickable =
        centerTarget?.closest(CLICKABLE_SELECTOR) ?? null;

      if (
        ringClickable &&
        !centerClickable &&
        ringClickable instanceof HTMLElement
      ) {
        event.preventDefault();
        event.stopPropagation();
        ringClickable.click();
      }
    };

    const release = () => setClicking(false);

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        updateFromPointer(cursorX.get(), cursorY.get());
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    window.addEventListener("mousedown", press, { capture: true });
    window.addEventListener("mouseup", release);

    return () => {
      measureEl.remove();
      document.documentElement.classList.remove("custom-cursor-active");
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", press, { capture: true });
      window.removeEventListener("mouseup", release);
    };
  }, [mounted, reducedMotion, cursorX, cursorY]);

  if (!mounted || reducedMotion || !enabled) return null;

  const ringScale = clicking ? CLICK_SCALE : hovering ? HOVER_SCALE : 1;

  return (
    <motion.div
      aria-hidden
      className={`custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] custom-cursor--${tone}${clicking ? " custom-cursor--click" : ""}`}
      style={{ x: cursorX, y: cursorY }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.85,
      }}
      transition={{
        opacity: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        scale: SPRING_RING,
      }}
    >
      <div className="custom-cursor__inner">
        <div
          className="custom-cursor__ring-wrap"
          style={{
            width: RING_SIZE,
            height: RING_SIZE,
            marginLeft: -RING_SIZE / 2,
            marginTop: -RING_SIZE / 2,
          }}
        >
          <motion.div
            className="custom-cursor__ring-scale"
            animate={{ scale: ringScale }}
            transition={
              clicking
                ? { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                : SPRING_RING
            }
          >
            <span className="custom-cursor__ring" />

            <AnimatePresence mode="popLayout">
              {rippleKey > 0 ? (
                <motion.span
                  key={rippleKey}
                  className="custom-cursor__ripple"
                  initial={{ scale: 0.85, opacity: 0.7 }}
                  animate={{ scale: 1.65, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        <AnimatePresence mode="popLayout">
          {hovering && label ? (
            <motion.span
              key={`${label}-${labelPlacement}`}
              className={`custom-cursor__label custom-cursor__label--${labelPlacement}`}
              style={
                labelPlacement === "right"
                  ? { left: LABEL_OFFSET }
                  : { right: LABEL_OFFSET }
              }
              initial={{
                opacity: 0,
                x: labelPlacement === "right" ? -12 : 12,
                scale: 0.82,
                filter: "blur(4px)",
              }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                x: labelPlacement === "right" ? -8 : 8,
                scale: 0.9,
                filter: "blur(2px)",
              }}
              transition={SPRING_LABEL}
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
