// components/layout/Header.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import NAV from "@/lib/nav";

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function isActive(pathname, item) {
  if (item.href && pathname === item.href) return true;
  return false;
}

export default function Header() {
  const scrolled = useScrolled(6);
  const { pathname } = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    if (mobileOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [mobileOpen]);

  React.useEffect(() => { setMobileOpen(false); }, [pathname]);
  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <div
        className={clsx(
          "border-b transition-colors",
          scrolled
            ? "bg-[rgba(8,12,25,0.75)] backdrop-blur border-white/10"
            : "bg-[rgba(8,12,25,0.45)] backdrop-blur-sm border-white/10"
        )}
      >
        <div className="container flex h-14 items-center justify-between">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Home — Mediazione Casa Corporation" className="group flex items-center">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.06] active:scale-[0.98] ring-1 ring-[var(--gold)]/40">
                <Image src="/favicon.svg" alt="Casa Corporation" fill className="object-contain p-1" priority sizes="44px" />
              </div>
            </Link>
            <Link
              href="/"
              aria-label="Home — Mediazione Casa Corporation"
              className="hidden text-sm font-semibold sm:inline focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
            >
              <span className="text-white">Mediazione</span>{" "}
              <span className="text-gold">Casa Corporation</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV.map((item) => {
              const active = isActive(pathname, item);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    "relative rounded-xl px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40",
                    active ? "text-gold" : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-2 -bottom-1 block h-[2px] rounded bg-[var(--gold)]" />}
                </Link>
              );
            })}

            {/* CTA: Percorso guidato */}
            <Link
              href="/percorso-guidato"
              className="ml-1 rounded-xl border border-gold/30 bg-gold/20 px-3 py-1.5 text-sm text-gold shadow-[var(--shadow-gold)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
            >
              Percorso guidato
            </Link>

            {/* Area Venditore — NON linkata */}
            <span
              aria-disabled="true"
              title="In arrivo"
              className="rounded-xl border border-white/15 px-3 py-1.5 text-xs text-white/85 select-none cursor-not-allowed"
            >
              Area Venditore
            </span>
          </nav>

          {/* Mobile toggler */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Apri menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            className="lg:hidden rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          className={clsx(
            "lg:hidden fixed inset-x-0 top-14 z-[80] border-t border-white/10 bg-[rgba(8,12,25,0.98)] transition-transform duration-200 will-change-transform",
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          )}
          style={{ maxHeight: "calc(100dvh - 56px)" }}
        >
          <div className="max-h[calc(100dvh-56px)] px-3 pb-3 pt-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-2">
              {/* Percorso guidato (link interno) */}
              <Link
                href="/percorso-guidato"
                className="rounded-lg border border-gold/30 bg-gold/15 px-3 py-2 text-center text-gold"
              >
                Percorso guidato
              </Link>

              {/* Area Venditore (non linkata) */}
              <span
                aria-disabled="true"
                className="rounded-lg border border-white/15 px-3 py-2 text-center text-white/85 select-none cursor-not-allowed"
                title="In arrivo"
              >
                Area Venditore
              </span>
            </div>

            <div className="mt-3 flex justify-center">
              <Link
                href="/"
                aria-label="Home"
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/90 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
              >
                <span className="sr-only">Home</span>
                {/* semplice icona home via emoji per evitare import extra */}
                🏠
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
