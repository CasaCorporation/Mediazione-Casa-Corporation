// pages/index.js
"use client";

import React from "react";
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
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold)] to-[color:var(--gold)]"
    />
  );
}

// ------- Wrapper sezioni (per ora tutto chiaro) -------
function SectionTone({ id, children }) {
  return (
    <section id={id} className="relative bg-white">
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

      {/* HOME in light: sfondo bianco + testo blu brand */}
      <main data-home-root className="bg-white text-[var(--color-brand)]">
        <Header />
        <div id="header-spacer" className="h-[64px] sm:h-[76px] md:h-[88px]" aria-hidden="true" />

        {/* HERO */}
        <HeroExtremeCareers />

        {/* Sezioni (tutte chiare) */}
        <SectionTone id="sezione-chi">
          <WhoWeServe />
        </SectionTone>

        <SectionTone id="sezione-comp">
          <CompPlanShowcase />
        </SectionTone>

        <SectionTone id="sezione-offerta">
          <OfferStack />
        </SectionTone>

        {/* CTA finale */}
        <SectionTone id="sezione-cta">
          <CTAUltra />
        </SectionTone>

        <Footer />
      </main>
    </>
  );
}
