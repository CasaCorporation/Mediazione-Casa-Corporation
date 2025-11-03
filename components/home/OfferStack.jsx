// components/home/OfferStack.jsx
"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Wrench,
  GraduationCap,
  ShieldCheck,
  Handshake,
  LifeBuoy,
  Cpu,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import SectionHeader from "@/components/home/SectionHeader"; // ✅ IMPORT CORRETTO

/* ------------------------------------------------------------------ */
/* Utils & Buttons                                                     */
/* ------------------------------------------------------------------ */
const cx = (...cls) => cls.filter(Boolean).join(" ");

function GoldButton({ href, children, icon = true, className = "" }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/15 px-4 py-2 text-sm text-gold",
        "transition-colors hover:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
        className
      )}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="h-[14px] w-[14px]" aria-hidden />
      )}
    </Link>
  );
}

function GhostButton({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/80",
        "transition-colors hover:text-white hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
        className
      )}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax layers                                                     */
/* ------------------------------------------------------------------ */
function useParallax(amount = 24) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return { ref, y: useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 }) };
}

/* ------------------------------------------------------------------ */
/* Tilt Card                                                           */
/* ------------------------------------------------------------------ */
function TiltCard({ icon: Icon, title, desc, href, delay = 0 }) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

  function onMove(e) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = (x / r.width) * 2 - 1;  // -1..1
    const py = (y / r.height) * 2 - 1;
    const rx = -py * 6;
    const ry = px * 8;
    const tx = px * 6;
    const ty = py * 6;
    setTilt({ rx, ry, tx, ty });
  }
  function onLeave() {
    setTilt({ rx: 0, ry: 0, tx: 0, ty: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={`Apri sezione ${title}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-[1px]"
      style={{
        transform: reduce
          ? undefined
          : `
            perspective(900px)
            rotateX(${tilt.rx}deg)
            rotateY(${tilt.ry}deg)
            translate3d(${tilt.tx}px, ${tilt.ty}px, 0)
          `,
        transition: "transform 120ms ease-out",
      }}
    >
      {/* ring + aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[calc(1rem)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.22), rgba(212,175,55,0))",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/12 blur-2xl"
      />

      <div className="relative z-[1]">
        <div className="mb-2 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-gold">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="min-h-[40px] text-sm text-white/75">{desc}</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/15 px-3 py-1.5 text-[12px] text-gold">
          Scopri
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const CARDS = [
  { icon: Wrench,         title: "Strumenti",  desc: "CRM, dashboard KPI, workflow e playbook.",          href: "/carriere/strumenti#suite" },
  { icon: GraduationCap,  title: "Formazione", desc: "Onboarding operativo e mentorship continua.",       href: "/carriere/formazione#percorsi" },
  { icon: ShieldCheck,    title: "Metodo",     desc: "Processi non aggirabili e controlli embedded.",     href: "/carriere/metodo#metodo" },
  { icon: Handshake,      title: "Benefit",    desc: "Premi, welfare e convenzioni reali.",               href: "/carriere/strumenti#benefit" },
  { icon: LifeBuoy,       title: "Supporto",   desc: "Back office, coordinamento e materiali.",           href: "/carriere/back-office#overview" },
  { icon: Cpu,            title: "AI & Dati",  desc: "Automazioni e modelli proprietari.",                href: "/carriere/strumenti#stack" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function OfferStack() {
  const reduce = useReducedMotion();
  const aura = useParallax(20);

  return (
    <section id="cosa-offriamo" className="relative border-t border-white/10 py-16 md:py-24">
      {/* parallax aura */}
      <motion.div
        aria-hidden
        ref={aura.ref}
        style={{ y: aura.y }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(1100px 520px at 85% 0%, rgba(212,175,55,0.10), transparent 60%)",
          }}
        />
      </motion.div>

      <div className="container relative z-[1]">
        <SectionHeader
          eyebrow="Offerta"
          titlePre="Cosa"
          titleHighlight="offriamo"
          subtitle="Meno frizioni, più risultati. Tutto misurabile."
          align="center"
          as="h2"
          className="mb-10"
        />

        {/* micro chips marquee */}
        <MarqueeChips />

        {/* grid cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <TiltCard key={c.title} delay={i * 0.04} {...c} />
          ))}
        </div>

        {/* CTA cluster */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <GoldButton href="/carriere/strumenti#suite">Scopri la suite strumenti</GoldButton>
          <GhostButton href="/carriere/formazione#percorsi">Vedi i percorsi formativi</GhostButton>
          <GhostButton href="/carriere/metodo#metodo">Capisci il nostro metodo</GhostButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee Chips                                                       */
/* ------------------------------------------------------------------ */
function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/75">
      <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
      {children}
    </span>
  );
}

function MarqueeChips() {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
        <Chip>Dashboard KPI</Chip>
        <Chip>Playbook operativi</Chip>
        <Chip>Automazioni</Chip>
        <Chip>Welfare & premi</Chip>
        <Chip>Pipeline condivisa</Chip>
      </div>
    );
  }

  return (
    <div className="relative mx-auto -mb-1 max-w-5xl overflow-hidden">
      <motion.div
        className="flex gap-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      >
        <Row />
        <Row ariaHidden />
      </motion.div>
    </div>
  );
}

function Row({ ariaHidden = false }) {
  return (
    <div className="flex min-w-full shrink-0 items-center justify-center gap-2" aria-hidden={ariaHidden}>
      <Chip>Dashboard KPI</Chip>
      <Chip>Playbook operativi</Chip>
      <Chip>Automazioni</Chip>
      <Chip>Welfare & premi</Chip>
      <Chip>Pipeline condivisa</Chip>
      <Chip>Tutoring</Chip>
      <Chip>Stack AI</Chip>
    </div>
  );
}
