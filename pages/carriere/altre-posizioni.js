// pages/carriere/altre-posizioni.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

// Hero dedicato alla pagina
import HeroAltrePosizioni from "@/components/carriere/altre-posizioni/hero/hero";

// Sezioni già esistenti (assumo gli id interni: "overview", "areas", "model", "process")
import Overview from "@/components/carriere/altre-posizioni/section/Overview";
import Areas from "@/components/carriere/altre-posizioni/section/Areas";
import Model from "@/components/carriere/altre-posizioni/section/Model";
import Process from "@/components/carriere/altre-posizioni/section/Process";

// CTA riusabile
import CTAUltra from "@/common/section/CTAUltra";

// Swiper (thin wrapper → common/nav/swiper)
import SwiperAltrePosizioni from "@/components/carriere/altre-posizioni/swiper/swiper";

export default function CareerOtherRolesPage() {
  const ORG = "Casa Corporation";
  const title = "Lavora con noi — Altre posizioni";
  const description =
    "Non solo immobiliare: tecnologia, marketing, operations, data e progetti trasversali. Ingresso in una realtà che abbraccia più settori, con metodo e strumenti proprietari.";
  const canonical = "https://www.casacorporation.it/carriere/altre-posizioni";

  // NB: id devono combaciare con le section interne
  const NAV_ITEMS = [
    { id: "overview", label: "Overview" },
    { id: "areas", label: "Aree" },
    { id: "model", label: "Modello" },
    { id: "process", label: "Processo" },
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

      {/* PAGE KEY per scoping offset */}
      <main className="altre-posizioni min-h-screen text-white">
        <Header />

        {/* Spacer per evitare overlap Header fixed ↔ Hero */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* ===== HERO ===== */}
        <section id="intro">
          <HeroAltrePosizioni />
        </section>

        {/* ===== LOCAL NAV (sticky con Hero) ===== */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "color-mix(in oklab, var(--brand) 88%, black)",
            accent: "var(--gold)",
            ring: "rgba(255,255,255,.16)",
          }}
        />

        {/* ===== CONTENUTI (alternanza sfondi brand) ===== */}
        <Band tone="dark"><Overview /></Band>
        <Band tone="blue"><Areas /></Band>
        <Band tone="dark"><Model /></Band>
        <Band tone="blue"><Process /></Band>

        {/* ===== CTA FINALE (ancorata a #cta) ===== */}
        <Band tone="dark">
          <section id="cta">
            <CTAUltra
              title="Pronto a candidarti?"
              desc="Ingresso chiaro, ruoli definiti, crescita misurabile."
              primary={{ href: "/carriere/candidatura", label: "Invia candidatura" }}
              secondary={{ href: "/carriere/altre-posizioni", label: "Vedi le aree" }}
            />
          </section>
        </Band>

        {/* ===== SWIPER (barra-continua → prossima pagina: Processo di selezione) ===== */}
        <Band tone="dark">
          <SwiperAltrePosizioni />
        </Band>

        <Footer />
      </main>

      {/* Anchor offset per questa pagina */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .altre-posizioni section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .altre-posizioni section[id] {
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
