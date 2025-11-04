// components/home/SectionHeader.jsx
"use client";

import React from "react";

/**
 * HOME SectionHeader — titoli blu + highlight oro funzionante
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
        className={`cc-title-blue text-3xl sm:text-5xl font-semibold ${titleWrap} leading-tight`}
        style={{
          // solo 'color' (il fill lo gestiamo per span oro), così il figlio può sovrascrivere
          color: "var(--brand-blue, #0b3b7a)",
        }}
      >
        {titlePre}
        {titleHighlight && (
          <span
            className="cc-gold text-gold"
            style={{
              color: "var(--gold)",
              WebkitTextFillColor: "var(--gold)", // forza il fill oro anche con clip/gradient upstream
            }}
          >
            {" "}{titleHighlight}
          </span>
        )}
        {titlePost && <> {titlePost}</>}
      </As>

      {subtitle && (
        <p
          className={`${subWidth} mt-4 leading-relaxed`}
          style={{
            color: "color-mix(in oklab, var(--brand-blue, #0b3b7a) 85%, white 15%)",
          }}
        >
          {subtitle}
        </p>
      )}

      <style jsx global>{`
        /* Salvaguardia: evita che ancestor con text-transparent/clip rompa il titolo */
        .cc-title-blue{
          background-image: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          opacity: 1 !important;
          mix-blend-mode: normal !important;
        }
        /* Garantisce che lo span oro resti oro anche con fill impostati a livello parent */
        .cc-gold{
          color: var(--gold) !important;
          -webkit-text-fill-color: var(--gold) !important;
        }
      `}</style>
    </div>
  );
}
