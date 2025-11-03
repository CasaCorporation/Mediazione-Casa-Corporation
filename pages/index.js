// pages/index.js
"use client";

import React, { useEffect } from "react";
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
import HomeSEO from "@/components/home/seo";

/** Inietta un <style> come ULTIMO nel <head> (vince su tutto) */
function ForceHeadingsVisible() {
  useEffect(() => {
    const id = "cc-force-headings-ultimate";
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
      {/* SEO centralizzato */}
      <HomeSEO />

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
