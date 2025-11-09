"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { formatEUR, PROVVIGIONE_BASE } from "@/components/carriere/calcolatore/data";

export default function Scenarios(){
  /* Solo Senior — tre casi tipici */
  const scenarios = [
    { title: "Senior Top 1", personal: 120000, company: 2500000, share: 0.05, note:"1° posto (5%)" },
    { title: "Senior Top 2", personal: 90000,  company: 1500000, share: 0.03, note:"2° posto (3%)" },
    { title: "Senior (fuori classifica)", personal: 45000, company: 1200000, share: 0.00, note:"Fuori Top 3" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader kicker="Scenari" title="Esempi rapidi (Senior)">
          <SectionP>Ordini di grandezza realistici per il trimestre.</SectionP>
        </SectionHeader>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {scenarios.map((s, i) => {
            const provv  = Math.round(s.personal * PROVVIGIONE_BASE);
            const premio = Math.round(s.company * s.share);
            const totale = provv + premio;
            const pct    = Math.round((totale / s.personal) * 100);

            return (
              <article
                key={i}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 relative overflow-hidden"
              >
                {/* decorative glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 right-0 h-36 w-36 rounded-full blur-2xl opacity-40"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%, var(--gold), transparent 70%)" }}
                />
                <div className="text-lg font-semibold">{s.title}</div>
                <div className="text-white/70 text-sm">{s.note}</div>

                <ul className="mt-4 space-y-2 text-sm">
                  <li><b>Fatturato personale:</b> {formatEUR(s.personal)}</li>
                  <li><b>Fatturato aziendale:</b> {formatEUR(s.company)}</li>
                  <li><b>Provvigione 60%:</b> {formatEUR(provv)}</li>
                  <li><b>Premio gara:</b> {s.share>0 ? formatEUR(premio) : "—"}</li>
                </ul>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Badge label="Totale" value={formatEUR(totale)} />
                  <Badge label="% sul fatturato" value={`${pct}%`} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Badge({label, value}){
  return (
    <div className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 text-center">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="tabular-nums font-semibold mt-1">{value}</div>
    </div>
  );
}
