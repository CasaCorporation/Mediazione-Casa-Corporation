// components/carriere/metodo/section/ProcessPillars.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { Unlock, GraduationCap, LifeBuoy, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

/**
 * PROCESS PILLARS
 * - 4 card con icone e micro-bullet concreti
 * - Copy che incorpora i pilastri: Libertà, Formazione, Supporto, Scudo legale
 */

export default function ProcessPillars(){
  const cards = [
    {
      icon: Unlock,
      title: "Libertà del professionista",
      desc:
        "Nessun vincolo di presenza: governi tempo e focus. Il tuo mestiere è acquisire e vendere; "
        + "al resto pensiamo noi.",
      bullets: [
        "Obiettivi chiari, senza micro-management",
        "Pipeline e task visibili in Super Dashboard",
        "Provvigioni chiare, zero costi fissi",
      ],
    },
    {
      icon: GraduationCap,
      title: "Formazione costante",
      desc:
        "Percorsi modulari, coaching su casi reali e aggiornamenti normativi. Crescita tecnica e commerciale misurabile.",
      bullets: [
        "Onboarding guidato e micro-learning",
        "Sessioni live & library asincrona",
        "Check di competenza per step",
      ],
    },
    {
      icon: LifeBuoy,
      title: "Supporto a 360°",
      desc:
        "Segreteria, annunci, advertising e strumenti proprietari. Tu gestisci i clienti, noi teniamo accesa la macchina.",
      bullets: [
        "Lead, portali e pre-qualifica",
        "CRM e flussi automatizzati",
        "Materiali e campagne centralizzate",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Copertura legale & controlli",
      desc:
        "Workflow non aggirabili proteggono te e il cliente: documenti corretti, firme, privacy e antiriciclaggio.",
      bullets: [
        "Checklist per incarichi e proposte",
        "Validazioni anti-errore step-by-step",
        "Archiviazione e audit trail",
      ],
    },
  ];

  return (
    <section aria-labelledby="metodo-pilastri" className="relative py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          id="metodo-pilastri"
          title="I pilastri del metodo"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/90">
            Libertà operativa, formazione continua, supporto totale e tutela legale: <b>qui si lavora con serenità</b>, perché
            software e processi fanno da rete di sicurezza e da acceleratore di risultato.
          </SectionP>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative rounded-2xl bg-white/6 p-5 ring-1 ring-white/10"
              style={{ boxShadow: "0 12px 28px rgba(0,0,0,.28)" }}
            >
              <c.icon className="h-5 w-5 text-[var(--gold)]" />
              <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.01em] text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-white/85">{c.desc}</p>
              <ul className="mt-3 grid gap-1.5 text-[13px] text-white/88">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-[2px] h-4 w-4 text-[var(--gold)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </motion.li>
          ))}
        </ul>

        {/* Nota di posizionamento */}
        <p className="mt-6 text-center text-xs text-white/65">
          <Sparkles className="mr-1 inline-block h-3.5 w-3.5 align-[-2px] text-[var(--gold)]" />
          Zero frizioni: il professionista resta al centro, la struttura amplifica la sua efficacia.
        </p>
      </div>
    </section>
  );
}
