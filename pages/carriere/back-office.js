"use client";

import Head from "next/head";
import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

// SWIPER SPECIFICO DELLA PAGINA (come su Agenti)
import SwiperBackOffice from "@/components/carriere/back-office/swiper/swiper";

import HeroIntro from "@/components/carriere/back-office/hero/hero";

import Intro from "@/components/carriere/back-office/section/Intro";
import Role from "@/components/carriere/back-office/section/Role";                 // La figura
import Compensation from "@/components/carriere/back-office/section/Compensation"; // Piano compensi
import Benefits from "@/components/carriere/back-office/section/Benefits";         // Strumenti & Benefit

// Software aziendale: riuso della sezione degli Agenti
import SoftwareSuite from "@/components/carriere/agenti-immobiliari/section/SoftwareSuite";

// CTA comune
import CTAUltra from "@/common/section/CTAUltra";

export default function CareerBackOfficePage() {
  const ORG = "Casa Corporation";
  const title = "Lavora con noi — Back Office";
  const description =
    "Regia operativa tra Agenti, Clienti e Direzione. Processi chiari, strumenti proprietari, formazione mirata.";
  const canonical = "https://www.casacorporation.it/carriere/back-office";

  const NAV_ITEMS = [
    { id: "intro", label: "Introduzione" },
    { id: "figura", label: "La figura" },
    { id: "compensi", label: "Piano compensi" },
    { id: "benefit", label: "Strumenti & Benefit" },
    { id: "software", label: "Software aziendale" },
    { id: "cta", label: "Candidati" },
  ];

  return (
    <>
      <Head>
        <title>{title} | {ORG}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {/* OG basilari (solo share) */}
        <meta property="og:title" content={`${title} | ${ORG}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      {/* NB: className="backoffice" per scoping dello scroll-margin */}
      <main className="backoffice min-h-screen text-white">
        <Header />

        {/* Spacer anti-overlap header fixed */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO (sezione #intro) */}
        <section id="intro">
          <HeroIntro />
        </section>

        {/* LOCAL NAV (come Agenti) */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "color-mix(in oklab, var(--brand) 88%, black)",
            accent: "var(--gold)",
            ring: "rgba(255,255,255,.16)",
          }}
        />

        {/* ===== CONTENUTI (alternanza sfondi) ===== */}
        <Band tone="dark">
          <Intro />
        </Band>

        <Band tone="blue">
          <section id="figura">
            <Role />
          </section>
        </Band>

        <Band tone="dark">
          <section id="compensi">
            <Compensation />
          </section>
        </Band>

        <Band tone="blue">
          <section id="benefit">
            <Benefits />
          </section>
        </Band>

        <Band tone="dark">
          {/* Software aziendale riusato dagli Agenti */}
          <section id="software">
            <SoftwareSuite />
          </section>
        </Band>

        {/* CTA globale (#cta) */}
        <Band tone="blue">
          <section id="cta">
            <CTAUltra
              title="Pronto a candidarti?"
              desc="Zero frizioni. Metodo chiaro, tutela e strumenti proprietari."
              primary={{ href: "/carriere/candidatura?role=back-office", label: "Invia candidatura" }}
              secondary={{ href: "/carriere/back-office", label: "Rivedi requisiti" }}
            />
          </section>
        </Band>

        {/* SWIPER verso Collaborazioni — come su Agenti (component di pagina) */}
        <Band tone="dark">
          <SwiperBackOffice /> {/* dentro implementeremo il link a /carriere/collaborazioni */}
        </Band>

        <Footer />
      </main>

      {/* Anchor offset SOLO per questa pagina */}
      <style jsx>{`
        :root { --header-h: 56px; }
        .backoffice section[id] {
          scroll-margin-top: calc(var(--header-h, 56px) + 64px);
        }
        @media (min-width: 768px) {
          .backoffice section[id] {
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
