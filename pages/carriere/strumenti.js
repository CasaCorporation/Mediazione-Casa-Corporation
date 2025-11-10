// pages/carriere/strumenti.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

// HERO già presente nel progetto
import HeroStrumenti from "@/components/carriere/strumenti/hero/hero";

// Sezioni (con regole d'import tipografia)
import Stack from "@/components/carriere/strumenti/section/Stack";
import Integrations from "@/components/carriere/strumenti/section/Integrations";
import Security from "@/components/carriere/strumenti/section/Security";
import AutomationFlows from "@/components/carriere/strumenti/section/AutomationFlows";
import FeatureMatrix from "@/components/carriere/strumenti/section/FeatureMatrix";
import FAQ from "@/components/carriere/strumenti/section/FAQ";

// CTA riusabile
import CTAUltra from "@/common/section/CTAUltra";

export default function CareerToolsPage() {
  const ORG = "Casa Corporation";
  const title = "Lavora con noi — Strumenti";
  const description =
    "CRM proprietario, pipeline non aggirabili, dashboard KPI, integrazioni native e automazioni. Strumenti concreti per lavorare meglio.";
  const canonical = "https://www.casacorporation.it/carriere/strumenti";

  const NAV_ITEMS = [
    { id: "suite", label: "Suite" },             // alias: include ancora #stack
    { id: "integrazioni", label: "Integrazioni" },
    { id: "sicurezza", label: "Sicurezza" },
    { id: "flussi", label: "Automazioni" },
    { id: "funzioni", label: "Funzioni" },
    { id: "faq", label: "FAQ" },
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

      <main className="strumenti min-h-screen text-white">
        <Header />

        {/* Spacer per Header fixed */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO */}
        <section id="intro">
          <HeroStrumenti />
        </section>

        {/* LOCAL NAV sticky */}
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
        <Band tone="dark"><Stack /></Band>                 {/* id="suite" + alias #stack nel componente */}
        <Band tone="blue"><Integrations /></Band>          {/* id="integrazioni" */}
        <Band tone="dark"><Security /></Band>              {/* id="sicurezza" */}
        <Band tone="blue"><AutomationFlows /></Band>       {/* id="flussi" */}
        <Band tone="dark"><FeatureMatrix /></Band>         {/* id="funzioni" */}
        <Band tone="blue"><FAQ /></Band>                   {/* id="faq" */}

        {/* CTA finale ancorata */}
        <Band tone="blue">
          <section id="cta">
            <CTAUltra
              title="Vuoi provare gli strumenti sul tuo caso?"
              desc="Demo guidata, processi reali, zero giri di parole."
              primary={{ href: "/contatti?topic=strumenti", label: "Richiedi una demo" }}
              secondary={{ href: "/carriere/metodo", label: "Vedi il Metodo" }}
            />
          </section>
        </Band>

        <Footer />
      </main>

      {/* Anchor offset SOLO per questa pagina */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .strumenti section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .strumenti section[id] {
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
