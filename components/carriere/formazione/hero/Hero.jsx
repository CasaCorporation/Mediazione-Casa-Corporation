"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * FORMAZIONE — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/formazione/desktop.avif
 * /public/carriere/hero/formazione/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Formazione",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Formazione",
  titleHighlight: "pragmatica",
  titlePost: "che accelera i risultati",

  description:
    "Percorsi modulari, casi reali e mentorship. Skill misurabili, rubriche valutative e pratica costante sui progetti.",

  primaryCta: { label: "Accedi al percorso", href: "#programma", anchorIds: ["programma"] },
  secondaryCta: { label: "Calendario", href: "#calendario", anchorIds: ["calendario"] },

  badges: ["Casi reali", "Mentorship", "Rubriche KPI"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/formazione/desktop.avif",
  srcMobileAvif: "/carriere/hero/formazione/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Coach e partecipante in sessione formativa con lavagna digitale sfocata, glow blu-oro su gradient corporate",
};

export default function HeroFormazione(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Formazione"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
