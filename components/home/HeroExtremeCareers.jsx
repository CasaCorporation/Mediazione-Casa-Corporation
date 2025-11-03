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
      <div className="relative isolate grid min-h-[92svh] place-items-center bg-[var(--brand-dark)]">

        {/* === BG centrato e CONTAIN (non “esplode”) === */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div
            className="relative w-full max-w-[1600px] h-[min(92svh,800px)]"
            aria-hidden
          >
            <Image
              src="/home/hero.avif"          // assicurati che sia in /public/home/villa.webp
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain object-center opacity-30 select-none pointer-events-none"
            />
          </div>
        </div>

        {/* BG video opzionale (resta dietro, stesso layer) */}
        <video
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/home/hero.mp4" type="video/mp4" />
        </video>

        {/* Glow + grid overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(255,255,255,0.10),rgba(255,255,255,0)_60%)]" />
          <div
            className="absolute -inset-[20%] h-[140%] w-[140%] opacity-[0.06]"
            style={{
              ["--grid-step"]: "clamp(16px, 2.2vw, 28px)",
              ["--grid-line"]: "1px",
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step)), " +
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step))",
            }}
          />
          <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full blur-3xl" style={{ background: "var(--gold)", opacity: 0.20 }} />
          <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full blur-3xl" style={{ background: "#29407C", opacity: 0.25 }} />
        </div>

        {/* Spotlight cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mask-soft"
          style={{ ["--x"]: maskX, ["--y"]: maskY }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(80% 80% at 50% 0%, rgba(212,175,55,0.18), rgba(212,175,55,0) 60%)" }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            <Wand2 className="h-4 w-4 text-gold" /> Casa Corporation — Carriere
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
            className="mt-6 text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl"
          >
            Costruisci la tua <span className="text-gold">carriera</span>.<br className="hidden md:block" />
            Metodo, strumenti, risultati.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.9 }}
            className="mx-auto mt-5 max-w-3xl text-pretty text-base text-white/75 sm:text-lg"
          >
            Percorsi chiari, zero frizioni e software proprietari. Dall’onboarding alla crescita,
            con meritocrazia e KPI verificabili.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="/carriere/agenti-immobiliari" className="rounded-2xl border border-gold/40 bg-gold/20 px-6 py-3 text-base text-gold shadow-[var(--shadow-gold)] transition hover:-translate-y-0.5">
              Vedi i ruoli →
            </a>
            <a href="/carriere/metodo" className="rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
              Il nostro metodo
            </a>
            <a href="/carriere/confronto" className="rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
              Confronto modelli
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-gold" /> Contratto trasparente
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur">
              <Users className="h-4 w-4 text-gold" /> Tutoring reale
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur">
              <Trophy className="h-4 w-4 text-gold" /> Gara trimestrale
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60">
          <div className="flex items-center gap-2 text-xs">
            Scorri per esplorare
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="h-6 w-4 rounded-full border border-white/20" />
          </div>
        </div>
      </div>

      {/* Mask CSS */}
      <style jsx global>{`
        .mask-soft {
          --x: 50%;
          --y: 30%;
          -webkit-mask-image: radial-gradient(240px 160px at var(--x) var(--y), rgba(0,0,0,0.95), transparent 60%);
          mask-image: radial-gradient(240px 160px at var(--x) var(--y), rgba(0,0,0,0.95), transparent 60%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
      `}</style>
    </section>
  );
}
