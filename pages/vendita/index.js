// pages/carriere/strumenti.js
"use client";

import Header from "@common/layout/Header";
import Footer from "@common/layout/Footer";
import LocalNav from "@common/nav/LocalNav";

// HERO già presente nel progetto
import HeroStrumenti from "@/components/carriere/strumenti/hero/hero";
import SeoStrumenti from "@/components/carriere/strumenti/seo/seo";

// Sezioni (contenuti)
import Stack from "@/components/carriere/strumenti/section/Stack";
import Integrations from "@/components/carriere/strumenti/section/Integrations";
import Security from "@/components/carriere/strumenti/section/Security";
import AutomationFlows from "@/components/carriere/strumenti/section/AutomationFlows";
import FeatureMatrix from "@/components/carriere/strumenti/section/FeatureMatrix";
import FAQ from "@/components/carriere/strumenti/section/FAQ";

// CTA riusabile
import CTAUltra from "@/common/section/CTAUltra";

export default function CareerToolsPage() {
  const NAV_ITEMS = [
    { id: "suite", label: "Suite" },
    { id: "integrazioni", label: "Integrazioni" },
    { id: "sicurezza", label: "Sicurezza" },
    { id: "flussi", label: "Automazioni" },
    { id: "funzioni", label: "Funzioni" },
    { id: "faq", label: "FAQ" },
    { id: "cta", label: "Candidati" },
  ];

  return (
    <>
      {/* SEO centralizzato (OG, canonical, JSON-LD) */}
      <SeoStrumenti />

      {/* SHELL CHIARO */}
      <main className="strumenti min-h-screen bg-white text-[var(--color-brand)]">
        <Header />

        {/* Spacer per Header fixed */}
        <div
          aria-hidden
          style={{ height: "calc(var(--header-h, 56px) + env(safe-area-inset-top, 0px))" }}
        />

        {/* HERO (se è scuro dentro, resta leggibile; la pagina è chiara) */}
        <section id="intro">
          <HeroStrumenti />
        </section>

        {/* LOCAL NAV sticky – tema chiaro */}
        <LocalNav
          items={NAV_ITEMS}
          topOffset="var(--header-h, 56px)"
          theme={{
            bg: "rgba(255,255,255,.88)",
            accent: "var(--gold)",
            ring: "rgba(0,0,0,.12)",
          }}
        />

        {/* ===== CONTENUTI: alternanza bianco pulito / bianco molto sporco ===== */}
        <Band tone="clean" id="suite"><Stack /></Band>
        <Band tone="dirty" id="integrazioni"><Integrations /></Band>
        <Band tone="clean" id="sicurezza"><Security /></Band>
        <Band tone="dirty" id="flussi"><AutomationFlows /></Band>
        <Band tone="clean" id="funzioni"><FeatureMatrix /></Band>
        <Band tone="dirty" id="faq"><FAQ /></Band>

        {/* CTA finale su “dirty” per farla risaltare */}
        <Band tone="dirty" id="cta">
          <section>
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

/* ===== Wrapper "Band" — LIGHT EDITION =====
   tone="clean" → bianco pulito
   tone="dirty" → bianco “molto sporco” con grana, griglia tenuissima e vignetta soft
*/
function Band({ tone = "clean", id, children }) {
  const cls = tone === "dirty" ? "band band-dirty" : "band band-clean";
  return (
    <section id={id} className={cls}>
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {children}
      </div>

      <style jsx>{`
        .band { position: relative; }

        /* --- CLEAN: bianco pulito --- */
        .band-clean {
          background: #ffffff;
        }

        /* --- DIRTY: bianco molto sporco (solo CSS, nessun asset esterno) --- */
        .band-dirty {
          /* base off-white */
          background:
            radial-gradient(120% 80% at 10% -10%, rgba(0,0,0,.03), transparent 60%),
            radial-gradient(120% 80% at 110% 0%, rgba(0,0,0,.035), transparent 62%),
            radial-gradient(80% 60% at 50% 120%, rgba(0,0,0,.04), transparent 64%),
            #fbfbfb;
        }
        /* griglia finissima blu brand + vignetta + grana via pseudo-elementi */
        .band-dirty::before,
        .band-dirty::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        /* griglia tenue (rete) */
        .band-dirty::before {
          opacity: 0.12;
          background-image:
            repeating-linear-gradient(
              0deg,
              color-mix(in oklab, var(--color-brand) 28%, transparent) 0,
              color-mix(in oklab, var(--color-brand) 28%, transparent) 1px,
              transparent 1px,
              transparent 26px
            ),
            repeating-linear-gradient(
              90deg,
              color-mix(in oklab, var(--color-brand) 28%, transparent) 0,
              color-mix(in oklab, var(--color-brand) 28%, transparent) 1px,
              transparent 1px,
              transparent 26px
            );
          mask-image: radial-gradient(120% 100% at 50% 50%, black 60%, transparent 92%);
        }
        /* grana (noise) + vignetta */
        .band-dirty::after {
          /* tiny SVG noise (base64) + vignetta */
          background:
            radial-gradient(120% 120% at 50% 20%, rgba(0,0,0,.06), transparent 60%),
            radial-gradient(120% 100% at 50% 120%, rgba(0,0,0,.06), transparent 64%),
            url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0iYSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsdGVyPSJ1cmwoI2EpIiBmaWxsPSIjMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+PC9zdmc+");
          background-blend-mode: multiply;
          opacity: .55;
          mix-blend-mode: multiply;
        }
      `}</style>
    </section>
  );
}
