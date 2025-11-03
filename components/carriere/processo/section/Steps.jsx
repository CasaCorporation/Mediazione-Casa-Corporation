// components/carriere/processo/section/Steps.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import {
  Send, Sparkles, PhoneCall, FileSignature, Laptop2, Rocket,
} from "lucide-react";

/**
 * PROCESSO A STEP
 * - 6 step con titoli forti e descrizioni chiare
 * - Micro-tag “Tool usato” per evidenziare automazioni e software
 */

export default function Steps(){
  const steps = [
    {
      icon: Send,
      title: "Step 1 — Candidatura in 1 minuto",
      desc: "Compili il form e il sistema HR acquisisce i dati chiave. Ricevi conferma automatica e link ai prossimi passaggi.",
      tool: "HR Bot • Intake Form",
    },
    {
      icon: Sparkles,
      title: "Step 2 — Priorità algoritmica",
      desc: "Un algoritmo interno segnala i profili prioritari in base a criteri oggettivi (esperienza, disponibilità, allineamento).",
      tool: "Ranking Engine",
    },
    {
      icon: PhoneCall,
      title: "Step 3 — Colloquio conoscitivo",
      desc: "Vieni contattato per un primo colloquio. Focus su obiettivi, metodo e contesto operativo.",
      tool: "Scheduler • CRM",
    },
    {
      icon: FileSignature,
      title: "Step 4 — Firma del contratto",
      desc: "Zero carta: ricevi il contratto in digitale, con clausole chiare e tutela reciproca.",
      tool: "e-Signature • Archive",
    },
    {
      icon: Laptop2,
      title: "Step 5 — Onboarding & accessi",
      desc: "Ti abilitiamo alle piattaforme aziendali, Super Dashboard e strumenti. Percorso guidato con micro-lezioni.",
      tool: "Access Manager • Super Dashboard",
    },
    {
      icon: Rocket,
      title: "Step 6 — Go live: inizi a vendere",
      desc: "Portfolio, annunci e processi pronti: entri operativo con supporto continuo e obiettivi misurabili.",
      tool: "Pipeline • Coaching",
    },
  ];

  return (
    <section aria-labelledby="processo-steps" className="relative py-16 sm:py-20">
      <div className="container">
        <SectionHeader
          id="processo-steps"
          title="Dal click al go live — il nostro processo di selezione"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5 text-center"
        />
        <div className="mx-auto mb-8 max-w-[74ch] text-center">
          <SectionP className="text-white/90">
            Selezione veloce, trasparente e <b>senza frizioni</b>: automatizziamo dove serve e mettiamo le persone al centro.
          </SectionP>
        </div>

        {/* Timeline verticale */}
        <ol className="relative mx-auto max-w-4xl border-l border-white/12 pl-5 sm:pl-6">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
              className="relative mb-7 last:mb-0"
            >
              {/* Bullet icona */}
              <div className="absolute -left-[11px] top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--gold)]/80 ring-2 ring-[color:var(--brand-dark)]">
                <s.icon className="h-3 w-3 text-[var(--brand-dark)]" />
              </div>

              {/* Card step */}
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
