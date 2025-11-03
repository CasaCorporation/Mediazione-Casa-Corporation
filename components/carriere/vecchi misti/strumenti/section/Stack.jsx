// components/carriere/strumenti/section/Stack.jsx
"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { Cpu, Boxes, Megaphone, Headphones, Smartphone, BarChart2 } from "lucide-react";

const ITEMS = [
  {
    icon: Cpu,
    title: "CRM proprietario",
    desc: "Gestione contatti, storico azioni e automazioni. Dati centralizzati, zero duplicazioni.",
    points: ["Segmenti & tag", "Attività pianificate", "Permessi & ruoli"],
  },
  {
    icon: Boxes,
    title: "Pipeline & tasking",
    desc: "Fasi non aggirabili, checklist e SLA. Priorità automatiche e reminder intelligenti.",
    points: ["Kanban fasi", "Gate obbligatori", "Alert SLA"],
  },
  {
    icon: Megaphone,
    title: "Annunci & advertising",
    desc: "Pubblicazione coordinata su portali e campagne sponsorizzate con budget controllati.",
    points: ["Portali sincronizzati", "Meta/Google Ads", "Tracciamento lead"],
  },
  {
    icon: Headphones,
    title: "Segreteria operativa",
    desc: "Presa in carico, follow-up e gestione appuntamenti. Script e template ufficiali.",
    points: ["Agenda condivisa", "Script certificati", "Esiti tracciati"],
  },
  {
    icon: Smartphone,
    title: "App & mobilità",
    desc: "Tutto in tasca: contatti, attività, documenti e notifiche push sui cambi stato.",
    points: ["Offline-ready", "Upload documenti", "Note vocali"],
  },
  {
    icon: BarChart2,
    title: "Dashboard KPI",
    desc: "Dati live e storico. Conversioni, tempi, risultati individuali e di team.",
    points: ["Report periodici", "Benchmark interni", "Esportazione CSV"],
  },
];

export default function Stack(){
  return (
    <section id="suite" aria-labelledby="suite-title" className="relative py-16 sm:py-20 md:py-24">
      {/* alias per compatibilità con Hero che ancora usa #stack */}
      <span id="stack" aria-hidden className="block sr-only" />
      <div className="container">
        <SectionHeader
          id="suite-title"
          title="Tutto quello che serve, in un posto"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/85">
            Strumenti progettati per essere usati davvero, ogni giorno. Focus su continuità operativa e misurabilità.
          </SectionP>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({icon:Icon, title, desc, points}) => (
            <article key={title} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-white/90" />
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-white/80 mt-3">{desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {points.map(pt => <li key={pt}>• {pt}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
