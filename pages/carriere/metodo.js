// pages/azienda/metodo.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

// NB: mantengo i path esistenti per non rompere nulla.
// Se desideri coerenza semantica, poi spostiamo in /components/azienda/metodo/...
import HeroMetodo from "@/components/carriere/metodo/hero/hero";
import ProcessPillars from "@/components/carriere/metodo/section/ProcessPillars";
import Timeline from "@/components/carriere/metodo/section/Timeline";
import Proof from "@/components/carriere/metodo/section/Proof";
import FAQ from "@/components/carriere/metodo/section/FAQ";

// CTA globale riusabile
import CTAUltra from "@/common/section/CTAUltra";

// SWIPER (pagina-specifico → usa il common/nav/swiper sotto il cofano)
import SwiperMetodo from "@/components/carriere/metodo/swiper/swiper";

export default function MetodoPage() {
  const ORG = "Casa Corporation";
  const title = "Metodo — Azienda";
  const description =
    "Processi non aggirabili, governance chiara, automazioni e controlli: il nostro modo di lavorare.";
  const canonical = "https://www.casacorporation.it/azienda/metodo";

  const NAV_ITEMS = [
    { id: "panoramica", label: "Panoramica" },
    { id: "pilastri", label: "I pilastri" },
    { id: "timeline", label: "Fasi operative" },
    { id: "evidenze", label: "Evidenze & controlli" },
    { id: "faq", label: "Domande frequenti" },
    { id: "cta", label: "Parla con noi" }, // CTA in fondo
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

      {/* NB: className="metodo" per scoping dello scroll-margin */}
      <main className="metodo min-h-screen text-white">
        <Header />

        {/* Spacer: evita sovrapposizione Header (fixed) ↔ Hero */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO (standalone con suo background) */}
        <section id="panoramica">
          <HeroMetodo />
        </section>

        {/* LOCAL NAV (sticky sotto hero) */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "color-mix(in oklab, var(--brand) 88%, black)",
            accent: "var(--gold)",
            ring: "rgba(255,255,255,.16)",
          }}
        />

        {/* ===== CONTENUTI con alternanza sfondi brand ===== */}
        <Band tone="dark"><section id="pilastri"><ProcessPillars /></section></Band>
        <Band tone="blue"><section id="timeline"><Timeline /></section></Band>
        <Band tone="dark"><section id="evidenze"><Proof /></section></Band>
        <Band tone="blue"><section id="faq"><FAQ /></section></Band>

        {/* CTA finale (ancora #cta) */}
        <Band tone="dark">
          <section id="cta">
            <CTAUltra
              title="Vuoi applicare il nostro metodo nel tuo reparto?"
              desc="Governance, processi non aggirabili e dati misurabili: parliamone."
              primary={{ href: "/contatti", label: "Parla con noi" }}
              secondary={{ href: "/carriere/agenti-immobiliari", label: "Lavora con noi" }}
            />
          </section>
        </Band>

        {/* SWIPER (dopo CTA, prima del Footer) → alternanza: blu */}
        <Band tone="blue">
          <SwiperMetodo />
        </Band>

        <Footer />
      </main>

      {/* Offset ancore, coerente con le altre pagine */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .metodo section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .metodo section[id] {
            scroll-margin-top: calc(var(--header-h, 56px) + 72px);
          }
        }
      `}</style>
    </>
  );
}

/* ===== Wrapper "Band" per alternare sfondi tra i due blu del brand ===== */
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
