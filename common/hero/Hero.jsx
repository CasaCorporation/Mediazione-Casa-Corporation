"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroCopyMobile, HeroCopyDesktop } from "./HeroCopy";
import ScrollCue from "./ScrollCue";
import AvifImage from "@/common/hero/media/AvifImage";

/* --------- small screen (SSR-safe) --------- */
function useSmallScreen(bp = 640) {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(`(max-width: ${bp}px)`).matches
      : true;
  const [isSmall, setIsSmall] = React.useState(get);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    const onChange = () => setIsSmall(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
    };
  }, [bp]);
  return isSmall;
}

/* ---------------- media normalizer ---------------- */
function normalizeMedia({ media, isMobile, fallbacks }) {
  const t = String(media?.type || "").toLowerCase();

  if (t === "avif" || t === "image") {
    const srcAvif     = isMobile ? (media.srcMobileAvif     || media.srcAvif)   : media.srcAvif;
    const srcWebp     = isMobile ? (media.srcMobileWebp     || media.srcWebp)   : media.srcWebp;
    const srcFallback = isMobile ? (media.srcMobileFallback || media.srcFallback)
                                 : (media.srcFallback || media.srcMobileFallback);

    const F = fallbacks || {};
    const f_webp = isMobile ? (F.bgMobileWebp || F.bgMobile) : F.bgDesktopWebp;
    const f_png  = isMobile ? (F.bgMobilePng  || F.bgDesktopPng || F.bgMobileWebp || F.bgMobile)
                            : (F.bgDesktopPng || F.bgDesktopWebp);

    return {
      kind: "image",
      isAvif: !!srcAvif,
      alt: media.alt || F.bgAlt || "",
      srcAvif: srcAvif || null,
      srcWebp: srcWebp || f_webp || null,
      srcFallback: srcFallback || f_png || f_webp || "",
    };
  }

  if (t === "video" || t === "video-alpha") {
    return {
      kind: "video",
      srcMp4: media.srcMp4 || media.src || null,
      srcWebm: media.srcWebm || null,
      poster: media.poster || fallbacks?.bgDesktopPng || fallbacks?.bgDesktopWebp || null,
      autoPlay: media.autoPlay ?? true,
      loop: media.loop ?? true,
      muted: media.muted ?? true,
      playsInline: media.playsInline ?? true,
    };
  }

  // fallback immagine
  return normalizeMedia({ isMobile, media: { type: "image" }, fallbacks });
}

export default function Hero({
  // brand/copy
  brandDesktopHighlight = "Casa Corporation",
  brandDesktopSuffix = "— Carriere",
  brandMobileHighlight = "Casa Corporation",
  brandMobileSuffix = "— Carriere",
  titlePre = "Titolo",
  titleHighlight = "ero",
  titlePost = "di esempio",
  description = "Descrizione sintetica dell’offerta.",
  primaryCta = { label: "Azione primaria", href: "#cta", anchorIds: ["cta"] },
  secondaryCta = { label: "Approfondisci", href: "#more", anchorIds: ["more"] },
  badges = [],
  // media
  media,
  // fallbacks compat (se il media manca)
  bgMobile = "/home/MediterraneoHome.webp",
  bgDesktopWebp = "/home/MediterraneoHome.webp",
  bgDesktopPng = "/home/MediterraneoHome.png",
  bgMobileWebp,
  bgMobilePng,
  bgAlt = "",
  // id/a11y
  id = "hero",
  ariaLabel = "Hero — Casa Corporation",
}) {
  const isSmall = useSmallScreen(640);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  const goTo = React.useCallback(
    (...ids) => (e) => {
      const isHash = e.currentTarget?.getAttribute("href")?.startsWith("#");
      if (isHash) e.preventDefault();
      const id = ids.find((i) => typeof document !== "undefined" && document.getElementById(i));
      const el = id && document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const FALLBACKS = { bgMobile, bgMobileWebp, bgMobilePng, bgDesktopWebp, bgDesktopPng, bgAlt };
  const mediaCfg = normalizeMedia({ media, isMobile: isSmall, fallbacks: FALLBACKS });

  /* -------- renderers -------- */
  const MobileMedia = () => {
    if (mediaCfg.kind === "video") {
      return (
        <video
          className="block w-full h-auto max-w-none object-contain object-bottom"
          src={mediaCfg.srcMp4 || undefined}
          poster={mediaCfg.poster || undefined}
          autoPlay={media?.autoPlay ?? true}
          loop={media?.loop ?? true}
          muted={media?.muted ?? true}
          playsInline={media?.playsInline ?? true}
        >
          {mediaCfg.srcWebm && <source src={mediaCfg.srcWebm} type="video/webm" />}
          {mediaCfg.srcMp4 && <source src={mediaCfg.srcMp4} type="video/mp4" />}
        </video>
      );
    }

    if (mediaCfg.isAvif) {
      return (
        <AvifImage
          srcAvif={mediaCfg.srcAvif}
          srcFallback={mediaCfg.srcFallback || mediaCfg.srcWebp}
          alt={mediaCfg.alt}
          className="block w-full h-auto max-w-none object-contain object-bottom"
        />
      );
    }

    return (
      <picture>
        {mediaCfg.srcWebp && <source srcSet={mediaCfg.srcWebp} type="image/webp" />}
        <img
          src={mediaCfg.srcFallback}
          alt={mediaCfg.alt}
          className="block w-full h-auto max-w-none object-contain object-bottom"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    );
  };

  const DesktopMedia = () => {
    const base = "absolute bottom-0 right-0 h-full w-auto max-w-full object-contain object-right object-bottom";
    if (mediaCfg.kind === "video") {
      return (
        <video
          className={base}
          style={{
            transformOrigin: "right bottom",
            opacity: 0.9,
            animation: reduce ? "none" : "heroZoom 22s ease-in-out infinite",
            willChange: reduce ? "auto" : "transform",
          }}
          src={mediaCfg.srcMp4 || undefined}
          poster={mediaCfg.poster || undefined}
          autoPlay={media?.autoPlay ?? true}
          loop={media?.loop ?? true}
          muted={media?.muted ?? true}
          playsInline={media?.playsInline ?? true}
        >
          {mediaCfg.srcWebm && <source src={mediaCfg.srcWebm} type="video/webm" />}
          {mediaCfg.srcMp4 && <source src={mediaCfg.srcMp4} type="video/mp4" />}
        </video>
      );
    }

    if (mediaCfg.isAvif) {
      return (
        <AvifImage
          srcAvif={mediaCfg.srcAvif}
          srcFallback={mediaCfg.srcFallback || mediaCfg.srcWebp}
          alt={mediaCfg.alt}
          className={base}
        />
      );
    }

    return (
      <picture>
        {mediaCfg.srcWebp && <source srcSet={mediaCfg.srcWebp} type="image/webp" />}
        <img
          src={mediaCfg.srcFallback}
          alt={mediaCfg.alt}
          className={base}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    );
  };

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden lg:h-[var(--hero-h,78vh)] lg:pt-[var(--hero-top,20px)]"
      aria-label={ariaLabel}
      style={{
       background: "linear-gradient(180deg, #F6F7FB 0%, #ECEFF6 100%)",
        ["--hero-h"]: "78vh",   // altezza fissa desktop
        ["--hero-top"]: "20px", // piccolo margine sopra
      }}
    >
      {/* progress top — solo desktop */}
      {!isSmall && (
        <motion.div
          style={{ width: progressW }}
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] hidden h-[2px] bg-[color:var(--color-gold)]/85 sm:block"
        />
      )}

      {/* LAYER MEDIA — Desktop: area dall’offset top al fondo (h=hero-top→hero-bottom) */}
      <div
        className="absolute inset-x-0 bottom-0 z-0"
        aria-hidden
        style={{ top: "var(--hero-top, 20px)" }}
      >
        {isSmall ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <MobileMedia />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-y-0 right-0">
            {/* frame media: occupa TUTTA l’altezza utile; IMPORTANTISSIMO: relative+h-full */}
            <div className="relative h-full" style={{ width: "clamp(560px, 58vw, 1120px)" }}>
              <DesktopMedia />
            </div>
          </div>
        )}
      </div>

      {/* CONTENUTO */}
      {isSmall ? (
        <div className="relative z-[1] min-h-[100svh] flex flex-col">
          <div
            className="container flex-1"
            style={{ paddingTop: "clamp(56px,12vh,120px)", paddingBottom: "clamp(16px,12vh,120px)" }}
          >
            <HeroCopyMobile
              brandMobileHighlight={brandMobileHighlight}
              brandMobileSuffix={brandMobileSuffix}
              titlePre={titlePre}
              titleHighlight={titleHighlight}
              titlePost={titlePost}
              description={description}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
            />
          </div>
          <ScrollCue />
        </div>
      ) : (
        <div className="relative z-[3]">
          {/* Altezza utile = hero-h - hero-top */}
          <div className="container mx-auto px-4 sm:px-6 lg:min-h-[calc(var(--hero-h,78vh)-var(--hero-top,20px))]">
            {/* COPY CENTRATO VERTICALMENTE: min-h-full + flex justify-center */}
            <div className="grid min-h-full gap-x-6 gap-y-7 md:gap-x-10 md:gap-y-8 md:grid-cols-[minmax(0,1fr)_520px]">
              <div className="flex flex-col justify-center">
                <HeroCopyDesktop
                  brandDesktopHighlight={brandDesktopHighlight}
                  brandDesktopSuffix={brandDesktopSuffix}
                  titlePre={titlePre}
                  titleHighlight={titleHighlight}
                  titlePost={titlePost}
                  description={description}
                  primaryCta={primaryCta}
                  secondaryCta={secondaryCta}
                  badges={badges}
                  onPrimaryClick={primaryCta?.anchorIds?.length ? goTo(...primaryCta.anchorIds) : undefined}
                  onSecondaryClick={secondaryCta?.anchorIds?.length ? goTo(...secondaryCta.anchorIds) : undefined}
                />
              </div>
              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .title-balance { text-wrap: balance; white-space: normal; word-break: normal; overflow-wrap: break-word; }
        @supports not (text-wrap: balance) { .title-balance { overflow-wrap: break-word; } }
        @keyframes heroZoom { 0% { transform: scale(1); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
      `}</style>
    </section>
  );
}
