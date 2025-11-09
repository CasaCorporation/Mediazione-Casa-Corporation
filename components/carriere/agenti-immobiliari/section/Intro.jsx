"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";

export default function Intro() {
  const asideRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 }
    );
    if (asideRef.current) io.observe(asideRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="intro"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
      style={{
        background:
          "radial-gradient(50% 42% at 50% 0%, rgba(29,45,94,0.26), transparent 60%), radial-gradient(36% 30% at 72% 0%, rgba(201,168,110,0.16), transparent 60%), var(--brand-dark)",
      }}
    >
      <div className="container">
        {/* Titolo unico (centrato) */}
        <SectionHeader
          title={
            <>
              Carriera chiara, <em>zero costi fissi</em> e strumenti che moltiplicano i risultati
            </>
          }
          size="lg"
          tone="dark"
          underline
          className="mb-10 sm:mb-12"
        />

        {/* Layout interno 7/5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Testo */}
          <div className="lg:col-span-7 space-y-4">
            <SectionP>
              Tre percorsi — <strong>Junior 30%</strong>, <strong>Senior 60% + premi</strong>, <strong>Leader</strong> — con metodo,
              supporto e KPI trasparenti. Tu ti concentri sui clienti; noi forniamo <em>formazione</em>, <em>portali</em>, <em>marketing</em> e una
              <strong> Super Dashboard</strong> per far correre la pipeline.
            </SectionP>
            <SectionP>
              Contratti chiari, processi non aggirabili e controlli in tempo reale in un ecosistema che accelera acquisizione,
              trattative e post-vendita.
            </SectionP>

            {/* CTA standard */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <ButtonGold href="/carriere/candidatura">Candidati ora</ButtonGold>
              <ButtonGhost href="#profili" withArrow={false}>Scopri i profili</ButtonGhost>
            </div>

            {/* Badge */}
            <ul className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-white/70">
              <li className="badge">Junior 30%</li>
              <li className="badge">Senior 60% + premi</li>
              <li className="badge">Leader — contratto dirigenziale</li>
            </ul>
          </div>

          {/* Card */}
          <div className="lg:col-span-5">
            <aside
              ref={asideRef}
              className={`relative rounded-2xl p-5 ring-1 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-stroke)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <div className="text-sm text-white/70">In breve</div>
              <ul className="mt-2 space-y-2 text-white/85">
                <li className="flex items-start gap-2"><Dot /> Academy inclusa; affiancamento fino all’esame</li>
                <li className="flex items-start gap-2"><Dot /> Portali & marketing aziendali compresi</li>
                <li className="flex items-start gap-2"><Dot /> Super Dashboard per pipeline, pratiche e KPI</li>
                <li className="flex items-start gap-2"><Dot /> Gara con premi oltre il 100%</li>
              </ul>
              <div
                className="mt-4 h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
              />
              <SectionP size="sm" className="mt-3">
                Vuoi vedere il software?{" "}
                <Link href="/carriere/software" className="underline text-white">Scopri la Super Dashboard</Link>
              </SectionP>
            </aside>
          </div>
        </div>
      </div>

      <style jsx>{`
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
        }
      `}</style>
    </section>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="mt-1 inline-block h-[10px] w-[10px] shrink-0 rounded-full"
      style={{
        background: "radial-gradient(circle at 50% 50%, var(--gold), color-mix(in oklab, var(--gold) 70%, #000 30%))",
        boxShadow: "0 0 0 1px color-mix(in oklab, var(--gold) 65%, #000 35%), 0 0 16px rgba(201,168,110,.22)",
      }}
    />
  );
}
