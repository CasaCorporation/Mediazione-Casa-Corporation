// pages/carriere/confronto.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import CTAUltra from "@/common/section/CTAUltra";
import SEOConfronto from "@/components/carriere/confronto/seo/seo"; // SEO specifico
import HeroConfronto from "@/components/carriere/confronto/hero/hero";

// Sezioni
import ModelCards from "@/components/carriere/confronto/section/ModelCards";
import ComparisonTable from "@/components/carriere/confronto/section/ComparisonTable";
import Explainer from "@/components/carriere/confronto/section/Explainer";

// Swiper della pagina (solo configurazione, come da progetto)
import SwiperConfronto from "@/components/carriere/confronto/swiper/swiper";

export default function ConfrontoPage() {
  const ORG = "Casa Corporation";
  const canonical = "https://www.casacorporation.it/carriere/confronto";

  const NAV_ITEMS = [
    { id: "panoramica", label: "Panoramica" },
    { id: "modelli", label: "Modelli" },
    { id: "tabella", label: "Tabella" },
    { id: "spiegazioni", label: "Spiegazioni" },
    { id: "cta", label: "Candidati" },
  ];

  return (
    <>
      {/* SEO dedicato (title, description, og, ecc.) */}
      <SEOConfronto />

      {/* Canonical */}
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>

      <main className="confronto min-h-screen text-white">
        <Header />

        {/* Spacer per Header fixed */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO standalone (mantiene il suo background) */}
        <section id="panoramica">
          <HeroConfronto />
        </section>

        {/* LOCAL NAV sticky, colori coerenti */}
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
        <Band tone="blue">
          <section id="modelli">
            <ModelCards />
          </section>
        </Band>

        <Band tone="dark">
          <section id="tabella">
            <ComparisonTable />
          </section>
        </Band>

        <Band tone="blue">
          <section id="spiegazioni">
            <Explainer />
          </section>
        </Band>

        {/* CTA finale (ancora #cta) */}
        <Band tone="blue">
          <section id="cta">
            <CTAUltra
              title="Vuoi numeri chiari sul tuo caso?"
              desc="Confronto reale, strumenti proprietari e percorso di crescita. Nessun costo fisso."
              primary={{ href: "/carriere/candidatura", label: "Invia candidatura" }}
              secondary={{ href: "/carriere/calcolatore", label: "Calcola i tuoi guadagni" }}
            />
          </section>
        </Band>

        {/* Swiper pagina Confronto */}
        <Band tone="dark">
          <SwiperConfronto />
        </Band>

        <Footer />
      </main>

      {/* Anchor offset SOLO per questa pagina */}
      <style jsx>{`
        :root {
          --header-h: 56px;
        }
        .confronto section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .confronto section[id] {
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
        .band {
          position: relative;
        }
        .band-dark {
          background:
            radial-gradient(40% 26% at 50% 0%, rgba(201, 168, 110, 0.1), transparent 62%),
            var(--brand-dark);
        }
        .band-blue {
          background:
            radial-gradient(40% 26% at 50% 0%, rgba(29, 45, 94, 0.34), transparent 62%),
            var(--brand);
        }
      `}</style>
    </div>
  );
}
