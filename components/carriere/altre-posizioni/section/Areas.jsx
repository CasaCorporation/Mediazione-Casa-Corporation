"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { Code2, Megaphone, Users2, Camera } from "lucide-react";

export default function Areas(){
  const cards = [
    {
      icon: Code2, badge: "Tech & Data", title: "Informatica",
      desc: "Full-stack, frontend, backend, data pipeline, automazioni e integrazioni.",
      links: [
        { type: "ghost", label: "Modello & tooling", href: "#model" },
        { type: "gold",  label: "Invia CV", href: "/carriere/candidatura" },
      ],
      points: ["Next.js", "API & integrazioni", "DB & ETL", "Deploy"],
    },
    {
      icon: Megaphone, badge: "Comunicazione", title: "Social & Content",
      desc: "Strategia editoriale, copy, short-video, campagne con KPI reali.",
      links: [
        { type: "ghost", label: "Linea editoriale", href: "#overview" },
        { type: "gold",  label: "Invia CV", href: "/carriere/candidatura" },
      ],
      points: ["Calendari", "ADV", "Brand kit", "Analytics"],
    },
    {
      icon: Users2, badge: "People", title: "Recruiting & HR",
      desc: "Talent acquisition, screening, colloqui, onboarding e percorsi.",
      links: [
        { type: "ghost", label: "Processo", href: "#process" },
        { type: "gold",  label: "Invia CV", href: "/carriere/candidatura" },
      ],
      points: ["ATS", "Playbook", "Onboarding", "Culture"],
    },
    {
      icon: Camera, badge: "Creatività", title: "Foto / Video / ADV",
      desc: "Shooting, post, spot, creatività per campagne e property.",
      links: [
        { type: "ghost", label: "Linee guida", href: "#overview" },
        { type: "gold",  label: "Invia CV", href: "/carriere/candidatura" },
      ],
      points: ["Shooting", "Editing", "Spot", "Delivery"],
    },
  ];

  /* === Stesso comportamento dello slider === */
  const cardColor  = "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03))";
  const borderSoft = "rgba(255,255,255,0.10)";
  const isCoarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches;

  const scrollerRef = useRef(null);
  const trackRef    = useRef(null);

  const [dragEnabled, setDragEnabled] = useState(false);
  useEffect(() => { setDragEnabled(!isCoarse); }, [isCoarse]);

  const centerIndex = cards.length > 2 ? 1 : 0;
  const centerCard = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const nodes = track.querySelectorAll("article[data-card]");
    const target = nodes[centerIndex] || nodes[0];
    if (!target) return;
    const scRect = scroller.getBoundingClientRect();
    const elRect = target.getBoundingClientRect();
    const current = scroller.scrollLeft;
    const delta = (elRect.left - scRect.left) - (scRect.width - elRect.width) / 2;
    scroller.scrollTo({ left: current + delta, behavior: "instant" });
  }, [centerIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const t = requestAnimationFrame(centerCard);
    const ro = new ResizeObserver(() => centerCard());
    ro.observe(scroller);
    return () => { cancelAnimationFrame(t); ro.disconnect(); };
  }, [centerCard]);

  function scrollByCards(dir = 1) {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const card = track.querySelector("article[data-card]");
    if (!card) return;
    const step = card.getBoundingClientRect().width + 24; // gap-6
    scroller.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function onWheel(e) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
      e.preventDefault();
      scroller.scrollBy({ left: e.deltaY, behavior: "smooth" });
    }
  }

  function onKeyDown(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollByCards(1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); scrollByCards(-1); }
  }

  return (
    <section id="areas" className="section" aria-labelledby="areas-title">
      <div className="container">
        <SectionHeader
          id="areas-title"
          title="Aree e ruoli che stiamo valutando"
          size="lg"
          tone="dark"
          underline
          className="mb-8 sm:mb-10"
        />

        <div className="relative">
          {/* Frecce desktop */}
          <div className="pointer-events-none absolute -top-14 right-0 hidden gap-2 md:flex">
            <button
              onClick={() => scrollByCards(-1)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15"
              aria-label="Scorri a sinistra"
            >‹</button>
            <button
              onClick={() => scrollByCards(1)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/90 hover:bg-white/15"
              aria-label="Scorri a destra"
            >›</button>
          </div>

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="-mx-4 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x focus:outline-none"
            style={{ WebkitOverflowScrolling: "touch" }}
            role="region"
            aria-label="Aree, scorrimento orizzontale"
            tabIndex={0}
            onWheel={onWheel}
            onKeyDown={onKeyDown}
          >
            <motion.div
              ref={trackRef}
              drag={dragEnabled ? "x" : false}
              dragConstraints={scrollerRef}
              dragElastic={0.075}
              dragMomentum
              className="flex gap-6"
            >
              {cards.map((c, i) => (
                <motion.article
                  key={c.title}
                  data-card
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.6 }}
                  className="
                    snap-center
                    min-w-[94%] xs:min-w-[90%] sm:min-w-[78%] lg:min-w-[56%] xl:min-w-[48%]
                    rounded-3xl p-4 sm:p-5 backdrop-blur outline-none focus:ring-2 focus:ring-gold/40
                  "
                  style={{
                    background: cardColor,
                    border: `1px solid ${borderSoft}`,
                    boxShadow: "0 10px 28px rgba(0,0,0,.28), 0 10px 22px rgba(201,168,110,.10)"
                  }}
                >
                  <AreaCard index={i} {...c} />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.section :where(::-webkit-scrollbar)) { display: none; }
        :global(.snap-mandatory) { scroll-snap-type: x mandatory; }
      `}</style>
    </section>
  );
}

/* --- Card area --- */
function AreaCard({ icon: Icon, badge, title, desc, points = [], links = [], index = 0 }){
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.04 }}>
      <div className="relative z-[1]">
        <div className="flex items-start gap-3">
          <span className="inline-grid h-7 w-7 place-items-center rounded-lg text-gold"
                style={{
                  background: "color-mix(in oklab, var(--gold) 18%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--gold) 45%, transparent)"
                }}>
            <Icon className="h-4 w-4" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate">{title}</h3>
              {badge ? <span className="rounded-full border border-[rgba(201,168,110,.35)] bg-[rgba(201,168,110,.22)] px-2 py-0.5 text-[11px] leading-none">{badge}</span> : null}
            </div>
            <p className="mt-1 text-sm text-white/78">{desc}</p>
          </div>
        </div>

        {points?.length ? (
          <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/80">
            {points.map((p) => (
              <li key={p} className="rounded-full border border-[rgba(201,168,110,.35)] bg-[rgba(201,168,110,.18)] px-2.5 py-1">{p}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="relative z-[1] mt-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs uppercase tracking-[.18em] text-white/55">Azione</div>
          <div className="flex items-center gap-2">
            {links.map((a) =>
              a.type === "gold" ? (
                <ButtonGold key={a.label} href={a.href} withArrow>{a.label}</ButtonGold>
              ) : (
                <ButtonGhost key={a.label} href={a.href}>{a.label}</ButtonGhost>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
