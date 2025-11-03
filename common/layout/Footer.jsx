"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import NAV from "@/lib/nav";
import { Mail, Phone, MapPin, ExternalLink, Lock } from "lucide-react";

/* ============== Utils ============== */
const norm = (s) => (s || "").toLowerCase().trim();
const isHttp = (href) => /^https?:\/\//i.test(href || "");

// Voce bloccata localmente
function isGaraLive({ label, href }) {
  const l = norm(label);
  const h = norm(href);
  return (l.includes("gara") && l.includes("live")) || h === "/carriere/gara-live";
}

/** Link smart: blocca Gara Live; esterni con target; altrimenti Link interno */
function FooterLinkSmart({ sectionLabel, itemLabel, href, className = "", children }) {
  const disabled = isGaraLive({ label: itemLabel || sectionLabel, href });
  const external = !disabled && isHttp(href);

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex items-center gap-1.5 cursor-not-allowed select-none text-white/60 ${className}`}
        title="Non disponibile"
      >
        <Lock className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
        <span>{children}</span>
      </span>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={`inline-flex items-center gap-1 ${className}`}>
        {children}
        <ExternalLink className="h-3.5 w-3.5 opacity-75" />
      </a>
    );
  }

  return (
    <Link href={href || "#"} className={className}>
      {children}
    </Link>
  );
}

/** Sezioni dal NAV (solo root non esterni + figli/gruppi) */
function buildSections(nav) {
  const roots = (nav || []).filter((i) => !i.external);
  return roots.map((root) => {
    const children = [
      ...(root.children || []),
      ...((root.groups || []).flatMap((g) => g.items || [])),
    ];
    const items =
      children.length > 0
        ? children
        : root.href
        ? [{ label: root.label, href: root.href }]
        : [];
    return {
      title: root.label,
      groups: root.groups || [],
      items: dedupe(items).slice(0, 6),
      rootHref: root.href || null,
    };
  });
}

function dedupe(items) {
  const seen = new Set();
  return (items || []).filter((it) => {
    const key = `${it.label || ""}|${it.href || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ============== Footer ============== */
export default function CareersFooter() {
  const year = new Date().getFullYear();
  const sections = buildSections(NAV).filter((s) => s.items.length > 0);
  const areaRiservata = NAV.find((n) => n.external)?.href || "#";

  return (
    <footer className="relative mt-8 md:mt-12 bg-[var(--brand-dark)] text-sm text-white/80">
      {/* Sfondo leggero, più basso */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div className="absolute inset-x-0 top-0 h-24 md:h-28 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(201,168,110,0.15),transparent_70%)]" />
      </div>

      <div className="container py-8 md:py-10">
        {/* Top: Brand + colonne (CTA rimossa) */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand/contatti */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-xl ring-1 ring-[var(--gold)]/40">
                {/* ICONA CORRETTA (allineata all’header) */}
                <Image
                  src="/favicon.svg"
                  alt="Casa Corporation"
                  fill
                  className="object-contain p-1"
                  sizes="44px"
                  priority={false}
                />
              </div>
              <div className="text-lg font-semibold text-white">
                Carriere <span className="text-gold">Casa Corporation</span>
              </div>
            </div>

            <p className="mt-3 max-w-md text-white/65">
              Percorsi chiari, formazione continua, strumenti proprietari: entra in un team con obiettivi misurabili.
            </p>

            <div className="mt-5 space-y-2 text-white/80">
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-white/50" />
                <a href="mailto:casacorporationcampari@gmail.com" className="hover:text-white">
                  casacorporationcampari@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-white/50" />
                <a href="tel:+390669277410" className="hover:text-white">
                  +39 06 69 27 7410
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-white/50" />
                <span>Roma 6 S.R.L. • P.IVA 17552701009</span>
              </div>

              <div className="pt-3">
                <a
                  href={areaRiservata}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-1.5 text-white/85 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Area Riservata <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Colonne link */}
          <nav className="grid gap-8 sm:grid-cols-2 md:grid-cols-3" aria-label="Collegamenti footer">
            {sections.slice(0, 3).map((section) => (
              <div key={section.title}>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">
                  {section.title}
                </div>
                <ul className="grid gap-1">
                  {section.items.map((it) => (
                    <li key={`${section.title}-${it.label}`}>
                      <FooterLinkSmart
                        sectionLabel={section.title}
                        itemLabel={it.label}
                        href={it.href}
                        className="rounded-lg px-1 py-1 text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15"
                      >
                        {it.label}
                      </FooterLinkSmart>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Colonna extra: Link rapidi + Gara Live bloccata */}
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">
                Link
              </div>
              <ul className="grid gap-1">
                {/* Bloccata localmente */}
                <li>
                  <FooterLinkSmart
                    sectionLabel="Gara Aziendale"
                    itemLabel="Gara (Live)"
                    href="/carriere/gara-live"
                    className="rounded-lg px-1 py-1"
                  >
                    Gara (Live)
                  </FooterLinkSmart>
                </li>

                {NAV.filter((n) => !n.external && n.href)
                  .slice(0, 4)
                  .map((l) => (
                    <li key={`quick-${l.label}`}>
                      <FooterLinkSmart
                        sectionLabel={l.label}
                        itemLabel={l.label}
                        href={l.href}
                        className="rounded-lg px-1 py-1 text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15"
                      >
                        {l.label}
                      </FooterLinkSmart>
                    </li>
                  ))}

                <li>
                  <Link
                    href="/privacy"
                    className="rounded-lg px-1 py-1 text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termini"
                    className="rounded-lg px-1 py-1 text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15"
                  >
                    Termini
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Divider più stretto */}
        <div className="my-6 h-px w-full bg-white/[0.08]" />

        {/* Bottom */}
        <div className="grid items-center gap-3 sm:grid-cols-2">
          <div className="text-xs text-white/60">
            © {year} Casa Corporation — Tutti i diritti riservati.
          </div>
          <div className="justify-self-start sm:justify-self-end">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/70">
              <li>
                <Link href="/cookie" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15 rounded">
                  Cookie
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15 rounded">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/termini" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15 rounded">
                  Termini
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/15 rounded">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
