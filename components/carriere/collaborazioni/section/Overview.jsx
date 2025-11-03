// components/carriere/collaborazioni/section/Overview.jsx
"use client";

import React, { useEffect, useRef } from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { Users, Briefcase, ShieldCheck, BarChart2, FileText, MapPin } from "lucide-react";

export default function Overview() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("inview"));
    }, { threshold: 0.2 });
    root.querySelectorAll("[data-card]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const bullets = [
    { icon: Users,      title: "Chi cerchiamo", desc: "Freelance, studi e agenzie con esperienza reale e referenze verificabili." },
    { icon: FileText,   title: "Candidatura",   desc: "Presentazione essenziale + listino base + aree di interesse." },
    { icon: BarChart2,  title: "KPI & SLA",     desc: "Obiettivi misurabili e tempi concordati prima dell’avvio." },
    { icon: ShieldCheck,title: "Governance",    desc: "Contratti chiari, compliance e responsabilità definite." },
    { icon: Briefcase,  title: "Match su progetto", desc: "Assegniamo gli incarichi in base a skill, settore e complessità." },
    { icon: MapPin,     title: "Copertura",     desc: "Remoto o on-site: operiamo in tutta Italia." },
  ];

  return (
    <section id="overview" ref={ref} className="section">
      <div className="container">
        <SectionHeader
          id="overview"
          title="Collaborazioni accreditate, risultati misurabili"
          tone="dark"
          size="lg"
          className="mb-6"
        />
        <SectionP as="p" size="md" className="max-w-3xl mb-8">
          Il nostro programma partner integra professionisti e strutture verticali all’interno dei progetti.
          Selezione meritocratica, gestione tramite KPI/SLA, compensi trasparenti.
        </SectionP>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bullets.map(({ icon: Icon, title, desc }, i) => (
            <article key={i} data-card className="card group">
              <div className="inner">
                <div className="ico"><Icon size={18} /></div>
                <h3 className="h3">{title}</h3>
                <p className="desc">{desc}</p>
                <div className="shine" />
              </div>
            </article>
          ))}
        </div>

        <div className="actions">
          <ButtonGold href="#process">Come funziona</ButtonGold>
          <ButtonGhost href="/carriere/candidatura?tipo=collaborazione">Invia proposta</ButtonGhost>
        </div>
      </div>

      <style jsx>{`
        .section { padding: 48px 0; }
        .container { width: min(1180px, 92%); margin: 0 auto; }
        .actions { margin-top: 18px; display:flex; gap:10px; flex-wrap:wrap; }

        .card {
          position: relative;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
          border: 1px solid rgba(255,255,255,.08);
          overflow: hidden;
          isolation: isolate;
          transition: transform .25s ease;
        }
        .card.inview { transform: translateY(0); opacity: 1; }
        .card .inner { position: relative; padding: 18px 16px 16px; }
        .ico { width: 34px; height: 34px; display:grid; place-items:center; border-radius: 10px;
               background: linear-gradient(180deg, rgba(201,168,110,.18), rgba(201,168,110,.08)); color: var(--gold); }
        .h3 { margin-top: 10px; font-weight: 800; letter-spacing: -.01em; font-size: clamp(17px, 1.6vw, 20px); color:#fff; }
        .desc { margin-top: 6px; color: color-mix(in oklab, white 88%, black 12%); line-height: 1.6; font-size: 14px; }

        .shine { position:absolute; inset:-1px; border-radius: 16px; pointer-events:none;
          background: radial-gradient(250px 180px at var(--mx,120%) var(--my,120%), rgba(201,168,110,.16), transparent 60%); opacity:.0;
          transition: opacity .25s ease; }
        .card:hover .shine{ opacity:.9; }
        .card:hover{ transform: translateY(-2px); }

        [data-card] { opacity: 0; transform: translateY(8px); transition: opacity .24s ease, transform .24s ease; }
        [data-card].inview { opacity: 1; transform: translateY(0); }

        .card :global(svg){ transition: transform .25s ease; }
        .card:hover :global(svg){ transform: translateY(-1px); }
      `}</style>
    </section>
  );
}
