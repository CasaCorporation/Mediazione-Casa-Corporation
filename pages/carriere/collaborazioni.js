// pages/carriere/collaborazioni.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import CTAUltra from "@/common/section/CTAUltra";
import SwiperCollaborazioni from "@/components/carriere/collaborazioni/swiper/swiper";

import HeroCollaborazioni from "@/components/carriere/collaborazioni/hero/hero";
import Overview from "@/components/carriere/collaborazioni/section/Overview";
import Types from "@/components/carriere/collaborazioni/section/Types";
import Process from "@/components/carriere/collaborazioni/section/Process";
import FAQ from "@/components/carriere/collaborazioni/section/FAQ";

export default function CollaborazioniPage() {
  const ORG = "Casa Corporation";
  const title = "Collaborazioni — Carriere";
  const description =
    "Modelli flessibili per freelance, studi e partner. Accreditamento rapido, KPI/SLA chiari e strumenti proprietari.";
  const canonical = "https://www.casacorporation.it/carriere/collaborazioni";

  const NAV_ITEMS = [
    { id: "overview", label: "Overview" },
    { id: "types", label: "Modelli" },
    { id: "process", label: "Processo" },
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

      <main className="collaborazioni min-h-screen text-white">
        <Header />

        {/* Spacer: evita overlap Header (fixed) ↔ Hero */}
        <div aria-hidden style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }} />

        {/* 1) HERO */}
        <section id="intro">
          <HeroCollaborazioni />
        </section>

        {/* 2) LOCAL NAV (sticky con Hero) */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "color-mix(in oklab, var(--brand) 88%, black)",
            accent: "var(--gold)",
            ring: "rgba(255,255,255,.16)",
          }}
        />

        {/* 3) SEZIONI con alternanza sfondi brand */}
        <Band tone="dark"><Overview /></Band>
        <Band tone="blue"><Types /></Band>
        <Band tone="dark"><Process /></Band>
        <Band tone="blue"><FAQ /></Band>

        {/* 4) CTA finale (#cta) */}
        <Band tone="dark">
          <section id="cta">
            <CTAUltra
              title="Proponi una collaborazione"
              desc="Accreditamento snello, KPI condivisi e strumenti proprietari."
              primary={{ href: "/carriere/candidatura?tipo=collaborazione", label: "Invia proposta" }}
              secondary={{ href: "/carriere/altre-posizioni", label: "Vedi altre posizioni" }}
            />
          </section>
        </Band>

        {/* 5) SWIPER → Altre posizioni */}
        <Band tone="blue">
          <SwiperCollaborazioni />
        </Band>

        <Footer />
      </main>

      {/* Anchor offset specifico pagina */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .collaborazioni section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .collaborazioni section[id] {
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
