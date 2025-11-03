// components/home/WhoWeServe.jsx
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
  Users2,
  BadgeCheck,
  Building2,
  Briefcase,
  Compass,
  Rocket,
  Target,
  Puzzle,
  Wand2,
  LayoutGrid,
  ShieldCheck,
  Brain,
  BarChart2,
  Star,
  ChevronsRight,
} from "lucide-react";
import SectionHeader from "@/components/home/SectionHeader"; // ✅ IMPORT CORRETTO

/**
 * WHO WE SERVE — versione "ULTRA" con percorso triplo
 * - Tabs: Agenti Immobiliari • Back Office • Altre posizioni & Collaborazioni
 * - Animazioni morbide (Framer Motion), 3D tilt su card, parallax background
 * - CTA coerenti con le pagine carriere
 * - Nessun import di Button esterni: stili inline + token brand
 */

/* ------------------------------- Utils -------------------------------- */
const cx = (...cls) => cls.filter(Boolean).join(" ");

function useParallax(amount = 30) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return { ref, y };
}

function useSmoothSpring(v, stiff = 140, damp = 24) {
  return useSpring(v, { stiffness: stiff, damping: damp, mass: 0.6 });
}

/* --------------------------- Reusable Buttons ------------------------- */
function GoldButton({ href, children, className = "", icon = true }) {
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
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

/* -------------------------- Micro components -------------------------- */
function EyebrowBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
      {children}
    </span>
  );
}

function Bullet({ icon: Icon, children }) {
  return (
    <li className="flex items-start gap-3 text-white/80">
      <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-white/5 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

/* ------------------------------ 3D RoleCard --------------------------- */
function RoleCard({ icon: Icon, title, desc, hrefPrimary, hrefSecondary, delay = 0 }) {
  const reduce = useReducedMotion();
  const [t, setT] = React.useState({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const cardRef = React.useRef(null);

  function onMove(e) {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = (x / r.width) * 2 - 1; // -1 .. 1
    const py = (y / r.height) * 2 - 1;
    const rx = -py * 6;
    const ry = px * 8;
    const tx = px * 6;
    const ty = py * 6;
    setT({ rx, ry, tx, ty });
  }
  function onLeave() { setT({ rx: 0, ry: 0, tx: 0, ty: 0 }); }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-[1px]"
      style={{
        transform: reduce ? undefined : `
          perspective(900px)
          rotateX(${t.rx}deg)
          rotateY(${t.ry}deg)
          translate3d(${t.tx}px, ${t.ty}px, 0)
        `,
        transition: "transform 120ms ease-out",
      }}
    >
      {/* Glow ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[calc(1rem)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.25), rgba(212,175,55,0))",
        }}
      />

      <div className="relative z-[1]">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 text-gold">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-semibold leading-tight text-white">{title}</h3>
        </div>
        <p className="min-h-[48px] text-sm text-white/75">{desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {hrefPrimary && (
            <GoldButton href={hrefPrimary}>Apri scheda</GoldButton>
          )}
          {hrefSecondary && (
            <GhostButton href={hrefSecondary}>Dettagli</GhostButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------ Panels data --------------------------- */
const AGENT_ROLES = [
  {
    icon: Compass,
    title: "Junior Executive",
    desc:
      "Ingresso con affiancamento, playbook operativi e obiettivi misurabili.",
    hrefPrimary: "/carriere/agenti-immobiliari#profili",
    hrefSecondary: "/carriere/metodo#metodo",
  },
  {
    icon: BadgeCheck,
    title: "Corporate Senior",
    desc:
      "Gestione end-to-end del ciclo vendita con strumenti proprietari.",
    hrefPrimary: "/carriere/agenti-immobiliari#profili",
    hrefSecondary: "/carriere/gara#premi",
  },
  {
    icon: Building2,
    title: "Leader Corporate",
    desc:
      "Leadership di team, KPI condivisi e premi produzione di fascia alta.",
    hrefPrimary: "/carriere/agenti-immobiliari#profili",
    hrefSecondary: "/carriere/confronto#modelli",
  },
];

/* ------------------------------ Tabs model ---------------------------- */
const TABS = [
  { key: "agenti", label: "Agenti Immobiliari", icon: Target },
  { key: "backoffice", label: "Back Office", icon: Briefcase },
  { key: "altre", label: "Altre posizioni & Collaborazioni", icon: Puzzle },
];

/* ------------------------------- Main --------------------------------- */
export default function WhoWeServe() {
  const [tab, setTab] = React.useState("agenti");
  const reduce = useReducedMotion();

  // Parallax background elements
  const aura = useParallax(22);
  const dots = useParallax(16);
  const lines = useParallax(12);

  return (
    <section id="chi" className="relative border-t border-white/10 py-18 md:py-24">
      {/* Decorative background layers */}
      <motion.div
        aria-hidden
        ref={aura.ref}
        style={{ y: useSmoothSpring(aura.y) }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 opacity-[0.35]" style={{
          background:
            "radial-gradient(1200px 520px at 90% -8%, rgba(212,175,55,0.12), transparent 60%)",
        }} />
      </motion.div>

      <motion.div
        aria-hidden
        ref={dots.ref}
        style={{ y: useSmoothSpring(dots.y) }}
        className="pointer-events-none absolute inset-0"
      >
        <svg className="absolute right-6 top-8 h-32 w-32 opacity-20" viewBox="0 0 160 160">
          {Array.from({ length: 9 }).map((_, r) => (
            Array.from({ length: 9 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 18 + 8} cy={r * 18 + 8} r="1.4" fill="currentColor" />
            ))
          ))}
        </svg>
      </motion.div>

      <motion.div
        aria-hidden
        ref={lines.ref}
        style={{ y: useSmoothSpring(lines.y) }}
        className="pointer-events-none absolute inset-0"
      >
        <svg className="absolute left-0 top-0 h-full w-full opacity-[0.10]" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(212,175,55,0.0)" />
              <stop offset="25%" stopColor="rgba(212,175,55,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
            </linearGradient>
          </defs>
          <path d="M0,140 C260,100 420,240 720,160 C1060,60 1200,260 1440,180" stroke="url(#g)" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <div className="container relative z-10">
        <SectionHeader
          eyebrow="Percorsi"
          titlePre="A chi"
          titleHighlight="ci rivolgiamo"
          subtitle="Tre strade chiare. Stesso livello di tutela, formazione continua e strumenti proprietari. Scegli il percorso più adatto e inizia subito."
          align="center"
          as="h2"
          className="mb-8"
        />

        {/* Tabs */}
        <TabsNav active={tab} onChange={setTab} />

        {/* Panels */}
        <div className="mt-10">
          {tab === "agenti" && <AgentsPanel />}
          {tab === "backoffice" && <BackOfficePanel />}
          {tab === "altre" && <OthersAndCollabPanel />}
        </div>
      </div>

      {/* Utilities */}
      <style jsx>{`
        :global(.no-scrollbar) { -ms-overflow-style: none; scrollbar-width: none; }
        :global(.no-scrollbar::-webkit-scrollbar) { display: none; }
      `}</style>
    </section>
  );
}

/* ------------------------------- TabsNav ------------------------------- */
function TabsNav({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Seleziona il percorso"
      className="mx-auto flex w-full max-w-[980px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1"
    >
      {TABS.map(({ key, label, icon: Icon }) => {
        const activeCls = active === key;
        return (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={activeCls}
            aria-controls={`panel-${key}`}
            onClick={() => onChange(key)}
            className={cx(
              "relative flex-1 rounded-xl px-4 py-2 text-sm transition",
              "focus-visible:ring-2 focus-visible:ring-[rgba(212,180,80,0.6)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              activeCls ? "bg-gold/20 text-gold" : "text-white/75 hover:text-white"
            )}
          >
            <span className="inline-flex items-center gap-2">
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------- Panels -------------------------------- */
function AgentsPanel() {
  const reduce = useReducedMotion();
  return (
    <div
      id="panel-agenti"
      role="tabpanel"
      aria-labelledby="tab-agenti"
      className="grid grid-cols-1 gap-8 md:grid-cols-5"
    >
      {/* Left: intro */}
      <motion.aside
        initial={reduce ? false : { opacity: 0, x: -16 }}
        whileInView={reduce ? {} : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="md:col-span-2"
      >
        <div className="mb-3">
          <EyebrowBadge>Agenti Immobiliari</EyebrowBadge>
        </div>
        <h3 className="text-xl font-semibold text-white">Cresci con un metodo misurabile</h3>
        <p className="mt-3 text-white/75">
          Dal primo incarico alla guida di un team: strumenti proprietari, playbook e
          obiettivi chiari. Formazione continua, premi di produzione e governance
          trasparente. Scopri i dettagli dei tre profili e scegli il tuo passo.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <GoldButton href="/carriere/agenti-immobiliari">Vai alla pagina</GoldButton>
          <GhostButton href="/carriere/agenti-immobiliari#profili">Vedi i 3 profili</GhostButton>
        </div>
        <ul className="mt-6 space-y-3">
          <Bullet icon={ShieldCheck}>Tutela contrattuale e processi tracciati end‑to‑end.</Bullet>
          <Bullet icon={Brain}>Formazione continua con casi reali e verifiche periodiche.</Bullet>
          <Bullet icon={BarChart2}>KPI chiari, dashboard e premi su produzione.</Bullet>
        </ul>
      </motion.aside>

      {/* Right: role cards */}
      <div className="md:col-span-3">
        <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
          {AGENT_ROLES.map((r, i) => (
            <RoleCard key={r.title} delay={i * 0.05} {...r} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BackOfficePanel() {
  const reduce = useReducedMotion();
  return (
    <div
      id="panel-backoffice"
      role="tabpanel"
      aria-labelledby="tab-backoffice"
      className="grid grid-cols-1 gap-8 md:grid-cols-5"
    >
      <motion.aside
        initial={reduce ? false : { opacity: 0, x: -16 }}
        whileInView={reduce ? {} : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="md:col-span-3"
      >
        <div className="mb-3">
          <EyebrowBadge>Back Office</EyebrowBadge>
        </div>
        <h3 className="text-xl font-semibold text-white">Qualità, processi e supporto operativo</h3>
        <p className="mt-3 text-white/75">
          Il cuore dei processi: coordinamento, controllo qualità e abilitazione dei team.
          Retribuzione mista con base + bonus su esiti, strumenti chiari e percorsi di
          crescita definiti.
        </p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          <Bullet icon={LayoutGrid}>Procedure standard, checklist e repository condivisi.</Bullet>
          <Bullet icon={Wand2}>Automazioni che riducono errori e tempi morti.</Bullet>
          <Bullet icon={Star}>Percorso di crescita con responsabilità progressive.</Bullet>
          <Bullet icon={ShieldCheck}>Tutela e governance: flussi misurabili e verificabili.</Bullet>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <GoldButton href="/carriere/back-office">Vai alla pagina Back Office</GoldButton>
          <GhostButton href="/carriere/back-office#overview">Vedi panoramica</GhostButton>
        </div>
      </motion.aside>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 16 }}
        whileInView={reduce ? {} : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="md:col-span-2"
      >
        <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-gold">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-white/75">
                In Back Office misuriamo tutto: SLA, errori, tempi e qualità di erogazione.
                Le dashboard rendono il lavoro trasparente e focalizzato.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <GhostButton href="/carriere/back-office#compensi">Retribuzione</GhostButton>
                <GhostButton href="/carriere/back-office#overview">Processi</GhostButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function OthersAndCollabPanel() {
  const reduce = useReducedMotion();
  return (
    <div
      id="panel-altre"
      role="tabpanel"
      aria-labelledby="tab-altre"
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      {/* Altre posizioni */}
      <motion.section
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6"
      >
        <div className="mb-3">
          <EyebrowBadge>Altre posizioni</EyebrowBadge>
        </div>
        <h3 className="text-xl font-semibold text-white">Marketing, Tech e Operations</h3>
        <p className="mt-3 text-white/75">
          Contribuisci ai prodotti interni, campagne e tool aziendali. KPI chiari,
          ownership e impatto misurabile.
        </p>
        <ul className="mt-6 space-y-3">
          <Bullet icon={Rocket}>Progetti reali su cui lasciare il segno.</Bullet>
          <Bullet icon={LayoutGrid}>Stack moderno e processi versionati.</Bullet>
          <Bullet icon={BadgeCheck}>Obiettivi trasparenti e feedback ciclici.</Bullet>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <GoldButton href="/carriere/altre-posizioni">Vai alla pagina</GoldButton>
          <GhostButton href="/carriere/altre-posizioni#openings">Posizioni aperte</GhostButton>
        </div>

        {/* decor */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-gold/15 blur-2xl" />
      </motion.section>

      {/* Collaborazioni */}
      <motion.section
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6"
      >
        <div className="mb-3">
          <EyebrowBadge>Collaborazioni</EyebrowBadge>
        </div>
        <h3 className="text-xl font-semibold text-white">Modelli flessibili con governance</h3>
        <p className="mt-3 text-white/75">
          Apriamo a freelance, agenzie e imprese: revenue share trasparente, processi tracciati e strumenti proprietari.
        </p>
        <ul className="mt-6 space-y-3">
          <Bullet icon={Puzzle}>Partnership su progetti e linee di business.</Bullet>
          <Bullet icon={Star}>KPI condivisi e premi su risultati.</Bullet>
          <Bullet icon={ChevronsRight}>Onboarding snello e asset pronti all'uso.</Bullet>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <GoldButton href="/carriere/collaborazioni">Vai alla pagina</GoldButton>
          <GhostButton href="/carriere/collaborazioni#types">Vedi modelli</GhostButton>
        </div>

        {/* decor */}
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-gold/15 blur-2xl" />
      </motion.section>
    </div>
  );
}
