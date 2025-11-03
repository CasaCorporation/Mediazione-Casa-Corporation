// components/carriere/collaborazioni/section/Process.jsx
"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { FilePlus2, SearchCheck, PhoneCall, Rocket, CheckCircle2, ClipboardList } from "lucide-react";

export default function Process() {
  const steps = [
    { icon: FilePlus2,     title: "Invio presentazione", desc: "Profilo sintetico, portfolio, listino base e aree di interesse/territoriali." },
    { icon: SearchCheck,   title: "Screening & compliance", desc: "Verifica referenze, capacità produttiva e allineamento legale/contrattuale." },
    { icon: PhoneCall,     title: "Call tecnica", desc: "Definizione KPI, SLA, stack/tools e flusso operativo condiviso." },
    { icon: ClipboardList, title: "Pilot 30–60 giorni", desc: "Progetto test con obiettivi chiari e retrospettiva a fine periodo." },
    { icon: CheckCircle2,  title: "Accreditamento", desc: "Inserimento nel roster, contratti quadro e procedure standard." },
    { icon: Rocket,        title: "Assegnazione incarichi", desc: "Match su settore/complessità e avvio operativo." },
  ];

  return (
    <section id="process" className="section">
      <div className="container">
        <SectionHeader
          id="process"
          title="Processo di accreditamento"
          tone="dark"
          size="lg"
          className="mb-6"
        />
        <SectionP as="p" size="md" className="max-w-3xl mb-8">
          Vogliamo partner affidabili e misurabili. Ecco gli step per diventare fornitori accreditati.
        </SectionP>

        <ol className="timeline">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li key={i} className="row">
              <div className="dot"><span>{i + 1}</span></div>
              <div className="content">
                <div className="top">
                  <div className="ico"><Icon size={16} /></div>
                  <h3 className="h3">{title}</h3>
                </div>
                <p className="desc">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="actions">
          <ButtonGold href="/carriere/candidatura?tipo=collaborazione">Invia proposta</ButtonGold>
          <ButtonGhost href="#faq">Leggi le FAQ</ButtonGhost>
        </div>
      </div>

      <style jsx>{`
        .section { padding: 48px 0; }
        .container { width: min(980px, 92%); margin: 0 auto; }
        .actions { margin-top: 18px; display:flex; gap:10px; flex-wrap:wrap; }

        .timeline{ position:relative; margin: 0; padding: 0; display:grid; gap:14px; counter-reset: step; }
        .row{ position:relative; display:grid; grid-template-columns: 42px 1fr; gap:12px; align-items:flex-start; }
        .dot{
          position: relative; width:42px; height:42px; border-radius:12px; display:grid; place-items:center;
          color: var(--gold);
          background: linear-gradient(180deg, rgba(201,168,110,.20), rgba(201,168,110,.06));
          border: 1px solid rgba(201,168,110,.35);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.05);
          font-weight: 800;
        }
        .content{ position:relative; padding: 10px 12px; border-radius: 14px; border: 1px solid rgba(255,255,255,.08);
          background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02)); }
        .top{ display:flex; align-items:center; gap:8px; }
        .ico{ width:28px; height:28px; display:grid; place-items:center; border-radius: 8px; background: rgba(255,255,255,.06); }
        .h3{ font-weight:800; letter-spacing:-.01em; font-size: 16px; color:#fff; }
        .desc{ margin-top:4px; color: color-mix(in oklab, white 88%, black 12%); line-height:1.6; font-size: 14px; }
      `}</style>
    </section>
  );
}
