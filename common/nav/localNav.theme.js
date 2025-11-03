// components/common/nav/localNav.theme.js

// Palette base (solo per coerenza, puoi cambiare i valori qui)
const INK = "rgba(10,16,36,1)";      // testo/ink scuro
const INK_16 = "rgba(10,16,36,.16)"; // ring/outline soft
const WHITE = "#FFFFFF";
const WHITE_SOFT = "#F6F7FB";        // “bianco scuro” per alternanza

// Temi pronti per LocalNav (solo colori/stili, niente items)
export const LOCALNAV_THEME_LIGHT = {
  bg: `linear-gradient(180deg, ${WHITE} 0%, ${WHITE_SOFT} 100%)`,
  accent: "var(--gold)",
  ring: INK_16,
};

export const LOCALNAV_THEME_DARK = {
  bg: "linear-gradient(180deg, rgba(6,11,24,0.92) 0%, rgba(5,10,20,0.96) 100%)",
  accent: "var(--gold)",
  ring: "rgba(255,255,255,.16)",
};

// Variante “flat” chiara, se non vuoi gradient
export const LOCALNAV_THEME_FLAT = {
  bg: WHITE,
  accent: "var(--gold)",
  ring: INK_16,
};

// Helper opzionale per fare override veloci
export const makeLocalNavTheme = (base = LOCALNAV_THEME_LIGHT, overrides = {}) => ({
  ...base,
  ...overrides,
});
