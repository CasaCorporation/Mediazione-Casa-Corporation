// components/carriere/confronto/section/CasaShowcase.jsx
"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Trophy, Crown, ShieldCheck, Rocket, BarChart2, Users, Sparkles, CheckCircle2, X,
} from "lucide-react";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { MODELS } from "@/components/carriere/vendita/data";

/** CasaShowcase — card slim + modale identico (mobile incluso) */
export default function CasaShowcase({
  id = "casa-showcase",
  brandBadge = "/images/brand/casa-corporation.svg",
  panelLogo = "/logo.avif", // <— logo SOLO qui
}) {
  const casa = useMemo(() => MODELS.find((m) => /casa\s*corporation/i.test(m.name)), []);
  if (!casa) return null;

  const barProv = clamp01(pctToNum(casa.provvigionePct));
  const barGain = clamp01(pctToNum(casa.guadagnoPct));
  const speseNum = speseToNum(casa.spese);

  // Decor orbs (leggeri)
  const ref = useRef(null);
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const orbX = useTransform(mx, [0, 1], ["-10%", "10%"]);
  const orbY = useTransform(my, [0, 1], ["-6%", "6%"]);
  const move = (e) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)));
  };

  // Modal
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative overflow-hidden py-10 sm:py-12 md:py-14">
      <div className="container">
        <motion.div
          ref={ref}
          onMouseMove={move}
          onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px -12% 0px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-[rgba(10,14,22,.72)] focus-within:ring-2 focus-within:ring-[var(--gold)]/40"
          style={{ boxShadow: "0 12px 38px rgba(0,0,0,.34)" }}
        >
          {/* DECOR */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div
              className="absolute inset-0 opacity-[.06]"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 28px, rgba(255,255,255,.05) 29px), linear-gradient(90deg, transparent 28px, rgba(255,255,255,.05) 29px)",
                backgroundSize: "29px 29px",
              }}
            />
            <motion.div className="absolute left-[8%] top-[-18%] h-[420px] w-[560px] blur-3xl"
              style={{ x: orbX, y: orbY, background: "radial-gradient(52% 52% at 50% 50%, rgba(29,45,94,.40), transparent 70%)" }} />
            <motion.div className="absolute right-[-12%] bottom-[-16%] h-[460px] w-[460px] blur-3xl"
              style={{ x: useTransform(orbX, v => `calc(${v} * -0.6)`), y: useTransform(orbY, v => `calc(${v} * -0.6)`), background: "radial-gradient(52% 52% at 50% 50%, rgba(201,168,110,.24), transparent 70%)" }} />
            <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,110,.6), transparent)" }} />
          </div>

          {/* CONTENUTO (click apre modale identico) */}
          <button type="button" onClick={() => setOpen(true)} aria-label="Apri dettagli Casa Corporation"
            className="block w-full text-left">
            <ShowcaseContent
              casa={casa}
              barProv={barProv}
              barGain={barGain}
              speseNum={speseNum}
              brandBadge={brandBadge}
              panelLogo={panelLogo}
            />
          </button>
        </motion.div>
      </div>

      {/* MODALE 1:1 (mobile/desktop) */}
      {open && (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" onClick={() => setOpen(false)} style={{ background: "rgba(6,8,12,.62)" }}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 m-0 h-[100svh] w-[100vw] overflow-y-auto bg-[rgba(12,16,24,.96)] sm:m-auto sm:h-[min(92vh,920px)] sm:w-[min(1180px,94vw)] sm:rounded-2xl sm:bg-[rgba(12,16,24,.92)] sm:ring-1 sm:ring-white/10"
          >
            <div className="flex items-center justify-end px-3 py-3 sm:px-4">
              <button onClick={() => setOpen(false)} className="rounded-md bg-white/10 p-1.5 ring-1 ring-white/15 hover:bg-white/14" aria-label="Chiudi">
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            <div className="px-3 pb-6 sm:px-5">
              <ShowcaseContent
                casa={casa}
                barProv={barProv}
                barGain={barGain}
                speseNum={speseNum}
                brandBadge={brandBadge}
                panelLogo={panelLogo}
                inModal
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ───────────────── Content (riusato da card e modale) ───────────────── */
function ShowcaseContent({ casa, barProv, barGain, speseNum, brandBadge, panelLogo, inModal = false }) {
  return (
    <div className={`grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.2fr_1fr] lg:gap-9 xl:p-9 ${inModal ? "" : ""}`}>
      {/* LEFT */}
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <BrandBadge src={brandBadge} />
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)]/12 px-3 py-1 text-[12px] text-[var(--gold)] ring-1 ring-[color:var(--gold)]/25">
            <Trophy className="h-3.5 w-3.5" /> Modello consigliato
          </span>
        </div>

        <h3 id="casa-showcase-title" className="text-[22px] sm:text-[26px] font-semibold leading-[1.18] tracking-[-0.01em]">
          Casa Corporation — performance reale e tutela operativa
        </h3>
        <p className="mt-2 max-w-[70ch] text-[15px] sm:text-[16px] text-white/85">
          Provvigione elevata, zero spese fisse e premi di produzione. Supporto completo e formazione continua.
          KPI trasparenti, processo misurabile.
        </p>

        {/* KPI */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <KPI label="% Provvigione" value={casa.provvigionePct} />
          <KPI label="Spese fisse" value={formatEuro(speseNum)} />
          <KPI label="% Guadagno" value={casa.guadagnoPct} />
          <KPI label="Premi" value="10% gara aziendale" />
          <KPI label="Formazione" value="Completa" />
          <KPI label="KPI" value="Trasparenti" />
        </div>

        {/* Barre */}
        <div className="mt-5 grid gap-3">
          <BarAnimated label="Provvigione" value={barProv} hint={casa.provvigionePct} />
          <BarAnimated label="Guadagno" value={barGain} hint={casa.guadagnoPct} tone="gold" />
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <ButtonGold as="a" href="/carriere/candidatura" className="!px-5 !py-2.5">
            Invia candidatura
          </ButtonGold>
          <ButtonGhost as="a" href="/carriere/calcolatore" className="!px-5 !py-2.5">
            Calcola i tuoi guadagni
          </ButtonGhost>
        </div>
      </div>

      {/* RIGHT */}
      <div className="grid gap-5">
        {/* Cosa ottieni */}
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10" style={{ boxShadow: "0 10px 28px rgba(0,0,0,.28)" }}>
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">Cosa ottieni</div>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { icon: Crown, label: "Premi Gara", desc: "10% del fatturato (5/3/2)" },
              { icon: ShieldCheck, label: "Zero costi fissi", desc: "Strumenti e segreteria" },
              { icon: BarChart2, label: "KPI e report", desc: "Numeri verificabili" },
              { icon: Users, label: "Lead & Annunci", desc: "Campagne + portali" },
              { icon: Rocket, label: "Onboarding", desc: "Percorso guidato" },
              { icon: Sparkles, label: "Formazione", desc: "Pre e post patentino" },
            ].map((b) => (
              <li key={b.label} className="flex items-start gap-2 text-sm">
                <b.icon className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
                <div>
                  <div className="text-white/95">{b.label}</div>
                  <div className="text-white/75">{b.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* PANEL LOGO (sole location del logo) */}
        <PanelLogo panelLogo={panelLogo} />
      </div>
    </div>
  );
}

/* ───────────────── Small parts ───────────────── */
function PanelLogo({ panelLogo }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10" style={{ background: "linear-gradient(180deg, #152449 0%, #0B1220 100%)", boxShadow: "0 10px 28px rgba(0,0,0,.28)" }}>
      <div className="p-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-[12px] text-white/90 ring-1 ring-white/12">
          Casa Corporation
        </span>
      </div>

      <div className="relative mx-auto my-8 grid place-items-center px-4">
        {ok ? (
          <Image
            src={panelLogo}
            alt="Casa Corporation"
            width={360}
            height={160}
            className="h-auto w-[62%] max-w-[420px] opacity-90"
            onError={() => setOk(false)}
            priority={false}
          />
        ) : (
          <div className="grid h-28 w-full place-items-center text-white/70">
            <span className="rounded bg-white/10 px-3 py-1 text-sm ring-1 ring-white/15">Logo</span>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(12,16,24,.92)] to-transparent" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" aria-hidden />
    </div>
  );
}

function BrandBadge({ src }) {
  const [ok, setOk] = useState(true);
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-[12px] text-white/90 ring-1 ring-white/12">
      {ok ? (
        <Image src={src} alt="Casa Corporation" width={18} height={18} onError={() => setOk(false)} className="rounded" />
      ) : (
        <span className="inline-block h-[18px] w-[18px] rounded bg-white/12 ring-1 ring-white/20" aria-hidden />
      )}
      Casa Corporation
    </span>
  );
}

function KPI({ label, value }) {
  return (
    <div className="rounded-lg bg-white/6 px-3 py-2 text-sm ring-1 ring-white/10">
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">{label}</div>
      <div className="text-white/90">{value}</div>
    </div>
  );
}

function BarAnimated({ label, value, hint, tone = "blue" }) {
  const widthTarget = `${Math.round((value || 0) * 100)}%`;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-white/70">
        <span>{label}</span>
        <span className="tabular-nums text-white/85">{hint}</span>
      </div>
      <div className="relative h-[10px] sm:h-[12px] overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
        <motion.div
          className="h-full"
          initial={{ width: 0 }}
          whileInView={{ width: widthTarget }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
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

/* ───────────────── Utils ───────────────── */
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
