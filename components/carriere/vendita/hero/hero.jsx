"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * CONFRONTO — Hero AVIF (desktop + mobile)
 * /public/carriere/hero/confronto/desktop.avif
 * /public/carriere/hero/confronto/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Confronto",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  titlePre: "Non temiamo il confronto",
  titleHighlight: "dati alla mano",
  titlePost: "",

  description:
    "Trasparenza su retribuzioni, strumenti e processi. Metti a paragone ciò che conta davvero e prendi una decisione solida.",

  primaryCta: { label: "Apri confronto", href: "#tabella", anchorIds: ["tabella"] },
  secondaryCta: { label: "Modelli di offerta", href: "#modelli", anchorIds: ["modelli"] },

  badges: ["Numeri verificabili", "Processi misurabili", "Zero promesse vaghe"],
};

const media = {
  type: "avif",
  srcAvif: "/carriere/hero/confronto/desktop.avif",
  srcMobileAvif: "/carriere/hero/confronto/mobile.avif",
  aspectDesktop: "5 / 6",
  alt:
    "Tabelle e grafici comparativi sfocati con glow blu-oro su gradient corporate, pagina confronto",
};

export default function HeroConfronto(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Confronto"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
