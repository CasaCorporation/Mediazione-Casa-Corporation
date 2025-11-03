// pages/carriere/confronto.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import CTAUltra from "@/common/section/CTAUltra";
import SEOConfronto from "@/components/carriere/vendita/seo/seo";
import HeroConfronto from "@/components/carriere/vendita/hero/hero";
import ModelCards from "@/components/carriere/vendita/section/ModelCards";
import ComparisonTable from "@/components/carriere/vendita/section/ComparisonTable";
import Explainer from "@/components/carriere/vendita/section/Explainer";
import SwiperConfronto from "@/components/carriere/vendita/swiper/swiper";

/* ✅ preset solo colori (niente items) */
import { LOCALNAV_THEME_LIGHT } from "@/components/common/nav/localNav.theme.js";
/* ✅ persistenza in JS */
import { useLocalNavPersistence } from "@/components/common/nav/useLocalNavPersistence.js";

export default function ConfrontoPage() {
  const canonical = "https://www.casacorporation.it/carriere/confronto";

  /* Items locali: riusiamo questo schema anche su altre pagine */
  const NAV_ITEMS = [
    { id: "panoramica",  label: "Panoramica" },
    { id: "modelli",     label: "Modelli" },
    { id: "tabella",     label: "Tabella" },
    { id: "spiegazioni", label: "Spiegazioni" },
    { id: "cta",         label: "Candidati" },
  ];

  // “salva” la sezione attiva per questa pagina
  const { onNavClick } = useLocalNavPersistence("localnav:confronto", NAV_ITEMS);

  return (
    <>
      <SEOConfronto />
      <Head><link rel="canonical" href={canonical} /></Head>

      <main className="confronto min-h-screen" style={{ color: "rgba(10,16,36,1)", backgroundColor: "#fff" }}>
        <Header />

        {/* Spacer per Header fixed */}
        <div aria-hidden style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }} />

        {/* HERO */}
        <section id="panoramica"><HeroConfronto /></section>

        {/* LocalNav: preset SOLO COLORI + persistenza click */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={LOCALNAV_THEME_LIGHT}
          onItemClick={(id) => onNavClick(id)}
        />

        {/* ===== CONTENUTI con alternanza tra due bianchi ===== */}
        <Band tone="light-soft">
          <section id="modelli"><ModelCards /></section>
        </Band>

        <Band tone="light">
          <section id="tabella"><ComparisonTable /></section>
        </Band>

        <Band tone="light-soft">
          <section id="spiegazioni"><Explainer /></section>
        </Band>

        <Band tone="light-soft">
          <section id="cta">
            <CTAUltra
              title="Vuoi numeri chiari sul tuo caso?"
              desc="Confronto reale, strumenti proprietari e percorso di crescita. Nessun costo fisso."
              primary={{ href: "/carriere/candidatura", label: "Invia candidatura" }}
              secondary={{ href: "/carriere/calcolatore", label: "Calcola i tuoi guadagni" }}
            />
          </section>
        </Band>

        {/* Swiper */}
        <Band tone="light"><SwiperConfronto /></Band>

        <Footer />
      </main>

      {/* Anchor offset SOLO per questa pagina */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .confronto section[id] { scroll-margin-top: calc(var(--header-h, 56px) + 64px); }
        @media (min-width: 768px) {
          .confronto section[id] { scroll-margin-top: calc(var(--header-h, 56px) + 72px); }
        }
      `}</style>
    </>
  );
}

/* Wrapper con “due bianchi” */
function Band({ tone = "light", children }) {
  const WHITE = "#FFFFFF";
  const WHITE_SOFT = "#F6F7FB";
  const INK_06 = "rgba(10,16,36,.06)";
  const isSoft = tone === "light-soft";
  return (
    <div className="band">
      {children}
      <style jsx>{`
        .band {
          position: relative;
          background:
            radial-gradient(40% 26% at 50% 0%, rgba(201,168,110,0.08), transparent 62%),
            ${isSoft ? WHITE_SOFT : WHITE};
        }
      `}</style>
      {!isSoft && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(40% 26% at 50% 0%, ${INK_06}, transparent 62%)`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
