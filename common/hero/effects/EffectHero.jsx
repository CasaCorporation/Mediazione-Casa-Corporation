// @common/hero/effects/EffectHero.jsx
"use client";
import clsx from "clsx";

/* Colori agganciati ai token globali:
   --brand  (fallback #1D2D5E)
   --gold   (fallback #C9A86E)
   --brand-dark (già usato dal layout)
*/

/* =========================================================
   GOLD-BLUE — più intenso & “magico”: archi conici, bokeh, scintille
   ========================================================= */
function GoldBlueGlow() {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none">
      {/* bagliori principali più intensi */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 60% at 18% 30%, color-mix(in srgb, var(--gold, #C9A86E) 30%, transparent) 0%, transparent 62%),
            radial-gradient(70% 70% at 85% 62%, color-mix(in srgb, var(--brand, #1D2D5E) 55%, transparent) 0%, transparent 68%),
            radial-gradient(120% 90% at 50% -10%, rgba(255,255,255,.10), transparent 60%)
          `,
          mixBlendMode: "screen",
          filter: "saturate(1.08) contrast(1.05)",
          animation: "gb_float 14s ease-in-out infinite alternate",
        }}
      />
      {/* archi conici “magici” con lieve parallax */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 25deg at 16% 28%, color-mix(in srgb, var(--gold, #C9A86E) 26%, transparent) 8%, transparent 26%, transparent 58%, color-mix(in srgb, var(--gold, #C9A86E) 22%, transparent) 72%, transparent 100%),
            conic-gradient(from 205deg at 80% 62%, color-mix(in srgb, var(--brand, #1D2D5E) 28%, transparent) 6%, transparent 38%, transparent 70%, color-mix(in srgb, var(--brand, #1D2D5E) 24%, transparent) 84%, transparent 100%)
          `,
          mixBlendMode: "screen",
          opacity: 0.9,
          animation: "gb_sway 22s ease-in-out infinite alternate",
        }}
      />
      {/* bokeh particelle (scintille soffuse) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 12% 24%, rgba(255,255,255,.20) 2px, transparent 3px),
            radial-gradient(circle at 28% 36%, rgba(255,255,255,.15) 1.5px, transparent 3px),
            radial-gradient(circle at 42% 18%, rgba(255,255,255,.18) 2px, transparent 3px),
            radial-gradient(circle at 64% 28%, rgba(255,255,255,.16) 1.6px, transparent 3px),
            radial-gradient(circle at 78% 46%, rgba(255,255,255,.18) 2px, transparent 3px),
            radial-gradient(circle at 32% 68%, rgba(255,255,255,.18) 2px, transparent 3px),
            radial-gradient(circle at 86% 72%, rgba(255,255,255,.13) 1.3px, transparent 3px)
          `,
          mixBlendMode: "screen",
          filter: "blur(0.4px)",
          opacity: 0.45,
          animation: "gb_twinkle 6s ease-in-out infinite alternate",
        }}
      />
      {/* vignetta + grana */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 10%, transparent 60%, rgba(0,0,0,.5) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[.2]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px)",
          mixBlendMode: "soft-light",
          animation: "gb_drift 8s ease-in-out infinite alternate",
        }}
      />

      <style jsx>{`
        @keyframes gb_float {
          0% { transform: translate3d(-1%, -1%, 0) scale(1); }
          100% { transform: translate3d(1%, 1%, 0) scale(1.03); }
        }
        @keyframes gb_sway {
          0% { transform: rotate(-0.8deg) translateY(-0.6%); }
          100% { transform: rotate(0.8deg) translateY(0.6%); }
        }
        @keyframes gb_twinkle { from { opacity:.35 } to { opacity:.6 } }
        @keyframes gb_drift { from { transform: translateY(-1%) } to { transform: translateY(1%) } }
        @media (prefers-reduced-motion: reduce) { div[aria-hidden] { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* =========================================================
   GALAXY — “tettuccio Rolls-Royce”: cielo 3D, stelle sparse e profonde
   ========================================================= */
function Galaxy() {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none">
      {/* campo stelle distante (sparso, piccolo) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.45) 0.8px, transparent 1px)",
          backgroundSize: "70px 70px",
          backgroundPosition: "18px 22px",
          mixBlendMode: "screen",
          opacity: 0.45,
          transform: "translateZ(0)",
          animation: "gx_far 24s ease-in-out infinite alternate",
        }}
      />
      {/* campo stelle medio (parallax leggero) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.7) 1px, transparent 1.6px)",
          backgroundSize: "52px 52px",
          backgroundPosition: "4px 10px",
          mixBlendMode: "screen",
          opacity: 0.65,
          animation: "gx_mid 18s ease-in-out infinite alternate",
        }}
      />
      {/* stelle “piercing” isolate (pochi punti più luminosi) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 12% 18%, rgba(255,255,255,.95) 1.8px, transparent 2.2px),
            radial-gradient(circle at 38% 32%, rgba(255,255,255,.85) 1.6px, transparent 2.2px),
            radial-gradient(circle at 68% 22%, rgba(255,255,255,.9) 2px, transparent 2.6px),
            radial-gradient(circle at 82% 48%, rgba(255,255,255,.8) 1.7px, transparent 2.3px),
            radial-gradient(circle at 28% 64%, rgba(255,255,255,.85) 1.8px, transparent 2.3px),
            radial-gradient(circle at 74% 74%, rgba(255,255,255,.9) 2.1px, transparent 2.6px)
          `,
          filter: "drop-shadow(0 0 6px rgba(255,255,255,.28))",
          mixBlendMode: "screen",
          opacity: 0.85,
          animation: "gx_near 12s ease-in-out infinite alternate",
        }}
      />
      {/* micro parallax glitter (lievissimo) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.28) .6px, transparent 1px)",
          backgroundSize: "44px 44px",
          mixBlendMode: "screen",
          opacity: 0.25,
          animation: "gx_glitter 6s ease-in-out infinite alternate",
        }}
      />
      {/* vignetta per profondità */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(140% 100% at 50% 10%, transparent 60%, rgba(0,0,0,.55) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      <style jsx>{`
        @keyframes gx_far { 0% { transform: translate3d(-1%, -1%, 0) } 100% { transform: translate3d(1%, 1%, 0) } }
        @keyframes gx_mid { 0% { transform: translate3d(-1.5%, -0.5%, 0) } 100% { transform: translate3d(1.5%, 0.5%, 0) } }
        @keyframes gx_near { 0% { transform: translate3d(-2%, 0%, 0) } 100% { transform: translate3d(2%, 0%, 0) } }
        @keyframes gx_glitter { from { opacity:.22 } to { opacity:.35 } }
        @media (prefers-reduced-motion: reduce) { div[aria-hidden] { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* =========================================================
   GRID — stessa idea ma più “forte”: prospettiva + beam più energico
   ========================================================= */
function GridScan() {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none">
      {/* griglia prospettica potenziata */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-[-12%] w-[170vw] h-[72vh] -translate-x-1/2 origin-bottom"
        style={{
          backgroundImage: `
            linear-gradient(transparent, transparent 14px, rgba(255,255,255,.12) 15px),
            linear-gradient(90deg, transparent, transparent 14px, rgba(255,255,255,.12) 15px)
          `,
          backgroundSize: "15px 15px, 15px 15px",
          transform: "perspective(900px) rotateX(62deg)",
          maskImage: "linear-gradient(to top, black 38%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 38%, transparent 100%)",
          mixBlendMode: "soft-light",
          opacity: 0.9,
          animation: "gr_breathe 12s ease-in-out infinite alternate",
        }}
      />
      {/* vanishing glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[70vw] h-[24px]"
        style={{
          background: "radial-gradient(closest-side, rgba(255,255,255,.35), rgba(255,255,255,0))",
          mixBlendMode: "screen",
          opacity: 0.5,
          filter: "blur(8px)",
        }}
      />
      {/* scan beam più intenso */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--gold, #C9A86E) 32%, transparent) 50%, transparent 100%)",
            mixBlendMode: "screen",
            opacity: 0.5,
            animation: "gr_scan 5.5s linear infinite",
          }}
        />
      </div>
      {/* puntinato */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.18) 1px, transparent 1.6px)",
          backgroundSize: "18px 18px",
          mixBlendMode: "soft-light",
          opacity: 0.4,
        }}
      />

      <style jsx>{`
        @keyframes gr_scan { 0% { transform: translateY(-100%) } 100% { transform: translateY(100%) } }
        @keyframes gr_breathe {
          0% { transform: perspective(900px) rotateX(62deg) translateY(0%) }
          100% { transform: perspective(900px) rotateX(62deg) translateY(2.2%) }
        }
        @media (prefers-reduced-motion: reduce) { div[aria-hidden] { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* =========================================================
   AURORA — OK (lasciato come prima potente/premium)
   ========================================================= */
function Aurora() {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none">
      {/* layer glow grande */}
      <div
        aria-hidden
        className="absolute -inset-20 blur-3xl opacity-40"
        style={{
          background: `
            radial-gradient(40% 30% at 20% 40%, color-mix(in srgb, var(--gold, #C9A86E) 26%, transparent), transparent 60%),
            radial-gradient(45% 35% at 80% 60%, color-mix(in srgb, var(--brand, #1D2D5E) 38%, transparent), transparent 60%)
          `,
          mixBlendMode: "screen",
          animation: "au_float 12s ease-in-out infinite",
        }}
      />
      {/* pennellate aurorali */}
      <div
        aria-hidden
        className="absolute inset-[-15%] blur-2xl opacity-55"
        style={{
          background: `
            conic-gradient(from 100deg at 25% 35%, color-mix(in srgb, var(--gold, #C9A86E) 24%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--gold, #C9A86E) 18%, transparent) 60%, transparent 100%),
            conic-gradient(from 260deg at 75% 65%, color-mix(in srgb, var(--brand, #1D2D5E) 30%, transparent) 0%, transparent 46%, color-mix(in srgb, var(--brand, #1D2D5E) 22%, transparent) 70%, transparent 100%)
          `,
          mixBlendMode: "screen",
          animation: "au_wave 18s ease-in-out infinite alternate",
        }}
      />
      {/* sottile highlight orizzontale */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[18%] h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)",
          mixBlendMode: "screen",
          opacity: 0.4,
        }}
      />

      <style jsx>{`
        @keyframes au_float {
          0% { transform: translate3d(-2%, 0%, 0) scale(1); }
          50% { transform: translate3d(2%, 2%, 0) scale(1.02); }
          100% { transform: translate3d(-2%, 0%, 0) scale(1); }
        }
        @keyframes au_wave {
          0% { transform: translateY(-2%) rotate(-1deg); filter: hue-rotate(0deg) }
          100% { transform: translateY(1%) rotate(1deg); filter: hue-rotate(8deg) }
        }
        @media (prefers-reduced-motion: reduce) { div[aria-hidden] { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* =========================================================
   CIRCUIT — “vecchio TV disturbato”: scanlines, jitter, roll & noise
   ========================================================= */
function Circuit() {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none">
      {/* scanlines CRT */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, rgba(0,0,0,0) 1px 3px)",
          mixBlendMode: "soft-light",
          opacity: 0.55,
        }}
      />
      {/* static noise orizzontale (jitter) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 2px, transparent 2px 4px)",
          mixBlendMode: "soft-light",
          opacity: 0.28,
          animation: "tv_noise 1.2s steps(12) infinite",
        }}
      />
      {/* roll bar verticale (hold instabile) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,.14) 50%, transparent 100%)",
          mixBlendMode: "screen",
          opacity: 0.35,
          animation: "tv_roll 5.2s linear infinite",
        }}
      />
      {/* leggera aberrazione cromatica (red/cyan offset) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,0,.10), transparent 40%, transparent 60%, rgba(0,255,255,.10))",
          mixBlendMode: "screen",
          filter: "blur(0.3px)",
          opacity: 0.25,
          animation: "tv_chroma 3.8s ease-in-out infinite alternate",
        }}
      />
      {/* vignetta tubo catodico */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,.0) 60%, rgba(0,0,0,.45) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      <style jsx>{`
        @keyframes tv_noise {
          0% { transform: translateX(0) }
          100% { transform: translateX(4px) }
        }
        @keyframes tv_roll {
          0% { transform: translateY(-100%) }
          100% { transform: translateY(100%) }
        }
        @keyframes tv_chroma {
          0% { transform: translateX(-0.6px) }
          100% { transform: translateX(0.6px) }
        }
        @media (prefers-reduced-motion: reduce) { div[aria-hidden] { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* =========================================================
   Export mappa effetti + componente wrapper
   ========================================================= */
export const EFFECTS = {
  "gold-blue": GoldBlueGlow,
  galaxy: Galaxy,
  grid: GridScan,
  aurora: Aurora,
  circuit: Circuit,
};

export default function EffectHero({ type = "gold-blue", className }) {
  const Comp = EFFECTS[type] || GoldBlueGlow;
  return (
    <div className={clsx("absolute inset-0 -z-20", className)}>
      <Comp />
    </div>
  );
}
