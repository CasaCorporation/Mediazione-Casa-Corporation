"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { MODELS, expectedScore } from "@/components/carriere/confronto/data";

/** COMPARISON TABLE — LIGHT THEME */
export default function ComparisonTable() {
  const base = useMemo(
    () =>
      MODELS.map((m) => ({
        ...m,
        score: expectedScore(m),
        provNum: pctToNum(m.provvigionePct),
        guadNum: pctToNum(m.guadagnoPct),
        speseNum: speseToNum(m.spese),
        isCasa: /casa\s*corporation/i.test(m.name),
        rowKey: m.key || m.id || m.name,
      })),
    []
  );

  const casa = base.find((m) => m.isCasa) || null;

  const [sort, setSort] = useState({ by: "score", dir: "desc" });
  const [query, setQuery] = useState("");
  const [showCols, setShowCols] = useState({ supporto: true, formazione: true, delta: true });
  const [dense, setDense] = useState(false);
  const [expanded, setExpanded] = useState({});

  const data = useMemo(() => {
    let arr = base.map((m) => ({ ...m }));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter((m) => (m.name || "").toLowerCase().includes(q));
    }
    arr.sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      const av = keyVal(a, sort.by);
      const bv = keyVal(b, sort.by);
      return (av > bv ? 1 : av < bv ? -1 : 0) * dir;
    });
    return arr;
  }, [base, sort, query]);

  const stats = useMemo(() => {
    const mm = (arr) => {
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      return [isFinite(min) ? min : 0, isFinite(max) ? max : 1];
    };
    const val = (k) => data.map((m) => keyVal(m, k));
    return {
      score: mm(val("score")),
      prov: mm(val("provvigione")),
      gain: mm(val("guadagno")),
      cost: mm(val("spese")),
    };
  }, [data]);

  useEffect(() => {
    const hash = new URLSearchParams({
      sort: `${sort.by}:${sort.dir}`,
      q: query || "",
      sup: showCols.supporto ? "1" : "0",
      form: showCols.formazione ? "1" : "0",
      d: showCols.delta ? "1" : "0",
      dn: dense ? "1" : "0",
    }).toString();
    if (typeof window !== "undefined") {
      const next = `#${hash}`;
      if (window.location.hash !== next) window.history.replaceState(null, "", next);
    }
  }, [sort, query, showCols, dense]);

  const exportCSV = () => {
    const headers = [
      "Modello","Score","% Provvigione","Spese","% Guadagno","Premi",
      ...(showCols.supporto ? ["Supporto"] : []),
      ...(showCols.formazione ? ["Formazione"] : []),
    ];
    const rows = data.map((m) => [
      m.name, m.score.toFixed(1), m.provvigionePct, m.spese, m.guadagnoPct, m.premi,
      ...(showCols.supporto ? [m.supporto] : []),
      ...(showCols.formazione ? [m.formazione] : []),
    ]);
    const body = [headers, ...rows].map((r) => r.map(safeCSV).join(";")).join("\n");
    const blob = new Blob([body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "confronto-casa-corporation.csv"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const changeSort = (by) => setSort((s) => (s.by === by ? { by, dir: s.dir === "asc" ? "desc" : "asc" } : { by, dir: "desc" }));

  return (
    <section aria-labelledby="confronto-table-title" className="relative bg-white py-16 sm:py-20 md:py-24">
      {/* decor leggero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[.06]" style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(2,6,23,.06) 0 1px, transparent 1px 16px)",
        }}/>
      </div>

      <div className="container">
        <SectionHeader
          id="confronto-table-title"
          title="Confronto modelli — tabella interattiva"
          size="lg"
          tone="light"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-6 max-w-[76ch] text-center">
          <SectionP className="text-slate-600">
            Ordina e filtra i modelli. Mostra/nascondi colonne tecniche. Esporta un CSV con lo stato corrente.
          </SectionP>
        </div>

        {/* Toolbar */}
        <div className="sticky top-[calc(var(--header-h,56px)+10px)] z-30 rounded-xl bg-white/90 p-3 ring-1 ring-slate-200 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <SortButton label="Score" active={sort.by === "score"} dir={sort.dir} onClick={() => changeSort("score")} />
              <SortButton label="% Provvigione" active={sort.by === "provvigione"} dir={sort.dir} onClick={() => changeSort("provvigione")} />
              <SortButton label="Spese" active={sort.by === "spese"} dir={sort.dir} onClick={() => changeSort("spese")} />
              <SortButton label="% Guadagno" active={sort.by === "guadagno"} dir={sort.dir} onClick={() => changeSort("guadagno")} />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex select-none items-center gap-2 text-xs text-slate-700">
                <input type="checkbox" className="accent-[var(--gold)]" checked={showCols.supporto}
                  onChange={() => setShowCols((s) => ({ ...s, supporto: !s.supporto }))} />
                Supporto
              </label>
              <label className="flex select-none items-center gap-2 text-xs text-slate-700">
                <input type="checkbox" className="accent-[var(--gold)]" checked={showCols.formazione}
                  onChange={() => setShowCols((s) => ({ ...s, formazione: !s.formazione }))} />
                Formazione
              </label>
              <label className="flex select-none items-center gap-2 text-xs text-slate-700">
                <input type="checkbox" className="accent-[var(--gold)]" checked={showCols.delta}
                  onChange={() => setShowCols((s) => ({ ...s, delta: !s.delta }))} />
                Δ vs Casa
              </label>

              <label className="ml-1 flex select-none items-center gap-2 text-xs text-slate-700">
                <input type="checkbox" className="accent-[var(--gold)]" checked={dense} onChange={() => setDense((d) => !d)} />
                Densità
              </label>

              <div className="relative">
                <input
                  type="search"
                  placeholder="Cerca modello…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-8 rounded-lg bg-white px-3 text-xs text-slate-800 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-[var(--gold)]/30"
                />
              </div>

              <button
                onClick={exportCSV}
                className="rounded-lg bg-white px-3 py-1.5 text-xs text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                Esporta CSV
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="relative mt-3 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-white">
          <div className={"max-h-[64vh] overflow-auto [scrollbar-gutter:stable] " + (dense ? "text-[13px]" : "text-sm")}>
            <table className="min-w-full">
              <thead className="sticky top-0 z-20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
                <tr className="text-left text-slate-600">
                  <Th label="Modello" sticky />
                  <Th sortable label="Score" active={sort.by === "score"} dir={sort.dir} onClick={() => changeSort("score")} />
                  <Th sortable label="% Provvigione" active={sort.by === "provvigione"} dir={sort.dir} onClick={() => changeSort("provvigione")} />
                  <Th sortable label="Spese" active={sort.by === "spese"} dir={sort.dir} onClick={() => changeSort("spese")} />
                  <Th sortable label="% Guadagno" active={sort.by === "guadagno"} dir={sort.dir} onClick={() => changeSort("guadagno")} />
                  <Th label="Premi" />
                  {showCols.supporto && <Th label="Supporto" />}
                  {showCols.formazione && <Th label="Formazione" />}
                  {showCols.delta && casa && <Th label="Δ vs Casa" />}
                  <Th label="Sintesi" />
                </tr>
              </thead>

              <tbody>
                <AnimatePresence initial={false}>
                  {data.map((m) => {
                    const rowKey = m.rowKey;
                    return (
                      <Row
                        key={rowKey}
                        m={m}
                        casa={casa}
                        stats={stats}
                        expanded={!!expanded[rowKey]}
                        onToggle={() => setExpanded((x) => ({ ...x, [rowKey]: !x[rowKey] }))}
                        showTech={{ supporto: showCols.supporto, formazione: showCols.formazione, delta: showCols.delta }}
                        dense={dense}
                      />
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* bordo */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-200" />
        </div>

        {/* Summary */}
        <div className="mt-6 grid gap-3 text-xs text-slate-600 md:grid-cols-3">
          <SummaryCard label="Range Score" a={stats.score[0]} b={stats.score[1]} fmt={(v) => v.toFixed(1)} />
          <SummaryCard label="Provvigione media (stima)" a={avg(data.map((x) => x.provNum)) * 100} b={null} fmt={(v) => `${v.toFixed(1)}%`} />
          <SummaryCard label="Spese medie (stima)" a={avg(data.map((x) => x.speseNum))} b={null} fmt={(v) => formatEuro(v)} />
        </div>
      </div>
    </section>
  );
}

/* ============ Row (LIGHT) ============ */
function Row({ m, casa, stats, showTech, expanded, onToggle, dense }) {
  const heatScore = scale(m.score, stats.score[0], stats.score[1]);
  const heatProv = scale(m.provNum, stats.prov[0], stats.prov[1]);
  const heatGain = scale(m.guadNum, stats.gain[0], stats.gain[1]);
  const heatCost = 1 - scale(m.speseNum, stats.cost[0], stats.cost[1]);

  const delta = casa
    ? {
        score: +(m.score - casa.score).toFixed(1),
        prov: +((m.provNum - casa.provNum) * 100).toFixed(0),
        gain: +((m.guadNum - casa.guadNum) * 100).toFixed(0),
        cost: +(m.speseNum - casa.speseNum).toFixed(0),
      }
    : null;

  const trClass =
    "border-t border-slate-200 transition-colors " +
    (m.isCasa ? "bg-[rgba(201,168,110,0.06)]" : "hover:bg-slate-50");

  return (
    <>
      <motion.tr
        className={trClass}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
      >
        <td className="md:sticky md:left-0 md:z-10 md:bg-white/80 md:backdrop-blur px-4 py-3 font-semibold text-slate-900">
          {m.name} {m.isCasa && <CasaMark />}
        </td>
        <td className="px-4 py-3 tabular-nums text-slate-800"><Heat v={heatScore}><span>{m.score.toFixed(1)}</span></Heat></td>
        <td className="px-4 py-3 text-slate-800"><Heat v={heatProv}><span>{m.provvigionePct}</span></Heat></td>
        <td className="px-4 py-3 text-slate-800"><Heat v={heatCost}><span>{m.spese}</span></Heat></td>
        <td className="px-4 py-3 text-slate-800"><Heat v={heatGain}><span>{m.guadagnoPct}</span></Heat></td>
        <td className="px-4 py-3 text-slate-800">{m.premi}</td>
        {showTech.supporto && <td className="px-4 py-3 text-slate-800">{m.supporto}</td>}
        {showTech.formazione && <td className="px-4 py-3 text-slate-800">{m.formazione}</td>}
        {showTech.delta && delta && (
          <td className="px-4 py-3">
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <Delta label="Score" v={delta.score} unit="" posHigh />
              <Delta label="Spese" v={delta.cost} unit="€" posHigh={false} />
              <Delta label="Provv." v={delta.prov} unit="%" posHigh />
              <Delta label="Guad." v={delta.gain} unit="%" posHigh />
            </div>
          </td>
        )}
        <td className="px-4 py-3 text-slate-800">{m.sintesi}</td>
      </motion.tr>

      <motion.tr initial={false} animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }} className="border-t border-slate-200" aria-hidden={!expanded}>
        <td colSpan={10} className={"px-4 pb-4 pt-0 " + (dense ? "text-[13px]" : "text-sm")}>
          <div className="overflow-hidden">
            <motion.div initial={false} animate={{ y: expanded ? 0 : -8 }} transition={{ duration: 0.25 }}
              className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="grid gap-4 md:grid-cols-3 text-slate-800">
                <div>
                  <h4 className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">KPI sintetici</h4>
                  <ul className="space-y-1">
                    <li><b>Score:</b> {m.score.toFixed(1)}</li>
                    <li><b>Provv. (stima):</b> {(m.provNum * 100).toFixed(1)}%</li>
                    <li><b>Guadagno (stima):</b> {(m.guadNum * 100).toFixed(1)}%</li>
                    <li><b>Spese (stima):</b> {formatEuro(m.speseNum)}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">Cosa include</h4>
                  <p>{m.supporto}. Formazione: {m.formazione}. Premi: {m.premi}.</p>
                </div>
                <div>
                  <h4 className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">Per chi è adatto</h4>
                  <p>{m.sintesi}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </td>
      </motion.tr>
    </>
  );
}

/* ============ UI Bits (LIGHT) ============ */
function Th({ label, sortable = false, active = false, dir = "desc", onClick, sticky = false }) {
  const stickyCls = sticky ? "md:sticky md:left-0 md:z-20 md:bg-white/90 md:backdrop-blur " : "";
  return (
    <th className={stickyCls + "px-4 py-3 font-medium whitespace-nowrap text-slate-700"}>
      {sortable ? (
        <button onClick={onClick} className="inline-flex items-center gap-1 hover:text-slate-900">
          {label} <SortIcon active={active} dir={dir} />
        </button>
      ) : label}
    </th>
  );
}
function SortButton({ label, active, dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-lg px-3 py-1.5 text-xs ring-1 transition " +
        (active ? "bg-slate-100 text-slate-900 ring-slate-200" : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50")
      }
      aria-pressed={active}
    >
      {label} {active && (dir === "asc" ? "↑" : "↓")}
    </button>
  );
}
function SortIcon({ active, dir }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden className={`opacity-${active ? "90" : "40"}`}>
      {dir === "asc"
        ? <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        : <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />}
    </svg>
  );
}
function Heat({ v, children }) {
  const vv = Math.max(0, Math.min(1, v ?? 0));
  return (
    <span
      className="inline-flex rounded px-1.5 py-0.5"
      style={{
        background: `linear-gradient(90deg, rgba(201,168,110,${0.10 + vv * 0.10}), rgba(201,168,110,${0.02 + vv * 0.06}))`,
      }}
    >
      {children}
    </span>
  );
}
function CasaMark() {
  return (
    <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-[color:var(--gold)]/14 px-2 py-0.5 text-[11px] text-[var(--gold)] ring-1 ring-[color:var(--gold)]/25">
      ● Casa
    </span>
  );
}
function Delta({ label, v, unit, posHigh }) {
  const good = posHigh ? v > 0 : v < 0;
  const bad = posHigh ? v < 0 : v > 0;
  return (
    <div
      className={
        "flex items-center justify-between gap-1 rounded px-1.5 py-1 ring-1 " +
        (good
          ? "bg-[color:var(--gold)]/12 text-[var(--gold)] ring-[color:var(--gold)]/25"
          : bad
          ? "bg-red-50 text-red-600 ring-red-200"
          : "bg-slate-100 text-slate-800 ring-slate-200")
      }
    >
      <span className="text-slate-500">{label}</span>
      <span className="tabular-nums">
        {v > 0 ? "+" : ""}{v}{unit}
      </span>
    </div>
  );
}
function SummaryCard({ label, a, b, fmt = (v) => v }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
      <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="text-slate-800">
        {fmt(a)} {b != null && <span className="text-slate-500">– {fmt(b)}</span>}
      </div>
    </div>
  );
}

/* Utils */
function keyVal(m, key){ switch(key){ case "provvigione": return m.provNum; case "guadagno": return m.guadNum; case "spese": return m.speseNum; default: return m.score; } }
function pctToNum(str){ if(!str) return 0; const s=String(str).replace(",",".").toLowerCase().trim(); if(s.includes("oltre")) return 1.1;
  const m1=s.match(/(\d+(?:\.\d+)?)\s*%?\s*[–-]\s*(\d+(?:\.\d+)?)\s*%?/); if(m1) return ((parseFloat(m1[1])+parseFloat(m1[2]))/2)/100;
  const m2=s.match(/(?:~|≈)?\s*(\d+(?:\.\d+)?)\s*%/); if(m2) return parseFloat(m2[1])/100; return 0; }
function speseToNum(str){ if(!str) return 0; const clean=String(str).replace(/\s/g,""); const rng=clean.match(/(\d+)[–-](\d+)/);
  if(rng) return (parseInt(rng[1],10)+parseInt(rng[2],10))/2; const one=clean.match(/(\d+)/); return one?parseInt(one[1],10):0; }
function formatEuro(v){ if(!isFinite(v)) return "€0"; return Number(v).toLocaleString("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}); }
function avg(arr){ if(!arr||!arr.length) return 0; const s=arr.reduce((a,b)=>a+(Number.isFinite(b)?b:0),0); return s/arr.length; }
function scale(v,min,max){ if(!isFinite(v)||!isFinite(min)||!isFinite(max)||min===max) return 0.5; const t=(v-min)/(max-min); return Math.max(0,Math.min(1,t)); }
function safeCSV(x){ const s=String(x??""); const needs=/[;\n"]/.test(s); const esc=s.replace(/"/g,'""'); return needs?`"${esc}"`:esc; }
