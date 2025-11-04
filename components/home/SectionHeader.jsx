// common/section/SectionHeader.jsx
"use client";

import React from "react";

/**
 * SECTION HEADER — con tema
 * Props:
 *  - id?: string
 *  - eyebrow?: string
 *  - titlePre?: string
 *  - titleHighlight?: string
 *  - titlePost?: string
 *  - subtitle?: string
 *  - align?: "center" | "left" (default: "center")
 *  - tone?: "dark" | "light" (default: "dark")  // NEW
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
  tone = "dark",
  className = "",
}) {
  const isLeft = align === "left";
  const alignCls = isLeft ? "text-left" : "text-center";
  const subWidth = isLeft ? "max-w-2xl" : "mx-auto max-w-3xl";
  const titleWrap = isLeft ? "" : "mx-auto";

  const titleToneCls =
    tone === "light" ? "cc-title-light" : "cc-title-dark";
  const subtitleToneCls =
    tone === "light" ? "cc-subtitle-light" : "cc-subtitle-dark";
  const eyebrowToneCls =
    tone === "light" ? "cc-eyebrow-light" : "cc-eyebrow-dark";

  return (
    <div id={id} className={`mb-12 ${alignCls} ${className} relative z-[1] isolate`}>
      {eyebrow && (
        <div className={`cc-eyebrow ${eyebrowToneCls} mb-3 text-xs uppercase tracking-[0.2em]`}>
          {eyebrow}
        </div>
      )}

      <h2 className={`cc-force-heading ${titleToneCls} text-3xl sm:text-5xl font-semibold ${titleWrap}`}>
        {titlePre}
        {titleHighlight && <span className="text-gold"> {titleHighlight}</span>}
        {titlePost && <> {titlePost}</>}
      </h2>

      {subtitle && (
        <p className={`cc-subtitle ${subtitleToneCls} ${subWidth} mt-4`}>
          {subtitle}
        </p>
      )}

      {/* FAIL-SAFE CONTRASTO: forza il riempimento del testo ignorando gradient/clip */}
      <style jsx global>{`
        :root{
          /* fallback sicuri se non esistono i tuoi token */
          --brand-blue: var(--brand-blue, #0b3b7a);
          --brand-dark-text: var(--brand-dark, #0b1220);
          --gold: var(--gold, #d4af37);
        }

        .cc-force-heading{
          color: inherit !important;
          -webkit-text-fill-color: currentColor !important;
          background-image: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          opacity: 1 !important;
          mix-blend-mode: normal !important;
        }
        .cc-force-heading .text-gold{
          color: var(--gold) !important;
          -webkit-text-fill-color: var(--gold) !important;
        }

        /* TONES — titoli */
        .cc-title-dark{ color: #fff !important; }
        .cc-title-light{ color: var(--brand-blue) !important; }

        /* TONES — eyebrow */
        .cc-eyebrow-dark{ color: rgba(255,255,255,.6) !important; }
        .cc-eyebrow-light{ color: rgba(11,59,122,.66) !important; } /* ~brand-blue 66% */

        /* TONES — sottotitoli */
        .cc-subtitle-dark{ color: rgba(255,255,255,.75) !important; }
        .cc-subtitle-light{ color: color-mix(in oklab, var(--brand-dark-text) 80%, white 20%) !important; }
        @supports not (color: color-mix(in oklab, white, black)){
          .cc-subtitle-light{ color: rgba(11,18,32,.78) !important; } /* fallback */
        }
      `}</style>
    </div>
  );
}

/** Paragrafo standard coerente con i sottotitoli */
export function SectionP({ children, tone = "dark", className = "" }) {
  const subtitleToneCls = tone === "light" ? "cc-subtitle-light" : "cc-subtitle-dark";
  return <p className={`cc-subtitle ${subtitleToneCls} mt-4 ${className}`}>{children}</p>;
}
