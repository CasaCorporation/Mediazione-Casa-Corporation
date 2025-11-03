// components/carriere/back-office/section/Compensation.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { Wallet, HandCoins, ShieldCheck } from "lucide-react";

export default function Compensation() {
  return (
    <section id="compensi" aria-labelledby="bo-pay-title" className="relative py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          id="bo-pay-title"
          title="Retribuzione — fisso + bonus su vendita"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />

        {/* Intro CENTRATA e bilanciata */}
        <div className="mx-auto mb-6 sm:mb-7 max-w-[74ch] text-center">
          <SectionP className="text-white/85">
            Nel Back Office la retribuzione è composta da una <b>base fissa</b> e da un <b>bonus</b> per ogni immobile venduto.
            Regole semplici, tracciabili e condivise in onboarding. Nessuna “gara”.
          </SectionP>
        </div>

        <CompMatrix />

        <p className="mt-5 rounded-[12px] border border-white/10 bg-white/[.05] p-3 text-[.92rem] text-white/80 text-center">
          * Valori e dettagli vengono condivisi in colloquio in funzione della seniority.
        </p>
      </div>
    </section>
  );
}

/* ====== Mega-card a 3 colonne interne ====== */
function CompMatrix() {
  const cols = [
    {
      icon: Wallet,
      title: "Parte fissa",
      points: [
        "Contratto con base mensile",
        "Stabilità economica",
        "Adeguamenti con la crescita",
      ],
    },
    {
      icon: HandCoins,
      title: "Bonus per vendita",
      points: [
        "Erogato su vendita conclusa",
        "Criteri chiari e registrati",
        "Liquidazione puntuale",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Trasparenza",
      points: [
        "Regole condivise in onboarding",
        "KPI minimi per qualità",
        "Reportistica accessibile",
      ],
    },
  ];

  return (
    <motion.article
      className="matrix"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {/* Header della card: centrato su mobile, bilanciato su desktop */}
      <div className="mxHead">
        <div className="hLeft">
          <div className="hIcon" aria-hidden>
            <HandCoins className="h-5 w-5" />
          </div>
          <div className="hTitle">
            <div className="t1">Schema retributivo Back Office</div>
            <div className="t2">Fisso mensile + bonus per immobile</div>
          </div>
        </div>

        <div className="hChips">
          <Chip>Fisso mensile</Chip>
          <Chip>Bonus vendita</Chip>
          <Chip>Tracciabile</Chip>
        </div>
      </div>

      {/* Colonne interne */}
      <div className="mxGrid">
        {cols.map((c, i) => (
          <MatrixCol key={c.title} {...c} index={i} />
        ))}
      </div>

      <style jsx>{`
        .matrix{
          border-radius:18px;
          padding:14px;
          background:
            linear-gradient(180deg, rgba(16,24,48,.74), rgba(16,24,48,.60)),
            radial-gradient(42% 28% at 10% 0%, rgba(201,168,110,.10), transparent 60%);
          border:1px solid rgba(255,255,255,.14);
          box-shadow:
            0 12px 28px rgba(0,0,0,.30),
            0 0 0 1px rgba(201,168,110,.08) inset;
        }
        .mxHead{
          display:flex; align-items:center; justify-content:space-between; gap:12px;
          padding:4px 4px 10px;
          border-bottom:1px solid rgba(255,255,255,.10);
        }
        .hLeft{ display:flex; align-items:center; gap:10px; min-width:0; }
        .hIcon{
          display:grid; place-items:center; width:38px; height:38px; border-radius:10px;
          color:var(--gold);
          background: color-mix(in oklab, var(--gold) 18%, transparent);
          border:1px solid color-mix(in oklab, var(--gold) 45%, transparent);
          box-shadow:0 8px 18px rgba(0,0,0,.26);
        }
        .t1{ color:#fff; font-weight:700; line-height:1.1; }
        .t2{ color:rgba(255,255,255,.82); font-size:.95rem; }
        .hChips{ display:flex; flex-wrap:wrap; gap:8px; justify-content:flex-end; }

        .mxGrid{
          display:grid; gap:12px; padding-top:12px;
          grid-template-columns:1fr;
        }
        @media (max-width: 767px){
          .mxHead{ flex-direction:column; align-items:center; text-align:center; }
          .hChips{ justify-content:center; }
        }
        @media (min-width: 768px){
          .mxGrid{ grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </motion.article>
  );
}

function MatrixCol({ icon: Icon, title, points = [], index = 0 }) {
  return (
    <motion.div
      className="col"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.24, ease: "easeOut", delay: index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <div className="cHead">
        <span className="cI" aria-hidden>
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="cT">{title}</h3>
      </div>

      <ul className="cList">
        {points.map((p) => (
          <li key={p} className="it">
            <span className="dot" aria-hidden />
            {p}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .col{
          border-radius:14px; height:100%;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03));
          border:1px solid rgba(255,255,255,.10);
          padding:12px;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
          box-shadow:0 8px 20px rgba(0,0,0,.24);
        }
        .col:hover{
          border-color: color-mix(in oklab, var(--gold) 50%, rgba(255,255,255,.22) 50%);
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.035));
          box-shadow:0 10px 24px rgba(0,0,0,.28);
        }
        .cHead{ display:flex; align-items:center; gap:.65rem; }
        .cI{
          display:grid; place-items:center; width:28px; height:28px; border-radius:8px; flex:0 0 auto;
          color:var(--gold);
          background: color-mix(in oklab, var(--gold) 18%, transparent);
          border:1px solid color-mix(in oklab, var(--gold) 45%, transparent);
        }
        .cT{ font-weight:700; color:#fff; }
        .cList{ margin-top:.55rem; display:grid; gap:.4rem; color:rgba(255,255,255,.88); font-size:.98rem; }
        .it{ position:relative; padding-left:1rem; }
        .dot{
          position:absolute; left:0; top:.62rem; width:7px; height:7px; border-radius:999px;
          background: color-mix(in oklab, var(--gold) 82%, white 18%);
        }
      `}</style>
    </motion.div>
  );
}

/* ---- Chip riutilizzabile con micro-hover ---- */
function Chip({ children }) {
  return (
    <motion.span
      className="chip"
      whileHover={{ y: -1, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {children}
      <style jsx>{`
        .chip{
          display:inline-flex; align-items:center; gap:.35rem;
          padding:.4rem .62rem; border-radius:999px; font-size:.82rem; color:#fff;
          background: rgba(201,168,110,.18);
          border:1px solid rgba(201,168,110,.36);
        }
      `}</style>
    </motion.span>
  );
}
