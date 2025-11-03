"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ClipboardCheck, Award, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Quiz & simulazioni",
    desc: "Verifiche periodiche sui moduli seguiti, con soglie minime di superamento.",
    tags: ["Question bank", "Timer", "Report dettagliato"],
  },
  {
    icon: CheckCircle2,
    title: "Pratiche guidate",
    desc: "Applicazioni reali con checklist non aggirabili e validazione step–by–step.",
    tags: ["Checklist", "Evidenze", "Double–check"],
  },
  {
    icon: Award,
    title: "Certificazioni interne",
    desc: "Badge di competenza su processi specifici, rinnovati con aggiornamenti periodici.",
    tags: ["Badge", "Validità", "Aggiornamenti"],
  },
];

export default function Assessment() {
  const prefersReduced = useReducedMotion();

  const wrap = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: prefersReduced ? 0 : 0.06, duration: 0.4, ease: "easeOut" },
    },
  };
  const card = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 14, scale: prefersReduced ? 1 : 0.98 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: "easeOut" } },
  };

  return (
    <section aria-labelledby="formazione-assessment-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="formazione-assessment-title"
          title="Misuriamo, sempre"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5"
        />
        <SectionP className="text-white/80 max-w-[76ch]">
          Prove oggettive e tracciabili: <b>non opinioni</b>, risultati.
        </SectionP>

        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {STEPS.map(({ icon: Icon, title, desc, tags }) => (
            <motion.article
              key={title}
              variants={card}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{title}</h3>
              </div>

              <p className="mt-2 text-sm text-white/85">{desc}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-white/5 ring-1 ring-white/10 px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
