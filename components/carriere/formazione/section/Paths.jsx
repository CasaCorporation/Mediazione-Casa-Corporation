"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { GraduationCap, FileCheck2, Briefcase, LineChart, Check } from "lucide-react";

const CARDS = [
  {
    icon: GraduationCap,
    title: "Pre–patentino",
    desc: "Fondamenti, normativa, etica e simulazioni d’esame. Percorso guidato per l’abilitazione.",
    points: ["Moduli on–demand", "Quiz e simulazioni", "Tutor dedicato"],
  },
  {
    icon: Briefcase,
    title: "Onboarding operativo",
    desc: "Processi, strumenti e metodo Casa Corporation. Affiancamento sul campo con obiettivi chiari.",
    points: ["Playbook operativo", "Template & script", "Obiettivi settimanali"],
  },
  {
    icon: FileCheck2,
    title: "Post–abilitazione",
    desc: "Applicazione reale su casi clienti, con controlli non aggirabili e checklist certificate.",
    points: ["Case study reali", "Checklist & audit", "Feedback strutturati"],
  },
  {
    icon: LineChart,
    title: "Accademia continua",
    desc: "Aggiornamenti, masterclass verticali e community interna. Crescita misurabile nel tempo.",
    points: ["Masterclass mensili", "Libreria risorse", "Percorsi avanzati"],
  },
];

export default function Paths() {
  const prefersReduced = useReducedMotion();
  const parent = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: prefersReduced ? 0 : 0.06, duration: 0.4, ease: "easeOut" },
    },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 14, scale: prefersReduced ? 1 : 0.98 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: "easeOut" } },
  };

  return (
    <section aria-labelledby="formazione-paths-title" className="relative py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="formazione-paths-title"
          title="Dove inizi, dove arrivi"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5"
        />
        <SectionP className="text-white/80 max-w-[76ch]">
          Strade diverse, stesso obiettivo: <b>competenza applicata</b> e <b>risultati misurabili</b>.
        </SectionP>

        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {CARDS.map(({ icon: Icon, title, desc, points }) => (
            <motion.article
              key={title}
              variants={item}
              className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{title}</h3>
              </div>

              <p className="mt-3 text-sm text-white/85">{desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-white/90">
                {points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <Check className="h-4 w-4 opacity-80 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
