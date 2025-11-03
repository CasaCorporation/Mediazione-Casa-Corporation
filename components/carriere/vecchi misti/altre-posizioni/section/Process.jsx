// components/carriere/altre-posizioni/section/Process.jsx
"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { MailCheck, SearchCheck, MessageSquare, ClipboardCheck } from "lucide-react";

const STEPS = [
  { icon: MailCheck,     title: "Candidatura",   desc: "Invia CV e portfolio (se presente). Valutiamo ogni profilo." },
  { icon: SearchCheck,   title: "Screening",     desc: "Analisi competenze, allineamento e fit sulle aree." },
  { icon: MessageSquare, title: "Colloquio",     desc: "Confronto su esperienza, obiettivi e contesto operativo." },
  { icon: ClipboardCheck,title: "Task breve",    desc: "Micro-test operativo su caso reale (facoltativo)." },
];

export default function Process(){
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const [dragEnabled, setDragEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(pointer: coarse)");
    const update = () => setDragEnabled(!(mq?.matches));
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);

  const centerIndex = STEPS.length > 2 ? 1 : 0;
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
    scroller.scrollTo({ left: current + delta, behavior: "auto" });
  }, [centerIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const t = requestAnimationFrame(centerCard);
    const ro = new ResizeObserver(centerCard);
    ro.observe(scroller);
    return () => { cancelAnimationFrame(t); ro.disconnect(); };
  }, [centerCard]);

  function onWheel(e){
    const el = scrollerRef.current;
    if(!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey){
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    }
  }
  function onKeyDown(e){
    if (e.key === "ArrowRight" || e.key === "PageDown"){ e.preventDefault(); scrollByCards(1); }
    if (e.key === "ArrowLeft"  || e.key === "PageUp"){   e.preventDefault(); scrollByCards(-1); }
  }
  function scrollByCards(dir = 1){
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const card = track.querySelector("article[data-card]");
    if (!card) return;
    const step = card.getBoundingClientRect().width + 24;
    scroller.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section id="process" className="relative isolate overflow-x-hidden py-18 sm:py-20">
      <div className="container">
        <SectionHeader
          title="Processo semplice: valutiamo oggi, cresciamo domani"
          size="lg"
          tone="dark"
          underline
          className="mb-6 sm:mb-8"
        />

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {/* SINISTRA */}
          <div className="md:col-span-7 min-w-0">
            {/* Timeline desktop */}
            <ol className="relative hidden md:block pl-7">
              <span className="pointer-events-none absolute left-[10px] top-0 h-full w-[2px] rounded bg-white/15" />
              {STEPS.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.04 }}
                  className="relative mb-6 last:mb-0"
                >
                  <span className="absolute left-0 top-1 block h-4 w-4 rounded-full border border-[rgba(201,168,110,.55)] bg-[rgba(201,168,110,.20)] shadow-[0_0_0_2px_rgba(11,20,46,.75)]" />
                  <div className="flex items-start gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-[rgba(201,168,110,.45)] bg-[rgba(201,168,110,.18)] text-[var(--gold)]" aria-hidden>
                      <s.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white">{s.title}</h3>
                      <p className="mt-1 text-[0.98rem] leading-snug text-white/80">{s.desc}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* MOBILE: carosello come lo slider “buono” */}
            <div className="md:hidden -mx-4 px-4">
              <div
                ref={scrollerRef}
                role="region"
                aria-label="Processo di candidatura (scorri in orizzontale)"
                tabIndex={0}
                onWheel={onWheel}
                onKeyDown={onKeyDown}
                className="overflow-x-auto pb-2 focus:outline-none"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <motion.div
                  ref={trackRef}
                  drag={dragEnabled ? "x" : false}
                  dragConstraints={scrollerRef}
                  dragElastic={0.075}
                  dragMomentum
                  className="flex gap-6 snap-x snap-mandatory"
                  style={{ scrollSnapType: "x mandatory" }}
                >
                  {STEPS.map((s, i) => (
                    <motion.article
                      key={s.title}
                      data-card
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.6 }}
                      onClick={(e) => {
                        const scroller = scrollerRef.current;
                        const el = e.currentTarget; // ✅ niente TypeScript
                        if (!scroller || !el) return;
                        const scRect = scroller.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const current = scroller.scrollLeft;
                        const delta = (elRect.left - scRect.left) - (scRect.width - elRect.width) / 2;
                        scroller.scrollTo({ left: current + delta, behavior: "smooth" });
                      }}
                      className="
                        snap-center
                        min-w-[94%] xs:min-w-[90%] sm:min-w-[78%]
                        rounded-2xl border border-white/10 bg-white/[.05] p-4
                        shadow-[0_10px_22px_rgba(0,0,0,.25),0_10px_22px_rgba(201,168,110,.10)]
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-7 w-7 place-items-center rounded-lg border border-[rgba(201,168,110,.45)] bg-[rgba(201,168,110,.18)] text-[var(--gold)]" aria-hidden>
                          <s.icon className="h-4 w-4" />
                        </span>
                        <h3 className="font-semibold text-white">{s.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-white/80">{s.desc}</p>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* DESTRA: Talent Pool */}
          <aside className="md:col-span-5 min-w-0 w-full">
            <div
              className="
                w-full max-w-full min-w-0
                rounded-2xl border border-white/10 bg-white/[.05]
                p-4 sm:p-5
                shadow-[0_10px_22px_rgba(0,0,0,.25),0_10px_22px_rgba(201,168,110,.10)]
                md:sticky
              "
              style={{ top: "calc(var(--header-h,64px) + 24px)" }}
            >
              <div className="text-[11px] uppercase tracking-[.22em] text-white/60">Talent Pool</div>
              <h4 className="mt-1 text-xl font-semibold text-white">Inserimento nel bacino profili</h4>
              <p className="mt-2 text-white/80">
                Se il timing non è immediato, entri nel nostro <b>talent pool</b>: allineiamo obiettivi e possibilità su step successivi.
                Ricevi aggiornamenti quando si apre l’opportunità giusta.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <ButtonGold href="/carriere/candidatura" withArrow>Candidati ora</ButtonGold>
                <ButtonGhost href="#areas">Vedi aree</ButtonGhost>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
