// components/carriere/collaborazioni/section/Types.jsx
"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold } from "@/common/section/Buttons";
import { Handshake, Wallet, Factory, Layers, Crown, Building2 } from "lucide-react";

export default function Types() {
  const models = [
    {
      icon: Handshake,
      badge: "Referral",
      title: "Segnalazione qualificata",
      points: [
        "Porti un’opportunità e resti informato sullo stato",
        "Compenso a successo con percentuale concordata",
        "Zero gestione operativa",
      ],
      best: "Networker, studi con deal flow",
    },
    {
      icon: Wallet,
      badge: "Revenue Share",
      title: "Multi-fornitore con ripartizione",
      points: [
        "KPI e SLA per ciascun fornitore",
        "Ripartizione su milestone o fasi",
        "Ideale per progetti cross-funzione",
      ],
      best: "Agenzie, team verticali",
    },
    {
      icon: Layers,
      badge: "White Label",
      title: "Esecuzione in marca privata",
      points: [
        "Processi e standard Casa Corporation",
        "Documentazione e QA condivisi",
        "Reporting dedicato",
      ],
      best: "Studi strutturati",
    },
    {
      icon: Factory,
      badge: "Per progetto",
      title: "Forfait / T&M",
      points: [
        "Ambito e deliverable definiti a inizio progetto",
        "Time & Material in alternativa",
        "Rateizzazioni su traguardi",
      ],
      best: "Freelance specialist",
    },
    {
      icon: Crown,
      badge: "Partner strategico",
      title: "Committenza continuativa",
      points: [
        "Roadmap condivisa e obiettivi trimestrali",
        "Accesso prioritario a progetti complessi",
        "Allineamento budget/risorse",
      ],
      best: "Leader verticali",
    },
    {
      icon: Building2,
      badge: "Locale / On-site",
      title: "Presidio territoriale",
      points: [
        "Attività in presenza su area definita",
        "Coordinamento con team centrale",
        "Reportistica standardizzata",
      ],
      best: "Studi territoriali",
    },
  ];

  return (
    <section id="types" className="section">
      <div className="container">
        <SectionHeader
          id="types"
          title="Modelli di collaborazione disponibili"
          tone="dark"
          size="lg"
          className="mb-6"
        />
        <SectionP as="p" size="md" className="max-w-3xl mb-8">
          Scegli il modello più adatto al tuo setup. Definiamo KPI, SLA e modalità di fatturazione
          prima dell’avvio, con governance unica e trasparente.
        </SectionP>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m, i) => (
            <article key={i} className="card">
              <div className="badge"><m.icon size={14} /> {m.badge}</div>
              <h3 className="h3">{m.title}</h3>
              <ul className="list">
                {m.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
              <div className="best">Ideale per: <strong>{m.best}</strong></div>
            </article>
          ))}
        </div>

        <div className="actions">
          <ButtonGold href="/carriere/candidatura?tipo=collaborazione">Invia proposta</ButtonGold>
        </div>
      </div>

      <style jsx>{`
        .section { padding: 48px 0; }
        .container { width: min(1180px, 92%); margin: 0 auto; }
        .actions { margin-top: 18px; }

        .card{
          position: relative;
          padding: 18px 16px 16px;
          border-radius: 16px;
          background:
            linear-gradient(180deg, rgba(29,45,94,.34), transparent 70%),
            rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.04);
        }

        .badge{
          display:inline-flex; align-items:center; gap:6px;
          font-size: 12px; padding: 6px 9px; border-radius: 999px;
          background: linear-gradient(180deg, rgba(201,168,110,.22), rgba(201,168,110,.10));
          border: 1px solid rgba(201,168,110,.35);
          color: var(--gold);
        }
        .h3{ margin-top:10px; font-weight:800; letter-spacing:-.01em; font-size: clamp(17px, 1.6vw, 20px); color:#fff; }
        .list{ margin:10px 0 6px 0; display:grid; gap:6px; }
        .list li{ position:relative; padding-left:16px; color:color-mix(in oklab, white 88%, black 12%); font-size:14px; line-height:1.6; }
        .list li::before{ content:""; position:absolute; left:0; top:.65em; width:7px; height:7px; border-radius:2px; background: var(--gold); opacity:.8; }
        .best{ margin-top: 8px; font-size:13px; color: color-mix(in oklab, white 82%, black 18%); }
      `}</style>
    </section>
  );
}
