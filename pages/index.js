// pages/index.js
"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

import Header from "@/common/layout/Header";
import Footer from "@/common/layout/Footer";

// UI extra
import CursorAura from "@/components/home/CursorAura";

// Hero & CTA
import HeroExtremeCareers from "@/components/home/HeroExtremeCareers";
import CTAUltra from "@/components/home/CTAUltra";

// Sezioni Home
import WhoWeServe from "@/components/home/WhoWeServe";
import CompPlanShowcase from "@/components/home/CompPlanShowcase";
import OfferStack from "@/components/home/OfferStack";

// ------- SEO/OG -------
const SITE_NAME = "Casa Corporation — Carriere";
const DEFAULT_TITLE = "Carriere — Casa Corporation";
const DEFAULT_DESC =
  "Percorsi chiari, strumenti proprietari e meritocrazia. Costruisci la tua carriera nel Real Estate con Casa Corporation.";
const DEFAULT_IMAGE = "/carriere/og.png";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.holdingcasacorporation.it";
const CANONICAL = `${SITE_URL}/`;

/** Inietta un <style> come ULTIMO nel <head> (vince su tutto) */
function ForceHeadingsVisible() {
  useEffect(() => {
    const id = "cc-force-headings-ultimate";
    // ripulisci eventuale precedente
    const prev = document.getElementById(id);
    if (prev) prev.remove();

    const style = document.createElement("style");
    style.id = id;
    style.setAttribute("data-origin", "home/index");
    style.textContent = `
/* ==== EMERGENCY: forza visibilità headings in HOME ==== */
[data-home-root] :is(h1,h2,h3,h4,h5,h6,.section-title,[class*="title"],[data-title],.cc-force-heading){
  color:#fff !important;
  -webkit-text-fill-color:#fff !important;
  background-image:none !important;
  -webkit-background-clip:initial !important;
  background-clip:initial !important;
  mix-blend-mode:normal !important;
  opacity:1 !important;
  filter:none !important;
  text-shadow:none !important;
}
[data-home-root] :is(h1,h2,h3,h4,h5,h6,.section-title,[class*="title"],[data-title],.cc-force-heading) .text-gold{
  color:var(--gold) !important;
  -webkit-text-fill-color:var(--gold) !important;
}
/* sottotitoli / eyebrow */
[data-home-root] :is(.section-subtitle,.cc-subtitle){ color:rgba(255,255,255,.8) !important; }
[data-home-root] :is(.section-eyebrow,.cc-eyebrow){
  color:rgba(255,255,255,.62) !important; text-transform:uppercase; letter-spacing:.2em; font-size:.75rem;
}
/* z-index guard: porta i titoli sopra overlay accidentali */
[data-home-root] :is(h1,h2,h3,h4,h5,h6,.section-title,[class*="title"],[data-title]){ position:relative; z-index:2; isolation:isolate; }
`;
    document.head.appendChild(style);
    return () => { try { style.remove(); } catch (_) {} };
  }, []);
  return null;
}

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#org`,
        name: "Casa Corporation",
        url: SITE_URL,
        logo: `${SITE_URL}/og/logo.png`,
        brand: "Casa Corporation",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={query}`,
          "query-input": "required name=query",
        },
        inLanguage: "it-IT",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

// ------- Progress bar scroll -------
function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 400 : 90,
    damping: prefersReducedMotion ? 40 : 20,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold-400)] to-[color:var(--gold)]"
    />
  );
}

// ------- Wrapper sezioni -------
function SectionTone({ tone = "dark", id, children }) {
  const toneClass = tone === "brand" ? "bg-[var(--brand)]" : "bg-[var(--brand-dark)]";
  return (
    <section id={id} className={`${toneClass} relative`}>
      {children}
    </section>
  );
}

export default function CareersIndex() {
  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B142E" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESC} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={`${SITE_URL}${DEFAULT_IMAGE}`} />
        <meta property="og:image:alt" content="Carriere — Casa Corporation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESC} />
        <meta name="twitter:image" content={`${SITE_URL}${DEFAULT_IMAGE}`} />
        <link rel="alternate" hrefLang="it" href={CANONICAL} />
        <JsonLd />
      </Head>

      <CursorAura />
      <ScrollProgress />

      {/* data-home-root: àncora per l'override */}
      <main data-home-root className="bg-[var(--brand-dark)] text-white">
        <Header />
        <div id="header-spacer" className="h-[64px] sm:h-[76px] md:h-[88px]" aria-hidden="true" />

        {/* HERO */}
        <HeroExtremeCareers />

        {/* Sezioni */}
        <SectionTone tone="brand" id="sezione-chi">
          <WhoWeServe />
        </SectionTone>

        <SectionTone tone="dark" id="sezione-comp">
          <CompPlanShowcase />
        </SectionTone>

        <SectionTone tone="brand" id="sezione-offerta">
          <OfferStack />
        </SectionTone>

        {/* CTA finale */}
        <SectionTone tone="brand" id="sezione-cta">
          <CTAUltra />
        </SectionTone>

        <Footer />
      </main>

      {/* Inserisce le regole CSS alla fine del <head> (massima priorità) */}
      <ForceHeadingsVisible />
    </>
  );
}
