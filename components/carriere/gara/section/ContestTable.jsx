// components/carriere/gara/section/ContestTable.jsx
"use client";

import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { buildRows } from "@/components/carriere/gara/data";
import { Download, RotateCcw } from "lucide-react";

/**
 * ContestTable — premium
 * - Tipografia: SectionHeader / SectionP
 * - Sorting accessibile (aria-sort)
 * - Filtro "Min. fatturato" con preset + reset
 * - Virtualizzazione (windowing) per scorrimento fluido
 * - Header sticky + ombra dinamica quando si scrolla
 * - Esporta CSV dello stato corrente (filtro + sort)
 */

const ROW_H = 44;       // altezza riga virtualizzata (px)
const OVERSCAN = 6;     // righe extra sopra/sotto la viewport
const COLS = 6;

export default function ContestTable() {
  const prefersReduced = useReducedMotion();

  const base = useMemo(() => buildRows(), []);
  const [q, setQ] = useState(""); // filtro minimo fatturato
  const [sort, setSort] = useState({ by: "pos", dir: "asc" }); // pos|fatturato|premio|provvigione|totale|pct

  // Derived rows (filtrate + ordinate)
  const rows = useMemo(() => {
    const dir = sort.dir === "asc" ? 1 : -1;
    const min = Number(q || 0);
    let r = Number.isFinite(min) && min > 0 ? base.filter((x) => x.fatturato >= min) : [...base];

    r.sort((a, b) => {
      const va = normalize(a[sort.by]);
      const vb = normalize(b[sort.by]);
      return (va > vb ? 1 : va < vb ? -1 : 0) * dir;
    });
    return r;
  }, [base, q, sort]);

  // Virtualization state
  const scrollRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportH, setViewportH] = useState(520); // fallback coerente con classe max-h iniziale

  // Rileva altezza viewport scorrevole
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewportH(el.clientHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Calcolo range visibile
  const total = rows.length;
  const totalH = total * ROW_H;
  const start = clamp(Math.floor(scrollTop / ROW_H) - OVERSCAN, 0, Math.max(total - 1, 0));
  const visibleCount = Math.ceil(viewportH / ROW_H) + OVERSCAN * 2;
  const end = clamp(start + visibleCount, 0, total);
  const slice = rows.slice(start, end);
  const topPad = start * ROW_H;
  const bottomPad = Math.max(totalH - topPad - slice.length * ROW_H, 0);

  // Sticky shadow della thead
  const scrolled = scrollTop > 0;

  const changeSort = (by) =>
    setSort((s) => (s.by === by ? { by, dir: s.dir === "asc" ? "desc" : "asc" } : { by, dir: "desc" }));

  const resetAll = () => {
    setQ("");
    setSort({ by: "pos", dir: "asc" });
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  const applyPreset = (v) => setQ(String(v));

  const downloadCsv = () => {
    const headers = ["Posizione", "Fatturato", "Premio", "Provvigione60", "Totale", "Percentuale"];
    const lines = rows.map((r) => [
      r.pos,
      safeMoney(r.fatturato, false),
      r.premio ? safeMoney(r.premio, false) : "",
      safeMoney(r.provvigione, false),
      safeMoney(r.totale, false),
      typeof r.pct === "number" ? String(r.pct).replace(".", ",") + "%" : "",
    ]);
    const csv = [headers, ...lines].map((arr) => arr.join(";")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gara_trimestrale_demo.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section aria-labelledby="gara-table-title" className="relative py-16 sm:py-20 md:py-24">
      <div className="container">
        {/* Header sezione */}
        <SectionHeader
          id="gara-table-title"
          title="Compensi complessivi — primi 50"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <SectionP className="text-white/80 text-center">
          Tabella dimostrativa: fatturato, <b>provvigione 60%</b> e premi extra ai <b>primi 3</b>.
        </SectionP>

        {/* Controls */}
        <div className="mt-6 mb-3 flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-white/70">Min. fatturato</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-9 w-[160px] rounded-lg bg-white/[.06] ring-1 ring-white/10 border border-white/15 px-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              placeholder="es. 30000"
              aria-label="Filtra minimo fatturato"
            />
            <div className="flex items-center gap-1">
              {[0, 30000, 50000, 100000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => applyPreset(v)}
                  className={`h-8 rounded-md px-2 text-xs ring-1 ring-white/10 ${
                    String(v) === String(q)
                      ? "bg-white/20"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  aria-label={`Preset ${v === 0 ? "tutti" : formatEUR(v)}`}
                  title={v === 0 ? "Tutti" : `≥ ${formatEUR(v)}`}
                >
                  {v === 0 ? "Tutti" : `≥ ${formatEUR(v)}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ButtonGhost onClick={resetAll} className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </ButtonGhost>
            <ButtonGold onClick={downloadCsv} className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              Esporta CSV
            </ButtonGold>
          </div>
        </div>

        {/* Tabella virtualizzata */}
        <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
          {/* Top shadow quando si scrolla */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0))",
              opacity: scrolled ? 1 : 0,
            }}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
          />
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="max-h-[520px] overflow-auto [scrollbar-gutter:stable]"
          >
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10 bg-[color:var(--brand-dark)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--brand-dark)]/50">
                <tr className="text-left text-white/70">
                  {HEADERS.map((h) => (
                    <Th
                      key={h.k}
                      sort={sort}
                      onSort={changeSort}
                      {...h}
                    />
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Spacer top */}
                {topPad > 0 && (
                  <tr aria-hidden>
                    <td colSpan={COLS} style={{ height: topPad, padding: 0, border: 0 }} />
                  </tr>
                )}

                {/* Righe visibili */}
                {slice.map((r) => (
                  <tr key={r.pos} className="border-t border-white/10">
                    <td className="px-4 py-2.5 tabular-nums h-11">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-6 text-right">{r.pos}</span>
                        {r.pos <= 3 && <Medal pos={r.pos} />}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 tabular-nums h-11">{formatEUR(r.fatturato)}</td>
                    <td className="px-4 py-2.5 tabular-nums h-11">{r.premio ? formatEUR(r.premio) : "—"}</td>
                    <td className="px-4 py-2.5 tabular-nums h-11">{formatEUR(r.provvigione)}</td>
                    <td className="px-4 py-2.5 tabular-nums h-11 font-semibold text-white">{formatEUR(r.totale)}</td>
                    <td className="px-4 py-2.5 tabular-nums h-11">{formatPct(r.pct)}</td>
                  </tr>
                ))}

                {/* Spacer bottom */}
                {bottomPad > 0 && (
                  <tr aria-hidden>
                    <td colSpan={COLS} style={{ height: bottomPad, padding: 0, border: 0 }} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* bordo/beam */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{ boxShadow: "inset 0 0 0 1px var(--glass-stroke)" }}
          />
        </div>

        {/* Footer info righe */}
        <div className="mt-3 text-xs text-white/60">
          Mostrando <b>{slice.length}</b> di <b>{rows.length}</b> (totale dataset: {base.length})
        </div>
      </div>
    </section>
  );
}

/* ----------------- Subcomponents ----------------- */

const HEADERS = [
  { k: "pos", label: "Posizione" },
  { k: "fatturato", label: "Fatturato" },
  { k: "premio", label: "Premio" },
  { k: "provvigione", label: "Provvigione 60%" },
  { k: "totale", label: "Totale" },
  { k: "pct", label: "% sul fatturato" },
];

function Th({ k, label, sort, onSort }) {
  const isActive = sort.by === k;
  const dir = isActive ? sort.dir : "none";
  const ariaSort = isActive ? (sort.dir === "asc" ? "ascending" : "descending") : "none";
  return (
    <th
      scope="col"
      className="px-4 py-3 font-medium whitespace-nowrap"
      aria-sort={ariaSort}
    >
      <button
        onClick={() => onSort(k)}
        className="inline-flex items-center gap-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
        aria-label={`${label}: ordina ${isActive ? (sort.dir === "asc" ? "discendente" : "ascendente") : "ascendente"}`}
      >
        {label}
        <SortIcon active={isActive} dir={dir} />
      </button>
    </th>
  );
}

function SortIcon({ active, dir }) {
  const cls = `opacity-${active ? "90" : "50"}`;
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden className={cls}>
      {dir === "asc" ? (
        <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : dir === "desc" ? (
        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

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

/* ----------------- Utils ----------------- */

function normalize(v) {
  if (v == null) return -Infinity;
  if (typeof v === "number") return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function safeMoney(v, withSymbol = true) {
  if (typeof v !== "number") return withSymbol ? "—" : "";
  return v.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function formatEUR(v) {
  return safeMoney(v, true);
}

function formatPct(v) {
  if (typeof v !== "number") return "—";
  return `${v.toLocaleString("it-IT", { maximumFractionDigits: 0 })}%`;
}
