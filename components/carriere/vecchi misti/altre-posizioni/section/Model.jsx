// components/carriere/altre-posizioni/section/Model.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { Laptop2, Network, GaugeCircle } from "lucide-react";

export default function Model(){
  const tiles = [
    {
      icon: Laptop2,
      title: "Modello di lavoro",
      desc: "Ibrido / remoto con rituali chiari. Focus time, review settimanali, board per priorità e sprint.",
      actions: [{ type: "gold", label: "Invia CV", href: "/carriere/candidatura" }],
    },
    {
      icon: Network,
      title: "Stack & Tooling",
      desc: "Suite proprietaria + strumenti di settore. Tracking, versioning e audit by-design.",
      actions: [{ type: "ghost", label: "Vedi overview", href: "#overview" }],
    },
    {
      icon: GaugeCircle,
      title: "KPI & Crescita",
      desc: "Obiettivi oggettivi, coaching e percorsi di responsabilità progressiva.",
      actions: [{ type: "ghost", label: "Processo", href: "#process" }],
    },
  ];

  const chips = ["Focus time", "Board & Sprint", "Code review", "Playbook", "Audit", "Versioning"];

  return (
    <section id="model" className="py-18 sm:py-20">
      <div className="container">
        <SectionHeader
          title="Come lavoriamo: chiaro, misurabile, sostenibile"
          size="lg"
          tone="dark"
          underline
          className="mb-6 sm:mb-8"
        />

        {/* Ribbon chips — mobile first, orizzontale fluido, niente “storpiati” */}
        <div className="ribbon">
          <div className="ribbonMask" aria-hidden />
          <div
            className="ribbonTrack"
            role="list"
            aria-label="Pillole di metodo (scorri in orizzontale)"
          >
            {chips.map((c) => (
              <span key={c} role="listitem" className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {tiles.map((t, i) => <Tile key={t.title} index={i} {...t} />)}
        </div>

        <SectionP size="sm" className="mt-6 text-white/70">
          *Meno riunioni, più output. Metriche chiare per misurare il valore.
        </SectionP>
      </div>

      <style jsx>{`
        /* -------- Ribbon -------- */
        .ribbon{
          position: relative;
          margin: 0 -16px 18px;        /* allarga a bordo su mobile */
        }
        @media (min-width: 768px){
          .ribbon{ margin: 0 0 20px; }
        }
        .ribbonTrack{
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 2px 16px 6px;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
          overscroll-behavior-x: contain;
          scrollbar-width: none;  /* Firefox */
        }
        .ribbonTrack::-webkit-scrollbar{ display: none; } /* WebKit */
        /* edge-fade per indicare scroll */
        .ribbonMask{
          pointer-events:none; position:absolute; inset:0;
          -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
          background: transparent;
        }
        .chip{
          flex: 0 0 auto;            /* 👈 non comprimere */
          display: inline-flex;
          align-items: center;
          height: 34px;              /* 👈 altezza fissa = niente distorsioni */
          padding: 0 .7rem;
          border-radius: 999px;
          white-space: nowrap;       /* 👈 no wrap */
          line-height: 1;            /* 👈 testo centrato verticalmente */
          font-size: .85rem;
          color: #fff;
          border: 1px solid rgba(201,168,110,.35);
          background: rgba(201,168,110,.18);
          box-shadow: 0 1px 0 rgba(0,0,0,.15) inset;
          scroll-snap-align: start;
          transition: transform .14s ease, border-color .14s ease;
        }
        .chip:active{ transform: scale(.98); border-color: color-mix(in oklab, var(--gold) 55%, #000 45%); }

        /* -------- Tile -------- */
        .card{
          border-radius:18px;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03));
          border:1px solid rgba(255,255,255,.10);
          box-shadow:0 10px 28px rgba(0,0,0,.28), 0 10px 22px rgba(201,168,110,.10);
          transition: transform .16s ease, border-color .16s ease;
          min-height: 210px;         /* stabilità layout */
        }
        .card:hover{ transform: translateY(-3px); border-color: color-mix(in oklab, var(--gold) 55%, #000 45%); }
        .iBox{
          display:inline-grid; place-items:center; width:28px; height:28px; border-radius:8px;
          background: color-mix(in oklab, var(--gold) 18%, transparent);
          border:1px solid color-mix(in oklab, var(--gold) 45%, transparent);
          color: var(--gold);
          flex: 0 0 auto;
        }
        .line{ height:1px; width:100%; background:linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent); }
      `}</style>
    </section>
  );
}

function Tile({ icon: Icon, title, desc, actions = [], index = 0 }){
  return (
    <motion.article
      className="card relative flex h-full flex-col overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.04 }}
    >
      <div className="relative z-[1] p-4">
        <div className="flex items-center gap-3">
          <div className="iBox" aria-hidden><Icon className="h-4 w-4" /></div>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-white/75">{desc}</p>
      </div>

      <div className="relative z-[1] mt-auto px-4 pb-4">
        <div className="line" />
        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
          {actions.map((a) =>
            a.type === "gold"
              ? <ButtonGold key={a.label} href={a.href} withArrow>{a.label}</ButtonGold>
              : <ButtonGhost key={a.label} href={a.href}>{a.label}</ButtonGhost>
          )}
        </div>
      </div>
    </motion.article>
  );
}
//commento