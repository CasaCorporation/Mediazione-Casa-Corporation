// pages/carriere/confronto.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import CTAUltra from "@/common/section/CTAUltra";
import SEOConfronto from "@/components/carriere/confronto/seo/seo";
import HeroConfronto from "@/components/carriere/confronto/hero/hero";

// Sezioni
import ModelCards from "@/components/carriere/confronto/section/ModelCards";
import ComparisonTable from "@/components/carriere/confronto/section/ComparisonTable";
import Explainer from "@/components/carriere/confronto/section/Explainer";

// Swiper della pagina
import SwiperConfronto from "@/components/carriere/confronto/swiper/swiper";

export default function ConfrontoPage() {
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
      <SEOConfronto />
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>

      {/* SHELL CHIARO + testo blu brand */}
      <main className="confronto min-h-screen bg-white text-[var(--color-brand)]">
        <Header />

        {/* Spacer per Header fixed */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO: mantiene il proprio background */}
        <section id="panoramica">
          <HeroConfronto />
        </section>

        {/* LOCAL NAV sticky — GRIGIA */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "var(--nav-gray)",         // grigio chiaro
            accent: "var(--gold)",
            ring: "rgba(0,0,0,.12)",
          }}
        />

        {/* ===== CONTENUTI: alternanza CLEAN / DIRTY ===== */}
        <Band tone="clean">
          <section id="modelli">
            <ModelCards />
          </section>
        </Band>

        <Band tone="dirty">
          <section id="tabella">
            <ComparisonTable />
          </section>
        </Band>

        <Band tone="clean">
          <section id="spiegazioni">
            <Explainer />
          </section>
        </Band>

        {/* CTA finale */}
        <Band tone="dirty">
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
        <Band tone="clean">
          <SwiperConfronto />
        </Band>

        <Footer />
      </main>

      {/* Anchor offset + tokens pagina */}
      <style jsx>{`
        :root {
          --header-h: 56px;
        }
        .confronto { --nav-gray: rgba(246, 247, 250, 0.92); } /* GRIGIO NAV BAR */
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

/* ===== Wrapper "Band" — LIGHT EDITION =====
   tone="clean"  → bianco pulito
   tone="dirty"  → bianco molto sporco (solo tonalità, niente pattern)
*/
function Band({ tone = "clean", children }) {
  const cls = tone === "dirty" ? "band band-dirty" : "band band-clean";
  return (
    <div className={cls}>
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {children}
      </div>

      <style jsx>{`
        .band { position: relative; }

        /* CLEAN: bianco pieno */
        .band-clean { background: #ffffff; }

        /* DIRTY: bianco “molto sporco” (solo gradient) */
        .band-dirty {
          background:
            radial-gradient(120% 90% at 0% 0%, rgba(0,0,0,.05), transparent 60%),
            radial-gradient(120% 90% at 100% 0%, rgba(0,0,0,.045), transparent 62%),
            radial-gradient(90% 70% at 50% 110%, rgba(0,0,0,.05), transparent 64%),
            #fbfbfb;
        }
        /* leggerissima vignetta per stacco */
        .band-dirty::after{
          content:""; position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(120% 110% at 50% 0%, rgba(0,0,0,.035), transparent 60%),
            radial-gradient(120% 110% at 50% 100%, rgba(0,0,0,.03), transparent 65%);
          mix-blend-mode:multiply; opacity:.65;
        }
      `}</style>
    </div>
  );
}
