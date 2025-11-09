// components/carriere/metodo/section/Proof.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ShieldCheck, FileCheck2, Scale, Database, LineChart, Lock, ClipboardList, BarChart2 } from "lucide-react";

/**
 * PROOF / EVIDENCE & CONTROLLI
 * - Due blocchi principali: Datafication & Coaching / Legal Shield
 * - Mini metriche e “heat” soft su card
 * - Copy altamente persuasivo, senza promesse vaghe: processi misurabili
 */

export default function Proof(){
  const metrics = [
    { label: "Lead → Appuntamento", value: "31%", hint: "tasso medio rolling" },
    { label: "Giorni sul mercato", value: "↓ 18%", hint: "vs baseline locale" },
    { label: "Accuracy valutazioni", value: "±3.5%", hint: "delta su prezzo finale" },
  ];

  const legal = [
    { icon: FileCheck2, label: "Checklist incarichi", desc: "Modelli, allegati e condizioni obbligatorie." },
    { icon: ClipboardList, label: "KYC / AML", desc: "Identificazione, adeguata verifica e registri." },
    { icon: Lock, label: "Privacy & consensi", desc: "GDPR, informative, minimizzazione dati." },
    { icon: Scale, label: "Contrattualistica", desc: "Template validati e firma digitale." },
    { icon: Database, label: "Audit & archivi", desc: "Versioning, log e prova di integrità." },
  ];

  return (
    <section aria-labelledby="metodo-evidenze" className="relative py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          id="metodo-evidenze"
          title="Evidenze e controlli — sicurezza per te e per il cliente"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/90">
            Tracciamo ogni fase e trasformiamo i dati in coaching operativo. In parallelo, i <b>workflow legali</b> azzerano il rischio di errori
            formali. Risultato: un professionista protetto, più veloce e più autorevole.
          </SectionP>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_.85fr]">
          {/* DATAFICATION & COACHING */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-white/6 p-5 ring-1 ring-white/10"
            style={{ boxShadow: "0 12px 28px rgba(0,0,0,.28)" }}
          >
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              <BarChart2 className="h-4 w-4 text-[var(--gold)]" /> Datafication & Coaching
            </div>

            <p className="text-sm text-white/88">
              Dashboard sintetiche misurano volumi, tassi di conversione e tempi. Alert e suggerimenti guidano le priorità quotidiane.
              Le decisioni non sono più “a sensazione”: <b>sono guidate dai numeri</b>.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl bg-white/7 p-3 ring-1 ring-white/12">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">{m.label}</div>
                  <div className="mt-1 text-[20px] font-semibold text-white/95">{m.value}</div>
                  <div className="text-[12px] text-white/70">{m.hint}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-2 text-[13px] text-white/85 sm:grid-cols-2">
              <Row icon={LineChart} title="Pipeline & priorità" desc="Heatmap sul funnel: dove si blocca, perché e come sbloccarlo."/>
              <Row icon={Database} title="Storico e confronti" desc="Andamento per agente e per micro-zona. Medie mobili e benchmark."/>
            </div>
          </motion.div>

          {/* LEGAL SHIELD */}
          <motion.aside
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="sticky top-[calc(var(--header-h,56px)+64px)] rounded-2xl p-5 ring-1"
            style={{ background:"var(--glass-bg)", border:"1px solid var(--glass-stroke)", boxShadow:"var(--shadow-gold)" }}
          >
            <div className="mb-2 text-sm text-white/70">Legal Shield</div>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.label} className="flex items-start gap-2 text-sm">
                  <l.icon className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
                  <div>
                    <div className="text-white/95">{l.label}</div>
                    <div className="text-white/80">{l.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-xl bg-white/6 p-3 ring-1 ring-white/12">
              <div className="text-xs text-white/75">
                <ShieldCheck className="mr-1 inline-block h-4 w-4 align-[-2px] text-[var(--gold)]" />
                Ogni documento passa da <b>checklist obbligatorie</b> e archiviazione con log: tutela per agente e cliente.
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Row({ icon:Icon, title, desc }){
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <Icon className="mt-0.5 h-4 w-4 text-[var(--gold)]" />
      <div>
        <div className="text-white/95">{title}</div>
        <div className="text-white/80">{desc}</div>
      </div>
    </div>
  );
}
