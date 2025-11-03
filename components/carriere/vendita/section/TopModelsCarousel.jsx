"use client";

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { MODELS, expectedScore } from "@/components/carriere/vendita/data";
import { ButtonGhost } from "@/common/section/Buttons";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import ModelModal from "./ModelModal";

/** TopModelsCarousel — compatto, scroller pulito, modal separato */
export default function TopModelsCarousel({
  id = "modelli",
  title = "Panoramica rapida — modelli a confronto",
  desc = "Scorri le 4 card più rilevanti per capire trend e trade-off.",
  headerTone = "dark",
}) {
  /* ===== DATI ===== */
  const enriched = useMemo(() => {
    const base = MODELS.map((m) => ({
      ...m,
      score: expectedScore(m),
      provNum: pctToNum(m.provvigionePct),
      guadNum: pctToNum(m.guadagnoPct),
      speseNum: speseToNum(m.spese),
      isCasa: /casa\s*corporation/i.test(m.name),
    }));
    return base.sort((a, b) => b.score - a.score);
  }, []);

  const items =
    enriched.filter((m) => !m.isCasa).slice(0, 4).length
      ? enriched.filter((m) => !m.isCasa).slice(0, 4)
      : enriched.slice(0, 4);

  /* ===== STATE / REFS ===== */
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const [dragEnabled, setDragEnabled] = useState(false);
  useEffect(() => {
    const coarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches;
    setDragEnabled(!coarse);
  }, []);

  const suppressClickRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);

  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!active) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [active]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ===== CENTER ===== */
  const centerIndex = items.length > 2 ? 1 : 0;
  const centerCard = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const cards = track.querySelectorAll("article[data-card]");
    const target = cards[centerIndex] || cards[0];
    if (!target) return;

    const scRect = scroller.getBoundingClientRect();
    const elRect = target.getBoundingClientRect();
    const current = scroller.scrollLeft;
    const delta = (elRect.left - scRect.left) - (scRect.width - elRect.width) / 2;
    scroller.scrollTo({ left: current + delta, behavior: "instant" });
    updateArrows();
  }, [centerIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const t = requestAnimationFrame(centerCard);
    const ro = new ResizeObserver(() => centerCard());
    ro.observe(scroller);
    return () => { cancelAnimationFrame(t); ro.disconnect(); };
  }, [centerCard]);

  /* ===== ARROWS ===== */
  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 6);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 6);
  };
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ===== SCROLL HELPERS ===== */
  function scrollByCards(dir = 1) {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const first = track.querySelector("article[data-card]");
    if (!first) return;
    const cardW = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "24");
    const step = cardW + (isNaN(gap) ? 24 : gap);
    scroller.scrollBy({ left: dir * step, behavior: "smooth" });
  }
  function onWheelToHorizontal(e) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const mainlyVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    if (mainlyVertical && !e.shiftKey && scroller.scrollWidth > scroller.clientWidth + 2) {
      e.preventDefault();
      scroller.scrollBy({ left: e.deltaY, behavior: "smooth" });
    }
  }
  function onRegionKeyDown(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollByCards(1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); scrollByCards(-1); }
  }

  /* ===== DRAG ===== */
  const DRAG_SUPPRESS_THRESHOLD = 10; // px
  const onDragStart = (_, info) => {
    dragStartXRef.current = info?.point?.x ?? 0;
    dragStartYRef.current = info?.point?.y ?? 0;
  };
  const onDragEnd = (_, info) => {
    const dx = Math.abs((info?.point?.x ?? 0) - dragStartXRef.current);
    const dy = Math.abs((info?.point?.y ?? 0) - dragStartYRef.current);
    if (Math.hypot(dx, dy) > DRAG_SUPPRESS_THRESHOLD) {
      suppressClickRef.current = true;
      setTimeout(() => (suppressClickRef.current = false), 140);
    }
  };
  const onClickCapture = (e) => {
    if (suppressClickRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-12 sm:py-16 md:py-20">
      <div className="container">
        <SectionHeader
          id={`${id}-title`}
          title={title}
          size="lg"
          tone={headerTone}
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[76ch] text-center">
          <SectionP className="text-white/90">{desc}</SectionP>
        </div>

        <div className="relative">
          {/* Frecce desktop (pulite) */}
          <div className="pointer-events-none absolute -top-10 right-0 hidden gap-2 md:flex">
            <button
              onClick={() => scrollByCards(-1)}
              disabled={!canLeft}
              className="pointer-events-auto inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15 disabled:opacity-30"
              aria-label="Scorri a sinistra"
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              disabled={!canRight}
              className="pointer-events-auto inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15 disabled:opacity-30"
              aria-label="Scorri a destra"
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* SCROLLER (pulito: niente ombre/fade) */}
          <div
            ref={scrollerRef}
            className="-mx-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x focus:outline-none"
            style={{ WebkitOverflowScrolling: "touch" }}
            role="region"
            aria-label="Modelli scrollabili"
            tabIndex={0}
            onWheel={onWheelToHorizontal}
            onKeyDown={onRegionKeyDown}
            onClickCapture={onClickCapture}
          >
            <motion.div
              ref={trackRef}
              drag={dragEnabled ? "x" : false}
              dragConstraints={scrollerRef}
              dragElastic={0.075}
              dragMomentum
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              className="flex gap-4 sm:gap-5 md:gap-6"
            >
              {items.map((m, i) => (
                <SmallCard
                  key={m.key || m.id || `${m.name}-${i}`}
                  model={m}
                  index={i}
                  onOpen={() => setActive(m)}
                />
              ))}
            </motion.div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/60">
          Il punteggio aggrega provvigione, spese, premi e supporto. Per il confronto completo apri la tabella.
        </p>
      </div>

      {/* scrollbar hidden + stabilità snap iOS */}
      <style jsx>{`
        :global(#${id} ::-webkit-scrollbar) { display: none; }
        :global(.snap-mandatory) { scroll-snap-type: x mandatory; }
      `}</style>

      {/* MODAL separato */}
      <AnimatePresence>
        {active && <ModelModal model={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ================= CARD COMPATTA ================= */
function SmallCard({ model, index, onOpen }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2, -2]), { stiffness: 120, damping: 16 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 120, damping: 16 });

  const onMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
    mouseY.set(Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)));
  };

  const barProv = clamp01(model.provNum);
  const barGain = clamp01(model.guadNum);

  const open = () => onOpen?.(model);
  const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } };

  return (
    <motion.article
      ref={ref}
      data-card
      onMouseMove={onMove}
      onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      viewport={{ once: true, margin: "-8% 0px -12% 0px" }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.24), ease: "easeOut" }}
      className="
        group relative snap-center
        min-w-[90%] xs:min-w-[80%] sm:min-w-[64%] lg:min-w-[42%] xl:min-w-[34%]
        max-w-[460px]
        overflow-hidden rounded-2xl border border-white/10 bg-[rgba(12,16,24,.78)]
        focus:outline-none focus:ring-2 focus:ring-white/20
      "
      style={{
        transformStyle: "preserve-3d",
        ...(prefersReduced ? {} : { rotateX, rotateY }),
        cursor: "pointer",
        boxShadow: "none", // scroller pulito
      }}
      aria-label={`Modello ${model.name}, score ${model.score.toFixed(1)}. Clic per dettagli.`}
      tabIndex={0}
      role="button"
      onClick={open}
      onKeyDown={onKey}
    >
      {/* Desktop: SOLO testo invito */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 z-[10] hidden md:flex items-center gap-1 rounded-md bg-black/30 px-2 py-1 text-[11px] text-white/85 ring-1 ring-white/15 backdrop-blur opacity-0 transition-opacity group-hover:opacity-100"
      >
        <span>Apri dettagli</span>
      </div>

      {/* Mobile: SOLO icona */}
      <button
        type="button"
        aria-label="Apri dettagli"
        onClick={(e) => { e.stopPropagation(); open(); }}
        className="absolute right-2 top-2 z-10 inline-flex items-center justify-center rounded-md bg-black/30 p-1.5 ring-1 ring-white/20 backdrop-blur md:hidden"
      >
        <Maximize2 className="h-4 w-4 text-white" />
      </button>

      {/* Media davvero compatta */}
      <MediaBlock model={model} />

      {/* Body compatto */}
      <div className="relative z-[1] grid gap-2.5 p-3.5 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base sm:text-lg font-semibold tracking-[-0.01em]">{model.name}</h3>
            <p className="mt-0.5 line-clamp-2 text-[13px] text-white/70">{model.sintesi}</p>
          </div>
          <Gauge value={model.score} />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[12px]">
          <Chip label="% Provvigione" value={model.provvigionePct} />
          <Chip label="Spese" value={model.spese} />
          <Chip label="% Guadagno" value={model.guadagnoPct} />
          <Chip label="Premi" value={model.premi} />
        </div>

        <div className="grid gap-2 pt-0.5">
          <Bar label="Provvigione" value={barProv} hint={model.provvigionePct} compact />
          <Bar label="Guadagno" value={barGain} hint={model.guadagnoPct} tone="gold" compact />
        </div>

        <div className="grid gap-1.5 pt-0.5 text-[13px] text-white/85">
          <Row label="Supporto" value={model.supporto} />
          <Row label="Formazione" value={model.formazione} />
        </div>

        <div className="mt-1 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <ButtonGhost as="a" href="#confronto-table-title" className="!px-3.5 !py-1.5 !text-[12px]">Apri tabella</ButtonGhost>
        </div>
      </div>
    </motion.article>
  );
}

/* ================= MEDIA BLOCK (h-24 compatto) ================= */
function MediaBlock({ model }) {
  const [failed, setFailed] = useState(false);
  const src = !failed ? model.image || model.logo || null : null;
  return (
    <div className="relative h-24 w-full bg-white/5">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={model.name} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-start bg-gradient-to-br from-[#1D2D5E] to-[#0B1220] px-3">
          <div className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-white/85 ring-1 ring-white/15">{model.name}</div>
        </div>
      )}
      {/* nessuna sfumatura/ombra */}
    </div>
  );
}

/* ================= SHARED UI (compatti) ================= */
function Gauge({ value }) {
  const v = Math.max(0, Math.min(100, value || 0));
  const r = 16, c = 2 * Math.PI * r, dash = c * (v / 100);
  return (
    <div className="grid place-items-center">
      <svg width="50" height="50" viewBox="0 0 50 50" role="img" aria-label={`Score ${v.toFixed(1)}`}>
        <circle cx="25" cy="25" r={r} stroke="rgba(255,255,255,.15)" strokeWidth="5" fill="none" />
        <circle cx="25" cy="25" r={r} stroke="url(#gsmall)" strokeWidth="5" fill="none" strokeLinecap="round"
                strokeDasharray={`${dash} ${c - dash}`} transform="rotate(-90 25 25)" />
        <defs>
          <linearGradient id="gsmall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(201,168,110,.45)" />
            <stop offset="100%" stopColor="rgba(201,168,110,.9)" />
          </linearGradient>
        </defs>
        <text x="50%" y="52%" textAnchor="middle" className="fill-white/90 text-[11px] font-semibold">{v.toFixed(1)}</text>
      </svg>
    </div>
  );
}
function Chip({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/6 px-2 py-0.5 text-[11px] text-white/85 ring-1 ring-white/10">
      <Dot /> <b className="text-white/95">{label}:</b> {value}
    </span>
  );
}
function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-white/70">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
function Bar({ label, value, hint, tone = "blue", compact = true }) {
  return (
    <div>
      <div className="mb-0.5 flex items-center justify-between text-[11px] text-white/70">
        <span>{label}</span>
        <span className="tabular-nums text-white/80">{hint}</span>
      </div>
      <div className={"relative overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10 " + (compact ? "h-[6px]" : "h-2")}>
        <div className="h-full" style={{
          width: `${(value * 100).toFixed(0)}%`,
          background: tone === "gold" ? "linear-gradient(90deg, rgba(201,168,110,.35), rgba(201,168,110,.85))"
                                      : "linear-gradient(90deg, rgba(29,45,94,.35), rgba(29,45,94,.9))",
          boxShadow: "none",
        }} />
      </div>
    </div>
  );
}
function Dot() { return <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-full" style={{ background: "var(--gold)" }} />; }

/* ================= UTILS ================= */
function pctToNum(str) {
  if (!str) return 0;
  const s = String(str).replace(",", ".").toLowerCase();
  if (s.includes("oltre")) return 1.1;
  const m1 = s.match(/(\d+(?:\.\d+)?)\s*%?\s*[–-]\s*(\d+(?:\.\d+)?)\s*%/);
  if (m1) return ((+m1[1] + +m1[2]) / 2) / 100;
  const m2 = s.match(/(~?\s*)(\d+(?:\.\d+)?)\s*%/);
  if (m2) return +m2[2] / 100;
  return 0;
}
function speseToNum(str) {
  if (!str) return 0;
  const n = String(str).replace(/[^\d–-]/g, "").split(/[–-]/).map(Number);
  if (n.length === 1) return n[0] || 0;
  if (n.length >= 2) return (n[0] + n[1]) / 2;
  return 0;
}
function clamp01(n) { return Math.max(0, Math.min(1, n || 0)); }
