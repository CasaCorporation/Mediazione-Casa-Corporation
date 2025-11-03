"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/* -------- Gold highlight (shimmer + glow, no color change) -------- */
function GoldenText({ children, className = "" }) {
  return (
    <span className={`goldshine ${className}`}>{children}
      <style jsx>{`
        .goldshine{
          /* manteniamo i tuoi token di colore */
          background-image:
            linear-gradient(90deg,
              var(--color-gold) 0%,
              #f5d36b 20%,
              var(--color-gold-soft) 45%,
              #f0c24a 60%,
              var(--color-gold) 100%);
          background-size: 200% 100%;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          /* glow leggero e non invasivo */
          filter:
            drop-shadow(0 0 .35rem rgba(234,179,8,.28))
            drop-shadow(0 0 1.1rem rgba(234,179,8,.12));
          animation: goldShift 6.4s ease-in-out infinite alternate;
        }
        @keyframes goldShift{ 0%{background-position:0% 50%}100%{background-position:100% 50%} }
        @media (prefers-reduced-motion: reduce){ .goldshine{ animation: none; } }
      `}</style>
    </span>
  );
}

/* -------- Variants comuni -------- */
function useFx() {
  const reduce = useReducedMotion();
  return {
    container: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.08 }
      }
    },
    item: {
      hidden: { opacity: 0, y: reduce ? 0 : 8 },
      show:   { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" } }
    }
  };
}

/** BLOCCO TESTO — MOBILE (invariato tranne colori) */
export function HeroCopyMobile({
  brandMobileHighlight,
  brandMobileSuffix,
  titlePre,
  titleHighlight,
  titlePost,
  description,
  primaryCta,
  secondaryCta,
}) {
  const fx = useFx();
  return (
    <motion.div
      className="mx-auto max-w-[62ch] text-center"
      initial="hidden"
      animate="show"
      variants={fx.container}
    >
      {/* mini brand */}
      <motion.div
        variants={fx.item}
        className="text-[11.5px] font-medium text-[rgba(10,16,36,0.70)]"
      >
        <GoldenText className="font-semibold">{brandMobileHighlight}</GoldenText>{" "}
        {brandMobileSuffix}
      </motion.div>

      {/* titolo */}
    + <motion.h1
   variants={fx.item}
   className="mt-1.5 text-[clamp(26px,7.4vw,36px)] font-extrabold leading-[1.15] tracking-tight text-[rgba(10,16,36,1)]"
 >
        {titlePre}{" "}
        <GoldenText>{titleHighlight}</GoldenText>{" "}
        {titlePost}
      </motion.h1>

      {/* paragrafo */}
      <motion.p
        variants={fx.item}
        className="mt-2.5 text-[14.5px] text-[rgba(10,16,36,0.85)]"
      >
        {description}
      </motion.p>

      {/* CTA */}
      <motion.div variants={fx.item} className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {primaryCta?.label && primaryCta?.href && (
          <a
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-lg border border-[color:var(--color-gold)]/40 bg-gradient-to-b from-[color:var(--color-gold)] to-[color:var(--color-gold-soft)] px-4 py-2 text-[14px] font-bold text-black shadow-[var(--shadow-gold)] transition-[transform,box-shadow] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]/60"
          >
            {primaryCta.label}
          </a>
        )}
        {secondaryCta?.label && secondaryCta?.href && (
          <a
            href={secondaryCta.href}
            className="inline-flex items-center rounded-lg border border-[rgba(10,16,36,0.20)] bg-[rgba(10,16,36,0.05)] px-3.5 py-2 text-[13px] font-semibold text-[rgba(10,16,36,0.90)] hover:bg-[rgba(10,16,36,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(10,16,36,0.40)]"
          >
            {secondaryCta.label}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/** BLOCCO TESTO — DESKTOP (centratura verticale) */
export function HeroCopyDesktop({
  brandDesktopHighlight,
  brandDesktopSuffix,
  titlePre,
  titleHighlight,
  titlePost,
  description,
  primaryCta,
  secondaryCta,
  badges = [],
  onPrimaryClick,
  onSecondaryClick,
}) {
  const fx = useFx();

  return (
    <motion.div
      /* Chiave: il wrapper occupa l'altezza utile dell'Hero
         e centra il contenuto verticalmente. */
      className="min-w-0 flex flex-col justify-center lg:min-h-[calc(var(--hero-h,78vh)-var(--hero-top,20px))]"
      initial="hidden"
      animate="show"
      variants={fx.container}
    >
      {/* Stack tipografico senza mt-*: usiamo gap per evitare che il titolo a + righe sposti il blocco */}
      <div className="flex flex-col items-start gap-3 sm:gap-4">
        {/* brand */}
        <motion.div
          variants={fx.item}
          className="text-[12px] font-medium text-[rgba(10,16,36,0.70)]"
        >
          <GoldenText className="font-semibold">{brandDesktopHighlight}</GoldenText>{" "}
          {brandDesktopSuffix}
        </motion.div>

        {/* titolo */}
        <motion.h1
  variants={fx.item}
   className="title-balance font-extrabold tracking-tight leading-[1.15] text-[clamp(24px,7vw,36px)] sm:text-[40px] md:text-6xl max-w-[28ch] sm:max-w-none pr-1 text-[rgba(10,16,36,1)]"
 >
          {titlePre}{" "}
          <GoldenText>{titleHighlight}</GoldenText>
          <br className="hidden md:block" /> {titlePost}
        </motion.h1>

        {/* paragrafo */}
        <motion.p
          variants={fx.item}
          className="text-[15.5px] sm:text-[18px] text-[rgba(10,16,36,0.85)] max-w-[68ch]"
        >
          {description}
        </motion.p>

        {/* CTA */}
        <motion.div variants={fx.item} className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
          {primaryCta?.label && primaryCta?.href && (
            <a
              href={primaryCta.href}
              onClick={onPrimaryClick}
              className="relative inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--color-gold)]/40 bg-gradient-to-b from-[color:var(--color-gold)] to-[color:var(--color-gold-soft)] px-5 py-2.5 sm:px-6 sm:py-3 text-[15px] sm:text-base font-bold text-black shadow-[var(--shadow-gold)] transition-[transform,box-shadow] hover:scale-[1.04] hover:shadow-[0_0_0_2px_rgba(234,179,8,.25),0_10px_30px_rgba(234,179,8,.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]/60"
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta?.label && secondaryCta?.href && (
            <a
              href={secondaryCta.href}
              onClick={onSecondaryClick}
              className="inline-flex items-center rounded-xl border border-[rgba(10,16,36,0.25)] bg-transparent px-4 py-2.5 sm:px-5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-[rgba(10,16,36,0.90)] hover:bg-[rgba(10,16,36,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(10,16,36,0.50)]"
            >
              {secondaryCta.label}
            </a>
          )}
        </motion.div>

        {/* badges */}
        {!!badges?.length && (
          <motion.div
            variants={fx.item}
            className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-xs text-[rgba(10,16,36,0.85)]"
          >
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(10,16,36,0.25)] bg-transparent px-2.5 py-1"
              >
                {b}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
