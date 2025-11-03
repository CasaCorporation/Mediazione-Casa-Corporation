// common/section/CTAUltra.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTAUltra({
  title = "Pronto a candidarti?",
  desc = "Zero frizioni. Metodo, tutela, strumenti proprietari.",
  primary = { href: "/carriere/candidatura", label: "Invia candidatura" },
  secondary = { href: "/carriere/agenti-immobiliari", label: "Vedi i ruoli" },
}) {
  return (
    <section className="py-14 md:py-18">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,.35)]"
          style={{
            border: "1px solid color-mix(in oklab, var(--gold) 55%, transparent 45%)",
            background:
              "linear-gradient(135deg, rgba(6,12,30,0.92) 0%, rgba(4,10,22,0.96) 100%)",
          }}
        >
          {/* glow soft */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[120px]"
            style={{ background: "color-mix(in oklab, var(--gold) 35%, transparent)" }}
          />
          {/* subtle grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[.06]"
            style={{
              backgroundImage:
                "linear-gradient(transparent 31px, rgba(255,255,255,.5) 32px), linear-gradient(90deg, transparent 31px, rgba(255,255,255,.5) 32px)",
              backgroundSize: "32px 32px",
              mixBlendMode: "overlay",
            }}
          />

          <div className="relative z-10 grid items-center gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl md:text-[28px] font-semibold text-white">
                {title}
              </h3>
              <p className="mt-1.5 text-white/85">{desc}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={primary.href}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition active:translate-y-[1px]"
                style={{
                  color: "var(--brand-dark)",
                  background: "var(--gold)",
                  border: "1px solid color-mix(in oklab, var(--gold) 70%, #000 30%)",
                  boxShadow: "0 10px 28px rgba(201,168,110,.28)",
                }}
              >
                {primary.label} <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white/95 transition hover:bg-white/5 active:translate-y-[1px]"
                style={{ border: "1px solid var(--glass-stroke)", background: "rgba(255,255,255,.06)" }}
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
