"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * BACK OFFICE — Hero con immagini AVIF (desktop + mobile)
 * - Desktop: media a destra, può sforare a sinistra (layout già gestito dall’Hero)
 * - Mobile: media edge-to-edge appoggiato al fondo
 *
 * Metti i file in:
 *  /public/carriere/hero/back-office/desktop.avif
 *  /public/carriere/hero/back-office/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Back Office",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  // Titolo in 3 blocchi → alta probabilità di andare su 3 righe
  titlePre: "Back office",
  titleHighlight: "che sblocca",
  titlePost: "le vendite",

  description:
    "Fisso + bonus su risultati, processi tracciati e KPI. Presidio documentale, coordinamento appuntamenti e supporto operativo reale ai team sul campo.",

  primaryCta: { label: "Candidati ora", href: "#candidatura", anchorIds: ["candidatura"] },
  secondaryCta: { label: "Ruolo e strumenti", href: "#strumenti", anchorIds: ["strumenti"] },

  badges: ["Fisso + bonus", "Processi tracciati", "SLA & KPI"],
};

const media = {
  // Immagini AVIF con sorgenti desktop/mobile
  type: "avif",
  // Desktop (verticale consigliato per “ancoraggio a destra”)
  srcAvif: "/carriere/hero/back-office/desktop.avif",
  aspectDesktop: "5 / 6",
  // Mobile (inquadratura più stretta, soggetto in basso)
  srcMobileAvif: "/carriere/hero/back-office/mobile.avif",
  // Accessibilità
  alt:
    "Operatore back office con cuffie e due monitor, luce blu-oro, interfacce CRM sfocate sullo sfondo con gradient corporate",
  // (opzionale) fallback per browser legacy:
  // srcFallback: "/carriere/hero/back-office/desktop.jpg",
  // srcMobileFallback: "/carriere/hero/back-office/mobile.jpg",
};

export default function HeroBackOffice(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Back Office"
      {...copy}
      media={media}
      // Scroll cue solo mobile
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
