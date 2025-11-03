// common/nav/swiper.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, MoveRight, Check } from "lucide-react";

/**
 * NavSwiper — SLIM (la barra è la sezione)
 * - Full-width, altezza ridotta, responsive (track fluido su mobile)
 * - Nessun bottone visibile: solo drag + click fallback sull’intero track
 * - PRM-safe, accessibile (Enter/→)
 */
export default function NavSwiper({
  id = "nav-swiper",
  href = "#",
  title = "Pagina successiva",
  kicker = "Prossima pagina",
  ctaLabel = "Continua",
  theme = "dark",
  className = "",
  separator = false,
  spacing = { top: "mt-0", bottom: "mb-0" },
  onNavigate,
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  /* ----- Drag dinamico in base alla larghezza del track ----- */
  const trackRef = React.useRef(null);
  const [dragMax, setDragMax] = React.useState(160); // fallback
  React.useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      // 40 ≈ knob + margini interni → evita overflow
      setDragMax(Math.max(120, Math.min(320, w - 40)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // motion values
  const knob = useMotionValue(0);
  const kx = useSpring(knob, { stiffness: 180, damping: 20, mass: 0.4 });
  const progressW = useTransform(kx, (v) => {
    const pct = (v / dragMax) * 100;
    return `${Math.max(0, Math.min(100, pct))}%`;
  });
  const pctNum = useTransform(kx, (v) => Math.round(Math.max(0, Math.min(100, (v / dragMax) * 100))));
  const nearDone = useTransform(pctNum, (n) => (n >= 92 ? 1 : 0));

  const [activated, setActivated] = React.useState(false);
  const go = React.useCallback(() => {
    if (activated) return;
    setActivated(true);
    onNavigate?.();
    router.push(href);
  }, [activated, onNavigate, router, href]);

  const reset = () => { knob.stop(); knob.set(0); };

  const onDragEnd = (_, info) => {
    const ok = info.offset.x > dragMax * 0.75 || Math.abs(info.velocity.x) > 600;
    if (ok) { knob.set(dragMax); go(); } else { reset(); }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); go(); }
  };

  return (
    <section
      id={id}
      className={["relative w-full", spacing?.top || "", spacing?.bottom || "", className].join(" ")}
      aria-label="Navigazione alla pagina successiva"
      onKeyDown={onKeyDown}
      style={{
        background: isDark
          ? "linear-gradient(180deg, rgba(6,12,30,.92), rgba(6,12,30,.92))"
          : "linear-gradient(180deg, rgba(255,255,255,.88), rgba(255,255,255,.88))",
        backdropFilter: "saturate(1.2) blur(6px)",
        borderTop: isDark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(0,0,0,.08)",
        borderBottom: isDark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(0,0,0,.08)",
      }}
    >
      {/* hairline opzionale */}
      {separator && (
        <div
          aria-hidden
          className="absolute inset-x-0 -top-px h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent)",
            opacity: isDark ? 0.55 : 0.35,
          }}
        />
      )}

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 items-center gap-2 py-2.5 sm:grid-cols-[1fr_minmax(220px,420px)] sm:py-3"
        >
          {/* Left: kicker + title */}
          <div className="min-w-0">
            <div className={["text-[10px] uppercase tracking-[0.18em] mb-0.5", isDark ? "text-white/60" : "text-black/60"].join(" ")}>
              {kicker}
            </div>
            <h4
              className={["truncate text-base sm:text-[17px] font-semibold", isDark ? "text-white" : "text-black"].join(" ")}
              title={title}
            >
              {title}
            </h4>
          </div>

          {/* Right: TRACK (mobile-first, full width) */}
          <div className="flex items-center justify-start sm:justify-end">
            <div
              ref={trackRef}
              role="button"
              tabIndex={0}
              aria-label={`Trascina per aprire: ${title}`}
              onClick={go} // tap/click fallback
              className={["relative flex select-none items-center", isDark ? "text-white/70" : "text-black/70"].join(" ")}
              style={{ height: 36, width: "100%" }}
            >
              {/* contorno + bg */}
              <div className={["absolute inset-0 rounded-xl border", isDark ? "border-white/12 bg-white/5" : "border-black/10 bg-black/5"].join(" ")} />

              {/* progress */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-xl"
                style={{
                  width: progressW,
                  background: "linear-gradient(90deg, rgba(212,175,55,0.30), rgba(212,175,55,0.10))",
                  boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.25), 0 1px 8px rgba(212,175,55,0.25)",
                }}
              />

              {/* label centrata */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-2">
                <div className="flex items-center gap-2 leading-none text-[12px]">
                  <MoveRight className="h-4 w-4 relative top-[0.5px]" />
                  {/* testo breve su mobile, esteso su md+ */}
                  <span className="sm:hidden">Trascina per continuare</span>
                  <span className="hidden sm:inline md:hidden">Trascina a destra</span>
                  <span className="hidden md:inline">Trascina a destra per continuare</span>
                  <motion.span className="ml-2 inline-flex items-center gap-1 leading-none" style={{ opacity: nearDone }}>
                    <Check className="h-4 w-4 relative top-[0.5px]" /> Pronto
                  </motion.span>
                </div>
              </div>

              {/* knob */}
              <motion.button
                type="button"
                aria-label="Trascina per andare alla pagina successiva"
                drag="x"
                dragElastic={reduce ? 0 : 0.08}
                dragMomentum={false}
                dragConstraints={{ left: 0, right: dragMax }}
                onDragEnd={onDragEnd}
                style={{ x: kx }}
                className={[
                  "relative z-10 m-1 flex items-center justify-center rounded-lg outline-none transition-colors",
                  "h-[28px] w-[28px] sm:h-[26px] sm:w-[26px]", // leggermente più grande su mobile
                  isDark ? "bg-white/15 hover:bg-white/25 active:bg-white/30" : "bg-black/10 hover:bg-black/15 active:bg-black/20",
                ].join(" ")}
              >
                <ArrowRight className={isDark ? "h-4 w-4 text-white" : "h-4 w-4 text-black"} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
