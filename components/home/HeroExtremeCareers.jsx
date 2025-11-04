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
      {/* wrapper chiaro */}
      <div className="relative isolate grid min-h-[92svh] place-items-center bg-white">

        {/* === BG centrato e CONTAIN === */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="relative w-full max-w-[1600px] h-[min(92svh,800px)]" aria-hidden>
            <Image
              src="/home/hero.avif"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain object-center opacity-20 select-none pointer-events-none"
            />
          </div>
        </div>

        {/* BG video opzionale */}
        <video
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-18"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/home/hero.mp4" type="video/mp4" />
        </video>

        {/* Glow + grid overlay (rete visibile anche su bianco) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* leggero glow alto */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(0,0,0,0.06),rgba(0,0,0,0)_60%)]" />
          {/* rete: linee blu brand molto soft */}
          <div
            className="absolute -inset-[20%] h-[140%] w-[140%] opacity-[0.18]"
            style={{
              ["--grid-step"]: "clamp(16px, 2.2vw, 28px)",
              ["--grid-line"]: "1px",
              backgroundImage:
                "repeating-linear-gradient(0deg, color-mix(in oklab, var(--color-brand) 65%, transparent) 0, color-mix(in oklab, var(--color-brand) 65%, transparent) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step)), " +
                "repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-brand) 65%, transparent) 0, color-mix(in oklab, var(--color-brand) 65%, transparent) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step))",
            }}
          />
          {/* blobs */}
          <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full blur-3xl" style={{ background: "var(--gold)", opacity: 0.18 }} />
          <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full blur-3xl" style={{ background: "#29407C", opacity: 0.14 }} />
        </div>

        {/* Spotlight cursor (leggero, su bianco) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mask-soft"
          style={{ ["--x"]: maskX, ["--y"] : maskY }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 0%, color-mix(in oklab, var(--gold) 26%, transparent), transparent 60%)",
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
            className="mt-6 text-balance text-4xl font-semibold leading-tight text-[var(--color-brand)] sm:text-6xl md:text-7xl"
          >
            Valorizza, <span className="text-gold">vendi</span>, <span className="text-gold">affitta</span>.<br className="hidden md:block" />
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

      {/* Mask CSS */}
      <style jsx global>{`
        .mask-soft {
          --x: 50%;
          --y: 30%;
          -webkit-mask-image: radial-gradient(240px 160px at var(--x) var(--y), rgba(0,0,0,0.9), transparent 60%);
          mask-image: radial-gradient(240px 160px at var(--x) var(--y), rgba(0,0,0,0.9), transparent 60%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
      `}</style>
    </section>
  );
}
