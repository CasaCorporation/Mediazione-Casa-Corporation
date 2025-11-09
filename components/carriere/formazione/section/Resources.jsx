"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold } from "@/common/section/Buttons";
import { Download, Video, FileText } from "lucide-react";

const ITEMS = [
  { icon: FileText, label: "Playbook operativo", hint: "Template & script", href: "#" },
  { icon: Video, label: "Masterclass on–demand", hint: "Lezioni e casi reali", href: "#" },
  { icon: Download, label: "Checklist & modelli", hint: "PDF/Doc pronti all'uso", href: "#" },
];

export default function Resources() {
  const prefersReduced = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section aria-labelledby="formazione-resources-title" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="formazione-resources-title"
          title="Materiali pronti all’uso"
          size="lg"
          tone="dark"
          underline
          className="mb-4 sm:mb-5"
        />
        <SectionP className="text-white/80 max-w-[76ch]">
          Documenti, video e checklist <b>sempre aggiornati</b> e tracciati.
        </SectionP>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ITEMS.map(({ icon: Icon, label, hint, href }) => (
            <motion.a
              key={label}
              href={href}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              variants={reveal}
              className="group rounded-2xl p-6 block bg-white/5 ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">{label}</div>
                  <div className="text-xs text-white/70">{hint}</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/80">Vuoi un percorso su misura?</p>
          <ButtonGold as="a" href="/contatti?topic=formazione" className="mt-3 inline-flex">
            Richiedi una call
          </ButtonGold>
        </div>
      </div>
    </section>
  );
}
