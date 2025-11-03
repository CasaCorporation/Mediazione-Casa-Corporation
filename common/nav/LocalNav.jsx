"use client";
import { useEffect, useRef, useState } from "react";

/**
 * LocalNav — navigazione intra-pagina riutilizzabile e stabile su mobile
 *
 * props:
 * - items:     [{ id: "section-id", label: "Etichetta" }, ...]
 * - topOffset: CSS value per sticky top (default: var(--header-h, 56px))
 * - theme:     { bg, accent, ring } (colori opzionali)
 *
 * Patch:
 * - micro-spacer sinistro su mobile
 * - peeking orizzontale controllato durante scroll verticale (mobile)
 * - allineamento orizzontale indicatore più preciso (desktop)
 */
export default function LocalNav({
  items = [],
  topOffset = "var(--header-h, 56px)",
  theme = {},
}) {
  const [active, setActive] = useState(items?.[0]?.id || null);
  const [stuck, setStuck] = useState(false);

  // tema runtime (invariato)
  const defaultBg = theme.bg ?? "color-mix(in oklab, var(--brand) 80%, transparent)";
  const defaultAccent = theme.accent ?? "var(--gold)";
  const defaultRing = theme.ring ?? "rgba(255,255,255,.14)";
  const [t, setT] = useState({ bg: defaultBg, accent: defaultAccent, ring: defaultRing });

  const sentRef = useRef(null);
  const scrollerRef = useRef(null);
  const navRef = useRef(null);
  const rowRef = useRef(null);
  const indicatorRef = useRef(null);
  const rafRef = useRef(null);
  const lockUntilRef = useRef(0);
  const lastScrollYRef = useRef(0); // traccia lo scroll verticale per drift orizzontale
  const prevActiveRef = useRef(null); // per capire direzione di scroll tra sezioni (mobile)

  // util
  const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());
  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 767.98px)").matches;

  const esc = (s) => {
    try {
      return CSS?.escape ? CSS.escape(s) : String(s).replace(/[^a-zA-Z0-9_\-]/g, "\\$&");
    } catch {
      return String(s);
    }
  };
  const schedule = (cb) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(cb);
  };

  // sticky
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

    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);

    sections.forEach((el) => (el.style.scrollMarginTop = `${headerPx + 12}px`));

    const obs = new IntersectionObserver(
      (ents) => {
        if (now() < lockUntilRef.current) return;

        const vis = ents
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topMost = vis[0];
        if (topMost) {
          const id = topMost.target.id;
          const prev = prevActiveRef.current;
          prevActiveRef.current = id;

          setActive(id);
          schedule(() => {
            positionIndicatorById(id);
            maybeCenterChip(id, false);
            // Peek controllato su mobile per mostrare la chip successiva/precedente
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

  // deep-link iniziale
  useEffect(() => {
    const run = () => {
      const hash = decodeURIComponent(window.location.hash || "");
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      if (!document.getElementById(id)) return;
      prevActiveRef.current = id;
      setActive(id);
      lockUntilRef.current = now() + 400;
      setTimeout(() => {
        positionIndicatorById(id);
        maybeCenterChip(id, true);
      }, 20);
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);

  // posizionamento/reattività indicatore
  useEffect(() => {
    schedule(() => positionIndicatorById(active || items?.[0]?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items]);

  // resize/orient/scroll scroller
  useEffect(() => {
    const onR = () => schedule(() => positionIndicatorById(active || items?.[0]?.id));
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
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // tema runtime (invariato)
  useEffect(() => {
    setT({ bg: defaultBg, accent: defaultAccent, ring: defaultRing });
  }, [defaultBg, defaultAccent, defaultRing]);

  useEffect(() => {
    const handler = (e) => {
      const det = e?.detail || {};
      setT((cur) => ({
        bg: det.bg ?? cur.bg,
        accent: det.accent ?? cur.accent,
        ring: det.ring ?? cur.ring,
      }));
      schedule(() => positionIndicatorById(active || items?.[0]?.id));
    };
    window.addEventListener("localnav:theme", handler);
    return () => window.removeEventListener("localnav:theme", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items]);

  // Drift orizzontale controllato mentre la pagina scorre in verticale
useEffect(() => {
  if (typeof window === "undefined") return;
  // inizializza posizione corrente
  lastScrollYRef.current =
    window.pageYOffset || document.documentElement.scrollTop || 0;

  const onWinScroll = () => {
    // non combattere contro lo scroll programmato (click sulle chip / deep-link)
    if (now() < lockUntilRef.current) return;

    const sc = scrollerRef.current;
    if (!sc) return;

    const max = sc.scrollWidth - sc.clientWidth;
    if (max <= 0) return; // niente overflow → niente drift

    const y =
      window.pageYOffset || document.documentElement.scrollTop || 0;
    const dy = y - lastScrollYRef.current;
    lastScrollYRef.current = y;

    if (!dy) return;

    // velocità delicata: un tocco in più su mobile, minima su desktop
    const K = isMobile() ? 0.16 : 0.08; // regola se vuoi più/meno movimento
    const next = Math.max(0, Math.min(max, sc.scrollLeft + dy * K));

    if (next !== sc.scrollLeft) {
      sc.scrollLeft = next; // trigga l'evento 'scroll' del container → indicatore si riallinea
    }
  };

  // passivo: non blocca lo scroll principale
  window.addEventListener("scroll", onWinScroll, { passive: true });
  return () => window.removeEventListener("scroll", onWinScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  // click chip
  const onChipClick = (e, id) => {
    e.preventDefault();
    const sel = document.getElementById(id);
    if (!sel) return;

    prevActiveRef.current = id;
    setActive(id);
    lockUntilRef.current = now() + 600;

    schedule(() => {
      positionIndicatorById(id);
      maybeCenterChip(id, true);
    });

    const headerPx = getHeaderPx();
    const y = sel.getBoundingClientRect().top + window.pageYOffset - (headerPx + 12);
    try {
      window.scrollTo({ top: y, behavior: "smooth" });
    } catch {
      window.scrollTo(0, y);
    }

    setTimeout(() => {
      lockUntilRef.current = 0;
      schedule(() => positionIndicatorById(id));
    }, 700);
  };

  // keyboard
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

  /* === Indicatore: calcolo preciso con bounding rect (evita drift subpixel su desktop) === */
  const positionIndicatorById = (id) => {
    if (!id) return;
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const row = rowRef.current;
    if (!nav || !indicator || !row) return;

    const chip = nav.querySelector(`a[data-id="${esc(id)}"]`);
    if (!chip) return;

    // misura precisa rispetto al wrapper riga
    const cr = chip.getBoundingClientRect();
    const rr = row.getBoundingClientRect();
    const left = cr.left - rr.left;
    const width = cr.width;

    // snap a pixel + GPU
    const snapLeft = Math.round(left);
    indicator.style.width = `${Math.round(width)}px`;
    indicator.style.transform = `translate3d(${snapLeft}px,0,0)`;
  };

  // centratura se esce
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
      chip.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  // peek controllato su mobile durante scroll verticale
  const peekAdjacentChip = (currId, prevId) => {
    if (!isMobile()) return;
    const sc = scrollerRef.current;
    const nav = navRef.current;
    if (!sc || !nav) return;

    const currIdx = items.findIndex((i) => i.id === currId);
    if (currIdx < 0) return;

    let dir = "right"; // default: fai intravedere la successiva
    if (prevId) {
      const prevIdx = items.findIndex((i) => i.id === prevId);
      if (prevIdx >= 0) dir = currIdx < prevIdx ? "left" : "right";
    }

    const targetIdx =
      dir === "right" ? Math.min(currIdx + 1, items.length - 1) : Math.max(currIdx - 1, 0);
    if (targetIdx === currIdx) return;

    const target = nav.querySelector(`a[data-id="${esc(items[targetIdx].id)}"]`);
    if (!target) return;

    const tr = target.getBoundingClientRect();
    const sr = sc.getBoundingClientRect();
    const peek = 14; // “puntina” di visibilità

    if (dir === "right") {
      const overflowRight = tr.right - (sr.right - peek);
      if (overflowRight > 0) sc.scrollLeft += overflowRight; // step secco, non “lotta” col verticale
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
          "sticky z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-opacity-60",
          stuck ? "shadow-[0_8px_28px_rgba(0,0,0,.35)]" : "",
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
          {/* gradienti laterali su mobile */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[color:var(--ln-bg)] to-transparent md:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[color:var(--ln-bg)] to-transparent md:hidden"
          />

          {/* scroller orizzontale */}
       <div
  ref={scrollerRef}
  className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible"
  style={{
    WebkitOverflowScrolling: "touch",
    // ✅ CONSENTI SIA VERTICALE CHE ORIZZONTALE QUANDO IL DITO È SULLA BARRA
    touchAction: "pan-x pan-y", // (equivale ad 'auto', ma esplicito)
    // ✅ evita rubber-band/bubbling orizzontale verso la pagina
    overscrollBehaviorX: "contain",
    // (resto invariato)
  }}
  onKeyDown={onKeyDown}
>
            <nav ref={navRef} aria-label="Navigazione locale" className="relative py-3">
              <div className="relative">
                <div ref={rowRef} className="flex gap-2 whitespace-nowrap md:flex-wrap md:whitespace-normal">
                  {/* spacer sinistro minimo SOLO mobile */}
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
                        className={[
                          "inline-flex items-center rounded-full px-3 py-1.5 text-sm outline-none transition",
                          isActive
                            ? "bg-white/15 text-white ring-1 ring-white/30"
                            : "bg-white/[0.04] text-white/90 ring-1 ring-white/15 hover:bg-white/[0.08] focus-visible:ring-white/40",
                        ].join(" ")}
                      >
                        {it.label}
                      </a>
                    );
                  })}
                  {/* spacer destro per evitare taglio ultima chip su mobile */}
                  <span aria-hidden className="shrink-0 w-6 md:hidden" />
                </div>

                {/* indicatore */}
                <span
                  ref={indicatorRef}
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 h-[2px] rounded-full transition-transform ease-out"
                  style={{
                    left: 0,
                    width: 0,
                    transition: "transform 300ms, width 220ms",
                    willChange: "transform,width",
                    background: `linear-gradient(90deg, ${t.accent}, color-mix(in oklab, ${t.accent} 40%, white))`,
                    boxShadow: "0 0 14px rgb(201 168 110 / 0.35)",
                  }}
                />
              </div>
            </nav>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.no-scrollbar) {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        :global(.no-scrollbar::-webkit-scrollbar) {
          display: none;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(html:focus-within) {
            scroll-behavior: auto;
          }
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
