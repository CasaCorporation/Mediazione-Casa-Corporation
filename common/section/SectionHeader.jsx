"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * SectionHeader v9 — "Pure"
 * - SOLO il titolo è centrato.
 * - Sotto: underline semplice (gold→brand) con micro-pan opzionale.
 * - <em> nel titolo = highlight oro (bg-clip).
 * - Colore titolo: ora blu scuro (#0A1024) invece che bianco.
 */

export default function SectionHeader({
  id,
  title,               // string | ReactNode
  as: As = "h2",
  size = "lg",         // "sm" | "md" | "lg"
  tone = "dark",       // "dark" | "light"
  underline = true,
  animate = true,
  className = "",
}) {
  const titleSize =
    size === "lg"
      ? "text-[clamp(24px,2.5vw,36px)]"
      : size === "md"
      ? "text-[clamp(20px,2.0vw,28px)]"
      : "text-[clamp(18px,1.7vw,22px)]";

  const barWidth = size === "lg" ? 96 : size === "md" ? 76 : 56;
  const barHeight = 2;

  // 👇 qui cambia: usiamo blu scuro come colore titolo (invece del bianco)
  const titleColor =
    tone === "light"
      ? "text-[var(--brand-dark)]"
      : "text-[rgba(10,16,36,1)]"; // ex: text-white

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
  tone = "dark",
  size = "md",
  className = "",
  children,
}) {
  const sizes =
    size === "lg"
      ? "text-[15px] sm:text-[16.5px]"
      : size === "md"
      ? "text-[13.5px] sm:text-[15px]"
      : "text-[13px]";

  // anche i paragrafi "dark" ora blu scuro per coerenza
  const color =
    tone === "light"
      ? "text-[color-mix(in oklab, var(--brand-dark) 82%, white 18%)]"
      : "text-[rgba(10,16,36,0.85)]";

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
