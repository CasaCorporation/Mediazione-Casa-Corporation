"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * COLLABORAZIONI — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/collaborazioni/desktop.avif
 * /public/carriere/hero/collaborazioni/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Collaborazioni",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Collaborazioni",
  titleHighlight: "flessibili",
  titlePost: "con governance e KPI",

  description:
    "Apriamo a freelance, agenzie e imprese con modelli chiari di partnership. Revenue share trasparente e processi tracciati.",

  primaryCta: { label: "Proponi collaborazione", href: "/contatti?topic=collaborazione" },
  secondaryCta: { label: "Vedi i modelli", href: "#types", anchorIds: ["types"] },

  badges: ["KPI condivisi", "Processi tracciati", "Revenue share"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/collaborazioni/desktop.avif",
  srcMobileAvif: "/carriere/hero/collaborazioni/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Stretta di mano business con tablet e documenti sfocati, glow blu-oro su gradient corporate, collaborazioni",
};

export default function HeroCollaborazioni(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Collaborazioni"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
