// pages/carriere/confronto.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import CTAUltra from "@/common/section/CTAUltra";
import SEOConfronto from "@/components/carriere/vendita/seo/seo"; // SEO specifico
import HeroConfronto from "@/components/carriere/vendita/hero/hero";

// Sezioni
import ModelCards from "@/components/carriere/vendita/section/ModelCards";
import ComparisonTable from "@/components/carriere/vendita/section/ComparisonTable";
import Explainer from "@/components/carriere/vendita/section/Explainer";

// Swiper della pagina (solo configurazione, come da progetto)
import SwiperConfronto from "@/components/carriere/vendita/swiper/swiper";

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

  // palette locali SOLO per questa pagina (niente css globali)
  const INK = "rgba(10,16,36,1)"; // blu scurissimo testo
  const INK_16 = "rgba(10,16,36,.16)";
  const INK_06 = "rgba(10,16,36,.06)";
  const WHITE = "#FFFFFF";
  const WHITE_SOFT = "#F6F7FB"; // “bianco scuro” per alternanza

  return (
    <>
      {/* SEO dedicato (title, description, og, ecc.) */}
      <SEOConfronto />

      {/* Canonical */}
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>

      {/* testo ink permanente qui */}
      <main className="confronto min-h-screen" style={{ color: INK, backgroundColor: WHITE }}>
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

        {/* LOCAL NAV sticky — tema chiaro */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: `linear-gradient(180deg, ${WHITE} 0%, ${WHITE_SOFT} 100%)`,
            accent: "var(--gold)",
            ring: INK_16, // sostituisce i ring white
          }}
        />

        {/* ===== CONTENUTI con alternanza tra due bianchi ===== */}
        <Band tone="light-soft" ink={INK} whiteSoft={WHITE_SOFT} white={WHITE} ink06={INK_06}>
          <section id="modelli">
            <ModelCards />
          </section>
        </Band>

        <Band tone="light" ink={INK} whiteSoft={WHITE_SOFT} white={WHITE} ink06={INK_06}>
          <section id="tabella">
            <ComparisonTable />
          </section>
        </Band>

        <Band tone="light-soft" ink={INK} whiteSoft={WHITE_SOFT} white={WHITE} ink06={INK_06}>
          <section id="spiegazioni">
            <Explainer />
          </section>
        </Band>

        {/* CTA finale (ancora #cta) */}
        <Band tone="light-soft" ink={INK} whiteSoft={WHITE_SOFT} white={WHITE} ink06={INK_06}>
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
        <Band tone="light" ink={INK} whiteSoft={WHITE_SOFT} white={WHITE} ink06={INK_06}>
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

/* ===== Wrapper "Band" per alternare i due bianchi (visivamente diversi) =====
   tone="light"       → bianco pieno
   tone="light-soft"  → bianco "scuro" (soft) */
function Band({ tone = "light", children, ink = "rgba(10,16,36,1)", whiteSoft = "#F6F7FB", white = "#FFFFFF", ink06 = "rgba(10,16,36,.06)" }) {
  const isSoft = tone === "light-soft";
  const cls = "band";
  return (
    <div className={cls}>
      {children}
      <style jsx>{`
        .band {
          position: relative;
          /* separazione visiva fra blocchi */
          padding-top: 0.01px; /* anti-collasso */
        }
        /* “Bianco scuro” con un leggero bagliore gold (molto soft) */
        .band {
          background:
            radial-gradient(40% 26% at 50% 0%, rgba(201,168,110,0.08), transparent 62%),
            ${isSoft ? whiteSoft : white};
        }
      `}</style>

      {/* velo “ink” leggerissimo solo per la variante white pieno (ex “blue”) */}
      {!isSoft && (
        <div
          aria-hidden
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            background:
              // sostituisce l’ex “alone” blu con un’ombra appena percettibile
              `radial-gradient(40% 26% at 50% 0%, ${ink06}, transparent 62%)`,
          }}
        />
      )}
    </div>
  );
}
