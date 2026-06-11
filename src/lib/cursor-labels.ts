export const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], summary, .cursor-pointer, [data-cursor-hover]';

const SERVICE_LABELS: Record<string, string> = {
  "practice-media": "Patient trust",
  "virtual-receptionists": "Answer calls",
  "gp-sale-purchase": "Transition",
  "medical-consumables": "Supplies",
  "virtual-practice-management": "Practice ops",
  "accounting-bookkeeping": "Back office",
};

const NAV_LABELS: Record<string, string> = {
  "/": "Home",
  "/what-we-do": "Solutions",
  "/about": "Our story",
  "/contact": "Enquire",
};

export function resolveCursorLabel(element: Element | null): string | null {
  if (!element) return null;

  const clickable = element.closest(CLICKABLE_SELECTOR);
  if (!clickable) return null;

  const explicit = clickable.getAttribute("data-cursor-label");
  if (explicit) return explicit;

  const href = clickable.getAttribute("href") ?? "";

  for (const [id, label] of Object.entries(SERVICE_LABELS)) {
    if (href.includes(`#${id}`)) return label;
  }

  if (href.startsWith("tel:")) return "Call";
  if (href.startsWith("mailto:")) return "Email";

  const navLabel = NAV_LABELS[href.split("?")[0] ?? ""];
  if (navLabel) return navLabel;

  if (href.includes("/contact")) return "Enquire";
  if (href.startsWith("#")) return "Explore";

  const text = clickable.textContent?.trim().toLowerCase() ?? "";

  if (text.includes("consultation") || text.includes("consult")) return "Consult";
  if (text.includes("learn more")) return "Details";
  if (text.includes("view all") || text.includes("view our")) return "Explore";
  if (text.includes("contact")) return "Enquire";
  if (text.includes("privacy") || text.includes("terms")) return "Policy";

  if (
    clickable.tagName === "INPUT" ||
    clickable.tagName === "TEXTAREA" ||
    clickable.tagName === "SELECT"
  ) {
    return "Type";
  }

  return "Explore";
}
