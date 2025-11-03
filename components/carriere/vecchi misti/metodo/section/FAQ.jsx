// components/carriere/metodo/section/FAQ.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ChevronDown } from "lucide-react";

/**
 * FAQ METODO
 * - 8 Q&A mirate su libertà, formazione, supporto, valutazioni e tutela
 * - Accordion leggero (senza stato condiviso complesso)
 */

const ITEMS = [
  {
    q: "Posso lavorare in smart working?",
    a: "Sì. Il metodo nasce per garantire libertà: obiettivi chiari, pipeline trasparente e strumenti accessibili ovunque. Conta il risultato, non la presenza.",
  },
  {
    q: "Come funziona la tutela legale?",
    a: "Ogni pratica passa da checklist obbligatorie: privacy, antiriciclaggio, contratti e allegati. Documenti tracciati, firma digitale e archiviazione con log.",
  },
  {
    q: "Cos’è la Super Dashboard?",
    a: "È il centro di comando: leads, agenda, pipeline, documenti e KPI. Suggerisce priorità e avvisa quando serve agire.",
  },
  {
    q: "Quanto sono affidabili le valutazioni?",
    a: "Usiamo dati OMI, comparabili e stato dell’immobile. Le stime si muovono in un range realistico con un delta medio contenuto.",
  },
  {
    q: "Chi gestisce marketing e annunci?",
    a: "Campagne e portali sono gestiti centralmente. Tu ti concentri su acquisire e vendere; noi alimentiamo il flusso di opportunità.",
  },
  {
    q: "Come misurate le performance?",
    a: "Tracciamo conversioni, tempi di ciclo, qualità delle visite e coerenza prezzo/mercato. Report e coaching trasformano i dati in azione.",
  },
  {
    q: "Ci sono costi fissi?",
    a: "No: il modello prevede zero costi fissi a carico dell’agente. Provvigioni e premi sono chiari e misurabili.",
  },
  {
    q: "È previsto un percorso per chi è alla prima esperienza?",
    a: "Sì. Onboarding guidato, training pratico e affiancamento su casi reali, con milestone di competenza progressive.",
  },
];

export default function FAQ(){
  return (
    <section aria-labelledby="metodo-faq" className="relative py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          id="metodo-faq"
          title="Domande frequenti"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/90">
            Risposte rapide sui pilastri del metodo, sugli strumenti e sulle tutele che mettiamo a disposizione.
          </SectionP>
        </div>

        <ul className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl ring-1 ring-white/10">
          {ITEMS.map((item, i) => (
            <AccordionItem key={item.q} i={i} q={item.q} a={item.a} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function AccordionItem({ i, q, a }){
  const [open, setOpen] = React.useState(false);
  return (
    <li className="bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
        aria-expanded={open}
        aria-controls={`faq-panel-${i}`}
      >
        <span className="text-white/95">{q}</span>
        <ChevronDown className={"h-5 w-5 transition-transform " + (open ? "rotate-180" : "")} />
      </button>
      <motion.div
        id={`faq-panel-${i}`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4 text-sm text-white/85 sm:px-5">{a}</div>
      </motion.div>
    </li>
  );
}
