// components/home/CompPlanShowcase.jsx
"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Trophy, Calculator, Scale, Coins, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/home/SectionHeader"; // ✅ IMPORT CORRETTO

/* ------------------------------------------------------------------ */
/* Utils & Buttons                                                     */
/* ------------------------------------------------------------------ */
const cx = (...cls) => cls.filter(Boolean).join(" ");

function GhostButton({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-[12px] text-white/80",
        "transition-colors hover:text-white hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
        className
      )}
    >
      {children}
    </Link>
  );
}

function GoldButton({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/15 px-3 py-2 text-[12px] text-gold",
        "transition-colors hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-[14px] w-[14px]" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky progress adornment (left column)                             */
/* ------------------------------------------------------------------ */
function StickyProgress() {
  // fake scroll progress for subtle accent
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const h = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const height = useSpring(h, { stiffness: 120, damping: 20, mass: 0.6 });

  return (
    <div ref={ref} className="relative">
      {/* gradient baseline */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, rgba(212,175,55,.15), rgba(255,255,255,.06), transparent)",
        }}
      />
      {/* progress fill */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 w-[3px] origin-top rounded-full"
        style={{
          height,
          background:
            "linear-gradient(to bottom, rgba(212,175,55,.85), rgba(212,175,55,.35) 60%, rgba(212,175,55,0))",
          filter: "blur(.2px)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Info Card (tilt)                                                    */
/* ------------------------------------------------------------------ */
function InfoCard({ icon: Icon, title, desc, bullets = [], href, delay = 0 }) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  function onMove(e) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = (x / r.width) * 2 - 1;
    const py = (y / r.height) * 2 - 1;
    setT({
      rx: -py * 6,
      ry: px * 8,
      tx: px * 6,
      ty: py * 6,
    });
  }
  function onLeave() {
    setT({ rx: 0, ry: 0, tx: 0, ty: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-[1px]"
      style={{
        transform: reduce
          ? undefined
          : `
            perspective(900px)
            rotateX(${t.rx}deg)
            rotateY(${t.ry}deg)
            translate3d(${t.tx}px, ${t.ty}px, 0)
          `,
        transition: "transform 120ms ease-out",
      }}
    >
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/12 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[calc(1rem)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.22), rgba(212,175,55,0))",
        }}
      />

      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-gold">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <p className="text-sm text-white/75">{desc}</p>
      {!!bullets.length && (
        <ul className="mt-3 space-y-1.5 text-[13px] text-white/80">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <GoldButton href={href}>Entra</GoldButton>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function CompPlanShowcase() {
  return (
    <section id="retribuzione" className="relative border-t border-white/10 py-16 md:py-24">
      {/* background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_-10%,rgba(212,180,80,0.10),transparent_60%)]"
      />
      <div className="container relative">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Sticky explainer (left) */}
          <div className="md:col-span-1 self-start md:sticky" style={{ top: "calc(72px + 16px)" }}>
            <SectionHeader
              eyebrow="Retribuzione"
              titlePre="Il sistema"
              titleHighlight="più innovativo"
              titlePost="del mercato"
              subtitle="Provvigioni chiare, premi meritocratici e numeri a confronto."
              align="left"
              as="h2"
              className="mb-4"
            />
            <StickyProgress />
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-lg border border-gold/25 bg-gold/15 px-2.5 py-1 text-[12px] text-gold">
                Fino al 60% di provvigione
              </span>
              <span className="inline-flex items-center rounded-lg border border-gold/25 bg-gold/15 px-2.5 py-1 text-[12px] text-gold">
                Premi gara trimestrali
              </span>
              <span className="inline-flex items-center rounded-lg border border-gold/25 bg-gold/15 px-2.5 py-1 text-[12px] text-gold">
                Pagamenti rapidi
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <GhostButton href="/carriere/calcolatore#calcolatore">Prova il calcolatore</GhostButton>
              <GhostButton href="/carriere/confronto#tabella">Confronta i modelli</GhostButton>
            </div>
          </div>

          {/* Right: cards */}
          <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={Calculator}
              title="Calcolatore guadagni"
              desc="Simula volumi e mix: numeri chiari prima di scegliere."
              bullets={["Curve di guadagno", "Mix operazioni", "Instant pay"]}
              href="/carriere/calcolatore#calcolatore"
              delay={0.00}
            />
            <InfoCard
              icon={Trophy}
              title="Gara trimestrale"
              desc="Premi reali, regole pubbliche, ranking trasparente."
              bullets={["Reward per ruolo", "Obiettivi misurabili", "Bonus extra"]}
              href="/carriere/gara#premi"
              delay={0.05}
            />
            <InfoCard
              icon={Scale}
              title="Confronto modelli"
              desc="Metti a paragone ciò che conta davvero."
              bullets={["Provvigioni & costi", "Strumenti inclusi", "Supporto & tutoring"]}
              href="/carriere/confronto#tabella"
              delay={0.10}
            />
            {/* slot “spacer” per griglia pari su viewport ≥ sm */}
            <div className="hidden sm:block rounded-2xl border border-white/10 bg-white/[0.02]" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
