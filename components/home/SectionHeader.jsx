// components/home/SectionHeader.jsx
"use client";

import React from "react";

/**
 * HOME SectionHeader — titoli blu, highlight oro
 * Props:
 *  - id?: string
 *  - eyebrow?: string
 *  - titlePre?: string
 *  - titleHighlight?: string
 *  - titlePost?: string
 *  - subtitle?: string
 *  - align?: "center" | "left" (default: "center")
 *  - className?: string
 *  - as?: keyof JSX.IntrinsicElements (default: "h2")
 */
export default function SectionHeader({
  id,
  eyebrow,
  titlePre = "",
  titleHighlight = "",
  titlePost = "",
  subtitle = "",
  align = "center",
  className = "",
  as = "h2",
}) {
  const As = as;
  const isLeft = align === "left";
  const alignCls = isLeft ? "text-left" : "text-center";
  const subWidth = isLeft ? "max-w-2xl" : "mx-auto max-w-3xl";
  const titleWrap = isLeft ? "" : "mx-auto";

  return (
    <div id={id} className={`mb-12 ${alignCls} ${className} relative z-[1] isolate`}>
      {eyebrow && (
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--eyebrow-color,rgba(11,59,122,.66))]">
          {eyebrow}
        </div>
      )}

      <As
        className={`text-3xl sm:text-5xl font-semibold ${titleWrap} leading-tight`}
        style={{
          color: "var(--brand-blue, #0b3b7a)",
          WebkitTextFillColor: "var(--brand-blue, #0b3b7a)",
        }}
      >
        {titlePre}
        {titleHighlight && (
          <span className="text-gold"> {titleHighlight}</span>
        )}
        {titlePost && <> {titlePost}</>}
      </As>

      {subtitle && (
        <p
          className={`${subWidth} mt-4 leading-relaxed`}
          style={{
            color:
              "oklab(from var(--brand-blue, #0b3b7a) l a b / 0.82)", // blu scuro morbido
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Safeguard locale (solo per questo componente) */}
      <style jsx global>{`
        /* Evita che eventuali ancestor con gradient/clip rendano trasparente il testo */
        .${"text-3xl"}[style], .${"sm:text-5xl"}[style] {
          background-image: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          opacity: 1 !important;
          mix-blend-mode: normal !important;
        }
      `}</style>
    </div>
  );
}
