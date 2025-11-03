// components/carriere/strumenti/section/AutomationFlows.jsx
"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";

const FLOWS = [
  {
    k:"lead-routing",
    title:"Lead → Assegnazione → Follow-up",
    desc:"Cattura automatica, scoring, assegnazione con SLA e reminder finché non arriva un esito.",
    steps:["Cattura & deduplica","Scoring & assegnazione","Promemoria smart","Esito tracciato"],
  },
  {
    k:"doc-check",
    title:"Documenti → Verifica → Gate",
    desc:"Upload guidato, checklist non aggirabile, doppia verifica e sblocco fase successiva.",
    steps:["Upload guidato","Checklist certificata","Doppia firma","Sblocco fase"],
  },
  {
    k:"ads-loop",
    title:"Annuncio → Campagne → Lead",
    desc:"Pubblicazione su portali, sincronizzazione Ads e tracciamento contatti con ROI.",
    steps:["Pubblicazione portali","Sync Ads","Tracking conversioni","Report ROI"],
  },
];

export default function AutomationFlows(){
  return (
    <section id="flussi" aria-labelledby="flows-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="flows-title"
          title="Flussi che non si dimenticano nulla"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/85">
            Processi guidati con promemoria e controlli: dal primo contatto alla chiusura.
          </SectionP>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {FLOWS.map(f => (
            <article key={f.k} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-white/80 mt-2">{f.desc}</p>
              <ol className="mt-3 space-y-2 text-sm text-white/85">
                {f.steps.map((s, i)=> (
                  <li key={s} className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2">
                    {i+1}. {s}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
