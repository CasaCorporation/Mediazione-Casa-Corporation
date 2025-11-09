// pages/carriere/calcolatore.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import CTAUltra from "@/common/section/CTAUltra";
import SwiperCalcolatore from "@/components/carriere/calcolatore/swiper/swiper";

import { CalcoloProvider } from "@/components/carriere/calcolatore/state/CalcoloContext";
import HeroCalc from "@/components/carriere/calcolatore/hero/hero";
import Calculator from "@/components/carriere/calcolatore/section/Calculator";
import Scenarios from "@/components/carriere/calcolatore/section/Scenarios";
import Notes from "@/components/carriere/calcolatore/section/Notes";

export default function CalcolatorePage() {
  const ORG = "Casa Corporation";
  const title = "Calcolatore guadagni — Carriere";
  const description =
    "Stima provvigione 60%, premi gara (5/3/2%) e impatto percentuale sul tuo fatturato.";
  const canonical = "https://www.casacorporation.it/carriere/calcolatore";

  const NAV_ITEMS = [
    { id: "panoramica", label: "Panoramica" },
    { id: "calcola", label: "Calcola" },
    { id: "scenari", label: "Scenari" },
    { id: "note", label: "Note" },
    { id: "cta", label: "Candidati" },
  ];

  return (
    <>
      <Head>
        <title>{title} | {ORG}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${title} | ${ORG}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      <main className="calcolatore min-h-screen text-white">
        <Header />

        {/* Spacer: evita overlap Header (fixed) ↔ Hero */}
        <div aria-hidden style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }} />

        {/* Provider di pagina: sincronizza Hero ⟷ Calculator */}
        <CalcoloProvider>
          {/* 1) HERO con numero dinamico al posto del media */}
          <section id="panoramica">
            <HeroCalc />
          </section>

          {/* 2) LOCAL NAV */}
          <LocalNav
            items={NAV_ITEMS}
            topOffset="var(--header-h, 56px)"
            theme={{
              bg: "color-mix(in oklab, var(--brand) 88%, black)",
              accent: "var(--gold)",
              ring: "rgba(255,255,255,.16)",
            }}
          />

          {/* 3) SEZIONI alternate */}
          <Band tone="dark">
            <section id="calcola">
              <Calculator />
            </section>
          </Band>

          <Band tone="blue">
            <section id="scenari">
              <Scenarios />
            </section>
          </Band>

          <Band tone="dark">
            <section id="note">
              <Notes />
            </section>
          </Band>

          {/* 4) CTA finale */}
          <Band tone="blue">
            <section id="cta">
              <CTAUltra
                title="Hai stimato il potenziale?"
                desc="Invia la candidatura in 2 minuti. Nessun costo fisso, metodo chiaro."
                primary={{ href: "/carriere/candidatura", label: "Invia candidatura" }}
                secondary={{ href: "/carriere/benefit", label: "Vedi benefit & strumenti" }}
              />
            </section>
          </Band>

          {/* 5) SWIPER */}
          <Band tone="dark">
            <SwiperCalcolatore />
          </Band>
        </CalcoloProvider>

        <Footer />
      </main>

      {/* Anchor offset specifico pagina */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .calcolatore section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .calcolatore section[id] {
            scroll-margin-top: calc(var(--header-h, 56px) + 72px);
          }
        }
      `}</style>
    </>
  );
}

/* ===== Wrapper "Band" per alternare sfondi brand ===== */
function Band({ tone = "dark", children }) {
  const cls = tone === "blue" ? "band band-blue" : "band band-dark";
  return (
    <div className={cls}>
      {children}
      <style jsx>{`
        .band { position: relative; }
        .band-dark {
          background:
            radial-gradient(40% 26% at 50% 0%, rgba(201,168,110,0.10), transparent 62%),
            var(--brand-dark);
        }
        .band-blue {
          background:
            radial-gradient(40% 26% at 50% 0%, rgba(29,45,94,0.34), transparent 62%),
            var(--brand);
        }
      `}</style>
    </div>
  );
}
