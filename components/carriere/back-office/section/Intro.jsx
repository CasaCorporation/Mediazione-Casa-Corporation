"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { Workflow, Users, Compass, CheckCircle2, Timer, BarChart2 } from "lucide-react";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";

export default function Intro() {
  return (
    <section id="overview" aria-labelledby="bo-intro-title" className="relative py-18 sm:py-20">
      <div className="container relative">
        <SectionHeader
          id="bo-intro-title"
          title="Back Office — tutto scorre, tutto è tracciato"
          size="lg"
          tone="dark"
          underline
          className="mb-10 sm:mb-12"
        />

        {/* Colonne alla stessa altezza */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* SINISTRA — pannello full-height con testo CENTRATO verticalmente */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="panel h-full flex flex-col">
              {/* corpo centrato */}
              <div className="flex-1 grid place-content-center">
                <div className="max-w-[62ch] mx-auto space-y-5">
                  <SectionP className="text-[1.02rem] leading-relaxed">
                    Siamo la regia tra <b>Agenti</b>, <b>Clienti</b> e <b>Direzione</b>. Lavoriamo con
                    passaggi chiari e controlli semplici: ogni attività è ordinata e verificabile.
                  </SectionP>
                  <SectionP className="text-[1.02rem] leading-relaxed">
                    Meno errori, tempi certi, responsabilità definite. Tutto è misurato e visibile con KPI essenziali.
                  </SectionP>

                  {/* micro-pills per riempire e dare substance */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <MiniPill icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Passaggi obbligatori" />
                    <MiniPill icon={<Timer className="h-3.5 w-3.5" />}        label="Scadenze chiare" />
                    <MiniPill icon={<BarChart2 className="h-3.5 w-3.5" />}    label="KPI visibili" />
                  </div>
                </div>
              </div>

              {/* CTA dock centrata */}
              <div className="mt-auto pt-5">
                <div className="shimmer-line" aria-hidden />
                <div className="ctaDock">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-center">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
                      <ButtonGold href="#cta" withArrow>Candidati ora</ButtonGold>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
                      <ButtonGhost href="/carriere/metodo">Vedi il nostro metodo</ButtonGhost>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* DESTRA — 3 pill con micro animazioni */}
          <motion.div
            className="lg:col-span-5 grid gap-4 content-start"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, ease: "easeOut" } } }}
          >
            <InfoPill
              icon={<Workflow className="h-4 w-4" />}
              title="Procedure chiare"
              desc="Step guidati e controlli qualità: si lavora senza intoppi."
            />
            <InfoPill
              icon={<Users className="h-4 w-4" />}
              title="Regia unica"
              desc="Un solo centro di coordinamento, niente sovrapposizioni."
            />
            <InfoPill
              icon={<Compass className="h-4 w-4" />}
              title="Priorità & scadenze"
              desc="Calendario, promemoria e responsabilità sempre in chiaro."
            />
          </motion.div>
        </div>
      </div>

      {/* Decor soft */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-9rem] h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(201,168,110,.65), rgba(201,168,110,0))" }}
        />
        <div
          className="absolute inset-0 opacity-[.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <style jsx>{`
        .panel{
          position: relative;
          border-radius: 16px;
          padding: 18px;
          background:
            radial-gradient(42% 28% at 20% 0%, rgba(201,168,110,.10), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.035));
          border: 1px solid rgba(255,255,255,.10);
          box-shadow: 0 12px 28px rgba(0,0,0,.22), 0 8px 18px rgba(201,168,110,.10);
          overflow: hidden;
          isolation: isolate;
        }
        .panel:before{
          content:"";
          position:absolute; inset:0; pointer-events:none; opacity:.10;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.15) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .shimmer-line{
          height: 1px; width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          position: relative; overflow: hidden;
        }
        .shimmer-line:after{
          content: ""; position: absolute; inset: 0; transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(201,168,110,.55), transparent);
          animation: shine 2.4s ease-in-out infinite;
        }
        @keyframes shine {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer-line:after{ animation: none; }
        }

        .ctaDock{ padding-top: 14px; }
      `}</style>
    </section>
  );
}

function MiniPill({ icon, label }) {
  return (
    <span className="miniPill">
      <span className="icon">{icon}</span>
      {label}
      <style jsx>{`
        .miniPill{
          display:inline-flex; align-items:center; gap:6px;
          padding: .36rem .62rem; border-radius: 999px;
          font-size: .76rem; line-height: 1; color:#fff;
          background: rgba(201,168,110,.18);
          border: 1px solid rgba(201,168,110,.36);
          box-shadow: 0 0 0 1px rgba(0,0,0,.04);
        }
        .icon{ display:grid; place-items:center; color: var(--gold); }
      `}</style>
    </span>
  );
}

function InfoPill({ icon, title, desc }) {
  return (
    <motion.div
      className="pill p-4"
      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        <span className="iBox" aria-hidden>{icon}</span>
        <div className="font-semibold text-white">{title}</div>
      </div>
      <div className="mt-2 text-[0.96rem] text-white/78">{desc}</div>

      <style jsx>{`
        .pill{
          border-radius:16px;
          background:
            radial-gradient(36% 28% at 14% 0%, rgba(201,168,110,.12), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.035));
          border:1px solid rgba(255,255,255,.10);
          box-shadow: 0 12px 28px rgba(0,0,0,.28), 0 10px 22px rgba(201,168,110,.10);
          transition: transform .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease;
        }
        .pill:hover{
          border-color: color-mix(in oklab, var(--gold) 55%, #000 45%);
          box-shadow: 0 14px 30px rgba(0,0,0,.30), 0 10px 22px rgba(201,168,110,.12);
        }
        .iBox{
          display:grid; place-items:center; width:28px; height:28px; border-radius:8px; flex:0 0 auto;
          color: var(--gold);
          background: color-mix(in oklab, var(--gold) 18%, transparent);
          border: 1px solid color-mix(in oklab, var(--gold) 45%, transparent);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,.04);
        }
      `}</style>
    </motion.div>
  );
}
