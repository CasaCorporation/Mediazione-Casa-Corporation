// components/carriere/altre-posizioni/section/Overview.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader, { SectionP } from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";
import { Layers, Boxes, Rocket } from "lucide-react";

export default function Overview(){
  const bullets = [
    { icon: Layers, title: "Multi-vertical", desc: "Tecnologia, marketing, operations. Un’unica regia con standard condivisi." },
    { icon: Boxes,  title: "Progetti reali",  desc: "Prodotti interni, campagne e tooling. KPI chiari e misurabili." },
    { icon: Rocket, title: "Crescita continua", desc: "Formazione, ownership e responsabilità progressiva." },
  ];

  return (
    <section id="overview" aria-labelledby="ap-overview-title" className="py-12 md:py-16">
      <div className="container">
        <SectionHeader
          id="ap-overview-title"
          title="Perché entrare in Casa Corporation anche se non fai l’agente"
          size="lg"
          tone="dark"
          underline
          className="mb-5 md:mb-7"
        />

        <div className="grid items-stretch gap-5 md:grid-cols-12">
          {/* SINISTRA: CTA centrata nella riga centrale */}
          <motion.aside
            className="md:col-span-7"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="panel h-full p-4 md:p-5 md:min-h-[440px]">
              <div className="halo left" aria-hidden />
              <div className="gridfx" aria-hidden />

              {/* 🔥 Griglia: testo (top) / CTA centrata (middle) / chip (bottom) */}
              <div className="relative z-[1] grid h-full grid-rows-[auto_1fr_auto] gap-4 md:gap-5">
                {/* Testo in alto */}
                <div className="space-y-3 md:space-y-4">
                  <SectionP>
                    Lavoriamo <b>a 360°</b>: tecnologia proprietaria, comunicazione, recruiting,
                    produzione media e operations. Non cerchiamo solo chi vende immobili:
                    cerchiamo chi <b>costruisce</b> prodotti, processi e campagne.
                  </SectionP>
                  <SectionP>
                    Anche quando non assumiamo nell’immediato, valutiamo i profili e li inseriamo nel nostro
                    <b> talent pool</b> per step successivi.
                  </SectionP>
                </div>

                {/* CTA centrata nello “spazio vuoto” */}
                <div className="flex items-center justify-center">
                  <div className="ctaRow inline-flex w-full max-w-[720px] flex-wrap items-center justify-center gap-3 md:w-auto">
                    <ButtonGold href="/carriere/candidatura" withArrow>Invia candidatura</ButtonGold>
                    <ButtonGhost href="#areas">Vedi aree aperte</ButtonGhost>
                  </div>
                </div>

                {/* Chip in basso, centrati */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["Ibrido/Remoto", "Playbook", "KPI", "Audit"].map((c) => (
                    <span key={c} className="chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* DESTRA invariata */}
          <motion.aside
            className="md:col-span-5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
          >
            <div className="panel h-full p-4 md:p-5 md:min-h-[440px]">
              <div className="halo" aria-hidden />
              <div className="gridfx" aria-hidden />
              <div className="relative z-[1] grid h-full grid-rows-[auto_1fr_auto] gap-4 md:gap-5">
                <div className="grid gap-3 md:gap-3.5">
                  {bullets.map((b, i) => (
                    <motion.div
                      key={b.title}
                      className="pill p-3.5 md:p-4"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.24, ease: "easeOut", delay: i * 0.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="iBox" aria-hidden><b.icon className="h-4 w-4" /></span>
                        <div>
                          <div className="font-semibold text-white">{b.title}</div>
                          <div className="mt-1 text-[0.92rem] leading-relaxed text-white/75">{b.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div />

                <div className="flex flex-wrap justify-center gap-2">
                  {["KPI", "Audit", "Versioning", "Talent Pool"].map((c) => (
                    <span key={c} className="chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <style jsx>{`
        .panel{
          position: relative;
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(16,24,48,.74), rgba(16,24,48,.62)),
            radial-gradient(42% 30% at 14% 0%, rgba(201,168,110,.10), transparent 62%);
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 10px 22px rgba(0,0,0,.26), 0 0 0 1px rgba(201,168,110,.08) inset;
          overflow: hidden;
          isolation: isolate;
        }
        .halo{
          position:absolute; inset:-8%;
          background:
            radial-gradient(36% 28% at 78% 8%, rgba(201,168,110,.18), transparent 62%),
            radial-gradient(30% 24% at 10% 86%, rgba(29,45,94,.28), transparent 60%);
          filter: blur(16px);
          opacity:.5; pointer-events:none;
        }
        .halo.left{
          background:
            radial-gradient(36% 28% at 22% 10%, rgba(201,168,110,.18), transparent 62%),
            radial-gradient(30% 24% at 90% 86%, rgba(29,45,94,.28), transparent 60%);
        }
        .gridfx{
          position:absolute; inset:0; pointer-events:none; opacity:.10;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.10) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* CTA pill centrata e non full-width */
        .ctaRow{
          border-radius:14px; padding:10px 12px;
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.035));
          border:1px solid rgba(255,255,255,.10);
          box-shadow: 0 8px 18px rgba(0,0,0,.22), 0 6px 14px rgba(201,168,110,.10);
        }

        .pill{
          border-radius:12px;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03));
          border:1px solid rgba(255,255,255,.10);
          box-shadow: 0 8px 18px rgba(0,0,0,.22), 0 8px 18px rgba(201,168,110,.10);
          transition: transform .14s ease, border-color .14s ease;
        }
        .pill:hover{ transform: translateY(-2px); border-color: color-mix(in oklab, var(--gold) 55%, #000 45%); }

        .iBox{
          display:inline-grid; place-items:center; width:28px; height:28px; border-radius:8px;
          background: color-mix(in oklab, var(--gold) 18%, transparent);
          border:1px solid color-mix(in oklab, var(--gold) 45%, transparent);
          color: var(--gold);
        }
        .chip{
          display:inline-block; padding:.28rem .56rem; border-radius:999px; font-size:.82rem; color:#fff;
          background: rgba(201,168,110,.20); border: 1px solid rgba(201,168,110,.34);
        }
      `}</style>
    </section>
  );
}
