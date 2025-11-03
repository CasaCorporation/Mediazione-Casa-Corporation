"use client";
import React from "react";
import Hero from "@/common/hero/Hero";

/**
 * ALTRE POSIZIONI — Hero con immagini AVIF (desktop + mobile)
 * - Desktop: media a destra (può sforare a sinistra)
 * - Mobile: media edge-to-edge appoggiato al fondo
 *
 * Metti i file in:
 *  /public/carriere/hero/altre-posizioni/desktop.avif
 *  /public/carriere/hero/altre-posizioni/mobile.avif
 */
const copy = {
  brandDesktopHighlight: "Casa Corporation",
  brandDesktopSuffix: "— Carriere • Altre posizioni",
  brandMobileHighlight: "Casa Corporation",
  brandMobileSuffix: "— Carriere",

  // Titolo pensato per andare su 3 righe
  titlePre: "Altre posizioni",
  titleHighlight: "talenti trasversali",
  titlePost: "per progetti reali",

  description:
    "Tecnologia, marketing e operations. Ruoli chiari, ownership e KPI. Lavori concreti, crescita continua e strumenti proprietari.",

  primaryCta: { label: "Candidati ora", href: "#candidatura", anchorIds: ["candidatura"] },
  secondaryCta: { label: "Vedi i ruoli", href: "#ruoli", anchorIds: ["ruoli"] },

  badges: ["Tech • Marketing • Ops", "KPI e ownership", "Formazione continua"],
};

const media = {
  type: "avif",
  // Desktop (verticale consigliato per “ancoraggio a destra”)
  srcAvif: "/carriere/hero/altre-posizioni/desktop.avif",
  aspectDesktop: "5 / 6",
  // Mobile (inquadratura più stretta, soggetto in basso)
  srcMobileAvif: "/carriere/hero/altre-posizioni/mobile.avif",
  alt:
    "Professionista cross-funzione con laptop e tablet, glow blu-oro e props che richiamano Tech, Marketing e Operations su gradient corporate",
  // (opzionale) fallback legacy:
  // srcFallback: "/carriere/hero/altre-posizioni/desktop.jpg",
  // srcMobileFallback: "/carriere/hero/altre-posizioni/mobile.jpg",
  // (facoltativo) fine-tuning frame:
  // frame: {
  //   desktop: { left: 50, top: 8, width: 54, height: 80 },
  //   mobile:  { left: 50, top: 12, width: 92, height: 60 },
  // },
};

export default function HeroAltrePosizioni(props) {
  return (
    <Hero
      id="intro"
      ariaLabel="Hero — Altre posizioni"
      {...copy}
      media={media}
      scrollCue={{ showOn: "mobile", position: "bottom-center" }}
      {...props}
    />
  );
}
