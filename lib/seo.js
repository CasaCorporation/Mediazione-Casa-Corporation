// lib/seo.js
export const SITE_NAME = "Casa Corporation";
export const DEFAULT_DESC =
  "Next Generation Real Estate: processi misurabili, governance trasparente, strumenti proprietari.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://carriere-casa-corporation.vercel.app";

// Opzionale: utility per ottenere URL assoluti
export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
