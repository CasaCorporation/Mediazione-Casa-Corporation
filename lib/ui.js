// lib/ui.js
export function headerOffset() {
  if (typeof window === "undefined") return 0;
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
}
