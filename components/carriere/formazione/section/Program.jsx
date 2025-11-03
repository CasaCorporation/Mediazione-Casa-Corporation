"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { BookOpen, MonitorPlay, ClipboardCheck, Users } from "lucide-react";

const MODULES = [
  {
    k: "fondamenti",
    icon: BookOpen,
    title: "Fondamenti & normativa",
    weeks: 2,
    items: ["Mercato & ruoli", "Norme e adempimenti", "Etica professionale"],
  },
  {
    k: "strumenti",
    icon: MonitorPlay,
    title: "Strumenti proprietari",
    weeks: 2,
    items: ["Piattaforme & flussi", "Automazioni", "Uso dei template"],
  },
  {
    k: "metodo",
    icon: ClipboardCheck,
    title: "Metodo non aggirabile",
    weeks: 3,
    items: ["Checklist & gate", "SLA & KPI", "Audit trail"],
  },
  {
    k: "campo",
    icon: Users,
    title: "Affiancamento sul campo",
    weeks: 3,
    items: ["Case reali", "Feedback operativo", "Retrospettiva"],
  },
];

export default function Program() {
  const prefersReduced = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: prefersReduced ? 0 : i * 0.05 },
    }),
  };

  return (
    <section aria-labelledby="formazione-program-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="formazione-program-title"
          title="Moduli e durata"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5"
        />
        <SectionP className="text-white/80 max-w-[76ch]">
          Struttura orientata all’applicazione: <b>teoria essenziale</b>, <b>pratica guidata</b>, misurazione continua.
        </SectionP>

        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {MODULES.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.li
                key={m.k}
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                variants={variants}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">
                        {idx + 1}. {m.title}
                      </h3>
                      <div className="text-xs text-white/70">~ {m.weeks} settimane</div>
                    </div>
                  </div>
                </div>

                <ul className="mt-4 grid sm:grid-cols-3 gap-2 text-sm text-white/90">
                  {m.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2"
                    >
                      • {it}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
