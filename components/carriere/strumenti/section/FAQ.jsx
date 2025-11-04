// components/carriere/strumenti/section/FAQ.jsx
"use client";

import React from "react";
import SectionHeader from "@/common/section/SectionHeader";

const QA = [
  { q: "Serve installare qualcosa?", a: "No, stack cloud con accesso sicuro. App mobile disponibile." },
  { q: "Posso esportare i miei dati?", a: "Sì, export CSV/Excel e API per integrazioni standard." },
  { q: "Come gestite i permessi?", a: "Ruoli granulari su oggetti e azioni, con log e audit trail." },
  { q: "Gli annunci si pubblicano da soli?", a: "La pubblicazione è guidata: puoi automatizzare sync e tracciamento." },
];

export default function FAQ(){
  const [open, setOpen] = React.useState(null);
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          id="faq-title"
          title="Chiarezza prima di tutto"
          size="lg"
          tone="dark"
          underline
          className="mb-6 text-center"
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {QA.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-white/5 ring-1 ring-white/10">
              <button
                onClick={()=> setOpen(o => o===idx ? null : idx)}
                className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
                aria-expanded={open===idx}
                aria-controls={`faq-a-${idx}`}
              >
                <span className="font-medium">{item.q}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className={`transition ${open===idx ? "rotate-180" : ""}`}>
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </button>
              {open===idx && (
                <div id={`faq-a-${idx}`} className="px-4 pb-4 pt-0 text-white/85 text-sm">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Micro-CTA secondaria (CTAUltra è già in fondo pagina) */}
        <div className="text-center mt-10">
          <a
            href="/contatti?topic=strumenti"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-[var(--brand-dark)]"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--gold) 92%, #fff 8%), color-mix(in oklab, var(--gold) 70%, #000 30%))",
              boxShadow: "0 12px 26px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
            }}
          >
            Richiedi una demo
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="opacity-90">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
