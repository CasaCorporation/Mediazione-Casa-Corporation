"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeader from "@/common/section/SectionHeader";

const QA = [
  { q: "La formazione ha un costo?", a: "È inclusa nel percorso: niente fee d’ingresso, niente costi nascosti." },
  { q: "È solo teoria?", a: "No. Lavoriamo su casi reali, con checklist non aggirabili e feedback 1:1." },
  { q: "Quanto dura l’onboarding?", a: "Tipicamente 8–10 settimane tra moduli, affiancamento e prime pratiche." },
  { q: "Restano materiali disponibili?", a: "Sì, libreria on–demand e aggiornamenti continui (masterclass, template)." },
];

export default function FAQ() {
  const [open, setOpen] = React.useState(null);
  const prefersReduced = useReducedMotion();

  const toggle = (idx) => setOpen((o) => (o === idx ? null : idx));

  const content = {
    hidden: { opacity: 0, height: prefersReduced ? "auto" : 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: { duration: prefersReduced ? 0 : 0.28, ease: "easeOut" },
    },
    exit: { opacity: 0, height: prefersReduced ? "auto" : 0, transition: { duration: 0.2 } },
  };

  return (
    <section aria-labelledby="formazione-faq-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="formazione-faq-title"
          title="Chiarezza prima di tutto"
          size="lg"
          tone="dark"
          underline
          className="mb-5"
        />

        <div className="space-y-3">
          {QA.map((item, idx) => {
            const isOpen = open === idx;
            const panelId = `faq-panel-${idx}`;
            const btnId = `faq-button-${idx}`;
            return (
              <div key={idx} className="rounded-xl bg-white/5 ring-1 ring-white/10">
                <button
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                >
                  <span className="font-medium">{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      key="content"
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      variants={content}
                      className="px-4 pb-4 pt-0 text-white/85 text-sm overflow-hidden"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
