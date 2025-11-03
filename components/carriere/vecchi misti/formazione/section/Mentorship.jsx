"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { UserPlus, Target, MessageSquare } from "lucide-react";

const BOX = [
  { icon: UserPlus, title: "Tutor dedicato", desc: "Un referente unico per tutta la durata del percorso." },
  { icon: Target, title: "Obiettivi chiari", desc: "Roadmap settimanale con traguardi e retrospettive." },
  { icon: MessageSquare, title: "Feedback rapidi", desc: "Sessioni 1:1 e feedback strutturati su casi reali." },
];

export default function Mentorship() {
  const prefersReduced = useReducedMotion();
  const pop = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 10, scale: prefersReduced ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section aria-labelledby="formazione-mentorship-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="formazione-mentorship-title"
          title="Affiancamento sul serio"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5"
        />
        <SectionP className="text-white/80 max-w-[76ch]">
          Non solo lezioni: <b>coaching operativo</b> e supporto sulle attività con una guida presente.
        </SectionP>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {BOX.map(({ icon: Icon, title, desc }) => (
            <motion.article
              key={title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              variants={pop}
              className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-white/85">{desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
