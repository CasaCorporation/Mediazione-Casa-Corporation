// lib/seo.js

// Branding
export const SITE_NAME = "Casa Corporation — Carriere";

// Descrizione default (breve, benefit-oriented)
export const DEFAULT_DESC =
  "Percorsi chiari, strumenti proprietari e meritocrazia. Costruisci la tua carriera nel Real Estate con Casa Corporation.";

// Dominio canonico (imposta SEMPRE NEXT_PUBLIC_SITE_URL in produzione)
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://carrierecasacorporation.it").replace(/\/+$/, "");

/** Normalizza la path per il canonical (rimuove query/hash, garantisce leading slash) */
export function normalizePath(input = "/") {
  if (!input) return "/";
  // togli query/hash
  const clean = String(input).split("#")[0].split("?")[0] || "/";
  // leading slash
  return clean.startsWith("/") ? clean : `/${clean}`;
}

/** Ritorna un URL assoluto, lasciando in pace http(s), mailto:, tel:, data:, blob:, etc. */
export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  const lower = String(path).toLowerCase().trim();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("data:") ||
    lower.startsWith("blob:")
  ) {
    return path;
  }
  const p = normalizePath(path);
  return `${SITE_URL}${p}`;
}

/** Costruisce il canonical a partire da router.asPath (senza query/hash) */
export function buildCanonical(asPath = "/") {
  const p = normalizePath(asPath);
  return `${SITE_URL}${p}`;
}

/** Helper per immagini OG: accetta path relativo o assoluto e restituisce assoluto */
export function ogImage(src) {
  if (!src) return null;
  return absoluteUrl(src);
}
