// components/home/CTAUltra.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTAUltra({
  title = "Pronto a candidarti?",
  desc = "Zero frizioni. Metodo, tutela, strumenti proprietari.",
  primary = { href: "/contatti?topic=candidatura", label: "Invia candidatura" },
  secondary = { href: "/carriere/agenti-immobiliari", label: "Vedi i ruoli" },
}) {
  return (
    <section className="py-14 md:py-18">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-[rgba(88,140,220,0.35)] bg-[linear-gradient(135deg,rgba(12,26,50,0.88)_0%,rgba(7,18,36,0.96)_100%)] p-6 sm:p-8 shadow-[0_18px_60px_rgba(10,20,40,.35)]"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[rgba(88,140,220,0.25)] blur-[120px]" />
          <div className="relative z-10 grid items-center gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl md:text-[28px] font-semibold text-[#D6E4FF]">{title}</h3>
              <p className="mt-1.5 text-[#E9F0FF]">{desc}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={primary.href}
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(88,140,220,0.45)] bg-[linear-gradient(135deg,rgba(28,52,94,0.95),rgba(18,36,66,0.95))] px-5 py-2.5 text-sm font-semibold text-[#D6E4FF] shadow-[0_10px_28px_rgba(10,20,40,.35)] hover:-translate-y-0.5 transition"
              >
                {primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(88,140,220,0.35)] px-5 py-2.5 text-sm font-semibold text-[#D6E4FF] hover:bg-white/5 transition"
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
