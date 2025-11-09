// pages/azienda/formazione.js
"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

// HERO + SEZIONI
import HeroFormazione from "@/components/carriere/formazione/hero/Hero";
import Paths from "@/components/carriere/formazione/section/Paths";
import Program from "@/components/carriere/formazione/section/Program";
import Mentorship from "@/components/carriere/formazione/section/Mentorship";
import Assessment from "@/components/carriere/formazione/section/Assessment";
import Resources from "@/components/carriere/formazione/section/Resources";
import FAQ from "@/components/carriere/formazione/section/FAQ";

// CTA riusabile
import CTAUltra from "@/common/section/CTAUltra";

// Swiper dedicato (come da regola: components/carriere/nome-pagina/swiper/swiper.jsx)
import SwiperFormazione from "@/components/carriere/formazione/swiper/swiper";

export default function FormazionePage() {
  const ORG = "Casa Corporation";
  const title = "Formazione — Azienda";
  const description =
    "Percorsi strutturati, mentoring, verifiche e materiali: formazione reale, applicata al lavoro.";
  // Canonical allineato al percorso reale del file
  const canonical = "https://www.casacorporation.it/azienda/formazione";

  const NAV_ITEMS = [
    { id: "panoramica", label: "Panoramica" },
    { id: "percorsi", label: "Percorsi" },
    { id: "programma", label: "Programma" },
    { id: "mentorship", label: "Mentorship" },
    { id: "verifiche", label: "Verifiche" },
    { id: "risorse", label: "Risorse" },
    { id: "faq", label: "FAQ" },
    { id: "cta", label: "Candidati" },
  ];

  return (
    <>
      <Head>
        <title>
          {title} | {ORG}
        </title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${title} | ${ORG}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      {/* NB: className="formazione" per scoping offset ancore */}
      <main className="formazione min-h-screen text-white">
        <Header />

        {/* Spacer per evitare sovrapposizione Header (fixed) ↔ Hero */}
        <div
          aria-hidden
          style={{
            height:
              "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))",
          }}
        />

        {/* HERO (con il suo background indipendente) */}
        <section id="panoramica">
          <HeroFormazione />
        </section>

        {/* LOCAL NAV sticky subito sotto al Hero */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "color-mix(in oklab, var(--brand) 88%, black)",
            accent: "var(--gold)",
            ring: "rgba(255,255,255,.16)",
          }}
        />

        {/* ===== CONTENUTI—alternanza sfondi brand ===== */}
        <Band tone="dark">
          <section id="percorsi">
            <Paths />
          </section>
        </Band>

        <Band tone="blue">
          <section id="programma">
            <Program />
          </section>
        </Band>

        <Band tone="dark">
          <section id="mentorship">
            <Mentorship />
          </section>
        </Band>

        <Band tone="blue">
          <section id="verifiche">
            <Assessment />
          </section>
        </Band>

        <Band tone="dark">
          <section id="risorse">
            <Resources />
          </section>
        </Band>

        <Band tone="blue">
          <section id="faq">
            <FAQ />
          </section>
        </Band>

        {/* CTA globale (ancorata) */}
        <Band tone="blue">
          <section id="cta">
            <CTAUltra
              title="Vuoi crescere con metodo?"
              desc="Percorsi chiari, mentoring reale e strumenti proprietari. Inizia ora."
              primary={{ href: "/carriere/candidatura", label: "Invia candidatura" }}
              secondary={{ href: "/carriere/benefit", label: "Vedi strumenti e benefit" }}
            />
          </section>
        </Band>

        {/* Swiper finale coerente con la pagina */}
        <Band tone="dark">
          <SwiperFormazione />
        </Band>

        <Footer />
      </main>

      {/* Offset ancore come nelle altre pagine */}
      <style jsx>{`
        :root {
          --header-h: 56px;
        }
        .formazione section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .formazione section[id] {
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
          background: radial-gradient(
              40% 26% at 50% 0%,
              rgba(201, 168, 110, 0.1),
              transparent 62%
            ),
            var(--brand-dark);
        }
        .band-blue {
          background: radial-gradient(
              40% 26% at 50% 0%,
              rgba(29, 45, 94, 0.34),
              transparent 62%
            ),
            var(--brand);
        }
      `}</style>
    </div>
  );
}
