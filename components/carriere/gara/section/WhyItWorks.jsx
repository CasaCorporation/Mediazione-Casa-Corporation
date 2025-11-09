// components/carriere/gara/section/WhyItWorks.jsx
"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import {
  Award,
  ShieldCheck,
  Scale,
  Percent,
  CalendarClock,
  Users2,
  X,
  Info,
  CheckCircle2,
} from "lucide-react";

/**
 * WHY IT WORKS — Gara aziendale (Sezione 1)
 * - Allineato schema premi 5% / 3% / 2%
 * - Tutto in .container (no full-bleed) → zero overflow
 * - Intro centrata, tipografia/CTA canoniche
 * - Modal accessibile + micro-animazioni
 */

export default function WhyItWorks() {
  const [open, setOpen] = React.useState(false);
  const prefersReduced = useReducedMotion();

  // Variants
  const parent = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", staggerChildren: prefersReduced ? 0 : 0.06 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 14, scale: prefersReduced ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: "easeOut" } },
  };
  const modal = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.14 } },
    exit: { opacity: 0, transition: { duration: 0.14 } },
  };
  const panel = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12, scale: prefersReduced ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: prefersReduced ? 0 : 0.22, ease: "easeOut" },
    },
    exit: { opacity: 0, y: prefersReduced ? 0 : 6, scale: 1, transition: { duration: 0.16 } },
  };

  const KPI = [
    { icon: Percent, label: "10% del fatturato", hint: "Montepremi trimestrale dedicato." },
    { icon: Users2, label: "3 vincitori", hint: "Premi 5% • 3% • 2%." },            // ← allineato
    { icon: CalendarClock, label: "Trimestrale", hint: "Più chance, reset periodico." },
    { icon: ShieldCheck, label: "Tutele reali", hint: "0 penali, 0 costi fissi." },
  ];

  const PRINCIPI = [
    "Meritocrazia: premi misurati dai risultati.",
    "Stabilità: provvigione 60% sempre.",
    "Trasparenza: regole semplici, zero clausole occulte.",
    "Frequenza trimestrale: più possibilità di salire.",
    "Equità: premi 5% • 3% • 2% ai primi tre.",
  ];

  return (
    <section
      id="perche-funziona"
      aria-labelledby="gara-why-title"
      className="relative py-16 sm:py-20 md:py-24 overflow-x-hidden"
    >
      <div className="container">
        {/* INTRO in .container, centrata e ampia */}
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            id="gara-why-title"
            title="Perché funziona — modello realmente meritocratico"
            size="lg"
            tone="dark"
            underline
            className="mb-4 sm:mb-5 text-center"
          />
          <SectionP className="text-white/85 text-center">
            In <b>Casa Corporation</b> abbiamo strutturato un sistema retributivo <b>rivoluzionario</b> che coniuga
            <b> stabilità</b> e <b>merito</b>. La <b>Gara aziendale trimestrale</b> tutela chi cerca continuità – con
            <b> provvigioni alte, nessuna penale e nessun costo fisso</b> – e premia chi eccelle: ogni tre mesi
            destiniamo <b>il 10% del fatturato di intermediazione</b> a un montepremi assegnato ai primi 3 in classifica:
            <b> 5%</b> al 1°, <b>3%</b> al 2°, <b>2%</b> al 3°. Un equilibrio semplice, chiaro, <b>misurabile</b>.
          </SectionP>
        </div>

        {/* GRID + ASIDE */}
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          className="mt-8 grid gap-6 lg:grid-cols-12"
        >
          {/* Colonna principale */}
          <motion.div variants={item} className="lg:col-span-8">
            <article className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                    <Scale className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold">Metodo semplice, regole non aggirabili</h3>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white/10 ring-1 ring-white/10 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                >
                  <Info className="h-4 w-4" />
                  Regolamento (sintesi)
                </button>
              </div>

              <p className="mt-3 text-sm text-white/85">
                La classifica misura risultati effettivi, non intenzioni. Nessun costo fisso e nessuna penale:
                la base resta <b>provvigione 60% sempre</b>. Il montepremi trimestrale aggiunge una leva potente per chi
                performa di più, senza penalizzare gli altri.
              </p>

              {/* KPI cards */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {KPI.map(({ icon: Icon, label, hint }) => (
                  <div key={label} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/10">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="font-medium leading-tight">{label}</div>
                        <div className="text-xs text-white/70">{hint}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ButtonGold as="a" href="#classifica">Vedi classifica dimostrativa</ButtonGold>
                <ButtonGhost as="a" href="#tabella">Apri tabella 1–50</ButtonGhost>
              </div>

              {/* Glow decorativo */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, var(--gold) 25%, transparent), transparent 70%)",
                  filter: "blur(20px)",
                  opacity: 0.7,
                }}
              />
            </article>

            {/* Principi chiave (mobile) */}
            <div className="mt-6 grid gap-3 lg:hidden">
              {PRINCIPI.map((p) => (
                <div key={p} className="flex items-start gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 opacity-90" />
                  <p className="text-sm text-white/90">{p}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Aside sticky (desktop) */}
          <motion.aside variants={item} className="hidden lg:block lg:col-span-4">
            <div className="sticky top-[calc(var(--header-h,56px)+72px)] space-y-3">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                    <Award className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold">Principi chiave</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {PRINCIPI.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 opacity-90 shrink-0" />
                      <span className="text-white/90">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-3">
                  <ButtonGold onClick={() => setOpen(true)}>Regolamento</ButtonGold>
                  <ButtonGhost as="a" href="#come-funziona">Approfondisci</ButtonGhost>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>

      {/* MODAL — Regolamento sintetico */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={modal}
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="regolamento-title"
            className="fixed inset-0 z-[81] grid place-items-center p-4"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={modal}
          >
            <motion.div
              className="relative max-w-2xl w-full rounded-2xl bg-[var(--brand-dark)] ring-1 ring-white/10 p-6"
              variants={panel}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  <h3 id="regolamento-title" className="font-semibold">
                    Regolamento — sintesi operativa
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  aria-label="Chiudi regolamento"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-white/85">
                <p>• <b>Frequenza:</b> gara <b>trimestrale</b> (reset classifica a fine trimestre).</p>
                <p>• <b>Montepremi:</b> <b>10%</b> del fatturato da intermediazioni del trimestre → <b>1° 5%</b> • <b>2° 3%</b> • <b>3° 2%</b>.</p> {/* allineato */}
                <p>• <b>Tutele:</b> nessuna penale, <b>nessun costo fisso</b>. Base invariata: <b>provvigione 60% sempre</b>.</p>
                <p>• <b>Criteri:</b> classifica basata su risultati documentati e tracciabili (metodo non aggirabile).</p>
                <p>• <b>Trasparenza:</b> esempi dimostrativi e tabella 1–50 disponibili in questa pagina.</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonGold as="a" href="#classifica" onClick={() => setOpen(false)}>Vedi classifica</ButtonGold>
                <ButtonGhost as="a" href="#tabella" onClick={() => setOpen(false)}>Apri tabella 1–50</ButtonGhost>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
