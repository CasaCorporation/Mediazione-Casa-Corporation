"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { KanbanSquare, ClipboardCheck, Gauge, Users2 } from "lucide-react";

/**
 * SoftwareSuite — Super Dashboard (v5 FINAL)
 * - Full responsive + accessibile
 * - NESSUN poster/anteprima: intro parte automaticamente al primo accesso (una volta per sessione)
 * - Al termine mostra solo bottone Play per rivedere manualmente
 * - PRM: se l'utente preferisce meno motion → niente autoplay
 * - Layout pulito: media-first su mobile, griglia stabile, icone lucide-react
 *
 * Pronto da incollare in:
 * /components/carriere/agenti-immobiliari/section/SoftwareSuite.jsx
 */
export default function SoftwareSuite() {
  return (
    <section id="software" role="region" aria-labelledby="software-title" className="relative py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          title={<span id="software-title">Super Dashboard</span>}
          size="lg"
          tone="dark"
          underline
          className="mb-6 sm:mb-8"
        />

        <SectionP className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          Pipeline visuale end‑to‑end, pratiche guidate con <em>step non aggirabili</em> e KPI in tempo reale.
          Un unico ambiente per clienti, agenti e sede.
        </SectionP>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Media first su mobile */}
          <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2">
            <div className="mockup">
              <DashboardBootIntro
                title="SUPER DASHBOARD"
                versionText="Versione 1.0.3"
                logoSrc="/logo.png"
                durationMs={5800}
                autoplayStorageKey="cc_sd_intro_v1"
              />
              <div className="overlay" aria-hidden>
                <div className="topGlow" />
                <div className="gridLayer" />
              </div>
            </div>
          </div>

          {/* Colonna testo */}
          <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1">
            <ul className="space-y-5">
              <Feature
                title="Pipeline unificata"
                desc="Da lead a rogito con stati chiari, scadenze e priorità operative."
                Icon={KanbanSquare}
              />
              <Feature
                title="Pratiche guidate"
                desc="Procedure a prova di errore: verifiche e documenti con controlli obbligatori."
                Icon={ClipboardCheck}
              />
              <Feature
                title="KPI & audit trail"
                desc="Metriche aggiornate e cronologia completa di ogni azione."
                Icon={Gauge}
              />
              <Feature
                title="Collaborazione cliente‑agente"
                desc="Condivisione sicura di stati e documenti, notifiche e commenti."
                Icon={Users2}
              />
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonGold href="/carriere/software">Scopri la Super Dashboard</ButtonGold>
              <ButtonGhost href="/contatti?topic=carriere-software" withArrow={false}>
                Parla con un responsabile
              </ButtonGhost>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-[12.5px] text-white/70">
              <KpiChip label="Esempio KPI" />
              <KpiChip label="SLA rispettato 95%" />
              <KpiChip label="Errori formali −68%" />
              <KpiChip label="Tempo pratica −22%" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mockup { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid var(--glass-stroke);
          background: radial-gradient(42% 30% at 50% 0%, rgba(201,168,110,.12), transparent 62%),
                      linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
          box-shadow: var(--shadow-gold); contain: paint; }
        .overlay { position: absolute; inset: 0; pointer-events: none; }
        .topGlow { position:absolute; inset:0; background:
          radial-gradient(60% 40% at 50% -6%, rgba(201,168,110,.18), transparent 60%); opacity: .6; }
        .gridLayer { position:absolute; inset:0; opacity:.08; background-image:
          linear-gradient(transparent 31px, rgba(255,255,255,.4) 32px),
          linear-gradient(90deg, transparent 31px, rgba(255,255,255,.4) 32px);
          background-size: 32px 32px; mix-blend-mode: overlay; }

        .feature { display:flex; gap:12px; align-items:flex-start; }
        .iconBox { width:38px; height:38px; display:grid; place-items:center; border-radius:12px; font-size:0;
          background: linear-gradient(var(--brand-dark) 0 0) padding-box,
                      linear-gradient(135deg, rgba(201,168,110,.7), rgba(255,255,255,.18)) border-box;
          border: 1px solid transparent; color: var(--gold); }
        .ftTitle { font-weight:600; letter-spacing:-.01em; }
        .ftDesc { color: color-mix(in oklab, white 82%, black 18%); font-size: 13.5px; margin-top:2px; }

        @media (prefers-reduced-motion: reduce) {
          .gridLayer { display:none !important; }
          .topGlow { opacity:.4; }
        }
      `}</style>
    </section>
  );
}

function Feature({ title, desc, Icon }) {
  return (
    <li className="feature">
      <span className="iconBox" aria-hidden>
        <Icon className="w-[18px] h-[18px]" />
      </span>
      <div>
        <div className="ftTitle">{title}</div>
        <div className="ftDesc">{desc}</div>
      </div>
    </li>
  );
}

function KpiChip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1"
      style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.12)" }}>
      {label}
    </span>
  );
}

/* =====================================================================
   DashboardBootIntro — SENZA poster, autoplay una volta per sessione
   ===================================================================== */
function DashboardBootIntro({
  logoSrc = "/logo.png",
  versionText = "Versione 1.0.3",
  title = "SUPER DASHBOARD",
  durationMs = 5800,
  autoplayStorageKey = "cc_sd_intro_v1",
}) {
  const prefersReduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);

  // Autoplay una sola volta per sessione
  useEffect(() => {
    if (prefersReduced) return; // accessibilità
    try {
      const already = sessionStorage.getItem(autoplayStorageKey);
      if (!already) setPlaying(true); else setFinished(true);
    } catch { setPlaying(true); }
  }, [prefersReduced, autoplayStorageKey]);

  const handlePlay = () => {
    setFinished(false);
    setPlaying(true);
  };

  const handleFinish = () => {
    setPlaying(false);
    setFinished(true);
    try { sessionStorage.setItem(autoplayStorageKey, "1"); } catch {}
  };

  return (
    <div className="playerRoot" aria-label="Intro Super Dashboard">
      {/* UI Play */}
      {!playing && (
        <div className="posterUi" aria-hidden>
          <button type="button" className="playBtn" onClick={handlePlay} aria-pressed={playing} aria-label="Play">
            <PlayIcon />
            <span className="btnLabel">Play</span>
          </button>
        </div>
      )}

      {/* Sequenza */}
      {playing && (
        <BootOverlay onFinish={handleFinish} logoSrc={logoSrc} versionText={versionText} title={title} durationMs={durationMs} />
      )}

      <style jsx>{`
        .playerRoot { position: relative; width: 100%; aspect-ratio: 16/9; background: #0b1226; overflow:hidden; }
        .posterUi { position:absolute; inset:0; display:grid; place-items:center; padding:16px;
          background: linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.28)); z-index:1; }
        .playBtn { display:inline-flex; align-items:center; gap:10px; padding:12px 16px; border-radius:999px;
          border:1px solid rgba(255,255,255,.22); color:#fff; background: rgba(0,0,0,.35); font-weight:700;
          backdrop-filter: blur(8px); transition: transform .2s ease, background .2s ease, border-color .2s ease; }
        .playBtn:hover { transform: translateY(-1px); background: rgba(0,0,0,.5); border-color: rgba(255,255,255,.36); }
        .btnLabel { font-size:14px; letter-spacing:.02em; }
      `}</style>
    </div>
  );
}

/* ---------- BootOverlay (animazione in-card) ---------- */
function BootOverlay({ onFinish, logoSrc, versionText, title, durationMs }) {
  const [showLogo, setShowLogo] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showVersion, setShowVersion] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [versionIndex, setVersionIndex] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 200);
    const t2 = setTimeout(() => setShowPulse(true), 500);
    const t3 = setTimeout(() => setShowTitle(true), 900);
    const t4 = setTimeout(() => setShowVersion(true), 1400);
    const t5 = setTimeout(() => { onFinish && onFinish(); }, durationMs);
    return () => { [t1,t2,t3,t4,t5].forEach(clearTimeout); };
  }, [onFinish, durationMs]);

  useEffect(() => {
    if (!showTitle) return; setTitleIndex(0);
    const intv = setInterval(() => { setTitleIndex(i => (i < title.length ? i + 1 : (clearInterval(intv), i))); }, 55);
    return () => clearInterval(intv);
  }, [showTitle, title]);

  useEffect(() => {
    if (!showVersion) return; setVersionIndex(0);
    const intvV = setInterval(() => { setVersionIndex(j => (j < versionText.length ? j + 1 : (clearInterval(intvV), j))); }, 24);
    return () => clearInterval(intvV);
  }, [showVersion, versionText]);

  return (
    <div className="bootRoot" role="dialog" aria-label="Avvio Super Dashboard">
      <EnergyPulse show={showPulse} />
      <div className={`logoWrap ${showLogo ? "in" : ""}`}>
        {/* Logo con Next/Image per performance */}
        <Image src={logoSrc} alt="Casa Corporation" width={216} height={216} className="logo" />
      </div>

      <div className={`titleWrap ${showTitle ? "in" : ""}`}>
        <h1 className="title" aria-live="polite" aria-atomic>
          {title.slice(0, titleIndex).split("").map((c, i) => (
            <span key={i} className="dashChar" style={{ animationDelay: `${i * 0.035}s` }}>{c === " " ? " " : c}</span>
          ))}
          <span className="sparkle" />
        </h1>
      </div>

      <div className={`versionWrap ${showVersion ? "in" : ""}`}>
        <span className="version">{versionText.slice(0, versionIndex)}{versionIndex < versionText.length && <span className="cursor">_</span>}</span>
      </div>

      <style jsx>{`
        .bootRoot { position:absolute; inset:0; background:#1D2D5E; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .logoWrap { position:absolute; top:42%; transform:translateY(-50%) scale(.85); opacity:0; transition: all .8s cubic-bezier(.35,1.5,.47,1.08); }
        .logoWrap.in { opacity:1; transform:translateY(-50%) scale(1); filter: drop-shadow(0 12px 48px #0008); }
        .logo { width:min(38vw, 28vh); height:auto; max-width: 216px; }
        .titleWrap { position:absolute; top:calc(54% + 44px); width:100%; display:flex; justify-content:center; opacity:0; transition:opacity .7s ease; }
        .titleWrap.in { opacity:1; }
        .title { color:#fff; font-weight:900; letter-spacing:.09em; text-shadow:0 3px 22px #14195e90; font-size: clamp(18px, 3.7vw, 32px); display:flex; align-items:center; position:relative; }
        .dashChar { display:inline-block; opacity:1; transform: scale(.88) translateY(10px); animation: dashUp .6s cubic-bezier(.28,1.15,.47,.98) forwards; }
        @keyframes dashUp { from{ opacity:0; transform:scale(.7) translateY(28px);} 80%{ opacity:1; transform:scale(1.12) translateY(-4px);} to{ opacity:1; transform:scale(1) translateY(0);} }
        .sparkle { position:absolute; left:50%; top:-14px; width:26px; height:26px; border-radius:999px; background: radial-gradient(circle, #fff8 22%, var(--gold, #C9A86E) 70%, transparent 100%); opacity:.22; filter: blur(2px); animation: sparkle 1.6s linear infinite; pointer-events:none; }
        @keyframes sparkle { 0%,100%{ opacity:.22; transform: scale(.7) translateX(-34px) rotate(-7deg);} 40%{ opacity:.43; transform: scale(1.13) translateX(10px) rotate(10deg);} 70%{ opacity:.31; transform: scale(.8) translateX(-10px) rotate(-8deg);} 90%{ opacity:.23; transform: scale(1.1) translateX(8px);} }
        .versionWrap { position:absolute; bottom:7.5%; left:0; right:0; display:flex; justify-content:center; opacity:0; transition:opacity .8s ease; }
        .versionWrap.in { opacity:1; }
        .version { color: var(--gold, #C9A86E); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; letter-spacing:.04em; font-size: clamp(12px, 2.4vw, 16px); position:relative; }
        .version::before { content:""; position:absolute; inset:0; background: repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(201,168,110,.12) 2.2px, transparent 4px); opacity:.22; animation: scanMove 2.2s linear infinite; pointer-events:none; }
        @keyframes scanMove { 0%{ background-position-y:0;} 100%{ background-position-y:14px;} }
        .cursor { animation: blink 1.15s steps(2, start) infinite; font-weight:900; font-size:1.1em; }
        @keyframes blink { to { visibility: hidden; } }
        @media (max-width: 480px){ .logo{ max-width: 46vw;} }
      `}</style>
    </div>
  );
}

function EnergyPulse({ show }) {
  return (
    <div className="pulseWrap" aria-hidden>
      {[0,1,2].map((i) => (
        <span key={i} className={`ring ${show ? "on" : ""}`} style={{ animationDelay: `${i * 0.37 + 0.08}s` }} />
      ))}
      <style jsx>{`
        .pulseWrap { position:absolute; left:50%; top:42%; transform: translate(-50%,-50%); width:64%; height:64%; pointer-events:none; }
        .ring { position:absolute; inset:0; border-radius:999px; border:3px solid var(--gold, #C9A86E); opacity:0; transform: scale(.8); filter: blur(4px) brightness(1.1); }
        .ring.on { animation: pulseWave 2.6s cubic-bezier(.28,1.13,.37,.97) infinite; }
        @keyframes pulseWave { 0%{ opacity:0; transform:scale(.7);} 20%{ opacity:.19; transform:scale(1);} 60%{ opacity:.08; transform:scale(1.23);} 90%{ opacity:0; transform:scale(1.48);} 100%{ opacity:0; transform:scale(.7);} }
      `}</style>
    </div>
  );
}

function PlayIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function usePrefersReducedMotion(){
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update); };
  }, []);
  return reduced;
}
