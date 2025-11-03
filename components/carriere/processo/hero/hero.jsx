"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * PROCESSO DI SELEZIONE — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/processo/desktop.avif
 * /public/carriere/hero/processo/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Processo di selezione",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Processo di selezione",
  titleHighlight: "chiaro",
  titlePost: "in tutte le fasi",

  description:
    "Dalla candidatura al colloquio, fino al case study e all’onboarding. Tempi certi, feedback strutturato e comunicazioni trasparenti.",

  primaryCta: { label: "Candidati ora", href: "#candidatura", anchorIds: ["candidatura"] },
  secondaryCta: { label: "Scopri le fasi", href: "#fasi", anchorIds: ["fasi"] },

  badges: ["Tempi certi", "Feedback strutturato", "Onboarding assistito"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/processo/desktop.avif",
  srcMobileAvif: "/carriere/hero/processo/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Timeline di selezione con step evidenziati e badge, glow blu-oro su gradient corporate, processo di selezione",
};

export default function HeroProcesso(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Processo di selezione"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
