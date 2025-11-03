// components/carriere/agenti-immobiliari/section/Summary.jsx
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeader from "@/common/section/SectionHeader";
import { ButtonGold, ButtonGhost } from "@/common/section/Buttons";

/**
 * Profili — Ultra Immersivo Minimal
 * - Immagini .avif con trasparenza su "palco" (floor + halo con parallax micro)
 * - KPI ring con numero che conta quando la card entra in viewport
 * - CTA comuni → /ruoli/<slug>
 * - No framer-motion, solo IO + rAF. Rispetta prefers-reduced-motion.
 * - NIENTE background di sezione: alternanza gestita da <Band> nella pagina.
 */

const ROLES = [
  {
    title: "Junior Executive",
    sub: "Percorso di abilitazione · 30%",
    slug: "junior-executive",
    img: "carriere/section/agenti-immobiliari/junior.avif",
    kpi: 30,
    points: [
      "Academy inclusa + affiancamento fino all’esame",
      "Visite sul campo (no mediazione autonoma)",
      "Zero costi fissi + premi a obiettivi",
    ],
  },
  {
    title: "Corporate Senior",
    sub: "Professionista abilitato · 60% + premi",
    slug: "corporate-senior",
    img: "carriere/section/agenti-immobiliari/senior.avif", // usa "seniore.avif" come mi hai indicato
    kpi: 60,
    points: [
      "Gara trimestrale con premi > 100%",
      "Portali e pubblicità corporate inclusi",
      "Autonomia piena + marketing dedicato",
    ],
  },
  {
    title: "Leader Corporate",
    sub: "Responsabilità di sede · Dirigenziale",
    slug: "leader-corporate",
    img: "carriere/section/agenti-immobiliari/leader.avif",
    kpi: null,         // niente %: badge DIR
    badge: "DIR",
    points: [
      "Guida Junior e presidia le trattative",
      "Compensi extra su Junior abilitati",
      "Strumenti avanzati per persone, sede, KPI",
    ],
  },
];

export default function Summary() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // === In-view: avvia KPI (anello + count) ===
    const startCount = (card, to) => {
      if (card.dataset.countStarted === "1") return;
      card.dataset.countStarted = "1";

      const ring = card.querySelector("[data-kpi-ring]");
      const num  = card.querySelector("[data-kpi-number]");

      if (ring && typeof to === "number") {
        ring.style.setProperty("--pct", String(Math.max(0, Math.min(100, to))));
        ring.classList.add("go");
      }
      if (num && typeof to === "number") {
        const duration = 900;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          num.textContent = `${Math.round(eased * to)}%`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => {
        if (e.isIntersecting) startCount(e.target, Number(e.target.dataset.kpiTarget));
      }),
      { rootMargin: "0px 0px -14% 0px", threshold: 0.35 }
    );
    root.querySelectorAll("[data-role-card]").forEach((el) => io.observe(el));

    // === Parallax micro su pointer (solo precise pointer) ===
    const hasFinePointer = matchMedia("(pointer:fine)").matches;
    if (hasFinePointer) {
      const onMove = (e) => {
        const card = e.currentTarget;
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const px = x / r.width;
        const py = y / r.height;
        // micro traslazioni
        card.style.setProperty("--tx", `${(px - 0.5) * 10}px`);
        card.style.setProperty("--ty", `${(py - 0.5) * -8}px`);
        // halo position
        card.style.setProperty("--hx", `${px * 100}%`);
        card.style.setProperty("--hy", `${py * 100}%`);
      };
      const onLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty("--tx", `0px`);
        card.style.setProperty("--ty", `0px`);
        card.style.setProperty("--hx", `50%`);
        card.style.setProperty("--hy", `60%`);
      };
      root.querySelectorAll("[data-role-card]").forEach((el) => {
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });
      return () => {
        io.disconnect();
        root.querySelectorAll("[data-role-card]").forEach((el) => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    }

    return () => io.disconnect();
  }, []);

  return (
    <section id="profili" className="relative py-16 sm:py-20 md:py-24">
      <div className="container">
        <SectionHeader
          title="Le tre figure"
          size="lg"
          tone="dark"
          underline
          className="mb-10 sm:mb-12"
        />

        <div ref={rootRef} className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-3">
          {ROLES.map((r) => (
            <article
              key={r.slug}
              data-role-card
              data-kpi-target={r.kpi ?? ""}
              className="card"
            >
              {/* STAGE: immagine trasparente + floor + halo parallax */}
              <div className="stage">
                {/* floor */}
                <div className="floor" aria-hidden />
                {/* halo dinamico */}
                <div className="halo" aria-hidden />
                {/* immagine */}
                <div className="img-wrap">
                  <Image
                    src={r.img}
                    alt={`${r.title} — Casa Corporation`}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    priority={false}
                  />
                </div>

                {/* KPI o badge */}
                {typeof r.kpi === "number" ? (
                  <div className="kpi" aria-label={`KPI ${r.kpi}%`}>
                    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden>
                      <defs>
                        <filter id="kpiGlow">
                          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(201,168,110,.55)" />
                        </filter>
                      </defs>
                      <circle cx="32" cy="32" r="24" className="kpi-bg" />
                      <circle
                        cx="32"
                        cy="32"
                        r="24"
                        pathLength="100"
                        data-kpi-ring
                        className="kpi-fg"
                        style={{ strokeDasharray: "0 100" }}
                        filter="url(#kpiGlow)"
                      />
                    </svg>
                    <div className="kpi-num" data-kpi-number>0%</div>
                  </div>
                ) : (
                  <div className="pill">{r.badge}</div>
                )}
              </div>

              {/* BODY */}
              <div className="body">
                <h3 className="h3">{r.title}</h3>
                <p className="sub">{r.sub}</p>

                <ul className="list">
                  {r.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>

                <div className="actions">
                  <ButtonGold href={`/ruoli/${r.slug}`}>Vai al profilo</ButtonGold>
                  <ButtonGhost href={`/ruoli/${r.slug}`} withArrow={false}>Approfondisci</ButtonGhost>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .card{
          display:grid; grid-template-rows: 240px auto;
          border-radius: 20px; overflow:hidden;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease;
          will-change: transform;
        }
        @media (min-width:640px){ .card{ grid-template-rows: 260px auto; } }
        .card:hover{
          transform: translateY(-6px);
          border-color: color-mix(in oklab, var(--gold) 56%, #000 44%);
          background: rgba(255,255,255,0.03);
          box-shadow:
            0 18px 42px rgba(0,0,0,.38),
            0 0 0 1px rgba(201,168,110,.22);
        }

        /* ===== Stage immersivo ===== */
        .stage{
          position:relative; isolation:isolate; overflow:hidden;
          background:
            radial-gradient(42% 30% at var(--hx,50%) var(--hy,60%), rgba(29,45,94,.35), transparent 62%),
            radial-gradient(24% 18% at 50% 85%, rgba(201,168,110,.12), transparent 72%);
        }
        /* floor: pedana ellittica sotto ai PNG trasparenti */
        .floor{
          position:absolute; left:50%; bottom:6%;
          width:72%; height:22%;
          transform: translateX(-50%);
          background:
            radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,.35), transparent 65%);
          filter: blur(14px);
          opacity:.65;
          pointer-events:none;
        }
        .halo{
          position:absolute; inset:0;
          background:
            radial-gradient(50% 45% at var(--hx,50%) var(--hy,60%), rgba(201,168,110,.30), transparent 62%),
            radial-gradient(40% 36% at calc(100% - var(--hx,50%)) 20%, rgba(29,45,94,.26), transparent 60%);
          filter: blur(18px);
          opacity:.45;
          pointer-events:none;
        }
        .img-wrap{ position:absolute; inset:0; }
        .img-wrap :global(img){
          object-fit: contain; object-position: center bottom;
          transform: translate3d(var(--tx,0), var(--ty,0), 0);
          transition: transform .25s ease;
          will-change: transform;
        }
        .card:hover .img-wrap :global(img){ transform: translate3d(calc(var(--tx,0) * 1.2), calc(var(--ty,0) * 1.2), 0) scale(1.02); }

        /* ===== KPI ring ===== */
        .kpi{
          position:absolute; right:10px; top:10px;
          display:grid; place-items:center;
          width:64px; height:64px;
          border-radius:14px;
          background: rgba(0,0,0,.28);
          border: 1px solid rgba(255,255,255,.18);
          backdrop-filter: blur(6px);
        }
        .kpi-bg{ fill:none; stroke: rgba(255,255,255,.14); stroke-width:6; }
        .kpi-fg{
          fill:none; stroke: var(--gold); stroke-width:6; stroke-linecap:round;
          transform: rotate(-90deg); transform-origin: 32px 32px;
          transition: stroke-dasharray .9s cubic-bezier(.2,.8,.2,1) .12s;
        }
        [data-role-card] .kpi-fg.go{ stroke-dasharray: var(--pct) 100; }
        .kpi-num{
          position:absolute; inset:0;
          display:grid; place-items:center;
          font-size:12px; font-weight:700;
          color: color-mix(in oklab, white 90%, black 10%);
          text-shadow: 0 1px 0 rgba(0,0,0,.25);
        }

        /* Badge "DIR" */
        .pill{
          position:absolute; left:12px; top:12px;
          height:30px; padding:0 10px; border-radius:999px;
          display:inline-flex; align-items:center;
          font-weight:700; font-size:12.5px;
          color: color-mix(in oklab, var(--gold) 86%, #fff 14%);
          background: rgba(0,0,0,.38);
          border: 1px solid rgba(255,255,255,.20);
          box-shadow: 0 8px 16px rgba(0,0,0,.25);
          backdrop-filter: blur(6px);
        }

        /* ===== Body ===== */
        .body{ padding:16px; }
        .h3{
          font-size: clamp(18px,1.8vw,22px);
          font-weight:600; line-height:1.15; letter-spacing:-.01em;
        }
        .sub{
          margin-top:2px; font-size:13px;
          color: color-mix(in oklab, white 75%, black 25%);
        }
        .list{
          margin-top:10px; display:grid; gap:6px;
          font-size:13.5px; line-height:1.6;
          color: color-mix(in oklab, white 84%, black 16%);
        }
        .actions{ display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }

        /* Motion respect */
        @media (prefers-reduced-motion: reduce){
          .card, .img-wrap :global(img), .kpi-fg{ transition:none !important; }
        }
      `}</style>
    </section>
  );
}
