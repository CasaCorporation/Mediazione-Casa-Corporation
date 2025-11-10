"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, X, ChevronDown, ExternalLink, ArrowRight, Lock, Home } from "lucide-react";
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

function isActive(pathname, item) {
  if (item.href && pathname === item.href) return true;
  const starts = (href) => pathname.startsWith(href);
  if (Array.isArray(item.children) && item.children.some((c) => starts(c.href))) return true;
  if (Array.isArray(item.groups) && item.groups.some((g) => g.items.some((c) => starts(c.href)))) return true;
  return false;
}

/* ---------------- Header ---------------- */
export default function HeaderMediazioni() {
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

  const externalAreaUser = NAV.find((n) => n.external)?.href || "#";

  const primaryQuick = [
    { label: "Affitto", href: "/affitto" },
    { label: "Vendita", href: "/vendita" },
    { label: "Valorizza", href: "/valorizza" },
  ];

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
          {/* LOGO + label */}
          <div className="flex items-center gap-3">
            {/* Logo: Holding */}
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

            {/* Scritta: Index Mediazioni */}
            <Link
              href="/"
              aria-label="Home — Mediazioni Casa Corporation"
              className="hidden text-sm font-semibold sm:inline focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
            >
              <span className="text-white">Mediazioni</span>{" "}
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

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openNow(idx)}
                  onMouseLeave={() => { scheduleClose(); setHoverItem(null); }}
                >
                  {/* Trigger */}
                  {!hasDropdown ? (
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
                  ) : (
                    <button
                      type="button"
                      onClick={() => (openIdx === idx ? setOpenIdx(null) : openNow(idx))}
                      className={clsx(
                        "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40 transition",
                        active ? "text-gold" : "text-white/80 hover:text-white"
                      )}
                      aria-expanded={openIdx === idx}
                      aria-haspopup="menu"
                    >
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* AZIONI RAPIDE (al posto di "Candidati") */}
            {primaryQuick.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="ml-1 rounded-xl border border-gold/30 bg-gold/20 px-3 py-1.5 text-sm text-gold shadow-[var(--shadow-gold)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
              >
                {q.label}
              </Link>
            ))}

            {/* Area Utente (esterno) */}
            <a
              href={externalAreaUser}
              target="_blank"
              rel="noopener"
              className="rounded-xl border border-white/15 px-3 py-1.5 text-xs text-white/85 hover:bg-white/5"
            >
              Area Utente <ExternalLink className="ml-1 inline-block h-3.5 w-3.5 align-text-bottom" />
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

              if (hasChildren || hasGroups) {
                return (
                  <details key={item.label} className="group rounded-lg">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-white/90 hover:bg-white/5">
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                    </summary>

                    {hasChildren && (
                      <div className="ml-2 grid gap-1 pb-2">
                        {item.children.map((c) => (
                          <Link key={c.href} href={c.href} className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/5">
                            {c.label}
                          </Link>
                        ))}
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
                              {g.items.map((c) => (
                                <Link key={c.href} href={c.href} className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/5">
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </details>
                );
              }

              return (
                <Link key={item.label} href={item.href} className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/5">
                  {item.label}
                </Link>
              );
            })}

            {/* Bottoni rapidi + Area Utente */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {primaryQuick.map((q) => (
                <Link
                  key={`m-${q.href}`}
                  href={q.href}
                  className="rounded-lg border border-gold/30 bg-gold/20 px-3 py-2 text-center text-gold"
                >
                  {q.label}
                </Link>
              ))}
              <a
                href={externalAreaUser}
                target="_blank"
                rel="noopener"
                className="col-span-2 rounded-lg border border-white/15 px-3 py-2 text-center text-white/85 hover:bg-white/5"
              >
                Area Utente
              </a>
            </div>

            {/* Casetta Home */}
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
