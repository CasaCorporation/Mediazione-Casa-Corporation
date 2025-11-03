// components/carriere/confronto/section/Explainer.jsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { MODELS } from "@/components/carriere/vendita/data";
import { ShieldCheck, Brain, Target, TrendingUp, ClipboardCheck, Maximize2, X } from "lucide-react";

/**
 * EXPLAINER — ULTRA+
 * - Titolo centrato (band "blue" → tone="dark")
 * - Storyboard metodologico con icone
 * - Grafico “Rischio (Spese) ↔ Rendimento (Guadagno)” con traiettoria → Casa
 * - Grafico ESPANDIBILE: overlay full-screen (desktop+mobile)
 * - Aside sticky con punti chiave + loghi (fallback testuale)
 */

export default function Explainer() {
  const steps = [
    { icon: ShieldCheck, title: "Dati verificabili", desc: "Only-facts: % provvigione, spese, premi, supporto e formazione." },
    { icon: Brain,       title: "Pesi oggettivi",   desc: "Pesi proporzionali all’impatto su margine netto e tempo utile." },
    { icon: Target,      title: "Focus risultato",  desc: "Conta l’utile netto su pipeline reale, non le promesse." },
    { icon: ClipboardCheck, title: "Tracciabilità", desc: "Ogni metrica è storicizzata ed esportabile (Tabella → CSV)." },
    { icon: TrendingUp,  title: "Miglioramento",    desc: "Il modello ideale aumenta rendimento e riduce rischio." },
  ];

  /* ==== Mapping modelli su piano rischio/rendimento ==== */
  const mapped = useMemo(() => {
    // proiezione semplice x=spese, y=guadagno (0..100 normalizzati)
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const sVals = MODELS.map((m) => speseToNum(m.spese));
    const gVals = MODELS.map((m) => pctToNum(m.guadagnoPct));
    const sMin = Math.min(...sVals), sMax = Math.max(...sVals);
    const gMin = Math.min(...gVals), gMax = Math.max(...gVals);

    return MODELS.map((m, i) => {
      const sx = speseToNum(m.spese);
      const gy = pctToNum(m.guadagnoPct);
      return {
        key: m.key || m.id || `m-${i}`,
        name: m.name,
        isCasa: /casa\s*corporation/i.test(m.name),
        x: clamp(((sx - sMin) / ((sMax - sMin) || 1)) * 100, 0, 100), // rischio (spese) →
        y: clamp(((gy - gMin) / ((gMax - gMin) || 1)) * 100, 0, 100), // rendimento (guadagno) ↑
      };
    });
  }, []);

  const casa = mapped.find((m) => m.isCasa) || null;
  const trad = mapped.find((m) => !m.isCasa) || null;

  // overlay per grafico espanso
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-labelledby="confronto-explain-title" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      <Decor />

      <div className="container">
        {/* ===== TITOLO CENTRATO ===== */}
        <SectionHeader
          id="confronto-explain-title"
          title="Come leggere il confronto — dal rischio all’utile reale"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[76ch] text-center">
          <SectionP className="text-white/92">
            L’obiettivo è spostarti verso <b>più rendimento</b> e <b>meno rischio</b>. La mappa affianca i modelli:
            in alto a destra è dove vuoi stare (guadagno alto, spese basse).
          </SectionP>
        </div>

        {/* ===== LAYOUT ===== */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr]">
          {/* Colonna contenuti */}
          <div>
            {/* Steps */}
            <ul className="grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="relative flex items-start gap-3 rounded-xl bg-white/6 p-4 ring-1 ring-white/10"
                  style={{ boxShadow: "var(--shadow-gold)" }}
                >
                  <s.icon className="mt-0.5 h-5 w-5 text-[var(--gold)]" />
                  <div>
                    <div className="text-white/95">{s.title}</div>
                    <p className="mt-1 text-sm text-white/85">{s.desc}</p>
                  </div>
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl" style={{ boxShadow: "inset 0 0 0 1px var(--glass-stroke)" }} />
                </motion.li>
              ))}
            </ul>

            {/* ===== GRAFICO con pulsante ESPANDI ===== */}
            <div className="mt-8 rounded-2xl p-4 ring-1 ring-white/10" style={{ background: "rgba(0,0,0,.18)" }}>
              <div className="mb-2 flex items-center justify-between text-xs text-white/70">
                <span>↓ Rischio (Spese)</span>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 ring-1 ring-white/15 hover:bg-white/14"
                  aria-label="Espandi grafico"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Espandi
                </button>
                <span>↑ Rendimento (Guadagno)</span>
              </div>

              <PlotCard mapped={mapped} casa={casa} trad={trad} />

              <div className="mt-2 flex items-center gap-3 text-xs text-white/65">
                <span className="inline-flex items-center gap-1"><span className="inline-block h-[8px] w-[8px] rounded-full bg-[color:var(--gold)]/80" /> Casa Corporation</span>
                <span className="inline-flex items-center gap-1"><span className="inline-block h-[8px] w-[8px] rounded-full bg-white/60" /> Altri modelli</span>
              </div>
            </div>
          </div>

          {/* Aside */}
          <aside
            className="sticky top-[calc(var(--header-h,56px)+64px)] rounded-2xl p-6 ring-1"
            style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-stroke)", boxShadow: "var(--shadow-gold)" }}
          >
            <div className="text-sm text-white/70">In evidenza</div>
            <ul className="mt-2 space-y-2 text-white/88">
              <li><b>Provvigione:</b> 60% + premi gara</li>
              <li><b>Spese fisse:</b> €0</li>
              <li><b>Premi:</b> 10% del fatturato aziendale (5% / 3% / 2%)</li>
              <li><b>Supporto:</b> segreteria, annunci, advertising</li>
              <li><b>Formazione:</b> completa (pre e post patentino)</li>
            </ul>
            <div className="my-4 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
            <p className="text-sm text-white/85">
              Vuoi testare coi tuoi numeri? <a href="/carriere/calcolatore" className="underline text-white">Apri il calcolatore</a>.
            </p>

            {/* Logos / fallback testo */}
            <div className="mt-5 grid grid-cols-3 items-center gap-3 opacity-85">
              <Logo src="/images/logos/immobiliareit.svg" label="Immobiliare.it" />
              <Logo src="/images/logos/idealista.svg" label="idealista" />
              <Logo src="/images/logos/facebook.svg" label="Meta Ads" />
            </div>
          </aside>
        </div>
      </div>

      {/* ===== OVERLAY GRAFICO ESPANSO ===== */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(6,8,12,.65)" }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Grafico rischio/rendimento"
              className="relative w-[min(1200px,96vw)] rounded-2xl bg-[rgba(12,16,24,.95)] p-4 ring-1 ring-white/10 backdrop-blur"
              initial={{ y: 18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpanded(false)}
                aria-label="Chiudi"
                className="absolute right-3 top-3 rounded-md bg-white/10 p-1.5 ring-1 ring-white/15 hover:bg-white/14"
              >
                <X className="h-4 w-4 text-white" />
              </button>

              <div className="mb-3 flex items-center justify-between text-xs text-white/70 px-1">
                <span>↓ Rischio (Spese)</span>
                <span>↑ Rendimento (Guadagno)</span>
              </div>

              <PlotCard mapped={mapped} casa={casa} trad={trad} tall />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================== SUB-COMPONENTI ================== */

function PlotCard({ mapped, casa, trad, tall = false }) {
  return (
    <div className={"relative w-full overflow-hidden rounded-xl bg-white/[.03] " + (tall ? "h-[64vh] min-h-[420px]" : "h-[300px]")}>
      {/* Griglia */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[.12]"
        style={{
          backgroundImage:
            "linear-gradient(transparent 23px, rgba(255,255,255,.06) 24px), linear-gradient(90deg, transparent 23px, rgba(255,255,255,.06) 24px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Punti */}
      {mapped.map((d, i) => (
        <motion.div
          key={d.key}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.45, delay: 0.03 * i }}
          className={
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[11px] ring-1 " +
            (d.isCasa
              ? "bg-[color:var(--gold)]/20 text-[var(--gold)] ring-[color:var(--gold)]/30"
              : "bg-white/10 text-white ring-white/15")
          }
          style={{
            left: `${d.x}%`,
            bottom: `${d.y}%`,
            boxShadow: d.isCasa ? "0 0 24px rgba(201,168,110,.35)" : undefined,
            backdropFilter: "blur(2px)",
          }}
          title={`${d.name} — rischio ${d.x.toFixed(0)} / rendimento ${d.y.toFixed(0)}`}
        >
          {d.isCasa ? "Casa" : d.name}
        </motion.div>
      ))}

      {/* Traiettoria ideale (dal punto tradizionale → Casa) */}
      {casa && trad && (
        <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="traj" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(201,168,110,.3)" />
              <stop offset="100%" stopColor="rgba(201,168,110,.8)" />
            </linearGradient>
          </defs>
          <path
            d={`M ${trad.x} ${100 - trad.y} C ${trad.x} ${100 - casa.y}, ${casa.x} ${100 - trad.y}, ${casa.x} ${100 - casa.y}`}
            fill="none"
            stroke="url(#traj)"
            strokeWidth="1.6"
          />
          <circle cx={casa.x} cy={100 - casa.y} r="1.8" fill="rgba(201,168,110,.95)" />
        </svg>
      )}
    </div>
  );
}

function Logo({ src, label }) {
  return (
    <div className="flex items-center justify-center rounded-md bg-white/6 px-3 py-2 ring-1 ring-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="max-h-6 opacity-90"
        onError={(e) => {
          e.currentTarget.replaceWith(
            Object.assign(document.createElement("span"), {
              className: "text-xs text-white/80",
              innerText: label,
            })
          );
        }}
      />
    </div>
  );
}

function Decor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0 opacity-[.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 10px)",
        }}
      />
      <div
        className="absolute -top-12 left-1/2 h-48 w-[70%] -translate-x-1/2 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(29,45,94,.35), transparent 60%)",
        }}
      />
      <div
        className="absolute right-[-100px] bottom-[-120px] h-[360px] w-[360px] blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(201,168,110,.28), transparent 70%)",
        }}
      />
    </div>
  );
}

/* ================== UTILS ================== */
function pctToNum(str) {
  if (!str) return 0;
  const clean = String(str).replace(",", ".").toLowerCase().trim();
  if (clean.includes("oltre")) return 1.1;
  const m1 = clean.match(/(\d+(?:\.\d+)?)\s*%?\s*[–-]\s*(\d+(?:\.\d+)?)\s*%?/);
  if (m1) return ((parseFloat(m1[1]) + parseFloat(m1[2])) / 2) / 100;
  const m2 = clean.match(/(?:~|≈)?\s*(\d+(?:\.\d+)?)\s*%/);
  if (m2) return parseFloat(m2[1]) / 100;
  return 0;
}
function speseToNum(str) {
  if (!str) return 0;
  const clean = String(str).replace(/\s/g, "");
  const rng = clean.match(/(\d+)[–-](\d+)/);
  if (rng) return (parseInt(rng[1], 10) + parseInt(rng[2], 10)) / 2;
  const one = clean.match(/(\d+)/);
  return one ? parseInt(one[1], 10) : 0;
}
