// pages/carriere/processo.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import HeroProcesso from "@/components/carriere/processo/hero/hero";
import Steps from "@/components/carriere/processo/section/Steps";

// CTA riusabile
import CTAUltra from "@/common/section/CTAUltra";

// Swiper pagina-specifico
import SwiperProcesso from "@/components/carriere/processo/swiper/swiper";

export default function ProcessoSelezionePage() {
  const ORG = "Casa Corporation";
  const title = "Processo di selezione — Carriere";
  const description =
    "Candidatura, priorità algoritmica, colloquio, firma, onboarding e go live: processo a step chiaro e veloce.";
  const canonical = "https://www.casacorporation.it/carriere/processo";

  const NAV_ITEMS = [
    { id: "intro", label: "Introduzione" },
    { id: "step", label: "Gli step" },
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

      {/* NB: className="processo" per scoping dello scroll-margin */}
      <main className="processo min-h-screen text-white">
        <Header />

        {/* Spacer: evita sovrapposizione Header (fixed) ↔ Hero */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO */}
        <section id="intro">
          <HeroProcesso />
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
        <Band tone="dark">
          <section id="step">
            <Steps />
          </section>
        </Band>

        {/* CTA finale */}
        <Band tone="blue">
          <section id="cta">
            <CTAUltra
              title="Pronto per il primo step?"
              desc="Automazioni HR, colloqui rapidi e onboarding guidato. Invia la candidatura in 1 minuto."
              primary={{ href: "/carriere/candidatura", label: "Invia candidatura" }}
              secondary={{ href: "/carriere/ruoli", label: "Scopri i ruoli" }}
            />
          </section>
        </Band>

        {/* SWIPER (dopo CTA, prima del Footer) */}
        <Band tone="dark">
          <SwiperProcesso />
        </Band>

        <Footer />
      </main>

      {/* Anchor offset, coerente con le altre pagine */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .processo section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .processo section[id] {
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
