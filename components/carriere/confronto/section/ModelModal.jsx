// components/carriere/confronto/section/ModelModal.jsx
"use client";

import React from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { MODELS } from "@/components/carriere/confronto/data";

export default function ModelModal({ model, onClose }) {
  const backdrop = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const panel = {
    initial: { opacity: 0, y: 18, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 18, scale: 0.98 },
    transition: { duration: 0.24, ease: "easeOut" },
  };

  // ---- Casa Corporation (dati reali da MODELS, fallback sicuro)
  const casaModel = React.useMemo(
    () => MODELS.find((m) => /casa\s*corporation/i.test(m.name)) || null,
    []
  );
  const CASA = {
    name: casaModel?.name || "Casa Corporation",
    provvigionePct: casaModel?.provvigionePct || "30%",
    guadagnoPct: casaModel?.guadagnoPct || "30%",
    spese: casaModel?.spese || "0 €",
    score: typeof casaModel?.score === "number" ? casaModel.score : 95,
    rischio: "basso",
  };

  // ---- Valori dinamici Modello selezionato
  const mProv = clamp01(pctToNum(model?.provvigionePct));
  const mGain = clamp01(pctToNum(model?.guadagnoPct));
  const mCost = speseToNum(model?.spese);
  const mRisk = (model?.rischio || inferRisk({ spese: mCost, prov: mProv, gain: mGain }));

  // ---- Valori Casa Corporation
  const cProv = clamp01(pctToNum(CASA.provvigionePct));
  const cGain = clamp01(pctToNum(CASA.guadagnoPct));
  const cCost = speseToNum(CASA.spese);
  const cRisk = "basso";

  return (
    <motion.div className="fixed inset-0 z-[70]" {...backdrop} onClick={onClose} style={{ background: "rgba(6,8,12,.62)" }}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Dettagli ${model?.name ?? "modello"}`}
        className="absolute inset-0 m-0 h-[100svh] w-[100vw] overflow-hidden rounded-none bg-[rgba(12,16,24,.94)] ring-0 backdrop-blur
                   sm:m-auto sm:h-[min(88vh,860px)] sm:w-[min(1100px,92vw)] sm:rounded-2xl sm:ring-1 sm:ring-white/10 sm:bg-[rgba(12,16,24,.92)]"
        {...panel}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-5">
          <div className="text-sm text-white/80">
            Modello <b className="text-white">{model?.name}</b>
          </div>
          <button onClick={onClose} className="rounded-md bg-white/10 p-1.5 ring-1 ring-white/15 hover:bg-white/14" aria-label="Chiudi">
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* ===== LAYOUT CONTENT =====
           - Mobile: colonna, NO scroll dell’intero modale.
             VS in alto (altezza fissa), dati sotto (compact), niente overflow.
           - Desktop: grid 2 colonne come prima.
        */}
        <div className="h-[calc(100svh-44px)] sm:h-[calc(100%-44px)]">
          {/* MOBILE: VS in alto compatto */}
          <div className="sm:hidden h-[34svh] min-h-[260px]">
            <LeftVS
              fit="fill"
              modelLabel="Modello selezionato"
              casaLabel="Casa Corporation"
              modelScore={Number(model?.score ?? 0)}
              casaScore={Number(CASA.score)}
            />
          </div>

          {/* MOBILE: blocchi dati sotto (compact, no scroll) */}
          <div className="sm:hidden flex flex-col gap-4 px-4 pb-4 pt-3 overflow-hidden">
            <RightBlock
              title="Modello selezionato"
              cost={mCost}
              risk={mRisk}
              provVal={mProv}
              provHint={model?.provvigionePct || "~50%"}
              gainVal={mGain}
              gainHint={model?.guadagnoPct || "45%–50%"}
              tone="blue"
              compact
            />
            <RightBlock
              title="Casa Corporation"
              cost={cCost}
              risk={cRisk}
              provVal={cProv}
              provHint={CASA.provvigionePct}
              gainVal={cGain}
              gainHint={CASA.guadagnoPct}
              tone="gold"
              compact
            />
          </div>

          {/* DESKTOP: grid split con scroll solo a destra se serve */}
          <div className="hidden h-full grid-cols-[1.2fr_1fr] sm:grid">
            <div className="min-h-0">
              <LeftVS
                fit="aspect"
                modelLabel="Modello selezionato"
                casaLabel="Casa Corporation"
                modelScore={Number(model?.score ?? 0)}
                casaScore={Number(CASA.score)}
              />
            </div>
            <div className="min-h-0 overflow-y-auto p-5">
              <div className="grid content-start gap-6">
                <RightBlock
                  title="Modello selezionato"
                  cost={mCost}
                  risk={mRisk}
                  provVal={mProv}
                  provHint={model?.provvigionePct || "~50%"}
                  gainVal={mGain}
                  gainHint={model?.guadagnoPct || "45%–50%"}
                  tone="blue"
                />
                <RightBlock
                  title="Casa Corporation"
                  cost={cCost}
                  risk={cRisk}
                  provVal={cProv}
                  provHint={CASA.provvigionePct}
                  gainVal={cGain}
                  gainHint={CASA.guadagnoPct}
                  tone="gold"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================== SINISTRA ================== */
function LeftVS({ modelLabel, casaLabel, modelScore, casaScore, fit = "aspect" }) {
  const ref = React.useRef(null);
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const orbX = useTransform(mx, [0, 1], ["-8%", "8%"]);
  const orbY = useTransform(my, [0, 1], ["-6%", "6%"]);
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)));
  };

  const wrapperClass =
    fit === "fill"
      ? "relative h-full w-full overflow-hidden"
      : "relative aspect-[5/6] w-full md:aspect-[4/5] overflow-hidden";

  // gauge leggermente più piccolo su mobile per garantire spazio
  const gaugeSizes = fit === "fill" ? { base: "w-[58%] max-w-[460px]" } : { base: "w-[66%] sm:w-[60%] md:w-[58%] max-w-[520px]" };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0.5); my.set(0.5); }} className={wrapperClass}>
      {/* base blu + griglia */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #14234c 0%, #0B1220 100%)" }} />
      <div className="absolute inset-0 opacity-[.05]"
           style={{ backgroundImage: "linear-gradient(transparent 26px, rgba(255,255,255,.06) 27px), linear-gradient(90deg, transparent 26px, rgba(255,255,255,.06) 27px)", backgroundSize: "27px 27px" }} />

      {/* half LEFT (modello) */}
      <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 62% 0, 40% 100%, 0% 100%)" }}>
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-md bg-black/30 px-2.5 py-1 text-[11px] sm:text-xs text-white/90 ring-1 ring-white/15 backdrop-blur">
            {modelLabel}
          </div>
          <BigGauge value={modelScore} tone="blue" sizeClass={gaugeSizes.base} />
        </div>
      </div>

      {/* half RIGHT (Casa) */}
      <div className="absolute inset-0" style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 40% 100%)" }}>
        <motion.div className="absolute inset-0"
          style={{ x: orbX, y: orbY, background: "radial-gradient(55% 70% at 50% 50%, rgba(201,168,110,.22), rgba(201,168,110,.10) 52%, transparent 78%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(201,168,110,.16), rgba(201,168,110,.10))" }} />
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-md bg-black/30 px-2.5 py-1 text-[11px] sm:text-xs text-white/90 ring-1 ring-white/15 backdrop-blur">
            {casaLabel}
          </div>
          <BigGauge value={casaScore} tone="gold" sizeClass={gaugeSizes.base} />
        </div>
      </div>

      {/* slash highlight */}
      <div className="pointer-events-none absolute inset-0"
           style={{ background: "linear-gradient(63deg, transparent 48.4%, rgba(255,255,255,.08) 50%, transparent 51.6%)" }} />

      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
    </div>
  );
}

/* Gauge XL con animazione dash; sizeClass consente scaling mobile */
function BigGauge({ value = 0, tone = "blue", sizeClass = "w-[66%] sm:w-[60%] md:w-[58%] max-w-[520px]" }) {
  const v = Math.max(0, Math.min(100, Number(value))) / 100;
  const r = 38;
  const c = 2 * Math.PI * r;

  const mv = useMotionValue(0);
  const controls = useAnimation();

  React.useEffect(() => {
    const h = animateNumber(mv, v, 900);
    const unsub = mv.on("change", (p) => {
      const dash = c * p;
      controls.start({
        strokeDasharray: `${dash} ${c - dash}`,
        transition: { duration: 0.001 }
      });
    });
    return () => { h.stop(); unsub(); };
  }, [v, c, controls, mv]);

  const stroke = tone === "gold" ? "url(#ggold)" : "url(#gblue)";
  return (
    <div className={`relative ${sizeClass} aspect-square`}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,.14)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="50" cy="50" r={r} fill="none" strokeWidth="8" strokeLinecap="round"
          stroke={stroke}
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={controls}
          transform="rotate(-90 50 50)"
        />
        <defs>
          <linearGradient id="gblue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(29,45,94,.45)" />
            <stop offset="100%" stopColor="rgba(29,45,94,.95)" />
          </linearGradient>
          <linearGradient id="ggold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(201,168,110,.45)" />
            <stop offset="100%" stopColor="rgba(201,168,110,.95)" />
          </linearGradient>
        </defs>
      </svg>
      <AnimatedScoreCenter value={value} />
    </div>
  );
}

function AnimatedScoreCenter({ value }) {
  const mv = useMotionValue(0);
  const [text, setText] = React.useState("0.0");
  React.useEffect(() => {
    const target = Math.max(0, Math.min(100, Number(value || 0)));
    const h = animateNumber(mv, target, 900);
    const unsub = mv.on("change", (n) => setText(n.toFixed(1)));
    return () => { h.stop(); unsub(); };
  }, [value, mv]);
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="text-3xl sm:text-4xl font-semibold tabular-nums text-white/95">{text}</div>
    </div>
  );
}

/* ================== DESTRA: blocco dati ================== */
function RightBlock({ title, cost, risk, provVal, provHint, gainVal, gainHint, tone = "blue", compact = false }) {
  return (
    <section className={`rounded-xl border border-white/10 bg-white/[.03] ${compact ? "p-3" : "p-4"}`}>
      <div className={`mb-3 ${compact ? "text-[13px]" : "text-sm"} font-semibold text-white/90`}>{title}</div>

      {/* Costi + Rischio */}
      <div className={`mb-4 ${compact ? "gap-2" : "gap-3"} flex flex-col sm:flex-row sm:items-end sm:justify-between`}>
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">Costi</div>
          <div className={`${compact ? "text-base" : "text-lg"} font-semibold`}>
            <AnimatedCounter value={cost} format="euro" />
          </div>
        </div>
        <div className={`${compact ? "sm:min-w-[160px]" : "sm:min-w-[180px]"}`}>
          <RiskBar level={risk} compact={compact} />
        </div>
      </div>

      {/* Provvigione */}
      <SimpleBar label="Provvigione" value={provVal} hint={provHint} tone={tone} compact={compact} />
      {/* Guadagni */}
      <div className="mt-3">
        <SimpleBar label="Guadagni" value={gainVal} hint={gainHint} tone={tone === "gold" ? "gold" : "blue"} compact={compact} />
      </div>
    </section>
  );
}

/* ===== Barra a tacche (verde -> rosso) + etichetta ===== */
function RiskBar({ level = "medio", compact = false }) {
  const idx = levelToIndex(level); // 1..5
  const labels = { 1: "Basso", 2: "Basso", 3: "Medio", 4: "Medio", 5: "Elevato" };

  return (
    <div className="flex items-center gap-2">
      <div className={`grid ${compact ? "h-2.5 w-32" : "h-3 w-40"} grid-cols-5 gap-[3px]`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="rounded-[3px]"
            initial={{ opacity: 0.35, scale: 0.92 }}
            animate={{ opacity: i < idx ? 1 : 0.35, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
            style={{ background: segmentColor(i) }}
            aria-hidden
          />
        ))}
      </div>
      <span className={`${compact ? "text-[11px]" : "text-xs"} text-white/80 whitespace-nowrap`}>{labels[idx]}</span>
    </div>
  );
}

function levelToIndex(level) {
  const s = String(level || "").toLowerCase();
  if (s.includes("basso") || s === "low" || s === "0" || s === "1") return 1;
  if (s.includes("elevato") || s.includes("alto") || s === "high" || s === "5") return 5;
  if (s === "4") return 4;
  if (s === "2") return 2;
  return 3; // medio
}
function segmentColor(i) {
  return ["#22c55e", "#a3e635", "#eab308", "#f59e0b", "#ef4444"][i] || "#ef4444";
}

/* ===== Barre semplici animate ===== */
function SimpleBar({ label, value, hint, tone = "blue", compact = false }) {
  const widthTarget = `${Math.round((value || 0) * 100)}%`;
  return (
    <div>
      <div className={`mb-1 flex items-center justify-between ${compact ? "text-[11px]" : "text-xs"} text-white/70`}>
        <span>{label}</span>
        <span className="tabular-nums text-white/85">{hint}</span>
      </div>
      <div className={`relative ${compact ? "h-2" : "h-3"} overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10`}>
        <motion.div
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: widthTarget }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            background:
              tone === "gold"
                ? "linear-gradient(90deg, rgba(201,168,110,.35), rgba(201,168,110,.88))"
                : "linear-gradient(90deg, rgba(29,45,94,.35), rgba(29,45,94,.92))",
          }}
        />
      </div>
    </div>
  );
}

/* ===== Numeri animati ===== */
function AnimatedCounter({ value = 0, format = "euro", duration = 0.8 }) {
  const mv = useMotionValue(0);
  const [txt, setTxt] = React.useState("0");
  React.useEffect(() => {
    const target = Number(value || 0);
    const h = animateNumber(mv, target, duration * 1000);
    const unsub = mv.on("change", (v) => {
      const n = Math.max(0, v);
      setTxt(format === "euro" ? formatEuro(n) : Math.round(n).toString());
    });
    return () => { h.stop(); unsub(); };
  }, [value, format, duration, mv]);
  return <span className="tabular-nums text-white/95">{txt}</span>;
}

/* ===== Utils ===== */
function animateNumber(mv, to = 0, ms = 600) {
  const start = mv.get();
  const delta = to - start;
  const t0 = performance.now();
  let raf;
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / ms);
    mv.set(start + delta * (1 - Math.pow(1 - p, 3)));
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return { stop: () => cancelAnimationFrame(raf) };
}
function pctToNum(str) {
  if (!str) return 0;
  const s = String(str).replace(",", ".").toLowerCase();
  if (s.includes("oltre")) return 1.1;
  const m1 = s.match(/(\d+(?:\.\d+)?)\s*%?\s*[–-]\s*(\d+(?:\.\d+)?)\s*%/);
  if (m1) return ((+m1[1] + +m1[2]) / 2) / 100;
  const m2 = s.match(/(~?\s*)(\d+(?:\.\d+)?)\s*%/);
  if (m2) return +m2[2] / 100;
  return 0;
}
function speseToNum(str) {
  if (!str) return 0;
  const clean = String(str).replace(/\s/g, "");
  const parts = clean.split(/[–-]/).map((s) => Number(String(s).replace(/[^\d]/g, "")));
  if (parts.length === 1) return parts[0] || 0;
  if (parts.length >= 2) return (parts[0] + parts[1]) / 2;
  return 0;
}
function formatEuro(v) {
  if (isNaN(v)) return "€0";
  return v.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}
function clamp01(n) { return Math.max(0, Math.min(1, n || 0)); }

/* euristica semplice per rischio se non fornito */
function inferRisk({ spese = 0, prov = 0, gain = 0 }) {
  if (spese > 200 || gain < 0.28) return "elevato";
  if (spese > 50 || gain < 0.33 || prov < 0.22) return "medio";
  return "basso";
}
