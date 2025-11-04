"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Menu, X, ChevronDown, ExternalLink, Sparkles, ArrowRight, Lock, Flag, Home
} from "lucide-react";
import clsx from "clsx";
import NAV from "@/lib/nav";

/* ---------------- Utils ---------------- */
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

const norm = (s) => (s || "").toLowerCase().trim();

/* Blocca voci “Software/Gestionale” (come la Gara Live) */
function isSoftwareLocked({ label = "", href = "" }) {
  const l = norm(label);
  const h = norm(href);
  return l.includes("software") || l.includes("gestionale") || h === "/software" || h === "/gestionale";
}

function isActive(pathname, item) {
  if (item.href && pathname === item.href) return true;
  const starts = (href) => pathname.startsWith(href);
  if (Array.isArray(item.children) && item.children.some((c) => starts(c.href))) return true;
  if (Array.isArray(item.groups) && item.groups.some((g) => g.items.some((c) => starts(c.href)))) return true;
  return false;
}

/* ---------------- Header ---------------- */
export default function Header() {
  const scrolled = useScrolled(6);
  const { pathname } = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Lock scroll quando il menu mobile è aperto
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

  // Chiudi menu su cambio route o su resize >= lg
  React.useEffect(() => { setMobileOpen(false); }, [pathname]);
  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Dropdown desktop
  const [openIdx, setOpenIdx] = React.useState(null);
  const [hoverItem, setHoverItem] = React.useState(null);
  const closeTimer = React.useRef(null);

  const openNow = (idx) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenIdx(idx); };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIdx(null), 160);
  };
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  React.useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") { setOpenIdx(null); setMobileOpen(false); } };
    const onScroll = () => setOpenIdx(null);
    window.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", onScroll);
    };
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
          {/* LOGO + label separati: logo -> holding, testo -> index carriere */}
          <div className="flex items-center gap-3">
            {/* Logo: Sito principale (Holding) */}
            <a
              href="https://www.holdingcasacorporation.it"
              aria-label="Sito principale — Holding Casa Corporation"
              className="group flex items-center"
              rel="noopener"
            >
              <div className="cc-logo-anim relative h-11 w-11 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.06] active:scale-[0.98]">
                <img
                  src="/favicon.svg"
                  alt="Casa Corporation"
                  className="absolute inset-0 h-full w-full p-1 object-contain"
                  onError={(e) => { e.currentTarget.src = "/images/logo.png"; }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </a>

            {/* Scritta: Index Carriere */}
            <Link
              href="/"
              aria-label="Home — Carriere Casa Corporation"
              className="hidden text-sm font-semibold sm:inline focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
            >
              <span className="text-white">Carriere</span>{" "}
              <span className="text-gold">Casa Corporation</span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV.filter((i) => !i.external).map((item, idx) => {
              const active = isActive(pathname, item);
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              const hasGroups = Array.isArray(item.groups) && item.groups.length > 0;
              const hasDropdown = hasChildren || hasGroups;
              const isSpecialAgenti = (item.label || "").toLowerCase() === "agenti immobiliari";
              const isSpecialGara   = (item.label || "").toLowerCase() === "gara aziendale";
              const lockedSoftware  = isSoftwareLocked(item);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openNow(idx)}
                  onMouseLeave={() => { scheduleClose(); setHoverItem(null); }}
                >
                  {/* Trigger */}
                  {!hasDropdown ? (
                    lockedSoftware ? (
                      <span
                        aria-disabled="true"
                        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-white/45 cursor-not-allowed select-none"
                        title="Accesso bloccato"
                      >
                        <Lock className="h-4 w-4 opacity-70" />
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className={clsx(
                          "relative rounded-xl px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40",
                          active ? "text-gold" : "text-white/80 hover:text-white"
                        )}
                      >
                        {item.label}
                        {active && <span className="absolute inset-x-2 -bottom-1 block h-[2px] rounded bg-[var(--gold)]" />}
                      </Link>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => (openIdx === idx ? setOpenIdx(null) : openNow(idx))}
                      className={clsx(
                        "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40 transition",
                        isSpecialAgenti
                          ? "text-gold border border-gold/40 bg-gold/10 shadow-[var(--shadow-gold)] hover:bg-gold/15"
                          : active ? "text-gold" : "text-white/80 hover:text-white"
                      )}
                      aria-expanded={openIdx === idx}
                      aria-haspopup="menu"
                    >
                      {isSpecialAgenti && <Sparkles className="mr-1 h-4 w-4" />}
                      {item.label}
                      <ChevronDown className={clsx("h-4 w-4 transition-transform", openIdx === idx && "rotate-180")} />
                    </button>
                  )}

                  {/* DROPDOWN */}
                  {hasDropdown && openIdx === idx && (
                    <div
                      className="fixed inset-x-0 top-14 z-[80]"
                      onMouseEnter={cancelClose}
                      onMouseLeave={() => { scheduleClose(); setHoverItem(null); }}
                    >
                      <div className="container">
                        <div className="rounded-2xl border border-white/10 bg-[rgba(8,12,25,0.98)] shadow-2xl overflow-hidden">
                          {isSpecialAgenti ? (
                            <SpecialAgentiDropdown item={item} />
                          ) : isSpecialGara ? (
                            <SpecialGaraDropdown item={item} hoverItem={hoverItem} setHoverItem={setHoverItem} />
                          ) : (
                            <div className="grid gap-6 p-5 lg:grid-cols-3 xl:grid-cols-4">
                              {/* Colonne link */}
                              <div
                                className={clsx(
                                  "lg:col-span-2 xl:col-span-3 grid gap-5",
                                  hasChildren ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 lg:grid-cols-3"
                                )}
                              >
                                {hasChildren && item.children.map((c) => (
                                  <DropdownLink key={c.href} item={c} setHoverItem={setHoverItem} />
                                ))}
                                {hasGroups && item.groups.map((g) => (
                                  <div key={g.title}>
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">{g.title}</div>
                                    <div className="grid gap-2">
                                      {g.items.map((c) => (
                                        <DropdownLink key={c.href} item={c} setHoverItem={setHoverItem} />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Pannello anteprima */}
                              <PreviewPanel hoverItem={hoverItem} fallbackTitle={item.label} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* CTA e Area Riservata */}
            <Link
              href="/candidatura"
              className="ml-1 rounded-xl border border-gold/30 bg-gold/20 px-3 py-1.5 text-sm text-gold shadow-[var(--shadow-gold)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
            >
              Candidati
            </Link>
            <a
              href={NAV.find((n) => n.external)?.href || "#"}
              target="_blank"
              rel="noopener"
              className="rounded-xl border border-white/15 px-3 py-1.5 text-xs text-white/85 hover:bg-white/5"
            >
              Area Riservata <ExternalLink className="ml-1 inline-block h-3.5 w-3.5 align-text-bottom" />
            </a>
          </nav>

          {/* MOBILE */}
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

        {/* Overlay sotto l’header (tap per chiudere) */}
        <div
          className={clsx(
            "lg:hidden fixed inset-x-0 top-14 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity",
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* MOBILE DRAWER */}
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
            {NAV.filter((i) => !i.external).map((item) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              const hasGroups = Array.isArray(item.groups) && item.groups.length > 0;
              const isSpecialAgenti = (item.label || "").toLowerCase() === "agenti immobiliari";
              const isSpecialGara   = (item.label || "").toLowerCase() === "gara aziendale";
              const lockedSoftware  = isSoftwareLocked(item);

              if (hasChildren || hasGroups) {
                return (
                  <details
                    key={item.label}
                    className={clsx(
                      "group rounded-lg",
                      isSpecialAgenti && "border border-gold/30 bg-gold/5 shadow-[var(--shadow-gold)]"
                    )}
                  >
                    <summary className={clsx(
                      "flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5",
                      isSpecialAgenti ? "text-gold" : "text-white/90"
                    )}>
                      <span className="inline-flex items-center gap-1">
                        {isSpecialAgenti && <Sparkles className="h-4 w-4" />}
                        {item.label}
                      </span>
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                    </summary>

                    {hasChildren && (
                      <div className="ml-2 grid gap-1 pb-2">
                        {item.children.map((c) => {
                          const childLocked = isSoftwareLocked(c);
                          return childLocked ? (
                            <span
                              key={c.href}
                              aria-disabled="true"
                              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-white/45 cursor-not-allowed"
                              title="Accesso bloccato"
                            >
                              <Lock className="h-4 w-4 opacity-70" />
                              {c.label}
                            </span>
                          ) : (
                            <Link
                              key={c.href}
                              href={c.href}
                              className={clsx(
                                "rounded-lg px-3 py-2 hover:bg-white/5",
                                isSpecialAgenti ? "text-gold/95" : "text-white/90"
                              )}
                            >
                              {c.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {hasGroups && (
                      <div className="ml-2 grid gap-3 pb-2">
                        {item.groups.map((g) => (
                          <div key={g.title}>
                            <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-white/60">
                              {g.title}
                            </div>
                            <div className="grid gap-1">
                              {g.items.map((c) => {
                                const childLocked = isSoftwareLocked(c);
                                return childLocked ? (
                                  <span
                                    key={c.href}
                                    aria-disabled="true"
                                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-white/45 cursor-not-allowed"
                                    title="Accesso bloccato"
                                  >
                                    <Lock className="h-4 w-4 opacity-70" />
                                    {c.label}
                                  </span>
                                ) : (
                                  <Link key={c.href} href={c.href} className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/5">
                                    {c.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* COMPROMESSO MOBILE: teaser compatto per "Gara Aziendale" */}
                    {isSpecialGara && <MobileGaraTeaser />}
                  </details>
                );
              }

              return lockedSoftware ? (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className="block rounded-lg px-3 py-2 text-white/45 cursor-not-allowed"
                  title="Accesso bloccato"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="h-4 w-4 opacity-70" />
                    {item.label}
                  </span>
                </span>
              ) : (
                <Link key={item.label} href={item.href} className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/5">
                  {item.label}
                </Link>
              );
            })}

            {/* Bottoni Area Riservata + Candidati */}
            <div className="mt-2 flex gap-2">
              <a
                href={NAV.find((n) => n.external)?.href || "#"}
                target="_blank"
                rel="noopener"
                className="flex-1 rounded-lg border border-white/15 px-3 py-2 text-center text-white/85 hover:bg-white/5"
              >
                Area Riservata
              </a>
              <Link
                href="/candidatura"
                className="flex-1 rounded-lg border border-gold/30 bg-gold/20 px-3 py-2 text-center text-gold"
              >
                Candidati
              </Link>
            </div>

            {/* ⬇️ Casetta tonda, centrata, subito sotto */}
            <div className="mt-3 flex justify-center">
              <Link
                href="/"
                aria-label="Home"
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/90 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
              >
                <Home className="h-6 w-6" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animazione delicata del mark (float) */}
      <style jsx>{`
        @keyframes ccFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        .cc-logo-anim { animation: ccFloat 6s ease-in-out infinite; will-change: transform; }
      `}</style>
    </header>
  );
}

/* ------------- Sottocomponenti ------------- */
function DropdownLink({ item, setHoverItem }) {
  const locked = isSoftwareLocked(item);
  if (locked) {
    return (
      <span
        aria-disabled="true"
        className="block rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/45 cursor-not-allowed select-none"
        title="Accesso bloccato"
      >
        <div className="flex items-start gap-2">
          <Lock className="mt-0.5 h-4 w-4 opacity-70" />
          <div>
            <div className="font-medium">{item.label}</div>
            {item.preview?.desc && <div className="mt-0.5 text-xs text-white/60 line-clamp-2">{item.preview.desc}</div>}
          </div>
        </div>
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHoverItem(item.preview || { title: item.label, desc: "", image: null })}
      className="block rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-white/90 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
    >
      <div className="font-medium">{item.label}</div>
      {item.preview?.desc && <div className="mt-0.5 text-xs text-white/60 line-clamp-2">{item.preview.desc}</div>}
    </Link>
  );
}

function PreviewPanel({ hoverItem, fallbackTitle }) {
  const [errored, setErrored] = React.useState(false);
  const title = hoverItem?.title || fallbackTitle;
  const desc  = hoverItem?.desc  || "Scegli una voce per vedere i dettagli.";
  const img   = !errored ? hoverItem?.image : null;

  return (
    <div className="hidden lg:block">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 h-full">
        <div className="text-sm uppercase tracking-wide text-white/60">Anteprima</div>
        <div className="mt-2 text-lg font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm text-white/70">{desc}</div>

        <div className="mt-3 h-32 w-full overflow-hidden rounded-xl border border-white/10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(140px_140px_at_30%_40%,rgba(201,168,110,0.22),transparent),radial-gradient(180px_180px_at_70%_60%,rgba(184,148,88,0.16),transparent)]" />
          {img && (
            <Image
              src={img}
              alt={title}
              fill
              sizes="(min-width: 1024px) 300px, 100vw"
              className="object-cover"
              onError={() => setErrored(true)}
              priority={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ------- Dropdown speciale Agenti Immobiliari — FULL IMAGE CARDS ------- */
function SpecialAgentiDropdown({ item }) {
  const roles = Array.isArray(item.children) ? item.children : [];

  return (
    <div className="grid gap-0 p-0 lg:grid-cols-3 xl:grid-cols-4">
      {/* HERO gold (invariato) */}
      <div className="relative overflow-hidden lg:col-span-1">
        <div className="h-full w-full p-5">
          <div className="relative h-full w-full rounded-2xl border border-gold/30 bg-gold/10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_30%_10%,rgba(201,168,110,0.25),transparent),radial-gradient(400px_320px_at_80%_70%,rgba(201,168,110,0.18),transparent)]" />
            <div className="relative p-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/20 px-3 py-1 text-[11px] font-semibold text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                Focus Carriere
              </div>
              <h3 className="mt-3 text-xl font-semibold text-gold">Agenti immobiliari</h3>
              <p className="mt-1 text-sm text-white/70">
                Junior Executive, Corporate Senior e Leader Corporate. Percorsi chiari, strumenti proprietari.
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/candidatura"
                  className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/20 px-3 py-2 text-sm text-gold shadow-[var(--shadow-gold)] hover:-translate-y-0.5 transition"
                >
                  Candidati ora <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/carriere/confronto"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-white/85 hover:bg-white/5"
                >
                  Vedi confronto
                </Link>
              </div>
            </div>
            <div className="relative mt-3 h-28 w-full overflow-hidden rounded-b-2xl border-t border-gold/20">
              <div className="absolute inset-0 bg-[radial-gradient(140px_140px_at_30%_40%,rgba(201,168,110,0.22),transparent),radial-gradient(180px_180px_at_70%_60%,rgba(184,148,88,0.16),transparent)]" />
              {item.preview?.image && (
                <Image
                  src={item.preview.image}
                  alt="Agenti immobiliari"
                  fill
                  sizes="(min-width:1024px) 360px, 100vw"
                  className="object-cover opacity-80"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ROLE CARDS — immagini FULL del contenitore */}
      <div className="lg:col-span-2 xl:col-span-3 grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] transition focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
          >
            {/* Media full-card */}
            <div className="relative h-44 sm:h-52 lg:h-56 xl:h-60 w-full">
              {/* Glow dorato leggero */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[.22]"
                style={{
                  background:
                    "radial-gradient(60% 40% at 85% 0%, rgba(201,168,110,.26), rgba(201,168,110,0))",
                }}
              />
              {r.preview?.image && (
                <Image
                  src={r.preview.image}
                  alt={r.label}
                  fill
                  sizes="(min-width:1280px) 360px, (min-width:1024px) 320px, 100vw"
                  className="object-cover"
                  priority={false}
                />
              )}
              {/* Gradiente di lettura */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,12,25,0.78)] via-[rgba(8,12,25,0.28)] to-transparent" />
              {/* Chip in alto a destra */}
              <div className="absolute right-2 top-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-semibold text-white/85">
                RUOLO
              </div>
            </div>

            {/* Copy overlay inferiore */}
            <div className="relative -mt-10 px-4 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-white">{r.label}</div>
                  {r.preview?.desc && (
                    <div className="mt-0.5 text-sm text-white/70 line-clamp-2">{r.preview.desc}</div>
                  )}
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-white/70 transition group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------- Dropdown speciale Gara Aziendale (invariato) ------- */
function SpecialGaraDropdown({ item, hoverItem, setHoverItem }) {
  const groups = Array.isArray(item.groups) ? item.groups : [];

  return (
    <div className="grid gap-6 p-5 lg:grid-cols-3 xl:grid-cols-5">
      {/* 1) COLONNA LINK */}
      <div className="lg:col-span-2 xl:col-span-3">
        {groups.map((g) => (
          <div key={g.title} className="mb-4 last:mb-0">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">
              {g.title}
            </div>
            <div className="grid gap-2">
              {g.items.map((c) => (
                <DropdownLink key={c.href} item={c} setHoverItem={setHoverItem} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2) CARD “LA GARA (LIVE)” */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="relative overflow-hidden rounded-2xl border border-gold/35 bg-white/[0.02] shadow-[0_12px_40px_rgba(10,20,40,.45)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(255,255,255,.18) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255,255,255,.18) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(255,255,255,.18) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.18) 75%)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
            }}
          />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />

          <div className="relative p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/30 px-3 py-1 text-[11px] font-semibold text-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M14 3v18l-4-2-4 2V3l4 2 4-2z"/></svg>
              La Gara (Live)
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">Tabellone live & Classifiche</h3>
            <p className="mt-1 text-sm text-white/70">Punteggi aggiornati, ranking e premi. Accesso aziendale.</p>
            <div className="mt-4">
              <a
                href="/carriere/gara-live"
                aria-disabled="true"
                tabIndex={-1}
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white/80 cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90" fill="currentColor">
                  <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 016 0v3H9z"/>
                </svg>
                Accesso bloccato
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 top-5 rotate-45 bg-gold/20 text-gold border border-gold/40 px-8 py-1 text-[11px] font-semibold tracking-widest">
            BLOCCATO
          </div>
        </div>
      </div>

      {/* 3) ANTEPRIMA */}
      <div className="hidden xl:block xl:col-span-1">
        <PreviewPanel hoverItem={hoverItem} fallbackTitle={item.label} />
      </div>
    </div>
  );
}

/* ------- Teaser Mobile per “Gara Aziendale” ------- */
function MobileGaraTeaser() {
  return (
    <div className="mt-3 mx-1 rounded-xl border border-gold/35 bg-white/[0.03] p-3 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,.18) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,.18) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,.18) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.18) 75%)
          `,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gold/20 blur-xl" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-black/30 px-2.5 py-1 text-[10px] font-semibold text-gold">
          <Flag className="h-3 w-3" />
          La Gara (Live)
        </div>
        <div className="mt-2 text-sm font-semibold">Tabellone & Classifiche</div>
        <div className="mt-0.5 text-xs text-white/75">Accesso riservato. In arrivo.</div>
        <div className="mt-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.05] px-2.5 py-1.5 text-xs text-white/80">
            <Lock className="h-3.5 w-3.5" />
            Accesso bloccato
          </span>
        </div>
      </div>
    </div>
  );
}
