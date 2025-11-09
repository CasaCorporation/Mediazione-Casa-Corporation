// common/section/SectionHeader.jsx
"use client";

import React from "react";

/**
 * SECTION HEADER — identico allo stile di riferimento
 * + fail-safe: rende il titolo visibile anche se un ancestor imposta gradient/clip/text-transparent.
 *
 * Props:
 *  - id?: string
 *  - eyebrow?: string
 *  - titlePre?: string
 *  - titleHighlight?: string
 *  - titlePost?: string
 *  - subtitle?: string
 *  - align?: "center" | "left" (default: "center")
 *  - className?: string
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
}) {
  const isLeft = align === "left";
  const alignCls = isLeft ? "text-left" : "text-center";
  const subWidth = isLeft ? "max-w-2xl" : "mx-auto max-w-3xl";
  const titleWrap = isLeft ? "" : "mx-auto";

  return (
    <div id={id} className={`mb-12 ${alignCls} ${className} relative z-[1] isolate`}>
      {eyebrow && (
        <div className="cc-eyebrow mb-3 text-xs uppercase tracking-[0.2em]">
          {eyebrow}
        </div>
      )}

      <h2 className={`cc-force-heading text-3xl sm:text-5xl font-semibold ${titleWrap}`}>
        {titlePre}
        {titleHighlight && <span className="text-gold"> {titleHighlight}</span>}
        {titlePost && <> {titlePost}</>}
      </h2>

      {subtitle && (
        <p className={`cc-subtitle ${subWidth} mt-4`}>
          {subtitle}
        </p>
      )}

      {/* FAIL-SAFE CONTRASTO (solo su classi cc-*) */}
      <style jsx global>{`
        .cc-force-heading {
          /* forza il testo pieno, eliminando gradient/clip trasparenti */
          color: #fff !important;
          -webkit-text-fill-color: #fff !important;
          background-image: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          opacity: 1 !important;
          mix-blend-mode: normal !important;
        }
        .cc-force-heading .text-gold {
          color: var(--gold) !important;
          -webkit-text-fill-color: var(--gold) !important;
        }
        .cc-eyebrow { color: rgba(255,255,255,.6) !important; }
        .cc-subtitle { color: rgba(255,255,255,.75) !important; }
      `}</style>
    </div>
  );
}

/** Paragrafo standard coerente con i sottotitoli */
export function SectionP({ children, className = "" }) {
  return <p className={`cc-subtitle mt-4 ${className}`}>{children}</p>;
}
