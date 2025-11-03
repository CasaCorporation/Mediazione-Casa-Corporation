"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/common/section/SectionHeader";
import {
  ClipboardCheck,
  CalendarDays,
  FileSpreadsheet,
  UploadCloud,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function Role() {
  const cards = [
    { icon: ClipboardCheck, title: "Pipeline e qualifica", desc: "Ordini, dati e assegnazioni in un posto solo.", points: ["Ordini", "Dati completi", "Assegnazioni chiare"], badge: "Core" },
    { icon: UploadCloud,    title: "Annunci e media",      desc: "Portali e materiali sempre allineati.",         points: ["Bozze approvate", "Versioni salvate", "Immagini coerenti"], badge: "Media" },
    { icon: CalendarDays,   title: "Agenda e scadenze",    desc: "Appuntamenti e priorità senza intoppi.",        points: ["Calendario condiviso", "SLA chiari", "Alert puntuali"], badge: "Tempo" },
    { icon: FileSpreadsheet,title: "Documenti",            desc: "Modelli ufficiali e controlli rapidi.",         points: ["Modelli aggiornati", "Check automatici", "Archivio unico"], badge: "Doc" },
    { icon: ShieldCheck,    title: "Controlli qualità",    desc: "Passaggi obbligatori e tracciabilità.",         points: ["Gate non aggirabili", "Checklist breve", "Audit trail"], badge: "Qualità" },
    { icon: BarChart3,      title: "Report e KPI",         desc: "Numeri chiari su tempi e avanzamento.",         points: ["KPI realtime", "Tempi medi", "Dashboard direzione"], badge: "Insight" },
  ];

  return (
    <section id="ruoli" aria-labelledby="bo-role-title" className="relative py-18 sm:py-20">
      <div className="container">
        <SectionHeader
          id="bo-role-title"
          title="Cosa farai — responsabilità principali"
          size="lg"
          tone="dark"
          underline
          className="mb-8 sm:mb-10"
        />

        {/* Griglia: carte alla stessa altezza, niente overlay assoluti invasivi */}
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <RoleCard key={c.title} index={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card ---------------- */
function RoleCard({ icon: Icon, title, desc, points = [], badge, index = 0 }) {
  return (
    <motion.article
      className="card relative flex h-full flex-col"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.26, ease: "easeOut", delay: index * 0.04 }}
    >
      {/* Header compatto e SOLIDO (più contrasto) */}
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="iRing" aria-hidden>
              <div className="iBox">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <h3 className="font-semibold text-white">{title}</h3>
          </div>
          {badge ? <span className="tag">{badge}</span> : null}
        </div>
        <p className="mt-1 text-[0.94rem] text-white/85">{desc}</p>
      </div>

      {/* Punti — min-height identica per allineare le righe */}
      {!!points.length && (
        <ul className="px-4 mt-3 grid gap-1.5 text-sm text-white/88 min-h-[84px]">
          {points.map((p) => (
            <li key={p} className="relative pl-4">
              <span className="dot" />
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* Footer “respiro” */}
      <div className="mt-auto px-4 pb-4">
        <div className="sep" aria-hidden />
      </div>

      <style jsx>{`
        .card{
          /* visibilità ↑: piastra più scura + bordo più definito */
          border-radius:18px;
          background:
            linear-gradient(180deg, rgba(16,24,48,.65), rgba(16,24,48,.58)),
            radial-gradient(40% 24% at 0% 0%, rgba(201,168,110,.10), transparent 60%);
          border:1px solid rgba(255,255,255,.14);
          box-shadow:
            0 10px 26px rgba(0,0,0,.32),
            0 0 0 1px rgba(201,168,110,.08) inset;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
          will-change: transform;
          transform: translateZ(0); /* GPU */
          backface-visibility: hidden;
          contain: paint; /* riduce reflow dei vicini */
        }
        .card:hover{
          transform: translate3d(0,-2px,0);
          border-color: color-mix(in oklab, var(--gold) 50%, rgba(255,255,255,.22) 50%);
          box-shadow:
            0 14px 32px rgba(0,0,0,.36),
            0 0 0 1px rgba(201,168,110,.12) inset;
          background:
            linear-gradient(180deg, rgba(16,24,48,.70), rgba(16,24,48,.62)),
            radial-gradient(40% 24% at 0% 0%, rgba(201,168,110,.12), transparent 60%);
        }

        .iRing{
          position:relative; width:40px; height:40px; border-radius:12px; flex:0 0 auto;
          display:grid; place-items:center;
          background: radial-gradient(closest-side, rgba(201,168,110,.20), transparent);
          border:1px solid color-mix(in oklab, var(--gold) 50%, transparent);
        }
        .iBox{
          width:30px; height:30px; border-radius:9px; display:grid; place-items:center; color:var(--gold);
          background: color-mix(in oklab, var(--gold) 20%, transparent);
          border: 1px solid color-mix(in oklab, var(--gold) 56%, transparent);
          transition: transform .18s ease;
          transform: translateZ(0);
        }
        .card:hover .iBox{ transform: translateY(-1px) scale(1.02); }

        .tag{
          height:26px; padding:0 10px; border-radius:999px;
          display:inline-flex; align-items:center; font-weight:700; font-size:12px;
          color: color-mix(in oklab, var(--gold) 86%, #fff 14%);
          background: rgba(0,0,0,.28); border: 1px solid rgba(255,255,255,.16);
          backdrop-filter: blur(6px);
        }

        .dot{
          position:absolute; left:0; top:0.62rem; width:6px; height:6px; border-radius:999px;
          background: color-mix(in oklab, var(--gold) 80%, white 20%);
        }

        .sep{
          height:1px; width:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.16), transparent);
          opacity:.55;
        }

        @media (prefers-reduced-motion: reduce) {
          .card:hover{ transform:none; }
          .iBox{ transition:none; }
        }
      `}</style>
    </motion.article>
  );
}
