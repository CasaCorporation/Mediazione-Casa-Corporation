"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * AGENTI IMMOBILIARI — Hero con immagini AVIF (desktop + mobile)
 * - Desktop: media a destra, può sforare a sinistra (layout già gestito dall’Hero)
 * - Mobile: media E2E appoggiato al fondo (picture mobile dedicata)
 *
 * Metti i file in:
 *  /public/carriere/hero/agenti/desktop.avif
 *  /public/carriere/hero/agenti/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Agenti Immobiliari",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  // Titolo “3 righe” (blocchi brevi → più probabile lo split)
  titlePre: "Agente immobiliare",
  titleHighlight: "a numeri veri",
  titlePost: "con supporto reale",

  description:
    "Provvigione fino al 60%, lead qualificati e pipeline tracciata. Formazione continua e back office che ti libera il tempo sulle trattative.",

  primaryCta: { label: "Candidati ora", href: "#candidatura", anchorIds: ["candidatura"] },
  secondaryCta: { label: "Come lavoriamo", href: "#processo", anchorIds: ["processo"] },

  badges: ["Provvigione fino al 60%", "Back office operativo", "CRM + Toolkit"],
};

const media = {
  // Immagine AVIF con sorgenti desktop/mobile
  type: "avif",
  // Desktop
  srcAvif: "/carriere/hero/agenti/desktop.avif",
  aspectDesktop: "5 / 6",
  // Mobile
  srcMobileAvif: "/carriere/hero/agenti/mobile.avif",
  // Accessibilità
  alt: "Agente immobiliare con tablet, glow blu-oro, sfondo corporate Casa Corporation",
  // (facoltativo) Se vuoi una ancora maggiore compatibilità aggiungi anche:
  // srcFallback: "/carriere/hero/agenti/desktop.jpg",
  // srcMobileFallback: "/carriere/hero/agenti/mobile.jpg",
};

export default function HeroAgenti(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Agenti Immobiliari"
      {...copy}
      media={media}
      // Scroll cue solo mobile (freccia già presente)
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
