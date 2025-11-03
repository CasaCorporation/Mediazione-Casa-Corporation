// components/carriere/strumenti/section/Security.jsx
"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";

export default function Security(){
  const ROWS = [
    ["Permessi & ruoli", "Granulari su contatti, documenti e azioni"],
    ["Log & audit trail", "Tracciamento completo e immutabile"],
    ["Backup", "Snapshot giornalieri e retention programmata"],
    ["Cifratura", "Dati a riposo e in transito"],
    ["Privacy", "Principio di minimizzazione & data masking"],
  ];

  return (
    <section id="sicurezza" aria-labelledby="sec-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="sec-title"
          title="Protezione per processo e per dati"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/85">
            Sicurezza integrata nello stack: accessi, log, backup e privacy by design.
          </SectionP>
        </div>

        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            {ROWS.map(([k,v]) => (
              <div key={k} className="flex items-start gap-3">
                <dt className="text-white/70 min-w-[180px]">{k}</dt>
                <dd className="text-white/85">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
