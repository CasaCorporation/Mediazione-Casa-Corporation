// components/carriere/gara/section/Explainer.jsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import {
  Info,
  CheckCircle2,
  Trophy,
  Percent,
  Calculator,
  Award,
  X,
} from "lucide-react";

/**
 * Explainer — Gara aziendale
 * - Canonico: usa SectionHeader/SectionP, nessun bg interno (Band gestisce gli sfondi)
 * - Tabs: "Principi" | "Premi 10%" | "Esempio"
 * - Simulatore premi: inserisci fatturato → 5% / 3% / 2%
 * - Aside sticky (desktop) + Modal "Regolamento" accessibile
 * - Micro-animazioni con rispetto di prefers-reduced-motion
 */

export default function Explainer() {
  const prefersReduced = useReducedMotion();
  const [tab, setTab] = useState("principi"); // "principi" | "premi" | "esempio"
  const [open, setOpen] = useState(false);

  // Simulatore
  const [fatturato, setFatturato] = useState(1_000_000);
  const p1 = useMemo(() => fatturato * 0.05, [fatturato]);
  const p2 = useMemo(() => fatturato * 0.03, [fatturato]);
  const p3 = useMemo(() => fatturato * 0.02, [fatturato]);

  // Variants animazioni
  const parent = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
        staggerChildren: prefersReduced ? 0 : 0.06,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12, scale: prefersReduced ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };
  const modal = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.14 } },
    exit: { opacity: 0, transition: { duration: 0.14 } },
  };
  const panel = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12, scale: prefersReduced ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: prefersReduced ? 0 : 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: prefersReduced ? 0 : 6, transition: { duration: 0.14 } },
  };

  const PRINCIPI = [
    "Classifica basata su risultati verificabili (fatturato personale).",
    "Provvigione 60% per tutti, nessuna penale, nessun costo fisso.",
    "Gara trimestrale: più opportunità, reset periodico.",
    "Montepremi dedicato: 10% del fatturato aziendale",
    "Trasparenza totale: esempi, tabella 1–50 e regolamento.",
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24">
      <div className="container">
        {/* INTRO */}
        <SectionHeader
          id="gara-explainer-title"
          title="Trasparente. Verificabile. Meritocratica."
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <SectionP className="text-white/85 text-center">
          Ogni trimestre analizziamo i risultati degli agenti con un criterio semplice: <b>il fatturato generato</b>.
          La classifica è chiara, pubblica e aggiornata di frequente: <b>contano solo i numeri</b>.
          I primi 3 ottengono premi dedicati, oltre alla <b>provvigione 60%</b>.
        </SectionP>

        {/* LAYOUT: main + aside */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_.8fr]">
          {/* MAIN */}
          <div>
            {/* TABS */}
            <div
              role="tablist"
              aria-label="Sezioni spiegazione gara"
              className="flex flex-wrap items-center gap-2"
            >
              {[
                { k: "principi", label: "Principi", icon: Trophy },
                { k: "premi", label: "Premi 10%", icon: Percent },
                { k: "esempio", label: "Esempio", icon: Calculator },
              ].map(({ k, label, icon: Icon }) => {
                const active = tab === k;
                return (
                  <button
                    key={k}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${k}`}
                    id={`tab-${k}`}
                    onClick={() => setTab(k)}
                    className={`inline-flex items-center gap-2 h-9 px-3 rounded-lg ring-1 ring-white/10 text-sm transition
                      ${active ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* PANELS */}
            <div className="mt-6">
              <AnimatePresence mode="wait">
                {tab === "principi" && (
                  <motion.div
                    key="principi"
                    id="panel-principi"
                    role="tabpanel"
                    aria-labelledby="tab-principi"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={parent}
                    className="space-y-3"
                  >
                    {PRINCIPI.map((p) => (
                      <motion.div
                        key={p}
                        variants={item}
                        className="flex items-start gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-4"
                      >
                        <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 opacity-90" />
                        <p className="text-sm text-white/90">{p}</p>
                      </motion.div>
                    ))}
                    <div className="pt-2 flex flex-wrap gap-3">
                      <ButtonGold as="a" href="#classifica">Vedi Top 10</ButtonGold>
                      <ButtonGhost as="a" href="#tabella">Apri tabella 1–50</ButtonGhost>
                    </div>
                  </motion.div>
                )}

                {tab === "premi" && (
                  <motion.div
                    key="premi"
                    id="panel-premi"
                    role="tabpanel"
                    aria-labelledby="tab-premi"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={parent}
                    className="space-y-4"
                  >
                    <motion.div variants={item} className="rounded-2xl p-5 bg-white/5 ring-1 ring-white/10">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5" />
                        <h3 className="font-semibold">Redistribuzione del merito</h3>
                      </div>
                      <p className="mt-2 text-sm text-white/85">
                        Ogni trimestre, l’azienda destina il <b>10% del fatturato</b> al montepremi:
                        <b> 5%</b> al 1°, <b>3%</b> al 2°, <b>2%</b> al 3°.
                      </p>

                      {/* griglia premi */}
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <PrizeCard place="1°" percent={5} highlight />
                        <PrizeCard place="2°" percent={3} />
                        <PrizeCard place="3°" percent={2} />
                      </div>
                    </motion.div>

                    <motion.div variants={item} className="text-sm text-white/75">
                      Nessun costo di partecipazione. Nessuna quota nascosta. I premi si sommano alla <b>provvigione 60%</b>.
                    </motion.div>
                  </motion.div>
                )}

                {tab === "esempio" && (
                  <motion.div
                    key="esempio"
                    id="panel-esempio"
                    role="tabpanel"
                    aria-labelledby="tab-esempio"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={parent}
                    className="space-y-4"
                  >
                    <motion.div variants={item} className="rounded-2xl p-5 bg-white/5 ring-1 ring-white/10">
                      <div className="flex items-center gap-3">
                        <Calculator className="h-5 w-5" />
                        <h3 className="font-semibold">Simula i premi trimestrali</h3>
                      </div>

                      {/* Input fatturato */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <label htmlFor="fatturato" className="text-sm text-white/80">
                          Fatturato aziendale (trimestre)
                        </label>
                        <input
                          id="fatturato"
                          type="number"
                          min={0}
                          step={1000}
                          value={fatturato}
                          onChange={(e) => setFatturato(Number(e.target.value || 0))}
                          className="h-10 w-[200px] rounded-lg bg-white/[.06] ring-1 ring-white/10 border border-white/15 px-3 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                        />
                      </div>

                      {/* Risultati */}
                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <SimRow label="1° premio (5%)" value={p1} accent />
                        <SimRow label="2° premio (3%)" value={p2} />
                        <SimRow label="3° premio (2%)" value={p3} />
                      </div>

                      <p className="mt-4 text-sm text-white/80">
                        Esempio: con <b>{formatEUR(1_000_000)}</b> di fatturato trimestrale, i premi sono
                        <b> {formatEUR(50_000)}</b>, <b>{formatEUR(30_000)}</b>, <b>{formatEUR(20_000)}</b>.
                      </p>
                    </motion.div>

                    <div className="flex flex-wrap gap-3">
                      <ButtonGold as="a" href="#partecipa">Partecipa alla Gara</ButtonGold>
                      <ButtonGhost onClick={() => setOpen(true)} className="inline-flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Vedi regolamento
                      </ButtonGhost>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ASIDE */}
          <aside className="rounded-2xl p-5 bg-white/5 ring-1 ring-white/10 lg:sticky lg:top-[calc(var(--header-h,56px)+72px)]">
            <div className="text-sm text-white/70">In breve</div>
            <ul className="mt-2 space-y-2 text-white/90 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 opacity-90" />
                <span>Classifica su fatturato personale</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 opacity-90" />
                <span>Provvigione <b>60%</b> per tutti</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 opacity-90" />
                <span>Premi <b>5% / 3% / 2%</b> ai primi tre</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 opacity-90" />
                <span>Reportistica interna non aggirabile</span>
              </li>
            </ul>
            <div
              aria-hidden
              className="mt-4 h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
            />
            <p className="mt-3 text-sm text-white/75">
              Pronto a competere?{" "}
              <a href="#partecipa" className="underline text-white">
                Partecipa alla Gara
              </a>
            </p>
            <div className="mt-3">
              <ButtonGhost onClick={() => setOpen(true)} className="inline-flex items-center gap-2">
                <Info className="h-4 w-4" />
                Regolamento (sintesi)
              </ButtonGhost>
            </div>
          </aside>
        </div>
      </div>

      {/* MODAL Regolamento */}
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
                <p>• <b>Criterio:</b> classifica basata sul fatturato personale documentato.</p>
                <p>• <b>Provvigione:</b> 60% standard per tutti, nessun costo fisso, nessuna penale.</p>
                <p>• <b>Frequenza:</b> gara trimestrale con reset classifica a fine trimestre.</p>
                <p>• <b>Montepremi:</b> 10% del fatturato trimestrale → 1° 5% • 2° 3% • 3° 2%.</p>
                <p>• <b>Trasparenza:</b> esempi e tabella 1–50 pubblicati nella presente pagina.</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonGold as="a" href="#classifica" onClick={() => setOpen(false)}>Vedi Top 10</ButtonGold>
                <ButtonGhost as="a" href="#tabella" onClick={() => setOpen(false)}>Apri tabella 1–50</ButtonGhost>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ----------------- Subcomponents ----------------- */

function PrizeCard({ place, percent, highlight = false }) {
  return (
    <div
      className={`rounded-xl p-4 ring-1 ring-white/10 bg-white/5 ${highlight ? "relative" : ""}`}
      style={highlight ? { boxShadow: "var(--shadow-gold)" } : undefined}
    >
      <div className="text-sm text-white/80">{place} classificato</div>
      <div className="mt-1 text-xl font-semibold">{percent}%</div>
      {highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--gold) 25%, transparent), transparent 70%)",
            filter: "blur(18px)",
            opacity: 0.8,
          }}
        />
      )}
    </div>
  );
}

function SimRow({ label, value, accent = false }) {
  return (
    <div className={`rounded-xl p-4 ring-1 ring-white/10 ${accent ? "bg-white/10" : "bg-white/5"}`}>
      <div className="text-sm text-white/80">{label}</div>
      <div className="mt-1 text-lg font-semibold">{formatEUR(value)}</div>
    </div>
  );
}

/* ----------------- Utils ----------------- */

function formatEUR(v) {
  if (typeof v !== "number") return "—";
  return v.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}
