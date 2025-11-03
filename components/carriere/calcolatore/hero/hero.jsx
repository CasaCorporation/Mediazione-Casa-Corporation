"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * CALCOLATORE — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/calcolatore/desktop.avif
 * /public/carriere/hero/calcolatore/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Calcolatore",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Calcola i tuoi guadagni",
  titleHighlight: "in tempo reale",
  titlePost: "con regole trasparenti",

  description:
    "Inserisci volumi e mix di operazioni: provvigioni, premi gara e impatto sul fatturato. Zero sorprese, numeri chiari prima di decidere.",

  primaryCta: { label: "Avvia calcolo", href: "#calcolatore", anchorIds: ["calcolatore"] },
  secondaryCta: { label: "Ipotesi e parametri", href: "#ipotesi", anchorIds: ["ipotesi"] },

  badges: ["Provvigioni chiare", "Premi gara", "Zero sorprese"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/calcolatore/desktop.avif",
  srcMobileAvif: "/carriere/hero/calcolatore/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Grafici e indicatori finanziari sfocati in glow blu-oro su gradient corporate, calcolatore guadagni",
  // srcFallback: "/carriere/hero/calcolatore/desktop.jpg",
  // srcMobileFallback: "/carriere/hero/calcolatore/mobile.jpg",
};

export default function HeroCalcolatore(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Calcolatore"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
