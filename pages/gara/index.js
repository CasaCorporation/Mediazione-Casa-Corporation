"use client";
import Head from "next/head";
import Link from "next/link";
import Header from "@/common/layout/Header";
import Footer from "@/common/layout/Footer";
import { Flag, Lock, ArrowRight } from "lucide-react";

export default function GaraPage() {
  return (
    <>
      <Head>
        <title>Gara aziendale — Carriere Casa Corporation</title>
        <meta name="description" content="Classifica live, ranking e premi. Accesso riservato." />
      </Head>

      <Header />

      <main className="min-h-screen pt-14 md:pt-16 text-white">
        {/* Mini Hero */}
        <section className="border-b border-white/10">
          <div className="container py-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold">
              <Flag className="h-3.5 w-3.5" />
              La Gara
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Classifica Live</h1>
            <p className="mx-auto mt-2 max-w-2xl text-white/80">
              Tabellone aggiornato, punteggi e classifiche. Accesso riservato.
            </p>
          </div>
        </section>

        {/* Card lock + CTA di servizio */}
        <section className="py-10 md:py-14">
          <div className="container">
            <div className="relative overflow-hidden rounded-2xl border border-gold/35 bg-white/[0.02] p-6 shadow-[0_12px_40px_rgba(10,20,40,.45)]">
              {/* Pattern a scacchi leggero */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(255,255,255,.18) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255,255,255,.18) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,.18) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.18) 75%)
                  `,
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
                }}
              />
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/30 px-3 py-1 text-[11px] font-semibold text-gold">
                  <Flag className="h-3.5 w-3.5" />
                  Gara (Live) — in arrivo
                </div>
                <h2 className="mt-3 text-2xl font-semibold">Accesso bloccato</h2>
                <p className="mt-1 max-w-2xl text-white/80">
                  La visualizzazione della classifica live sarà disponibile a breve. Nel frattempo, puoi consultare i modelli economici, il confronto e il calcolatore guadagni.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white/80">
                    <Lock className="h-4 w-4" />
                    Accesso riservato
                  </span>
                  <Link
                    href="/carriere/confronto"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-white/90 hover:bg-white/5"
                  >
                    Confronto modelli
                  </Link>
                  <Link
                    href="/carriere/calcolatore"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-white/90 hover:bg-white/5"
                  >
                    Calcolatore guadagni <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
