"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { ShieldCheck, Wrench, GraduationCap, ArrowRight } from "lucide-react";

export default function CommonBenefits() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("inview")),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.25 }
    );
    root.querySelectorAll("[data-pillar-card]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--mx", `-1000px`);
    el.style.setProperty("--my", `-1000px`);
  };

  const items = [
    {
      key: "metodo",
      href: "/carriere/metodo",
      icon: ShieldCheck,
      badge: "Metodo",
      title: "Metodo chiaro",
      desc:
        "Dal primo giorno hai una guida operativa: step non aggirabili, verifiche e KPI trasparenti. Ogni passaggio è tracciato.",
      cta: "Vai al Metodo",
    },
    {
      key: "strumenti",
      href: "/carriere/strumenti",
      icon: Wrench,
      badge: "Strumenti",
      title: "Strumenti professionali",
      desc:
        "Portali immobiliari inclusi, materiale brandizzato e software proprietari. Tutto ciò che serve per crescere più in fretta.",
      cta: "Vedi Strumenti",
    },
    {
      key: "formazione",
      href: "/carriere/formazione",
      icon: GraduationCap,
      badge: "Formazione",
      title: "Formazione continua",
      desc:
        "Academy strutturata per ogni livello, affiancamento e percorsi concreti. Impari, applichi, migliori.",
      cta: "Scopri la Formazione",
    },
  ];

  return (
    <section id="benefit-comuni" className="relative py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          title="Pilastri della carriera: metodo, strumenti, formazione"
          size="lg"
          tone="dark"
          underline
          className="mb-6 sm:mb-8"
        />
        <SectionP className="text-center mb-8 sm:mb-10">
          Un percorso che unisce <strong>metodo</strong>, <strong>strumenti reali</strong> e <strong>formazione continua</strong>.
          Zero fronzoli: tutto ciò che ti serve per lavorare bene e crescere.
        </SectionP>

        <div
          ref={rootRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch"
          style={{ alignItems: "stretch" }}
        >
          {items.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={p.key}
                data-pillar-card
                className="pillar opacity-0 translate-y-3 h-full"
                style={{ transitionDelay: `${i * 80}ms` }}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
              >
                {/* bordo edge-lit */}
                <div className="edge" aria-hidden />
                {/* full-card click */}
                <Link href={p.href} className="linkOverlay" aria-label={p.title} />

                <div className="inner">
                  {/* Icona + badge */}
                  <div className="top">
                    <span className="iBox" aria-hidden>
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                    <span className="badge">{p.badge}</span>
                  </div>

                  {/* Titolo + descrizione */}
                  <h3 className="h2">{p.title}</h3>
                  <p className="desc">{p.desc}</p>

                  <div className="divider" aria-hidden />

                  {/* CTA bottom (ancorate) */}
                  <div className="actions">
                    <ButtonGold href={p.href} withArrow={false}>
                      {p.cta}
                    </ButtonGold>
                    <ButtonGhost href={p.href} withArrow={false}>
                      Dettagli <ArrowRight className="inline ml-1 w-4 h-4" />
                    </ButtonGhost>
                  </div>

                  {/* watermark */}
                  <Icon className="wmIcon" aria-hidden />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        [data-pillar-card] {
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.2,.8,.2,1);
          will-change: transform;
        }
        [data-pillar-card].inview { opacity: 1; transform: translateY(0); }

        /* CARD = altezza uniforme */
        .pillar{
          position: relative;
          display: flex;           /* NEW */
          flex-direction: column;  /* NEW */
          height: 100%;            /* NEW */
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          min-height: 300px;
        }
        .inner{
          position: relative;
          flex: 1;                 /* NEW -> riempie tutta l’altezza */
          display: grid;           /* NEW -> struttura bottom-sticky */
          grid-template-rows: auto auto 1fr auto; /* top, title, spacer, CTA */
          row-gap: 10px;
          padding: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
          border-radius: 20px;
          isolation: isolate;
          min-height: 100%;        /* NEW */
        }

        .edge {
          position: absolute; inset: 0; pointer-events: none; border-radius: 20px; padding: 1px;
          background:
            linear-gradient(135deg, rgba(201,168,110,.6), rgba(29,45,94,.45) 55%, rgba(201,168,110,.6));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: .5; transition: opacity .25s ease;
        }
        .pillar:hover .edge { opacity: .85; }

        .inner::after{
          content:""; position:absolute; inset:0; border-radius:20px; pointer-events:none;
          background:
            radial-gradient(220px 220px at var(--mx,-1000px) var(--my,-1000px), rgba(201,168,110,.16), transparent 60%),
            radial-gradient(620px 520px at var(--mx,-1000px) var(--my,-1000px), rgba(29,45,94,.20), transparent 70%);
          opacity: 0; transition: opacity .25s ease;
        }
        .pillar:hover .inner::after { opacity: 1; }

        .top { display:flex; align-items:center; gap:10px; }
        .iBox{
          width: 40px; height: 40px; border-radius: 14px; display:grid; place-items:center;
          color: var(--gold);
          background:
            linear-gradient(var(--brand-dark) 0 0) padding-box,
            linear-gradient(135deg, rgba(201,168,110,.7), rgba(255,255,255,.2)) border-box;
          border: 1px solid transparent;
          box-shadow: 0 6px 20px rgba(201,168,110,.15);
        }
        .badge{
          display:inline-flex; align-items:center; height: 28px; padding: 0 10px; border-radius:999px;
          font-size: 11.5px; font-weight: 700; color: #fff; opacity: .95;
          background: linear-gradient(180deg, rgba(201,168,110,.22), rgba(201,168,110,.10));
          border: 1px solid rgba(201,168,110,.35);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.06), 0 0 12px rgba(201,168,110,.12);
          white-space: nowrap;
        }

        .h2{ margin-top: 6px; font-size: clamp(18px, 1.9vw, 22px); font-weight: 800; letter-spacing: -0.01em; color: #fff; }
        .desc{ font-size: 14px; line-height: 1.6; color: color-mix(in oklab, white 88%, black 12%); }

        .divider{ margin-top: 6px; height:1px; width:100%;
          background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: .55; }

        .actions{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:flex-start; margin-top: 2px; }

        .wmIcon{
          position: absolute; right: 6px; bottom: 8px;
          width: clamp(100px, 26%, 160px); height: auto;
          color: var(--gold); opacity: .09;
          filter: drop-shadow(0 8px 24px rgba(201,168,110,.22));
          pointer-events: none; z-index: 0;
        }

        .linkOverlay{ position:absolute; inset:0; z-index: 1; pointer-events: auto; }
        .inner :is(button, a){ position: relative; z-index: 2; }

        @media (max-width: 640px){ .actions{ justify-content: stretch; } }
        @media (prefers-reduced-motion: reduce){
          [data-pillar-card]{ transition: none !important; }
          .inner::after{ display:none !important; }
          .pillar:hover .inner { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
