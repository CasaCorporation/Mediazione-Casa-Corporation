// pages/carriere/gara.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

import HeroGara from "@/components/carriere/gara/hero/hero";
import WhyItWorks from "@/components/carriere/gara/section/WhyItWorks";
import Leaderboard from "@/components/carriere/gara/section/LeaderBoard";
import ContestTable from "@/components/carriere/gara/section/ContestTable";
import Explainer from "@/components/carriere/gara/section/Explainer";

import CTAUltra from "@/common/section/CTAUltra";
import SwiperGara from "@/components/carriere/gara/swiper/swiper";

export default function GaraPage() {
  const ORG = "Casa Corporation";
  const title = "Gara aziendale — Carriere";
  const description =
    "Classifica trimestrale, tabella compensi dimostrativa e regolamento: premi oltre il 100%, provvigione 60% sempre.";
  const canonical = "https://www.casacorporation.it/carriere/gara";

  const NAV_ITEMS = [
    { id: "panoramica", label: "Panoramica" },
    { id: "perche-funziona", label: "Perché funziona" }, // NEW: Sezione 1
    { id: "classifica", label: "Classifica" },
    { id: "tabella", label: "Tabella 1–50" },
    { id: "come-funziona", label: "Come funziona" },
    { id: "cta", label: "Partecipa" },
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

      <main className="gara min-h-screen text-white">
        <Header />

        {/* Spacer per header fixed */}
        <div aria-hidden style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }} />

        {/* HERO */}
        <section id="panoramica">
          <HeroGara />
        </section>

        {/* Local Nav */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "color-mix(in oklab, var(--brand) 88%, black)",
            accent: "var(--gold)",
            ring: "rgba(255,255,255,.16)",
          }}
        />

        {/* ===== CONTENUTI (bande alternate) ===== */}
        <Band tone="dark">
          <WhyItWorks />
        </Band>

        <Band tone="blue">
          <section id="classifica">
            <Leaderboard />
          </section>
        </Band>

        <Band tone="dark">
          <section id="tabella">
            <ContestTable />
          </section>
        </Band>

        <Band tone="blue">
          <section id="come-funziona">
            <Explainer />
          </section>
        </Band>

        {/* CTA finale ancorata */}
        <Band tone="blue">
          <section id="cta">
            <CTAUltra
              title="Partecipa alla Gara"
              desc="Nessun costo di partecipazione. Premi concreti, regole chiare, risultati misurabili."
              primary={{ href: "/carriere/candidatura?topic=candidatura&ruolo=agente-senior", label: "Candidati ora" }}
              secondary={{ href: "/carriere/agenti-immobiliari", label: "Vedi i ruoli" }}
            />
          </section>
        </Band>

        {/* Swiper finale */}
        <Band tone="dark">
          <SwiperGara />
        </Band>

        <Footer />
      </main>

      {/* Anchor offset come pagina Agenti */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .gara section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .gara section[id] {
            scroll-margin-top: calc(var(--header-h, 56px) + 72px);
          }
        }
      `}</style>
    </>
  );
}

/* ===== Wrapper "Band" per alternare i due blu del brand ===== */
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
