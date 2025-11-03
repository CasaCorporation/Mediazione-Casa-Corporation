// components/carriere/strumenti/section/Integrations.jsx
"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";

const INTS = [
  { k:"gmail",   label:"Gmail / IMAP", hint:"Email & log azioni" },
  { k:"gcal",    label:"Google Calendar", hint:"Appuntamenti & reminder" },
  { k:"wa",      label:"WhatsApp Business", hint:"Contatti e template" },
  { k:"meta",    label:"Meta Ads", hint:"Campagne & lead" },
  { k:"google",  label:"Google Ads", hint:"Campagne & conversioni" },
  { k:"portali", label:"Portali immobiliari", hint:"Sync annunci" },
  { k:"drive",   label:"Drive/Docs", hint:"Documenti e versioni" },
  { k:"analytics",label:"Analytics", hint:"KPI & eventi" },
];

export default function Integrations(){
  return (
    <section id="integrazioni" aria-labelledby="integrazioni-title" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      {/* filigrana leggera */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[.08]" style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 10px)" }} />
        <div className="absolute -top-12 left-1/2 h-48 w-[70%] -translate-x-1/2 blur-3xl opacity-60"
             style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(29,45,94,.35), transparent 60%)" }} />
      </div>

      <div className="container">
        <SectionHeader
          id="integrazioni-title"
          title="Collega ciò che già usi"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/85">
            Collegamenti nativi e connettori standard per sincronizzare dati e operatività senza colli di bottiglia.
          </SectionP>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {INTS.map(i => (
            <div key={i.k} className="rounded-2xl p-5"
                 style={{ background:"var(--glass-bg, rgba(255,255,255,.06))", border:"1px solid var(--glass-stroke, rgba(255,255,255,.12))" }}>
              <div className="font-semibold">{i.label}</div>
              <div className="text-xs text-white/70 mt-1">{i.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
