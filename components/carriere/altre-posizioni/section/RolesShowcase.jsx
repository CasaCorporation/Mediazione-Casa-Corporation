"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import {
  ArrowLeft, ArrowRight,
  Code2, Megaphone, Users2, Camera, Database, PenTool, LineChart, MonitorSmartphone
} from "lucide-react";

export default function RolesShowcase(){
  const items = [
    { icon: Code2, title: "Full-stack Dev",    badge: "Tech",     desc: "Next.js, API, integrazioni, workflow e automazioni.", chips: ["Next.js","API","CI/CD","Supabase"] },
    { icon: Database, title: "Data / ETL",     badge: "Data",     desc: "Pipeline, normalizzazione dati, report e controlli.", chips: ["ETL","SQL","KPI","Audit"] },
    { icon: Megaphone, title: "Social / ADV",  badge: "Marketing",desc: "Strategia, copy, pianificazione, performance.", chips: ["Calendari","ADV","Creative","Analytics"] },
    { icon: Camera,    title: "Video Maker",   badge: "Media",    desc: "Shooting, editing, spot, delivery per property.", chips: ["Shooting","Editing","Spot","Color"] },
    { icon: Users2,    title: "Recruiter",     badge: "People",   desc: "Sourcing, screening, colloqui, onboarding.", chips: ["ATS","Playbook","Onboarding","Culture"] },
    { icon: PenTool,   title: "Designer UI",   badge: "Design",   desc: "Design system, layout, asset e handoff.", chips: ["Design Sys","Figma","Handoff","Icons"] },
    { icon: LineChart, title: "Growth",        badge: "MKT",      desc: "Sperimentazione, funnel, CRO, opportunità.", chips: ["A/B","CRO","Segmentation","CRM"] },
    { icon: MonitorSmartphone, title: "Content", badge: "Comm",   desc: "Script, short-video, asset multicanale.", chips: ["Script","Short","Brand","Delivery"] },
  ];

  /* === Comportamento IDENTICO allo PropertySlider === */
  const cardColor  = "#0B142E";
  const borderSoft = "rgba(255,255,255,0.06)";
  const isCoarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches;

  const scrollerRef = useRef(null);
  const trackRef    = useRef(null);

  const [dragEnabled, setDragEnabled] = useState(false);
  useEffect(() => { setDragEnabled(!isCoarse); }, [isCoarse]);

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
    <section id="roles" className="section bg-brand" aria-labelledby="roles-title">
      <div className="container">
        <div className="mb-8 text-center">
          <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/70">Team</div>
          <h3 id="roles-title" className="text-2xl sm:text-4xl font-semibold">
            Ruoli in <span className="text-gold">evidenza</span>
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-white/70 text-sm sm:text-base">
            Figure operative reali, responsabilità chiare, KPI misurabili.
          </p>
        </div>

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
            aria-label="Ruoli, scorrimento orizzontale"
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
              {items.map((it, i) => (
                <motion.article
                  key={it.title}
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
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03), 0 16px 30px rgba(0,0,0,0.30)",
                  }}
                >
                  <RoleCard {...it} />
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

/* --- Card ruolo (UI coerente con brand) --- */
function RoleCard({ icon: Icon, title, badge, desc, chips = [] }){
  return (
    <article className="h-full text-white">
      <div className="flex items-start gap-3">
        <span className="inline-grid h-9 w-9 place-items-center rounded-xl text-gold"
              style={{
                background: "color-mix(in oklab, var(--gold) 20%, transparent)",
                border: "1px solid color-mix(in oklab, var(--gold) 56%, transparent)"
              }}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{title}</h3>
            {badge ? (
              <span className="rounded-full border border-[rgba(201,168,110,.35)] bg-[rgba(201,168,110,.22)] px-2 py-0.5 text-[11px] leading-none">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-white/80">{desc}</p>
        </div>
      </div>

      {!!chips.length && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c} className="rounded-full border border-[rgba(201,168,110,.35)] bg-[rgba(201,168,110,.18)] px-2.5 py-1 text-xs">
              {c}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <ButtonGold href="/carriere/candidatura" withArrow>Invia CV</ButtonGold>
        <ButtonGhost href="#model">Come lavoriamo</ButtonGhost>
      </div>
    </article>
  );
}
