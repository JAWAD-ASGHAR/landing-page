export const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], summary, .cursor-pointer, [data-cursor-hover]';

const RING_SAMPLE_COUNT = 12;
const CTA_TEXT_MAX_LENGTH = 48;

function isInteractive(element: Element) {
  if (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  ) {
    return !element.disabled;
  }

  return element.getAttribute("aria-disabled") !== "true";
}

export function findClickableUnderCursor(
  clientX: number,
  clientY: number,
  radius: number,
): Element | null {
  const center = document.elementFromPoint(clientX, clientY);
  const centerClickable = center?.closest(CLICKABLE_SELECTOR) ?? null;
  if (centerClickable && isInteractive(centerClickable)) {
    return centerClickable;
  }

  for (let index = 0; index < RING_SAMPLE_COUNT; index += 1) {
    const angle = (index / RING_SAMPLE_COUNT) * Math.PI * 2;

    for (const scale of [1, 0.55]) {
      const x = clientX + Math.cos(angle) * radius * scale;
      const y = clientY + Math.sin(angle) * radius * scale;
      const sample = document.elementFromPoint(x, y);
      const clickable = sample?.closest(CLICKABLE_SELECTOR) ?? null;

      if (clickable && isInteractive(clickable)) {
        return clickable;
      }
    }
  }

  return null;
}

const SERVICE_LABELS: Record<string, string> = {
  "practice-media": "Media",
  "virtual-receptionists": "Reception",
  "gp-sale-purchase": "Transitions",
  "medical-consumables": "Supplies",
  "virtual-practice-management": "Management",
  "accounting-bookkeeping": "Accounting",
};

const NAV_LABELS: Record<string, string> = {
  "/": "Home",
  "/what-we-do": "Solutions",
  "/about": "Our story",
  "/contact": "Contact",
};

function resolveAriaLabelLabel(ariaLabel: string): string | null {
  const normalized = ariaLabel.trim().toLowerCase();

  if (normalized.includes("back to top")) return "Top";
  if (normalized.includes("previous")) return "Prev";
  if (normalized.includes("next")) return "Next";
  if (normalized.startsWith("close")) return "Close";
  if (normalized.startsWith("open")) return "Open";

  return null;
}

function resolveExpandedLabel(element: Element): string | null {
  const expanded = element.getAttribute("aria-expanded");
  if (expanded === "true") return "Close";
  if (expanded === "false") return "Open";
  return null;
}

function resolveCtaTextLabel(text: string): string | null {
  if (!text || text.length > CTA_TEXT_MAX_LENGTH) return null;

  if (text.startsWith("book") || text.includes("book a")) return "Book";
  if (text.includes("learn more")) return "Details";
  if (text.includes("view all") || text.includes("view our")) return "View all";
  if (text.includes("contact us") || text === "contact") return "Contact";
  if (text.includes("send") || text.includes("submit")) return "Send";
  if (text.includes("privacy") || text.includes("terms")) return "Policy";

  return null;
}

export function resolveCursorLabel(element: Element | null): string | null {
  if (!element) return null;

  const clickable = element.closest(CLICKABLE_SELECTOR);
  if (!clickable) return null;

  const explicit = clickable.getAttribute("data-cursor-label");
  if (explicit) return explicit;

  const expandedLabel = resolveExpandedLabel(clickable);
  if (expandedLabel) return expandedLabel;

  const ariaLabel = clickable.getAttribute("aria-label");
  if (ariaLabel) {
    const ariaLabelResult = resolveAriaLabelLabel(ariaLabel);
    if (ariaLabelResult) return ariaLabelResult;
  }

  const href = clickable.getAttribute("href") ?? "";

  for (const [id, label] of Object.entries(SERVICE_LABELS)) {
    if (href.includes(`#${id}`)) return label;
  }

  if (href.startsWith("tel:")) return "Call";
  if (href.startsWith("mailto:")) return "Email";

  const navLabel = NAV_LABELS[href.split("?")[0] ?? ""];
  if (navLabel) return navLabel;

  if (href.includes("/contact")) return "Contact";
  if (href.startsWith("#")) return "Jump";

  const text = clickable.textContent?.trim().toLowerCase() ?? "";
  const ctaLabel = resolveCtaTextLabel(text);
  if (ctaLabel) return ctaLabel;

  if (clickable.tagName === "INPUT" || clickable.tagName === "TEXTAREA") {
    return "Type";
  }

  if (clickable.tagName === "SELECT") {
    return "Choose";
  }

  if (clickable.tagName === "A") {
    return "Go";
  }

  return "Select";
}
