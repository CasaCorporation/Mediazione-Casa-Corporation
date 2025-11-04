// components/home/HeroExtremeCareers.jsx
"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShieldCheck, Users, Trophy, Wand2 } from "lucide-react";

export default function HeroExtremeCareers() {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskX = useTransform(mouseX, (v) => `${v}px`);
  const maskY = useTransform(mouseY, (v) => `${v}px`);

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <section id="hero-careers" ref={ref} onMouseMove={handleMouseMove} className="relative overflow-hidden">
      <div className="relative isolate grid min-h-[92svh] place-items-center bg-white">

        {/* === BG centrato (CONTAIN) con presenza più decisa su chiaro === */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="relative w-full max-w-[1600px] h-[min(92svh,800px)]" aria-hidden>
            <Image
              src="/home/hero.avif"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain object-center opacity-35 select-none pointer-events-none fx-on-light"
            />
          </div>
        </div>

        {/* BG video più tenue su chiaro */}
        <video
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-10"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/home/hero.mp4" type="video/mp4" />
        </video>

        {/* Glow + grid overlay (rete più leggibile su chiaro) + vignetta */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* Vignetta morbida per staccare dal bianco */}
          <div className="absolute inset-0 bg-[radial-gradient(140%_110%_at_50%_-10%,rgba(0,0,0,0.04),rgba(0,0,0,0)_58%)]" />
          {/* Vignetta periferica leggerissima */}
          <div className="absolute inset-0 bg-[radial-gradient(110%_85%_at_50%_120%,rgba(0,0,0,0.05),transparent_60%)]" />

          {/* Rete: leggermente più scura e satura su chiaro */}
          <div
            className="absolute -inset-[18%] h-[136%] w-[136%] opacity-[0.22]"
            style={{
              ["--grid-step"]: "clamp(16px, 2.1vw, 28px)",
              ["--grid-line"]: "1px",
              backgroundImage:
                "repeating-linear-gradient(0deg, color-mix(in oklab, var(--color-brand) 74%, transparent) 0, color-mix(in oklab, var(--color-brand) 74%, transparent) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step)), " +
                "repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-brand) 74%, transparent) 0, color-mix(in oklab, var(--color-brand) 74%, transparent) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step))",
            }}
          />

          {/* Glow brand leggermente più pieno */}
          <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full blur-3xl" style={{ background: "var(--gold)", opacity: 0.22 }} />
          <div className="absolute bottom-[-12%] right-[-10%] h-96 w-96 rounded-full blur-3xl" style={{ background: "#29407C", opacity: 0.18 }} />

          {/* Grana sottilissima per corpo su chiaro */}
          <div className="absolute inset-0 opacity-10 mix-blend-multiply noise-light" />
        </div>

        {/* Spotlight cursor (più ampio e soft su chiaro) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mask-soft"
          style={{ ["--x"]: maskX, ["--y"] : maskY }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(420px 280px at var(--x) var(--y), rgba(255,221,141,0.25), rgba(255,221,141,0.08) 45%, transparent 68%)",
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          {/* pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.08)] bg-[var(--color-brand)]/5 px-3 py-1 text-xs font-medium text-[var(--color-brand)] backdrop-blur">
            <Wand2 className="h-4 w-4 text-gold" /> Casa Corporation — Mediazione
          </span>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
            className="mt-6 text-balance text-4xl font-semibold leading-tight !text-[var(--color-brand)] sm:text-6xl md:text-7xl"
          >
            Valorizza, <span className="text-gold">vendi</span>, <span className="text-gold">affitta</span>.
            <br className="hidden md:block" />
            Metodo, strumenti, risultati.
          </motion.h1>

          {/* description */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.9 }}
            className="mx-auto mt-5 max-w-3xl text-pretty text-base text-[var(--color-brand)]/80 sm:text-lg"
          >
            Processi chiari, zero frizioni e strumenti proprietari. Dalla valutazione all’incarico, fino al rogito: KPI verificabili.
          </motion.p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/valorizza"
              className="rounded-2xl border border-gold/40 bg-gold/20 px-6 py-3 text-base text-gold shadow-[var(--shadow-gold)] transition hover:-translate-y-0.5"
            >
              Inizia da Valorizza →
            </a>
            <a
              href="/vendita"
              className="rounded-2xl border border-[rgba(0,0,0,0.10)] px-4 py-2 text-sm text-[var(--color-brand)]/90 hover:bg-[var(--color-brand)]/5"
            >
              Percorso Vendita
            </a>
            <a
              href="/affitto"
              className="rounded-2xl border border-[rgba(0,0,0,0.10)] px-4 py-2 text-sm text-[var(--color-brand)]/90 hover:bg-[var(--color-brand)]/5"
            >
              Percorso Affitto
            </a>
          </div>

          {/* badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[var(--color-brand)]/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.10)] bg-[var(--color-brand)]/6 px-3 py-1 text-xs backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-gold" /> Mandati trasparenti
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.10)] bg-[var(--color-brand)]/6 px-3 py-1 text-xs backdrop-blur">
              <Users className="h-4 w-4 text-gold" /> Team dedicato
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.10)] bg-[var(--color-brand)]/6 px-3 py-1 text-xs backdrop-blur">
              <Trophy className="h-4 w-4 text-gold" /> KPI verificabili
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-brand)]/60">
          <div className="flex items-center gap-2 text-xs">
            Scorri per esplorare
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-6 w-4 rounded-full border border-[rgba(0,0,0,0.18)]"
            />
          </div>
        </div>
      </div>

      {/* Mask CSS + effetti su chiaro */}
      <style jsx global>{`
        .mask-soft {
          --x: 50%;
          --y: 30%;
          /* spotlight più soft e ampio su chiaro */
          -webkit-mask-image: radial-gradient(340px 240px at var(--x) var(--y), rgba(0,0,0,0.9), transparent 70%);
          mask-image: radial-gradient(340px 240px at var(--x) var(--y), rgba(0,0,0,0.9), transparent 70%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }

        /* Boost leggibilità media su chiaro */
        .fx-on-light{
          filter: brightness(0.96) contrast(1.06) saturate(1.06) drop-shadow(0 6px 24px rgba(0,0,0,0.12));
        }

        /* Rumore sottilissimo per evitare “piatto” su sfondo bianco */
        .noise-light{
          background-image: url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0.5 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.22'/></svg>`)}");
          background-size: 140px 140px;
        }

        /* Fallback scoped: se qualcosa reimposta bianco, il titolo resta blu */
        #hero-careers h1 { color: var(--color-brand) !important; }
      `}</style>
    </section>
  );
}
