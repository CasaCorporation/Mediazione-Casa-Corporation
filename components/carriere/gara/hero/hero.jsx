"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * GARA — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/gara/desktop.avif
 * /public/carriere/hero/gara/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Gara",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Gara trimestrale",
  titleHighlight: "merito e premi",
  titlePost: "con regole chiare",

  description:
    "Meccanismo trasparente, milestone e bonus misurabili. Classifica live e premi concreti su risultati verificabili.",

  primaryCta: { label: "Partecipa alla gara", href: "#iscrizione", anchorIds: ["iscrizione"] },
  secondaryCta: { label: "Regolamento", href: "#regolamento", anchorIds: ["regolamento"] },

  badges: ["Premi reali", "Milestone trimestrali", "Classifica live"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/gara/desktop.avif",
  srcMobileAvif: "/carriere/hero/gara/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Coppa stilizzata e grafici di avanzamento sfocati con glow blu-oro su gradient corporate, gara aziendale",
};

export default function HeroGara(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Gara trimestrale"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
