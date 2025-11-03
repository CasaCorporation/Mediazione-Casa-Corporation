// components/carriere/collaborazioni/section/FAQ.jsx
"use client";

import React from "react";
import SectionHeader from "@/common/section/SectionHeader";

const QA = [
  { q: "Ci sono costi di accreditamento?", a: "No. L’accesso è gratuito. Il compenso dipende dal modello scelto (referral, revenue share, progetto, ecc.) ed è definito prima dell’avvio." },
  { q: "Posso lavorare da remoto?", a: "Sì. Alcuni incarichi possono richiedere presenza on-site; in quel caso lo specifichiamo in fase di match." },
  { q: "Cosa devo inviare per candidarmi?", a: "Presentazione sintetica, portfolio essenziale, listino base e aree di interesse o territoriali. Eventuali certificazioni aiutano la valutazione." },
  { q: "Come gestite KPI e SLA?", a: "Concordiamo indicatori e tempi a inizio progetto. Usiamo strumenti proprietari e report periodici per monitoraggio e retrospettive." },
  { q: "Come avviene il pagamento?", a: "Tramite fatturazione regolare secondo il modello concordato (milestone, a progetto, T&M, revenue share). Scadenze chiare nel contratto quadro." },
  { q: "Come vengono distribuiti gli incarichi?", a: "In base a skill, settore, capacità produttiva e disponibilità. Il match è sempre ragionato e misurabile sui risultati." },
];

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHeader
          id="faq"
          title="Domande frequenti"
          tone="dark"
          size="lg"
          className="mb-6"
        />

        <div className="faq">
          {QA.map((item, i) => (
            <details key={i} className="item">
              <summary className="q">
                <span>{item.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" className="chev" aria-hidden>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </summary>
              <div className="a">{item.a}</div>
            </details>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section { padding: 48px 0; }
        .container { width: min(880px, 92%); margin: 0 auto; }

        .faq { display:grid; gap:10px; }
        .item {
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.02));
          overflow: hidden;
        }
        .q {
          cursor: pointer; user-select: none;
          padding: 14px 16px; display:flex; align-items:center; justify-content:space-between;
          font-weight: 700; letter-spacing: -.01em; color:#fff;
        }
        .chev { transition: transform .24s ease; opacity: .9; }
        .item[open] .chev { transform: rotate(180deg); }

        .a { padding: 0 16px 14px 16px; color: color-mix(in oklab, white 88%, black 12%); line-height: 1.6; font-size: 14px; }
      `}</style>
    </section>
  );
}
