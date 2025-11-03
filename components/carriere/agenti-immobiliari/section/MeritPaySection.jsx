"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { Trophy, LineChart, Scale, ShieldCheck } from "lucide-react";

/**
 * MeritPaySection — Gara Aziendale (layout 5/7 bilanciato, CTA ancorate in basso)
 * Link: /carriere/gara — /carriere/confronto — /carriere/calcolatore
 */
export default function MeritPaySection() {
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
      id="merit"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24"
      style={{
        background:
          "radial-gradient(50% 42% at 50% 0%, rgba(29,45,94,0.26), transparent 60%), radial-gradient(36% 30% at 72% 0%, rgba(201,168,110,0.16), transparent 60%), var(--brand-dark)",
      }}
    >
      <div className="container">
        <SectionHeader
          title="Meritocrazia e riconoscimento al primo posto"
          size="lg"
          tone="dark"
          underline
          className="mb-10 sm:mb-12"
        />

        {/* Layout 5/7 — card sinistra, pannello testo destra (altezza allineata) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* CARD SINISTRA */}
          <div className="lg:col-span-5">
            <aside
              ref={asideRef}
              className={`garaCard relative rounded-2xl p-5 ring-1 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
                border: "1px solid var(--glass-stroke)",
                boxShadow: "var(--shadow-gold)",
                isolation: "isolate",
                height: "100%",
              }}
            >
              {/* Filigrana trophy */}
              <div className="trophyWrap" aria-hidden>
                <Trophy className="trophyBg" />
              </div>

              <span className="pill">Gara aziendale</span>
              <h3 className="headline mt-2">Merito, regole chiare, risultati tracciati</h3>

              <ul className="mt-4 space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <IconBox><LineChart className="w-4 h-4" /></IconBox>
                  <span>Obiettivi <strong>misurabili</strong> e condivisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconBox><Trophy className="w-4 h-4" /></IconBox>
                  <span>Incentivi reali per chi spinge sull’<strong>eccellenza</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <IconBox><Scale className="w-4 h-4" /></IconBox>
                  <span>Retribuzione <strong>equa</strong> anche per carriere stabili</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconBox><ShieldCheck className="w-4 h-4" /></IconBox>
                  <span>Regole <strong>chiare</strong> e audit trail</span>
                </li>
              </ul>

              <div
                className="my-4 h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
              />

              <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
                <span className="opacity-80 mr-1">Approfondisci:</span>
                <Link href="/carriere/gara" className="ctaLink">Gara</Link>
                <span className="sep">·</span>
                <Link href="/carriere/confronto" className="ctaLink">Confronto modelli</Link>
                <span className="sep">·</span>
                <Link href="/carriere/calcolatore" className="ctaLink">Calcolatore</Link>
              </div>
            </aside>
          </div>

          {/* PANNELLO DESTRA (riempie l’altezza → niente vuoto) */}
          <div className="lg:col-span-7">
            <div
              className="rightPanel rounded-2xl p-5 ring-1 h-full"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-stroke)",
                boxShadow: "0 10px 40px rgba(0,0,0,.22)",
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
                rowGap: "10px",
              }}
            >
              {/* Testo */}
              <div className="space-y-3">
                <SectionP className="mb-0">
                  Abbiamo progettato un modello retributivo <strong>oggettivo e meritocratico</strong>:
                  la <strong>Gara Aziendale</strong> e gli incentivi interni premiano chi vuole performare al massimo,
                  mentre una struttura <strong>equa e competitiva</strong> tutela chi preferisce una crescita più lineare.
                  Ogni contributo è <em>misurato, tracciato e riconosciuto</em>.
                </SectionP>
                <SectionP className="mb-0">
                  Regole chiare, criteri condivisi e visibilità sui risultati garantiscono un percorso trasparente per tutti:
                  dai profili orientati alla performance alle carriere impostate su stabilità e continuità.
                </SectionP>
              </div>

              {/* Spazio elastico (1fr) per spingere CTA in basso */}
              <div />

              {/* CTA + chip */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonGold href="/carriere/gara">Scopri la Gara Aziendale</ButtonGold>
                  <ButtonGhost href="/carriere/confronto" withArrow={false}>Confronto modelli</ButtonGhost>
                  <ButtonGhost href="/carriere/calcolatore" withArrow={false}>Calcolatore guadagni</ButtonGhost>
                </div>

                <ul className="mt-4 flex flex-wrap items-center gap-2">
                  <li className="chip">Gara aziendale</li>
                  <li className="chip">Obiettivi misurabili</li>
                  <li className="chip">Regole chiare</li>
                  <li className="chip">Retribuzione equa</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pill{
          display:inline-flex; align-items:center; height:26px; padding:0 10px;
          border-radius:999px; font-size:12px; font-weight:700; color:#fff;
          background: rgba(0,0,0,.32); border:1px solid rgba(255,255,255,.18);
          backdrop-filter: blur(6px);
        }
        .headline{
          font-weight:900; letter-spacing:-.01em; color:#fff;
          font-size: clamp(18px, 2.5vw, 22px);
        }
        .ctaLink{ color:#fff; text-decoration:underline; text-underline-offset:3px; }
        .sep{ opacity:.4 }

        .chip{
          display:inline-flex; align-items:center; padding:8px 12px; border-radius:999px;
          border:1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.06);
          font-size: 13px; color:#fff;
        }

        .garaCard::before{
          content:""; position:absolute; inset:0; z-index:0; opacity:.06;
          background-image:
            linear-gradient(transparent 31px, rgba(255,255,255,.45) 32px),
            linear-gradient(90deg, transparent 31px, rgba(255,255,255,.45) 32px);
          background-size:32px 32px; mix-blend-mode:overlay;
        }
        .trophyWrap{ position:absolute; inset:0; z-index:0; pointer-events:none; }
        .trophyBg{
          position:absolute; right:-8px; top:-12px; width:clamp(140px, 28vw, 300px); height:auto;
          color: var(--gold); opacity:.12; transform: rotate(-10deg);
          filter: drop-shadow(0 6px 18px rgba(201,168,110,.25));
        }

        @media (max-width: 1024px){
          .rightPanel{ grid-template-rows: auto auto auto; } /* niente spinta in basso su mobile */
        }
      `}</style>
    </section>
  );
}

/* ---------- Sub-components ---------- */
function IconBox({ children }){
  return (
    <span
      className="inline-grid place-items-center rounded-[10px] border"
      style={{
        width: 30, height: 30,
        color: "var(--gold)",
        background:
          "linear-gradient(var(--brand-dark) 0 0) padding-box, linear-gradient(135deg, rgba(201,168,110,.7), rgba(255,255,255,.2)) border-box",
        borderColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}
