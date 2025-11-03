"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * SectionHeader v9 — "Pure"
 * - SOLO il titolo è centrato.
 * - Sotto: underline semplice (gold→brand) con micro-pan opzionale.
 * - Niente halo, niente rombi, niente separatori.
 * - <em> nel titolo = highlight oro (bg-clip).
 *
 * Include <SectionP> per tipografia coerente dei paragrafi (senza imporre layout).
 */

export default function SectionHeader({
  id,
  title,               // string | ReactNode (puoi usare <em> per accent)
  as: As = "h2",
  size = "lg",         // "sm" | "md" | "lg"
  tone = "dark",       // "dark" | "light"
  underline = true,    // mostra la barra sotto
  animate = true,      // micro-pan della barra
  className = "",      // es. "mb-10"
}) {
  const titleSize =
    size === "lg"
      ? "text-[clamp(24px,2.5vw,36px)]"
      : size === "md"
      ? "text-[clamp(20px,2.0vw,28px)]"
      : "text-[clamp(18px,1.7vw,22px)]";

  const barWidth = size === "lg" ? 96 : size === "md" ? 76 : 56; // px
  const barHeight = 2; // px minimal
  const titleColor = tone === "light" ? "text-[var(--brand-dark)]" : "text-white";
  const barGrad =
    tone === "light"
      ? "linear-gradient(90deg, var(--gold), color-mix(in oklab, var(--brand-dark) 70%, var(--gold) 30%))"
      : "linear-gradient(90deg, var(--gold), color-mix(in oklab, var(--brand) 78%, var(--gold) 22%))";

  return (
    <header id={id} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -14% 0px" }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="text-center"
      >
        <As
          className={`font-semibold tracking-tight ${titleSize} ${titleColor}`}
          style={{
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            textWrap: "balance",
            fontFeatureSettings: "'liga' on, 'kern' on",
          }}
        >
          <span className="title-pure">{title}</span>
        </As>

        {underline && (
          <div className="mt-3 flex items-center justify-center">
            <span
              aria-hidden
              className={`${animate ? "bar-pan" : ""}`}
              style={{
                width: barWidth,
                height: barHeight,
                borderRadius: 999,
                background: barGrad,
                boxShadow: "0 0 0 0.5px rgba(201,168,110,0.35)",
              }}
            />
          </div>
        )}
      </motion.div>

      <style jsx>{`
        .title-pure :global(em) {
          background: linear-gradient(
            180deg,
            color-mix(in oklab, var(--gold) 95%, #fff 5%),
            color-mix(in oklab, var(--gold) 70%, #000 30%)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: normal;
        }
        @media (prefers-reduced-motion: no-preference) {
          .bar-pan {
            background-size: 180% 100%;
            animation: barMove 7.5s linear infinite;
          }
          @keyframes barMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 180% 50%; }
          }
        }
      `}</style>
    </header>
  );
}

/* ------------------------------- Paragraph ------------------------------- */

export function SectionP({
  as: As = "p",
  tone = "dark",        // "dark" | "light"
  size = "md",          // "sm" | "md" | "lg"
  className = "",
  children,
}) {
  const sizes =
    size === "lg"
      ? "text-[15px] sm:text-[16.5px]"
      : size === "md"
      ? "text-[13.5px] sm:text-[15px]"
      : "text-[13px]";

  const color =
    tone === "light"
      ? "text-[color-mix(in oklab, var(--brand-dark) 82%, white 18%)]"
      : "text-[color-mix(in oklab, white 80%, black 20%)]";

  return (
    <As
      className={`leading-relaxed antialiased ${sizes} ${color} ${className}`}
      style={{
        textRendering: "optimizeLegibility",
        fontFeatureSettings: "'liga' on, 'kern' on",
        textWrap: "pretty",
        hyphens: "auto",
      }}
    >
      {children}
    </As>
  );
}
