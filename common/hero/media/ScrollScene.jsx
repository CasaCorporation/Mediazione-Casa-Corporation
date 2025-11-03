// @common/hero/media/ScrollScene.jsx
"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

/* Formati consigliati (canvas di progetto) */
export const SCROLL_SCENE_SIZES = {
  desktop: { w: 3200, h: 900 },    // 32:9
  mobile:  { w: 1080, h: 1920 },   // 9:16 (verticale)
};

/* Preset velocità */
const SPEED = {
  low:  { drawDur: 0.60, staggerAmt: 0.12, scrub: 0.85 },
  med:  { drawDur: 0.95, staggerAmt: 0.18, scrub: 1.10 },
  high: { drawDur: 1.35, staggerAmt: 0.26, scrub: 1.35 },
};

/* Helpers */
const preload = (src) => new Promise((resolve) => {
  if (!src) return resolve();
  const img = new Image();
  const done = () => resolve();
  img.onload = done; img.onerror = done;
  try { img.decode?.().then(done).catch(done); } catch {}
  img.src = src;
  if (img.complete) done();
});
function prepStrokeDraw(el) {
  try {
    const len = typeof el.getTotalLength === "function" ? el.getTotalLength() : 0;
    if (len > 0) {
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    }
  } catch {}
}
function cssEscapeSafe(id) {
  try { return CSS?.escape ? CSS.escape(id) : String(id).replace(/([ #;?%&,.+*~\':"!^$[\]()=>|/@])/g, "\\$1"); }
  catch { return String(id); }
}
/* fit → preserveAspectRatio del <svg> root */
const parFromFit = (fit) => fit === "stretch" ? "none" : ("xMidYMid " + (fit === "contain" ? "meet" : "slice")); // default cover

/* Lazy GSAP + ScrollTrigger (se presenti nelle deps) */
function useGsap() {
  const [lib, setLib] = useState({ gsap: null, ScrollTrigger: null });
  useEffect(() => {
    let alive = true;
    if (typeof window === "undefined") return;
    (async () => {
      try {
        const gMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger").catch(() => null);
        const gsap = gMod.gsap || gMod.default || gMod;
        const ScrollTrigger = stMod?.ScrollTrigger || stMod?.default || null;
        if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
        if (alive) setLib({ gsap, ScrollTrigger });
      } catch {}
    })();
    return () => { alive = false; };
  }, []);
  return lib;
}

export default function ScrollScene({
  /* asset desktop */
  svgSrc,
  imgSrc,
  /* asset mobile (9:16) */
  svgSrcMobile,
  imgSrcMobile,

  alt = "",
  profile = "med",
  layers = [],

  /* fitting del root <svg> nel frame */
  fitDesktop = "cover",     // cover | contain | stretch
  fitMobile  = "cover",

  /* scroll options */
  start = "top top",
  end   = "bottom top",
  pin   = false,
  buildTimeline,            // fn custom opzionale

  /* misc */
  className,
  style,
  triggerRef,
  previewMode = false,
}) {
  const hostRef = useRef(null);
  const { gsap, ScrollTrigger } = useGsap();

  /* === 1) Misura il FRAME dello Hero per decidere desktop/mobile === */
  const [stageMode, setStageMode] = useState("desktop"); // "desktop" | "mobile"
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const frameEl =
      host.closest?.(".hero-stage") ||
      host.closest?.(".hero-stage__layer, .hero-frame__layer, .hero-std__layer") ||
      host.parentElement || host;

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const el = e.target;
        const w = el.clientWidth  || el.offsetWidth  || 1;
        const h = el.clientHeight || el.offsetHeight || 1;
        const ar = h / w;
        setStageMode(ar >= 1 ? "mobile" : "desktop");  // alto ⇒ mobile | largo ⇒ desktop
      }
    });
    ro.observe(frameEl);
    return () => ro.disconnect();
  }, []);

  /* === 2) Scegli asset + fit in base allo stageMode === */
  const assets = useMemo(() => {
    const isMob = stageMode === "mobile";
    return {
      img: isMob ? (imgSrcMobile || imgSrc) : (imgSrc || imgSrcMobile),
      svg: isMob ? (svgSrcMobile || svgSrc) : (svgSrc || svgSrcMobile),
      fit: isMob ? fitMobile : fitDesktop,
      canvas: isMob ? SCROLL_SCENE_SIZES.mobile : SCROLL_SCENE_SIZES.desktop, // <- CANVAS FORZATO
    };
  }, [stageMode, imgSrc, imgSrcMobile, svgSrc, svgSrcMobile, fitDesktop, fitMobile]);

  const spd = SPEED[profile] || SPEED.med;
  const [svgXML, setSvgXML] = useState("");

  /* === 3) Costruisci un canvas SVG fisso (3200×900 o 1080×1920) === */
  useEffect(() => {
    let alive = true;
    const ac = new AbortController();

    (async () => {
      await preload(assets.img).catch(() => {});
      try {
        const r = await fetch(assets.svg, { cache: "no-store", signal: ac.signal });
        const raw = await r.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(raw, "image/svg+xml");
        const root = doc.querySelector("svg");
        if (!root) throw new Error("SVG root missing");

        // Leggi dimensioni originali (se presenti)
        let minX = 0, minY = 0, vw = 0, vh = 0;
        const vbAttr = root.getAttribute("viewBox");
        if (vbAttr) {
          const n = vbAttr.trim().split(/\s+/).map(Number);
          minX = Number.isFinite(n[0]) ? n[0] : 0;
          minY = Number.isFinite(n[1]) ? n[1] : 0;
          vw   = Number.isFinite(n[2]) ? n[2] : 0;
          vh   = Number.isFinite(n[3]) ? n[3] : 0;
        } else {
          vw = Number(root.getAttribute("width"))  || 0;
          vh = Number(root.getAttribute("height")) || 0;
        }

        // === CANVAS di progetto forzato ===
        const Dw = assets.canvas.w;
        const Dh = assets.canvas.h;

        // Normalizza root: viewBox fisso e PAR coerente al fit
        root.removeAttribute("width");
        root.removeAttribute("height");
        root.setAttribute("viewBox", `0 0 ${Dw} ${Dh}`);
        root.setAttribute("preserveAspectRatio", parFromFit(assets.fit));
        root.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        root.setAttribute("style", (root.getAttribute("style") || "") + ";background:transparent;display:block;");

        // Raggruppa i layer esistenti
        const g = doc.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("id", "ss-wrap");

        const toMove = Array.from(root.childNodes).filter(
          (n) => n.nodeType === 1 && n.tagName && n.tagName.toLowerCase() !== "defs"
        );
        toMove.forEach((n) => g.appendChild(n));

        // Se l'SVG di origine non è alle dimensioni di progetto, scala nel canvas fisso
        let transform = "";
        if (minX || minY) transform += ` translate(${-minX}, ${-minY})`;
        if (vw > 0 && vh > 0 && (vw !== Dw || vh !== Dh)) {
          const sx = Dw / vw;
          const sy = Dh / vh;
          transform += ` scale(${sx} ${sy})`;
          // (opzionale) avviso in console se rapporto non combacia
          const eqRatio = Math.abs((vw / vh) - (Dw / Dh)) < 0.001;
          if (!eqRatio) {
            // eslint-disable-next-line no-console
            console.warn("[ScrollScene] L'SVG sorgente ha ratio diverso dal canvas. Rimappo con scale non uniforme.", { source: { vw, vh }, canvas: { Dw, Dh } });
          }
        }
        if (transform.trim()) g.setAttribute("transform", transform.trim());

        // Inserisci immagine base (sempre a canvas fisso)
        if (assets.img) {
          const image = doc.createElementNS("http://www.w3.org/2000/svg", "image");
          image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", assets.img);
          image.setAttribute("href", assets.img);
          image.setAttribute("x", "0");
          image.setAttribute("y", "0");
          image.setAttribute("width", String(Dw));
          image.setAttribute("height", String(Dh));
          image.setAttribute("preserveAspectRatio", "none");
          image.setAttribute("style", "pointer-events:none;");
          g.insertBefore(image, g.firstChild);
        }

        root.appendChild(g);

        const xmlOut = new XMLSerializer().serializeToString(root);
        if (!alive) return;
        setSvgXML(xmlOut);
      } catch {
        if (!alive) return;
        const Dw = assets.canvas.w;
        const Dh = assets.canvas.h;
        setSvgXML(`
          <svg viewBox="0 0 ${Dw} ${Dh}" preserveAspectRatio="${parFromFit(assets.fit)}" style="background:transparent;display:block" xmlns="http://www.w3.org/2000/svg">
            ${assets.img ? `<image href="${assets.img}" x="0" y="0" width="${Dw}" height="${Dh}" preserveAspectRatio="none" style="pointer-events:none;" />` : ""}
          </svg>
        `);
      }
    })();

    return () => { alive = false; ac.abort(); };
  }, [assets.svg, assets.img, assets.fit, assets.canvas.w, assets.canvas.h, stageMode]);

  /* === 4) Timeline su scroll (trigger = frame) === */
  useLayoutEffect(() => {
    if (previewMode) return;

    const host = hostRef.current;
    if (!host || !svgXML) return;

    const frameEl =
      host.closest?.(".hero-stage") ||
      host.closest?.(".hero-stage__layer, .hero-frame__layer, .hero-std__layer") ||
      host.parentElement || host;

    let triggerEl = frameEl;
    if (triggerRef?.current) {
      const t = triggerRef.current;
      const isLayer = !!t.closest?.(".hero-stage, .hero-stage__layer, .hero-frame__layer, .hero-std__layer");
      if (isLayer) triggerEl = t;
    }

    const svg = host.querySelector("svg");
    if (!svg) return;
    Object.assign(svg.style, {
      position: "absolute",
      left: 0, top: 0,
      width: "100%",
      height: "100%",
      display: "block",
      transform: "none",
      transformOrigin: "50% 50%",
      background: "transparent",
      pointerEvents: "none",
    });

    const getPaths = (root) => root.querySelectorAll("path,line,polyline,polygon,circle,ellipse,rect");
    const findLayer = (id) =>
      svg.querySelector(`#${cssEscapeSafe(id)}`) ||
      Array.from(svg.querySelectorAll("[id]")).find(
        (n) => (n.id || "").toLowerCase() === String(id).toLowerCase()
      );

    const parsed = layers.map((L) => {
      const el = findLayer(L.id);
      return el ? { ...L, el } : null;
    }).filter(Boolean);

    if (!gsap) return;
    let cleanup = () => {};

    const ctx = gsap.context(() => {
      // Styling base se non viene fornita buildTimeline
      if (!buildTimeline) {
        parsed.forEach(({ el, color, effect }) => {
          const nodes = getPaths(el);
          nodes.forEach((n) => {
            n.style.mixBlendMode = effect?.blend || "screen";
            if (effect?.fill) {
              if (color) n.style.fill = color;
              n.style.stroke = "none";
            } else {
              if (color) n.style.stroke = color;
              n.style.fill = "none";
              n.style.strokeWidth = String(effect?.strokeWidth ?? 1.6);
              n.style.strokeLinecap = "round";
              if (effect?.draw) prepStrokeDraw(n);
            }
          });
          el.style.opacity = "0";
        });
      }

      const tl = gsap.timeline({
        smoothChildTiming: true,
        defaults: { ease: "none" },
        scrollTrigger: ScrollTrigger ? {
          trigger: triggerEl,
          start,
          end,
          scrub: spd.scrub,
          pin: !!pin,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        } : undefined,
      });

      if (typeof buildTimeline === "function") {
        const map = new Map(parsed.map(p => [p.id, p.el]));
        buildTimeline({ gsap, tl, svg, layersMap: map, getPaths, prepStrokeDraw, spd });
      } else {
        parsed.forEach(({ el, effect, delayMs }) => {
          const delay = Math.max(0, (delayMs || 0) / 1000);
          if (effect?.draw) {
            const drawables = el.querySelectorAll("path,line,polyline,polygon");
            tl.to(el, { autoAlpha: 1, duration: 0.2 }, `+=${delay}`);
            tl.to(drawables, {
              strokeDashoffset: 0,
              duration: spd.drawDur,
              stagger: { amount: Math.min(spd.staggerAmt, spd.drawDur * 0.35), from: 0 },
            }, "<");
          } else {
            tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, `+=${delay}`);
          }
        });
      }
    }, host);

    const on = () => { try { ScrollTrigger?.refresh(); } catch {} };
    window.addEventListener("resize", on);
    window.addEventListener("orientationchange", on);
    cleanup = () => {
      window.removeEventListener("resize", on);
      window.removeEventListener("orientationchange", on);
      try { ctx.revert(); } catch {}
    };

    return cleanup;
  }, [svgXML, profile, JSON.stringify(layers), gsap, ScrollTrigger, triggerRef?.current, start, end, pin, previewMode]);

  /* === 5) Render === */
  return (
    <div
      ref={hostRef}
      className={clsx(
        "absolute inset-0 overflow-hidden",
        "pointer-events-none select-none",
        "z-0",
        className
      )}
      style={{ ...style, background: "transparent" }}
      aria-label={alt || undefined}
      role={alt ? "img" : "presentation"}
    >
      <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: svgXML }} />
    </div>
  );
}
