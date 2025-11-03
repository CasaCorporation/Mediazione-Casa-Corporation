"use client";

import React from "react";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";

export default function Notes(){
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Background pattern + soft brand */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[.08]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 10px)" }}
        />
        <div
          className="absolute -top-12 left-1/2 h-48 w-[70%] -translate-x-1/2 blur-3xl opacity-60"
          style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(29,45,94,.35), transparent 60%)" }}
        />
      </div>

      <div className="container">
        <SectionHeader kicker="Trasparenza" title="Note utili">
          <SectionP>
            Il calcolo è indicativo e serve a capire le grandezze in gioco.
            La gara aziendale è riservata ai <b>Senior</b>. Per i dettagli fa fede il regolamento interno.
          </SectionP>
        </SectionHeader>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="prose prose-invert max-w-none text-white/85">
            <ul>
              <li>Provvigione base: <b>60%</b> sul fatturato personale trimestrale.</li>
              <li>Premi gara (solo Senior): <b>5%</b>, <b>3%</b>, <b>2%</b> sul fatturato aziendale del trimestre (Top 1/2/3).</li>
              <li>Le stime non costituiscono proposta economica. Prevalgono contratti e regolamenti.</li>
            </ul>
          </div>

          <aside
            className="rounded-2xl p-5 ring-1"
            style={{ background:"var(--glass-bg)", border:"1px solid var(--glass-stroke)", boxShadow:"var(--shadow-gold)" }}
          >
            <div className="text-sm text-white/70">Prossimi passi</div>
            <p className="mt-2 text-white/85 text-sm">
              Hai numeri reali da verificare? Portali in call: simuliamo insieme
              il trimestre e impostiamo un piano operativo.
            </p>

            <div className="mt-3 flex gap-2 flex-wrap">
              <ButtonGold as="a" href="/carriere/candidatura?topic=call&ruolo=agente-senior">
                Prenota una call
              </ButtonGold>
              <ButtonGhost as="a" href="/carriere/agenti-immobiliari#merit">
                Leggi il regolamento gara
              </ButtonGhost>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
