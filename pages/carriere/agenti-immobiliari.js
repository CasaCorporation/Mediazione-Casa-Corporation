// pages/carriere/agenti-immobiliari.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";
import SwiperAgentiImmobiliari from "@/components/carriere/agenti-immobiliari/swiper/swiper";

// Hero wrapper già configurato per Agenti (copy + media)
import HeroAgenti from "@/components/carriere/agenti-immobiliari/hero/hero";

import Intro from "@/components/carriere/agenti-immobiliari/section/Intro";
import Summary from "@/components/carriere/agenti-immobiliari/section/Summary";            // ← 3 ruoli (id="profili")
import CommonBenefits from "@/components/carriere/agenti-immobiliari/section/CommonBenefits";
import SoftwareTeaser from "@/components/carriere/agenti-immobiliari/section/SoftwareSuite";
import MeritPaySection from "@/components/carriere/agenti-immobiliari/section/MeritPaySection";

// NEW: CTA minimale e riusabile
import CTAUltra from "@/common/section/CTAUltra";

export default function CareerAgentsPage() {
  const ORG = "Casa Corporation";
  const title = "Lavora con noi — Agenti Immobiliari";
  const description =
    "Junior Executive, Corporate Senior e Leader Corporate. Nessun costo fisso, formazione continua, strumenti proprietari. Retribuzioni chiare.";
  const canonical = "https://www.casacorporation.it/carriere/agenti-immobiliari";

  const NAV_ITEMS = [
    { id: "intro", label: "Introduzione" },
    { id: "profili", label: "Le 3 figure" },          // Summary
    { id: "merit", label: "Gara aziendale" },         // ← NEW
    { id: "benefit-comuni", label: "Vantaggi comuni" },
    { id: "software", label: "Software aziendale" },
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

      {/* NB: className="agenti" per scoping dello scroll-margin */}
      <main className="agenti min-h-screen text-white">
        <Header />

        {/* Spacer: evita sovrapposizione Header (fixed) ↔ Hero */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO (ancora standalone, mantiene il suo background) */}
        <section id="intro">
          <HeroAgenti />
        </section>

        {/* LOCAL NAV */}
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
        <Band tone="dark"><Intro /></Band>
        <Band tone="blue"><Summary /></Band>
        <Band tone="dark"><MeritPaySection /></Band>           {/* id="merit" interno */}
        <Band tone="blue"><CommonBenefits /></Band>            {/* id="benefit-comuni" interno */}
        <Band tone="dark"><SoftwareTeaser /></Band>           {/* id="software" interno */}

        {/* CTA globale (sezione ancorata a #cta) */}
        <Band tone="blue">
          {/* wrapper per avere l'anchor #cta anche se CTAUltra non accetta id */}
          <section id="cta">
            <CTAUltra
              title="Pronto a candidarti?"
              desc="Zero frizioni. Metodo chiaro, tutela e strumenti proprietari."
              primary={{ href: "/carriere/candidatura", label: "Invia candidatura" }}
              secondary={{ href: "/carriere/agenti-immobiliari", label: "Vedi i ruoli" }}
            />
          </section>
        </Band>

        {/* Manteniamo alternanza (dark) */}
        <Band tone="dark"><SwiperAgentiImmobiliari /></Band>

        <Footer />
      </main>

      {/* Anchor offset SOLO per questa pagina */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .agenti section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .agenti section[id] {
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
