"use client";
import React from "react";

/**
 * SCROLL CUE — Mobile only
 * - Fixed bottom-center (più in alto: bottom-8)
 * - Nessuna scritta, solo freccia animata dentro un cerchio “glass” con glow dorato
 * - Non blocca interazioni (pointer-events-none)
 */
export default function ScrollCue({ ariaLabel = "Scorri" }) {
  const size = 48; // diametro del cue (px)

  return (
    <div
      className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-8 z-[60] sm:hidden"
      role="img"
      aria-label={ariaLabel}
    >
      {/* Glow morbido dietro (gold) */}
      <span
        className="absolute -inset-2 blur-[14px] opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(234,179,8,.35) 0%, rgba(234,179,8,0.08) 46%, rgba(234,179,8,0) 70%)",
        }}
        aria-hidden
      />

      {/* Cerchio “glass” con bordo + frecce animate */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className="relative drop-shadow-[0_6px_24px_rgba(0,0,0,.35)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="gold-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="var(--color-gold)" />
            <stop offset="100%" stopColor="var(--color-gold-soft)" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
          </filter>
        </defs>

        {/* fondo glass */}
        <circle cx="24" cy="24" r="21"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.25"
        />

        {/* ring dorato sottile */}
        <circle cx="24" cy="24" r="22"
          fill="none"
          stroke="url(#gold-stroke)"
          strokeOpacity="0.55"
          strokeWidth="1.2"
          className="ringPulse"
        />

        {/* doppia freccia down, animata */}
        <g filter="url(#soft)" transform="translate(0,2)">
          {/* chevron alto */}
          <path
            d="M16 21 L24 29 L32 21"
            fill="none"
            stroke="url(#gold-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chev animDelay0"
          />
          {/* chevron basso */}
          <path
            d="M16 26 L24 34 L32 26"
            fill="none"
            stroke="url(#gold-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chev animDelay1"
          />
        </g>
      </svg>

      <style jsx>{`
        /* Scorrimento verticale + dissolvenza */
        @keyframes chevron {
          0%   { transform: translateY(-2px); opacity: .35; }
          40%  { transform: translateY(0px);  opacity: .95; }
          100% { transform: translateY(6px);  opacity: .12; }
        }
        .chev {
          animation: chevron 1.6s ease-in-out infinite;
          transform-origin: 24px 24px;
        }
        .animDelay0 { animation-delay: 0s; }
        .animDelay1 { animation-delay: .22s; }

        /* Pulse molto discreto del ring dorato */
        @keyframes ring {
          0%,100% { stroke-opacity: .55; }
          50%     { stroke-opacity: .85; }
        }
        .ringPulse { animation: ring 2.8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .chev, .ringPulse { animation: none; }
        }
      `}</style>
    </div>
  );
}
