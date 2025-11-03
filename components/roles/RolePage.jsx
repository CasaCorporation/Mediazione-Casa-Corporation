"use client";
import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Wallet,
  Trophy,
  Gift,
} from "lucide-react";
import Header from "@/common/layout/Header";
import Footer from "@/common/layout/Footer";
/* ⬇️ NEW: local nav a pillole numeriche, opaca, centrata */
import LocalNavPills from "@/components/roles/LocalNavPills";

/* =======================
   UTILS
   ======================= */
function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(pointer: coarse)");
    setCoarse(!!mq?.matches);
    const onChange = (e) => setCoarse(e.matches);
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);
  return coarse;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.06 },
  }),
};

/* =======================
   BACKGROUND GLOBALE (zero scatti, mobile-friendly)
   - Mobile / reduced motion: CSS keyframes (GPU transform-only)
   - Desktop: parallax lieve con spring (smooth)
   ======================= */
function GlobalPageBackground({ bgImage }) {
  const isCoarse = useIsCoarsePointer();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax solo desktop + motion abilitato
  const parallaxY = useTransform(scrollY, [0, 1200], [0, -60]);
  const ySpring = useSpring(parallaxY, { stiffness: 55, damping: 20, mass: 0.2 });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Layer immagine */}
      <div className="absolute inset-0">
        {(isCoarse || reduce) ? (
          // MOBILE/REDUCED: usa keyframes CSS per massimo smoothness
          <div className="absolute inset-0 will-change-transform bg-zoom-pan">
            <Image
              src={bgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          // DESKTOP: lieve parallax su scroll, spring per fluidità
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ y: ySpring }}
          >
            <Image
              src={bgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </div>

      {/* Overlay per leggibilità + tocchi brand (leggeri) */}
      <div className="absolute inset-0 bg-[rgba(8,12,25,0.60)]" />
      <div className="absolute inset-0 opacity-[0.16]">
        <div className="h-full w-full bg-[radial-gradient(700px_280px_at_20%_10%,rgba(201,168,110,0.22),transparent),radial-gradient(600px_420px_at_85%_75%,rgba(201,168,110,0.14),transparent)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent,rgba(0,0,0,0.26))]" />
    </div>
  );
}

/* =======================
   ORNAMENTI HERO (lati)
   ======================= */
function HeroOrnaments() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const yLeft  = useTransform(scrollY, [0, 800], [0, 16]);
  const yRight = useTransform(scrollY, [0, 800], [0, -16]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-[80px]"
        style={{ y: yLeft, background: "rgba(88,140,220,0.28)" }}
        animate={reduce ? {} : { scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-[90px]"
        style={{ y: yRight, background: "rgba(201,168,110,0.20)" }}
        animate={reduce ? {} : { scale: [1, 1.04, 1] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </>
  );
}

/* =======================
   HERO COMPATTO (centrato)
   ======================= */
function MiniHero({ title, subtitle, kicker = "Percorso Carriera" }) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      className="relative border-b border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <HeroOrnaments />
      <div className="container py-9 md:py-11 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold">
          <Sparkles className="h-3.5 w-3.5" />
          {kicker}
        </div>

        {/* Titolo “maestoso” (più grande, gradiente animato) */}
        <motion.h1
          className="mt-2 text-[26px] sm:text-[32px] md:text-[44px] lg:text-[54px] font-semibold leading-[1.07] tracking-tight -mb-1"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #D6E4FF 0%, #9FC2FF 35%, #C9A86E 55%, #D6E4FF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            backgroundSize: "200% 100%",
            textWrap: "balance",
          }}
          animate={reduce ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {title}
        </motion.h1>

        {/* Divider di sezione più “importante” */}
        <div className="mx-auto mt-3 h-[3px] w-32 rounded-full bg-[linear-gradient(90deg,rgba(155,190,255,.9),rgba(201,168,110,.95),rgba(155,190,255,.9))] opacity-90" />

        {subtitle && <p className="mx-auto mt-2 max-w-2xl text-white/80">{subtitle}</p>}
      </div>
    </motion.section>
  );
}

/* =======================
   SECTION HEADER fortemente distinto
   ======================= */
function SectionHeader({ index, title }) {
  const idx = String(index).padStart(2, "0");
  return (
    <div className="relative pl-5">
      {/* linea top della sezione */}
      <div className="absolute -top-5 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(155,190,255,.45),transparent)]" />
      {/* barra verticale brand */}
      <div className="absolute left-0 top-1.5 h-6 w-1.5 rounded-full bg-[linear-gradient(180deg,rgba(155,190,255,.9),rgba(201,168,110,.9))]" />
      {/* numero + titolo */}
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#9FC2FF]/80">Sezione {idx}</div>
      <h2 className="text-[21px] sm:text-[24px] md:text-[28px] font-semibold text-[#CFE0FF] mt-1">
        {title}
      </h2>
    </div>
  );
}

/* =======================
   SEZIONI & CARDS
   ======================= */
function SectionShell({ index, title, id, children, alt = false }) {
  return (
    <motion.section
      id={id}
      className={`py-12 md:py-16 border-b border-white/10 scroll-mt-16 ${
        alt ? "bg-transparent" : "bg-transparent"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
    >
      <div className="container">
        <SectionHeader index={index} title={title} />
        <div className="mt-6 text-white/85">{children}</div>
      </div>
    </motion.section>
  );
}

/* Card blu grande per overview (testo libero) */
function BrandCard({ children }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl
                 border border-[rgba(88,140,220,0.35)]
                 bg-[linear-gradient(135deg,rgba(16,34,62,0.92)_0%,rgba(7,18,36,0.96)_100%)]
                 p-5 shadow-[0_10px_38px_rgba(10,20,40,.40)]"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(88,140,220,0.22)] blur-xl" />
      <div className="relative z-10 text-[15px] leading-relaxed text-[#E9F0FF]">{children}</div>
    </motion.div>
  );
}

/* Lista bullets animata */
function Bullets({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((t, i) => (
        <motion.li
          key={i}
          custom={i}
          variants={fadeUp}
          className="flex items-start gap-2 rounded-2xl border border-[rgba(88,140,220,0.28)]
                     bg-[linear-gradient(135deg,rgba(18,36,66,0.86)_0%,rgba(6,16,32,0.90)_100%)]
                     backdrop-blur-[2px] p-3"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-gold shrink-0" />
          <span className="text-sm text-[#E9F0FF]">{t}</span>
        </motion.li>
      ))}
    </ul>
  );
}

/* CTA BUTTONS (blu premium) */
function PrimaryCTA({ children, href }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl
                 border border-[rgba(88,140,220,0.45)]
                 bg-[linear-gradient(135deg,rgba(28,52,94,0.95),rgba(18,36,66,0.95))]
                 px-5 py-2.5 text-sm font-semibold text-[#D6E4FF]
                 shadow-[0_10px_28px_rgba(10,20,40,.35)]
                 hover:-translate-y-0.5 transition will-change-transform"
    >
      {children}
    </Link>
  );
}
function SecondaryCTA({ children, href }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl
                 border border-[rgba(88,140,220,0.35)]
                 px-5 py-2.5 text-sm font-semibold text-[#D6E4FF]
                 hover:bg-white/5 transition"
    >
      {children}
    </Link>
  );
}

/* Retribuzione */
function Compensation({ items }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <SectionShell index={4} id="retribuzione" title="Retribuzione">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl
                       border border-[rgba(88,140,220,0.38)]
                       bg-[linear-gradient(135deg,rgba(16,34,62,0.88)_0%,rgba(7,18,36,0.95)_100%)]
                       p-4 shadow-[0_8px_30px_rgba(10,20,40,.35)]"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(88,140,220,0.22)] blur-xl" />
            <div className="flex items-start justify-between gap-3">
              <div className="text-[12px] uppercase tracking-wide text-[#9FC2FF]">{c.label}</div>
              <Wallet className="h-5 w-5 text-[#9FC2FF]" />
            </div>
            {c.value && <div className="mt-1 text-2xl font-semibold text-gold">{c.value}</div>}
            {c.desc && <p className="mt-1.5 text-sm text-[#E9F0FF]">{c.desc}</p>}
            {c.note && <p className="mt-2 text-xs text-white/60">{c.note}</p>}
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
        <PrimaryCTA href="/contatti?topic=candidatura">
          Candidati ora <ArrowRight className="h-4 w-4" />
        </PrimaryCTA>
        <SecondaryCTA href="/carriere/confronto">
          Confronto & Calcolatore
        </SecondaryCTA>
      </motion.div>
    </SectionShell>
  );
}

/* Benefits */
function BenefitsShowcase({ items }) {
  if (!Array.isArray(items) || !items.length) return null;
  const icons = [Gift, Trophy, CheckCircle2];
  return (
    <SectionShell index={5} id="benefits" title="Benefits">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((b, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl
                         border border-[rgba(88,140,220,0.28)]
                         bg-[linear-gradient(135deg,rgba(10,24,44,0.68)_0%,rgba(6,16,32,0.80)_100%)]
                         p-4 backdrop-blur-md"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(88,140,220,0.20)] blur-xl" />
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-semibold text-[#D9E6FF]">{b.title}</div>
                <Icon className="h-5 w-5 text-gold" />
              </div>
              {b.desc && <p className="mt-1.5 text-sm text-[#E9F0FF]">{b.desc}</p>}
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* CTA finale */
function FinalCTA() {
  return (
    <motion.section
      className="py-14 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl
                        border border-[rgba(88,140,220,0.40)]
                        bg-[linear-gradient(135deg,rgba(12,26,50,0.88)_0%,rgba(7,18,36,0.95)_100%)]
                        p-6 sm:p-8 shadow-[0_18px_60px_rgba(10,20,40,.35)]">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[rgba(88,140,220,0.25)] blur-[120px]" />
          <div className="relative z-10 grid gap-4 items-center sm:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl md:text-[28px] font-semibold text-[#D6E4FF]">
                Pronto a fare il salto?
              </h3>
              <p className="mt-1.5 text-[#E9F0FF]">
                Percorso serio, strumenti proprietari e risultati misurabili. Candidati ora.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PrimaryCTA href="/contatti?topic=candidatura">
                Candidati ora <ArrowRight className="h-4 w-4" />
              </PrimaryCTA>
              <SecondaryCTA href="/carriere/confronto">
                Vedi confronto
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* =======================
   TEMPLATE PAGINA RUOLO
   ======================= */
export default function RolePage({
  metaTitle, metaDescription,
  roleTitle, roleSubtitle,
  bgImage,
  overview,
  responsibilities,
  activities,
  compensation,      // {label, value?, desc?, note?}[]
  benefitsCards,     // {title, desc?}[]
  requirements, benefits, growth,
}) {
  /* ⬇️ NEW: costruiamo la LocalNav solo con le sezioni presenti (pills numeriche) */
  const localNav = useMemo(() => {
    const out = [];
    let n = 1;
    const push = (id, title) => out.push({ id, label: String(n++).padStart(2, "0"), title });
    push("overview", "Il ruolo in breve");
    if (Array.isArray(responsibilities) && responsibilities.length) push("responsabilita", "Responsabilità");
    if (Array.isArray(activities) && activities.length) push("attivita", "Attività — Cosa farai");
    if (Array.isArray(compensation) && compensation.length) push("retribuzione", "Retribuzione");
    if (Array.isArray(benefitsCards) && benefitsCards.length) push("benefits", "Benefits");
    if (Array.isArray(requirements) && requirements.length) push("requisiti", "Requisiti");
    if (Array.isArray(benefits) && benefits.length) push("strumenti", "Benefit & Strumenti");
    if (Array.isArray(growth) && growth.length) push("crescita", "Percorso e sviluppo");
    return out;
  }, [responsibilities, activities, compensation, benefitsCards, requirements, benefits, growth]);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
      </Head>

      <GlobalPageBackground bgImage={bgImage} />

      <div className="relative z-10">
        <Header />

        {/* Spazio per header fisso */}
        <main className="relative z-10 min-h-screen text-white pt-14 md:pt-16">
          <MiniHero title={roleTitle} subtitle={roleSubtitle} />

         {/* Local Nav pills numeriche (centrata) */}
{localNav.length > 1 && (
  <LocalNavPills
    items={localNav}
    topOffset="var(--header-h, 56px)"
    theme={{ bg: "rgba(12,26,50,.22)", accent: "var(--gold)", ring: "rgba(255,255,255,.08)" }}
    watermark={roleTitle}   // ⬅️ NEW: testo della filigrana
  />
)}


          {/* 01 Il ruolo in breve */}
          <SectionShell index={1} id="overview" title="Il ruolo in breve">
            <BrandCard>{overview}</BrandCard>
          </SectionShell>

          {/* 02 Responsabilità */}
          {Array.isArray(responsibilities) && responsibilities.length > 0 && (
            <SectionShell index={2} id="responsabilita" title="Responsabilità">
              <Bullets items={responsibilities} />
            </SectionShell>
          )}

          {/* 03 Attività */}
          {Array.isArray(activities) && activities.length > 0 && (
            <SectionShell index={3} id="attivita" title="Attività — Cosa farai">
              <Bullets items={activities} />
            </SectionShell>
          )}

          {/* 04 Retribuzione */}
          <Compensation items={compensation} />

          {/* 05 Benefits */}
          <BenefitsShowcase items={benefitsCards} />

          {/* (Opzionali) */}
          {Array.isArray(requirements) && requirements.length > 0 && (
            <SectionShell index={6} id="requisiti" title="Requisiti">
              <Bullets items={requirements} />
            </SectionShell>
          )}
          {Array.isArray(benefits) && benefits.length > 0 && (
            <SectionShell index={7} id="strumenti" title="Benefit & Strumenti">
              <Bullets items={benefits} />
            </SectionShell>
          )}
          {Array.isArray(growth) && growth.length > 0 && (
            <SectionShell index={8} id="crescita" title="Percorso e sviluppo">
              <Bullets items={growth} />
            </SectionShell>
          )}

          <FinalCTA />
        </main>

        <Footer />
      </div>

      {/* ====== CSS globale per animazione bg mobile (super fluida) ====== */}
      <style jsx global>{`
        @keyframes ccBgZoomPan {
          0%   { transform: scale(1) translate3d(0, 0, 0); }
          100% { transform: scale(1.04) translate3d(0, -10px, 0); }
        }
        .bg-zoom-pan { animation: ccBgZoomPan 28s ease-in-out infinite alternate; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .bg-zoom-pan { animation: none; }
        }
      `}</style>
    </>
  );
}
