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
<<<<<<< HEAD
    <section id="hero-careers" ref={ref} onMouseMove={handleMouseMove} className="relative overflow-hidden">
      <div className="relative isolate grid min-h-[92svh] place-items-center bg-[var(--brand-dark)]">

        {/* === BG centrato e CONTAIN (non “esplode”) === */}
=======
    <section
      id="hero-careers"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden"
    >
      <div className="relative isolate grid min-h-[92svh] place-items-center bg-white">

        {/* === BG centrato (CONTAIN) === */}
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div
            className="relative w-full max-w-[1600px] h-[min(92svh,800px)]"
            aria-hidden
          >
            <Image
<<<<<<< HEAD
              src="/home/hero.avif"          // assicurati che sia in /public/home/villa.webp
=======
              src="/home/hero.avif"  /* sostituisci con la nuova immagine trasparente */
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain object-center opacity-30 select-none pointer-events-none"
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* BG video opzionale (resta dietro, stesso layer) */}
=======
        {/* BG video tenue su chiaro (opzionale) */}
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
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

<<<<<<< HEAD
        {/* Glow + grid overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(255,255,255,0.10),rgba(255,255,255,0)_60%)]" />
=======
        {/* Glow + grid + vignette */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(140%_110%_at_50%_-10%,rgba(0,0,0,0.045),rgba(0,0,0,0)_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(110%_85%_at_50%_120%,rgba(0,0,0,0.055),transparent_60%)]" />
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
          <div
            className="absolute -inset-[20%] h-[140%] w-[140%] opacity-[0.06]"
            style={{
              ["--grid-step"]: "clamp(16px, 2.2vw, 28px)",
              ["--grid-line"]: "1px",
              backgroundImage:
<<<<<<< HEAD
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
=======
                "repeating-linear-gradient(0deg, color-mix(in oklab, var(--color-brand) 78%, transparent) 0, color-mix(in oklab, var(--color-brand) 78%, transparent) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step)), " +
                "repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-brand) 78%, transparent) 0, color-mix(in oklab, var(--color-brand) 78%, transparent) var(--grid-line), transparent var(--grid-line), transparent var(--grid-step))",
            }}
          />
          <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full blur-3xl"
               style={{ background: "var(--gold)", opacity: 0.22 }} />
          <div className="absolute bottom-[-12%] right-[-10%] h-96 w-96 rounded-full blur-3xl"
               style={{ background: "#29407C", opacity: 0.18 }} />
          <div className="absolute inset-0 opacity-10 mix-blend-multiply noise-light" />
        </div>

        {/* Spotlight */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 mask-soft"
          style={{ ["--x"]: maskX, ["--y"]: maskY }} >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(420px 280px at var(--x) var(--y), rgba(255,221,141,0.22), rgba(255,221,141,0.08) 45%, transparent 68%)",
            }}
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
<<<<<<< HEAD
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            <Wand2 className="h-4 w-4 text-gold" /> Casa Corporation — Carriere
=======
          {/* pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--brand-ink)]/4 px-3 py-1 text-xs font-medium text-[var(--brand-ink)] backdrop-blur">
            <Wand2 className="h-4 w-4 text-gold" /> Casa Corporation — Mediazione
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
<<<<<<< HEAD
            className="mt-6 text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl"
=======
            className="mt-6 text-balance text-4xl font-semibold leading-tight text-[var(--brand-ink)] sm:text-6xl md:text-7xl"
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
          >
            Costruisci la tua <span className="text-gold">carriera</span>.<br className="hidden md:block" />
            Metodo, strumenti, risultati.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.9 }}
<<<<<<< HEAD
            className="mx-auto mt-5 max-w-3xl text-pretty text-base text-white/75 sm:text-lg"
=======
            className="mx-auto mt-5 max-w-3xl text-pretty text-base text-[var(--ink-soft)] sm:text-lg"
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
          >
            Percorsi chiari, zero frizioni e software proprietari. Dall’onboarding alla crescita,
            con meritocrazia e KPI verificabili.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
<<<<<<< HEAD
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
=======
            {/* Primaria (gold, alto contrasto) */}
            <a
              href="/valorizza"
              aria-label="Inizia da Valorizza"
              className="btn-primary-gold"
            >
              Inizia da Valorizza →
            </a>

            {/* Secondarie (ink, bordo chiaro, hover soft) */}
            <a
              href="/vendita"
              aria-label="Percorso Vendita"
              className="btn-secondary-ink"
            >
              Percorso Vendita
            </a>

            <a
              href="/affitto"
              aria-label="Percorso Affitto"
              className="btn-secondary-ink"
            >
              Percorso Affitto
            </a>
          </div>

          {/* badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[var(--ink-soft)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--brand-ink)]/4 px-3 py-1 text-xs backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-gold" /> Mandati trasparenti
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--brand-ink)]/4 px-3 py-1 text-xs backdrop-blur">
              <Users className="h-4 w-4 text-gold" /> Team dedicato
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--brand-ink)]/4 px-3 py-1 text-xs backdrop-blur">
              <Trophy className="h-4 w-4 text-gold" /> KPI verificabili
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
            </span>
          </div>
        </div>

        {/* Scroll hint */}
<<<<<<< HEAD
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60">
          <div className="flex items-center gap-2 text-xs">
            Scorri per esplorare
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="h-6 w-4 rounded-full border border-white/20" />
=======
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--ink-soft)]">
          <div className="flex items-center gap-2 text-xs">
            Scorri per esplorare
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-6 w-4 rounded-full border border-[var(--border-strong)]"
            />
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Mask CSS */}
=======
      {/* Styles (tema chiaro calibrato) */}
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
      <style jsx global>{`
        /* ====== Token "ink" per tema chiaro (derivati dal brand) ====== */
        :root {
          --brand-ink: color-mix(in oklab, var(--color-brand) 84%, #0a0a0a 16%);
          --ink-soft: color-mix(in oklab, var(--brand-ink) 70%, #0a0a0a 30%);
          --border-soft: rgba(0,0,0,0.08);
          --border-strong: rgba(0,0,0,0.12);
        }

        /* Spotlight morbido */
        .mask-soft {
          --x: 50%;
          --y: 30%;
<<<<<<< HEAD
          -webkit-mask-image: radial-gradient(240px 160px at var(--x) var(--y), rgba(0,0,0,0.95), transparent 60%);
          mask-image: radial-gradient(240px 160px at var(--x) var(--y), rgba(0,0,0,0.95), transparent 60%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
=======
          -webkit-mask-image: radial-gradient(340px 240px at var(--x) var(--y), rgba(0,0,0,0.88), transparent 70%);
          mask-image: radial-gradient(340px 240px at var(--x) var(--y), rgba(0,0,0,0.88), transparent 70%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }

        /* Boost leggibilità media su chiaro */
        .fx-on-light {
          filter: brightness(0.96) contrast(1.06) saturate(1.06) drop-shadow(0 6px 24px rgba(0,0,0,0.12));
        }

        /* Rumore sottilissimo per evitare “piatto” su sfondo bianco */
        .noise-light {
          background-image: url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0.5 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.22'/></svg>`)}");
          background-size: 140px 140px;
        }

        /* Titolo forzato su brand-ink */
        #hero-careers h1 { color: var(--brand-ink) !important; }

        /* ====== Bottoni (accessibilità AA su chiaro) ====== */
        .btn-primary-gold {
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 1rem;
          background: color-mix(in oklab, var(--gold) 88%, #000 12%);
          color: #2a1e00; /* testo scuro su gold per AA */
          border: 1px solid color-mix(in oklab, var(--gold) 55%, #000 45%);
          box-shadow:
            0 6px 16px rgba(0,0,0,.08),
            0 2px 0 rgba(0,0,0,.04) inset,
            0 0 0 0 rgba(212,175,55,.0);
          font-weight: 600;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .btn-primary-gold:hover {
          transform: translateY(-1px);
          background: color-mix(in oklab, var(--gold) 92%, #000 8%);
          box-shadow:
            0 10px 22px rgba(0,0,0,.10),
            0 0 0 4px rgba(212,175,55,.15);
        }
        .btn-primary-gold:focus-visible {
          outline: none;
          box-shadow:
            0 10px 22px rgba(0,0,0,.10),
            0 0 0 4px rgba(212,175,55,.22);
        }

        .btn-secondary-ink {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.6rem 0.9rem;
          border-radius: 0.9rem;
          border: 1px solid var(--border-strong);
          color: var(--brand-ink);
          background: rgba(0,0,0,0);
          font-weight: 500;
          transition: background .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .btn-secondary-ink:hover {
          background: color-mix(in oklab, var(--brand-ink) 6%, transparent);
          border-color: color-mix(in oklab, var(--brand-ink) 18%, transparent);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0,0,0,.06);
        }
        .btn-secondary-ink:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--brand-ink) 18%, transparent);
        }

        /* === REMOVE GRID OVERLAY (rete) — senza toccare JSX === */
        /* dentro il wrapper "Glow + grid + vignette", la rete è il 3° div */
        #hero-careers [aria-hidden].absolute.inset-0 > div:nth-child(3){
          display: none !important;
        }
>>>>>>> 31790a04d8be79be4a8bb0ecc06630c2e143b4fa
      `}</style>
    </section>
  );
}
