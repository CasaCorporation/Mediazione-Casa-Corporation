// components/carriere/metodo/section/Timeline.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import {
  Compass, PhoneCall, CalendarDays, Gauge, FileCheck2, Megaphone,
  Users, Handshake, FileSignature, CheckCircle2
} from "lucide-react";

/**
 * TIMELINE OPERATIVA
 * - 10 fasi, mobile-first, con micro-UI “Software usato”
 * - Enfasi su valutazioni precise e workflow documentale
 */

export default function Timeline(){
  const steps = [
    { icon: Compass,       title: "Target & territorio",     desc: "Focus su micro-zone ad alto potenziale. Dati storici e domanda attesa." , tool: "Super Dashboard • Mappe" },
    { icon: PhoneCall,     title: "Lead & pre-qualifica",    desc: "Raccolta contatti da portali e campagne. Verifica preliminare esigenze.", tool: "Segreteria • CRM" },
    { icon: CalendarDays,  title: "Agenda & appuntamenti",   desc: "Calendario condiviso e reminder automatici. Nessuna perdita di opportunità.", tool: "Scheduler • Notifiche" },
    { icon: Gauge,         title: "Valutazione di precisione", desc: "Stima basata su OMI, comparabili e stato immobile. Range realistico.", tool: "Valuation Engine" },
    { icon: FileCheck2,    title: "Incarico & documenti",    desc: "Checklist non aggirabile: privacy, antiriciclaggio, deleghe, allegati.", tool: "Document Check" },
    { icon: Megaphone,     title: "Pubblicazione & adv",     desc: "Annunci ottimizzati e campagne coordinate. Copertura e qualità lead.", tool: "Portali • Adv Studio" },
    { icon: Users,         title: "Visite & follow-up",      desc: "Report visite, feedback e priorità. Nurturing automatico.", tool: "Pipeline • Template" },
    { icon: Handshake,     title: "Negoziazione guidata",    desc: "Range di trattativa e scenari. Argomentazioni basate sui dati.", tool: "Deal Room" },
    { icon: FileSignature, title: "Proposta & preliminare",  desc: "Generazione documenti, firma e archiviazione. Riduzione errori.", tool: "e-Signature • Archive" },
    { icon: CheckCircle2,  title: "Rogito & post-vendita",   desc: "Consegna, checklist finale e recensioni. Referral e retention.", tool: "Close Kit • Survey" },
  ];

  return (
    <section aria-labelledby="metodo-fasi" className="relative py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          id="metodo-fasi"
          title="Le fasi operative — dal contatto al rogito"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/90">
            Il cuore del metodo è <b>l’operatività</b>: passi chiari, strumenti dedicati e controlli che impediscono errori. "
            La valutazione accurata anticipa problemi e accelera ogni trattativa.
          </SectionP>
        </div>

        {/* Timeline verticale responsive */}
        <ol className="relative mx-auto max-w-4xl border-l border-white/12 pl-5 sm:pl-6">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.24) }}
              className="relative mb-7 last:mb-0"
            >
              {/* Bullet */}
              <div className="absolute -left-[11px] top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--gold)]/80 ring-2 ring-[color:var(--brand-dark)]">
                <s.icon className="h-3 w-3 text-[var(--brand-dark)]" />
              </div>

              {/* Card */}
              <div className="rounded-xl bg-white/6 p-4 ring-1 ring-white/10" style={{ boxShadow: "0 10px 26px rgba(0,0,0,.26)" }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-[16px] font-semibold text-white">{s.title}</h3>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-2.5 py-1 text-[11px] text-white/88 ring-1 ring-white/12">
                    {s.tool}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/85">{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
