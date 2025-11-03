"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * STRUMENTI — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/strumenti/desktop.avif
 * /public/carriere/hero/strumenti/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Strumenti",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Strumenti",
  titleHighlight: "concreti",
  titlePost: "per lavorare meglio",

  description:
    "CRM proprietario, playbook, dashboard KPI e toolkit per ogni ruolo. Meno frizioni, più risultati.",

  primaryCta: { label: "Scopri la suite", href: "#suite", anchorIds: ["suite"] },
  secondaryCta: { label: "Stack tecnico", href: "#stack", anchorIds: ["stack"] },

  badges: ["CRM & Pipeline", "Playbook interni", "Dashboard KPI"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/strumenti/desktop.avif",
  srcMobileAvif: "/carriere/hero/strumenti/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Laptop e tablet con UI sfocata e glow blu-oro su gradient corporate, strumenti e suite applicativa",
};

export default function HeroStrumenti(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Strumenti"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
