"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { MODELS } from "@/components/carriere/confronto/data";
import { ShieldCheck, Brain, Target, TrendingUp, ClipboardCheck, Maximize2, X } from "lucide-react";

/** EXPLAINER — LIGHT THEME */
export default function Explainer() {
  const steps = [
    { icon: ShieldCheck, title: "Dati verificabili", desc: "Only-facts: % provvigione, spese, premi, supporto e formazione." },
    { icon: Brain,       title: "Pesi oggettivi",   desc: "Pesi proporzionali all’impatto su margine netto e tempo utile." },
    { icon: Target,      title: "Focus risultato",  desc: "Conta l’utile netto su pipeline reale, non le promesse." },
    { icon: ClipboardCheck, title: "Tracciabilità", desc: "Ogni metrica è storicizzata ed esportabile (Tabella → CSV)." },
    { icon: TrendingUp,  title: "Miglioramento",    desc: "Il modello ideale aumenta rendimento e riduce rischio." },
  ];

  const mapped = useMemo(() => {
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
        x: clamp(((sx - sMin) / ((sMax - sMin) || 1)) * 100, 0, 100),
        y: clamp(((gy - gMin) / ((gMax - gMin) || 1)) * 100, 0, 100),
      };
    });
  }, []);

  const casa = mapped.find((m) => m.isCasa) || null;
  const trad = mapped.find((m) => !m.isCasa) || null;

  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-labelledby="confronto-explain-title" className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 md:py-24">
      <Decor />

      <div className="container">
        <SectionHeader
          id="confronto-explain-title"
          title="Come leggere il confronto — dal rischio all’utile reale"
          size="lg"
          tone="light"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[76ch] text-center">
          <SectionP className="text-slate-600">
            L’obiettivo è spostarti verso <b>più rendimento</b> e <b>meno rischio</b>. La mappa affianca i modelli:
            in alto a destra è dove vuoi stare (guadagno alto, spese basse).
          </SectionP>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr]">
          {/* Colonna contenuti */}
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="relative flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200 shadow-sm"
                >
                  <s.icon className="mt-0.5 h-5 w-5 text-[var(--gold)]" />
                  <div>
                    <div className="text-slate-900">{s.title}</div>
                    <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Grafico */}
            <div className="mt-8 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
                <span>↓ Rischio (Spese)</span>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 ring-1 ring-slate-200 hover:bg-slate-200"
                  aria-label="Espandi grafico"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Espandi
                </button>
                <span>↑ Rendimento (Guadagno)</span>
              </div>

              <PlotCard mapped={mapped} casa={casa} trad={trad} />

              <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-[8px] w-[8px] rounded-full bg-[color:var(--gold)]/80" /> Casa Corporation
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-[8px] w-[8px] rounded-full bg-slate-500/70" /> Altri modelli
                </span>
              </div>
            </div>
          </div>

          {/* Aside */}
          <aside className="sticky top-[calc(var(--header-h,56px)+64px)] rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
            <div className="text-sm text-slate-600">In evidenza</div>
            <ul className="mt-2 space-y-2 text-slate-800">
              <li><b>Provvigione:</b> 60% + premi gara</li>
              <li><b>Spese fisse:</b> €0</li>
              <li><b>Premi:</b> 10% del fatturato aziendale (5% / 3% / 2%)</li>
              <li><b>Supporto:</b> segreteria, annunci, advertising</li>
              <li><b>Formazione:</b> completa (pre e post patentino)</li>
            </ul>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
            <p className="text-sm text-slate-700">
              Vuoi testare coi tuoi numeri? <a href="/carriere/calcolatore" className="underline text-slate-900">Apri il calcolatore</a>.
            </p>

            <div className="mt-5 grid grid-cols-3 items-center gap-3 opacity-90">
              <Logo src="/images/logos/immobiliareit.svg" label="Immobiliare.it" />
              <Logo src="/images/logos/idealista.svg" label="idealista" />
              <Logo src="/images/logos/facebook.svg" label="Meta Ads" />
            </div>
          </aside>
        </div>
      </div>

      {/* Overlay espanso */}
      <AnimatePresence>
        {expanded && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: "rgba(15,23,42,.35)" }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Grafico rischio/rendimento"
              className="relative w-[min(1200px,96vw)] rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-xl"
              initial={{ y: 18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setExpanded(false)} aria-label="Chiudi"
                className="absolute right-3 top-3 rounded-md bg-slate-100 p-1.5 ring-1 ring-slate-200 hover:bg-slate-200">
                <X className="h-4 w-4 text-slate-800" />
              </button>

              <div className="mb-3 flex items-center justify-between px-1 text-xs text-slate-600">
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

/* SUBCOMP */
function PlotCard({ mapped, casa, trad, tall = false }) {
  return (
    <div className={"relative w-full overflow-hidden rounded-xl bg-slate-50 " + (tall ? "h-[64vh] min-h-[420px]" : "h-[300px]")}>
      <div aria-hidden className="absolute inset-0 opacity-[.12]" style={{
        backgroundImage: "linear-gradient(transparent 23px, rgba(2,6,23,.06) 24px), linear-gradient(90deg, transparent 23px, rgba(2,6,23,.06) 24px)",
        backgroundSize: "24px 24px",
      }}/>
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
              : "bg-white text-slate-800 ring-slate-200")
          }
          style={{ left: `${d.x}%`, bottom: `${d.y}%`, boxShadow: d.isCasa ? "0 0 24px rgba(201,168,110,.25)" : undefined }}
          title={`${d.name} — rischio ${d.x.toFixed(0)} / rendimento ${d.y.toFixed(0)}`}
        >
          {d.isCasa ? "Casa" : d.name}
        </motion.div>
      ))}
      {casa && trad && (
        <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="traj" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(201,168,110,.25)" />
              <stop offset="100%" stopColor="rgba(201,168,110,.75)" />
            </linearGradient>
          </defs>
          <path d={`M ${trad.x} ${100 - trad.y} C ${trad.x} ${100 - casa.y}, ${casa.x} ${100 - trad.y}, ${casa.x} ${100 - casa.y}`} fill="none" stroke="url(#traj)" strokeWidth="1.6" />
          <circle cx={casa.x} cy={100 - casa.y} r="1.8" fill="rgba(201,168,110,.95)" />
        </svg>
      )}
    </div>
  );
}
function Logo({ src, label }) {
  return (
    <div className="flex items-center justify-center rounded-md bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="max-h-6 opacity-90"
        onError={(e) => {
          e.currentTarget.replaceWith(
            Object.assign(document.createElement("span"), {
              className: "text-xs text-slate-700",
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
      <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage:
        "repeating-linear-gradient(135deg, rgba(2,6,23,.10) 0 1px, transparent 1px 10px)" }} />
      <div className="absolute -top-12 left-1/2 h-48 w-[70%] -translate-x-1/2 blur-3xl opacity-60"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(29,45,94,.18), transparent 60%)" }} />
      <div className="absolute right-[-100px] bottom-[-120px] h-[360px] w-[360px] blur-3xl"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(201,168,110,.18), transparent 70%)" }} />
    </div>
  );
}

/* Utils */
function pctToNum(str){ if(!str) return 0; const clean=String(str).replace(",",".").toLowerCase().trim(); if(clean.includes("oltre")) return 1.1;
  const m1=clean.match(/(\d+(?:\.\d+)?)\s*%?\s*[–-]\s*(\d+(?:\.\d+)?)\s*%?/); if(m1) return ((parseFloat(m1[1])+parseFloat(m1[2]))/2)/100;
  const m2=clean.match(/(?:~|≈)?\s*(\d+(?:\.\d+)?)\s*%/); if(m2) return parseFloat(m2[1])/100; return 0;}
function speseToNum(str){ if(!str) return 0; const clean=String(str).replace(/\s/g,""); const rng=clean.match(/(\d+)[–-](\d+)/);
  if(rng) return (parseInt(rng[1],10)+parseInt(rng[2],10))/2; const one=clean.match(/(\d+)/); return one?parseInt(one[1],10):0; }
