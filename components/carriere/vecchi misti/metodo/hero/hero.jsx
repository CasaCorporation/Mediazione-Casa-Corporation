"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * METODO — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/metodo/desktop.avif
 * /public/carriere/hero/metodo/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Metodo",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Metodo di lavoro",
  titleHighlight: "misurabile",
  titlePost: "dall’acquisizione al rogito",

  description:
    "Playbook operativi, checklist e pipeline tracciata. Ogni fase ha KPI chiari e responsabilità definite.",

  primaryCta: { label: "Scopri il metodo", href: "#metodo", anchorIds: ["metodo"] },
  secondaryCta: { label: "Processi", href: "#processi", anchorIds: ["processi"] },

  badges: ["Playbook", "Checklist", "Pipeline & KPI"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/metodo/desktop.avif",
  srcMobileAvif: "/carriere/hero/metodo/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Schema di processo stilizzato con step evidenziati e glow blu-oro su gradient corporate, metodo di lavoro",
};

export default function HeroMetodo(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Metodo"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
