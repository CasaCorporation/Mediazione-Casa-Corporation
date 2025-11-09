"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * LocalNavPills — Slim, centered, glassy + watermark
 *
 * props:
 * - items:     [{ id: "section-id", label: "01", title?: "Il ruolo in breve" }, ...]
 * - topOffset: CSS per sticky top (default: var(--header-h, 56px))
 * - theme:     { bg, accent, ring }  (opzionali, di base super-trasparente)
 * - watermark: string (es. roleTitle) → filigrana ripetuta nella barra
 *
 * Differenze chiave:
 * - Pill ultra-slim: 26→28px, font 10px
 * - Barra più trasparente: glass soft + ring tenue
 * - Sempre centrata (anche su mobile); se overflow, centriamo l’attiva
 * - Nessun indicatore inferiore; la pill attiva si illumina (glow soft)
 * - Filigrana animata (pan lentissimo), non invadente
 */
export default function LocalNavPills({
  items = [],
  topOffset = "var(--header-h, 56px)",
  theme = {},
  watermark = "",
}) {
  const [active, setActive] = useState(items?.[0]?.id || null);
  const [stuck, setStuck] = useState(false);

  // tema runtime (ancora più trasparente)
  const defaultBg = theme.bg ?? "rgba(12,26,50,.22)";
  const defaultAccent = theme.accent ?? "var(--gold)";
  const defaultRing = theme.ring ?? "rgba(255,255,255,.08)";
  const [t, setT] = useState({ bg: defaultBg, accent: defaultAccent, ring: defaultRing });

  const sentRef = useRef(null);
  const scrollerRef = useRef(null);
  const navRef = useRef(null);
  const rowRef = useRef(null);
  const rafRef = useRef(null);
  const lockUntilRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const prevActiveRef = useRef(null);

  const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());
  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 767.98px)").matches;

  const esc = (s) => {
    try { return CSS?.escape ? CSS.escape(s) : String(s).replace(/[^a-zA-Z0-9_\-]/g, "\\$&"); }
    catch { return String(s); }
  };
  const schedule = (cb) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(cb);
  };

  // costruzione watermark (ripetuto + separatore)
  const watermarkRow = useMemo(() => {
    if (!watermark) return "";
    const token = String(watermark).toUpperCase().trim();
    return Array(40).fill(token).join("   •   ");
  }, [watermark]);

  // sticky sentinel
  useEffect(() => {
    const sent = sentRef.current;
    if (!sent) return;
    const headerPx = getHeaderPx();
    const obs = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting),
      { rootMargin: `-${headerPx}px 0px 0px 0px` }
    );
    obs.observe(sent);
    return () => obs.disconnect();
  }, []);

  // scroll spy
  useEffect(() => {
    if (!items?.length) return;
    const headerPx = getHeaderPx();
    const sections = items.map((it) => document.getElementById(it.id)).filter(Boolean);
    sections.forEach((el) => (el.style.scrollMarginTop = `${headerPx + 12}px`));

    const obs = new IntersectionObserver(
      (ents) => {
        if (now() < lockUntilRef.current) return;
        const vis = ents.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topMost = vis[0];
        if (topMost) {
          const id = topMost.target.id;
          const prev = prevActiveRef.current;
          prevActiveRef.current = id;
          setActive(id);
          schedule(() => {
            maybeCenterChip(id, false);
            peekAdjacentChip(id, prev);
          });
        }
      },
      { rootMargin: `-${headerPx + 18}px 0px -60% 0px`, threshold: 0.01 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // deep-link iniziale + centratura mobile
  useEffect(() => {
    const run = () => {
      const hash = decodeURIComponent(window.location.hash || "");
      if (!hash) {
        // se non c’è hash, centra l'attuale/1ª chip su mobile
        schedule(() => maybeCenterChip(active || items?.[0]?.id, false));
        return;
      }
      const id = hash.replace(/^#/, "");
      if (!document.getElementById(id)) return;
      prevActiveRef.current = id;
      setActive(id);
      lockUntilRef.current = now() + 400;
      setTimeout(() => { maybeCenterChip(id, true); }, 20);
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // resize/orient/scroll scroller → riallineo centratura
  useEffect(() => {
    const onR = () => schedule(() => maybeCenterChip(active || items?.[0]?.id, false));
    const sc = scrollerRef.current;
    window.addEventListener("resize", onR);
    window.addEventListener("orientationchange", onR);
    sc?.addEventListener("scroll", onR, { passive: true });
    const ro = new ResizeObserver(onR);
    if (navRef.current) ro.observe(navRef.current);
    if (rowRef.current) ro.observe(rowRef.current);
    return () => {
      window.removeEventListener("resize", onR);
      window.removeEventListener("orientationchange", onR);
      sc?.removeEventListener("scroll", onR);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items]);

  // wheel → orizzontale (desktop)
  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    const onWheel = (e) => {
      const max = sc.scrollWidth - sc.clientWidth;
      if (max <= 0) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const prev = sc.scrollLeft;
        sc.scrollLeft = Math.max(0, Math.min(max, prev + e.deltaY));
        if (sc.scrollLeft !== prev) e.preventDefault();
      }
    };
    sc.addEventListener("wheel", onWheel, { passive: false });
    return () => sc.removeEventListener("wheel", onWheel);
  }, []);

  // cleanup raf
  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  // tema runtime live
  useEffect(() => { setT({ bg: defaultBg, accent: defaultAccent, ring: defaultRing }); },
    [defaultBg, defaultAccent, defaultRing]);

  useEffect(() => {
    const handler = (e) => {
      const det = e?.detail || {};
      setT((cur) => ({
        bg: det.bg ?? cur.bg,
        accent: det.accent ?? cur.accent,
        ring: det.ring ?? cur.ring,
      }));
      schedule(() => maybeCenterChip(active || items?.[0]?.id, false));
    };
    window.addEventListener("localnav:theme", handler);
    return () => window.removeEventListener("localnav:theme", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items]);

  // Drift orizzontale controllato durante scroll verticale
  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollYRef.current = window.pageYOffset || document.documentElement.scrollTop || 0;

    const onWinScroll = () => {
      if (now() < lockUntilRef.current) return;
      const sc = scrollerRef.current;
      if (!sc) return;
      const max = sc.scrollWidth - sc.clientWidth;
      if (max <= 0) return;

      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      const dy = y - lastScrollYRef.current;
      lastScrollYRef.current = y;
      if (!dy) return;

      const K = isMobile() ? 0.16 : 0.08;
      const next = Math.max(0, Math.min(max, sc.scrollLeft + dy * K));
      if (next !== sc.scrollLeft) sc.scrollLeft = next;
    };

    window.addEventListener("scroll", onWinScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWinScroll);
  }, []);

  const onChipClick = (e, id) => {
    e.preventDefault();
    const sel = document.getElementById(id);
    if (!sel) return;

    prevActiveRef.current = id;
    setActive(id);
    lockUntilRef.current = now() + 600;

    schedule(() => { maybeCenterChip(id, true); });

    const headerPx = getHeaderPx();
    const y = sel.getBoundingClientRect().top + window.pageYOffset - (headerPx + 12);
    try { window.scrollTo({ top: y, behavior: "smooth" }); }
    catch { window.scrollTo(0, y); }

    setTimeout(() => { lockUntilRef.current = 0; }, 700);
  };

  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const anchors = Array.from(navRef.current?.querySelectorAll("a[data-chip]") || []);
    if (!anchors.length) return;
    const idx = Math.max(0, anchors.findIndex((a) => a.getAttribute("data-id") === active));
    const next = e.key === "ArrowRight" ? Math.min(idx + 1, anchors.length - 1) : Math.max(idx - 1, 0);
    anchors[next]?.focus();
    anchors[next]?.click();
  };

  const maybeCenterChip = (id, smooth) => {
    const scroller = scrollerRef.current;
    const nav = navRef.current;
    if (!scroller || !nav || !id) return;
    const chip = nav.querySelector(`a[data-id="${esc(id)}"]`);
    if (!chip) return;

    const cr = chip.getBoundingClientRect();
    const sr = scroller.getBoundingClientRect();
    const outLeft = cr.left < sr.left + 8;
    const outRight = cr.right > sr.right - 8;

    if (outLeft || outRight) {
      chip.scrollIntoView({ inline: "center", block: "nearest", behavior: smooth ? "smooth" : "auto" });
    }
  };

  const peekAdjacentChip = (currId, prevId) => {
    if (!isMobile()) return;
    const sc = scrollerRef.current;
    const nav = navRef.current;
    if (!sc || !nav) return;

    const currIdx = items.findIndex((i) => i.id === currId);
    if (currIdx < 0) return;

    let dir = "right";
    if (prevId) {
      const prevIdx = items.findIndex((i) => i.id === prevId);
      if (prevIdx >= 0) dir = currIdx < prevIdx ? "left" : "right";
    }

    const targetIdx = dir === "right" ? Math.min(currIdx + 1, items.length - 1) : Math.max(currIdx - 1, 0);
    if (targetIdx === currIdx) return;

    const target = nav.querySelector(`a[data-id="${esc(items[targetIdx].id)}"]`);
    if (!target) return;

    const tr = target.getBoundingClientRect();
    const sr = sc.getBoundingClientRect();
    const peek = 14;

    if (dir === "right") {
      const overflowRight = tr.right - (sr.right - peek);
      if (overflowRight > 0) sc.scrollLeft += overflowRight;
    } else {
      const overflowLeft = (sr.left + peek) - tr.left;
      if (overflowLeft > 0) sc.scrollLeft -= overflowLeft;
    }
  };

  return (
    <>
      <div ref={sentRef} />

      <div
        className={[
          "sticky z-40 border-b backdrop-blur-sm supports-[backdrop-filter]:bg-opacity-60",
          stuck ? "shadow-[0_8px_28px_rgba(0,0,0,.22)]" : "",
        ].join(" ")}
        style={{
          top: topOffset,
          background: t.bg,
          borderColor: t.ring,
          ["--ln-bg"]: t.bg,
          ["--ln-accent"]: t.accent,
        }}
      >
        <div className="relative">
          {/* FILIGRANA / WATERMARK */}
          {watermarkRow && (
            <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              <div className="absolute inset-0 opacity-[0.07]">
                <div className="wm-mask">
                  <div className="wm-row animate-watermarkPan">{watermarkRow}</div>
                  <div className="wm-row animate-watermarkPan delay-30s">{watermarkRow}</div>
                </div>
              </div>
            </div>
          )}

          <div className="container">
            {/* gradienti laterali su mobile (leggerissimi) */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[color:var(--ln-bg)]/70 to-transparent md:hidden" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[color:var(--ln-bg)]/70 to-transparent md:hidden" />

            {/* scroller orizzontale (sempre centrato) */}
            <div
              ref={scrollerRef}
              className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x pan-y",
                overscrollBehaviorX: "contain",
              }}
              onKeyDown={onKeyDown}
            >
              <nav ref={navRef} aria-label="Navigazione locale" className="relative py-1.5">
                <div className="relative">
                  <div
                    ref={rowRef}
                    className="flex gap-1.5 whitespace-nowrap justify-center md:justify-center"
                  >
                    {/* spacer sinistro mobile */}
                    <span aria-hidden className="shrink-0 w-2 md:hidden" />
                    {items.map((it) => {
                      const isActive = active === it.id;
                      return (
                        <a
                          key={it.id}
                          data-chip
                          data-id={it.id}
                          href={`#${it.id}`}
                          onClick={(e) => onChipClick(e, it.id)}
                          aria-current={isActive ? "true" : undefined}
                          aria-label={it.title || it.id}
                          className={[
                            "inline-flex items-center justify-center rounded-full",
                            "h-[26px] w-[26px] md:h-[28px] md:w-[28px] text-[10px] font-semibold outline-none transition",
                            isActive
                              ? [
                                  "bg-white/14 text-white ring-1 ring-white/30",
                                  "shadow-[0_0_22px_rgba(155,190,255,.22),0_0_26px_rgba(201,168,110,.14)]",
                                  "backdrop-blur-[2px] scale-[1.03]",
                                ].join(" ")
                              : "bg-white/[0.04] text-white/80 ring-1 ring-white/10 hover:bg-white/[0.08] focus-visible:ring-white/30",
                          ].join(" ")}
                        >
                          {it.label}
                        </a>
                      );
                    })}
                    {/* spacer destro mobile */}
                    <span aria-hidden className="shrink-0 w-6 md:hidden" />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.no-scrollbar) { -ms-overflow-style: none; scrollbar-width: none; }
        :global(.no-scrollbar::-webkit-scrollbar) { display: none; }

        /* Filigrana */
        .wm-mask {
          position: absolute;
          inset: 0;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        .wm-row {
          white-space: nowrap;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          font-size: 10px;
          line-height: 1;
          color: rgba(214,228,255,0.06);
          text-shadow: 0 1px 0 rgba(0,0,0,0.06);
        }
        .animate-watermarkPan {
          animation: watermarkPan 60s linear infinite;
          will-change: transform;
        }
        .delay-30s { animation-delay: 30s; }
        @keyframes watermarkPan {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(html:focus-within) { scroll-behavior: auto; }
          .animate-watermarkPan { animation: none; }
        }
      `}</style>
    </>
  );
}

/* utils */
function getHeaderPx() {
  if (typeof window === "undefined") return 56;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h") || "56px";
  const px = parseInt(raw, 10);
  return Number.isFinite(px) ? px : 56;
}
