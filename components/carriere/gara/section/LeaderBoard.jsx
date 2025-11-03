// components/carriere/gara/section/LeaderBoard.jsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { buildRows } from "@/components/carriere/gara/data";

/**
 * LeaderBoard — Top 10 (demo)
 * - Controllo metrica: Totale | Fatturato | % sul fatturato
 * - Barre animate (rispettano prefers-reduced-motion)
 * - Ordinamento automatico per metrica (desc) + progress semantics (ARIA)
 * - Medaglie premium per top3, tipografia/spacing coerenti
 */

const METRICS = [
  { k: "totale", label: "Totale", get: (r) => r.totale, fmt: (v) => formatEUR(v) },
  { k: "fatturato", label: "Fatturato", get: (r) => r.fatturato, fmt: (v) => formatEUR(v) },
  { k: "pct", label: "% sul fatturato", get: (r) => r.pct ?? 0, fmt: (v) => (v == null ? "—" : `${v}%`) },
];

export default function LeaderBoard() {
  const prefersReduced = useReducedMotion();
  const rows = useMemo(() => buildRows(), []);
  const [metric, setMetric] = useState("totale"); // "totale" | "fatturato" | "pct"

  const m = METRICS.find((x) => x.k === metric) ?? METRICS[0];

  // ordina per metrica desc e prendi i primi 10
  const top = useMemo(() => {
    const arr = [...rows].sort((a, b) => (m.get(b) ?? -Infinity) - (m.get(a) ?? -Infinity));
    return arr.slice(0, 10);
  }, [rows, m]);

  const maxFor = useMemo(() => Math.max(...top.map((r) => Number(m.get(r) ?? 0))), [top, m]);

  // animazioni base
  const parent = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut", staggerChildren: prefersReduced ? 0 : 0.04 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10, scale: prefersReduced ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: "easeOut" } },
  };

  return (
    <section id="classifica" aria-labelledby="lb-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        {/* Intro */}
        <SectionHeader
          id="lb-title"
          title="Top 10 — aggiornamento dimostrativo"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <SectionP className="text-white/80 text-center">
          Confronta <b>Totale</b>, <b>Fatturato</b> o <b>% sul fatturato</b>. Medaglie ai primi 3.
        </SectionP>

        {/* Controls */}
        <div className="mt-6 mb-4 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Seleziona metrica classifica">
          {METRICS.map((b) => {
            const active = metric === b.k;
            return (
              <button
                key={b.k}
                type="button"
                onClick={() => setMetric(b.k)}
                aria-pressed={active}
                className={`h-9 px-3 rounded-lg border text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                  ${active ? "bg-white/15 border-white/25" : "bg-white/[0.06] border-white/15 hover:bg-white/10"}`}
                title={`Ordina per ${b.label}`}
              >
                {b.label}
              </button>
            );
          })}
        </div>

        {/* List */}
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          variants={parent}
          className="space-y-2"
          aria-describedby="lb-note"
        >
          {top.map((r) => {
            const val = Number(m.get(r) ?? 0);
            const widthPct = maxFor > 0 ? Math.max(6, (val / maxFor) * 100) : 0; // minimo 6% per visibilità
            const isTop3 = r.pos <= 3;

            return (
              <motion.li
                key={`${metric}-${r.pos}`}
                variants={item}
                className="rounded-xl p-3 ring-1 ring-white/10 bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left side: rank + medal + bar */}
                  <div className="flex items-center gap-3 min-w-0 grow">
                    <div className="w-8 text-right tabular-nums text-white/80">{r.pos}</div>
                    <div className="w-10">
                      {isTop3 ? <Medal pos={r.pos} /> : null}
                    </div>

                    {/* Bar */}
                    <div className="grow">
                      <div className="h-8 rounded-md overflow-hidden bg-white/5 ring-1 ring-white/10">
                        <motion.div
                          role="progressbar"
                          aria-label={`Valore ${m.label} posizione ${r.pos}`}
                          aria-valuemin={0}
                          aria-valuemax={maxFor}
                          aria-valuenow={val}
                          initial={{ width: prefersReduced ? `${widthPct}%` : "0%" }}
                          animate={{ width: `${widthPct}%` }}
                          transition={{ duration: prefersReduced ? 0 : 0.6, ease: "easeOut" }}
                          className="h-full"
                          style={{
                            background: isTop3
                              ? "linear-gradient(90deg, rgba(201,168,110,.55), rgba(29,45,94,.55))"
                              : "linear-gradient(90deg, rgba(255,255,255,.18), rgba(255,255,255,.06))",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right side: value */}
                  <div className="shrink-0 text-right text-sm text-white/80 tabular-nums w-[220px]">
                    {metric === "pct" ? (
                      <>
                        <span className="opacity-80">Tot/Fat</span>: {m.fmt(r.pct ?? null)}
                      </>
                    ) : (
                      <>
                        {m.label}: <span className="text-white">{m.fmt(val)}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

        <p id="lb-note" className="mt-3 text-xs text-white/55">
          Dati dimostrativi. Il valore della barra è relativo al massimo corrente per la metrica selezionata.
        </p>
      </div>
    </section>
  );
}

/* ----------------- Medaglie & utils ----------------- */

function Medal({ pos }) {
  const label = pos === 1 ? "1°" : pos === 2 ? "2°" : "3°";
  const bg =
    pos === 1
      ? "linear-gradient(180deg, rgba(201,168,110,.9), rgba(201,168,110,.55))"
      : pos === 2
      ? "linear-gradient(180deg, rgba(180,190,200,.9), rgba(180,190,200,.4))"
      : "linear-gradient(180deg, rgba(205,140,90,.9), rgba(205,140,90,.45))";
  return (
    <span
      className="inline-grid place-items-center h-6 px-2 rounded-full text-[11px] font-bold text-[var(--brand-dark)]"
      style={{ background: bg, boxShadow: "var(--shadow-gold)" }}
      title={`Vincitore ${label}`}
    >
      {label}
    </span>
  );
}

function formatEUR(v) {
  if (typeof v !== "number") return "—";
  return v.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}
