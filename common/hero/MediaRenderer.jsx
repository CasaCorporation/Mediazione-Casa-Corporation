// common/hero/MediaRenderer.jsx
"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import clsx from "clsx";
import ScrollScene from "@/common/hero/media/ScrollScene";
import VideoAlpha from "@/common/hero/media/VideoAlpha";
import LottieAnim from "@/common/hero/media/LottieAnim";
import Model3D from "@/common/hero/media/Model3D";
import ImageSpill from "@/common/hero/media/ImageSpill";

/* ---------- utils ---------- */
function useIsMobile(bp = 767) {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(`(max-width:${bp}px)`).matches
      : true;
  const [is, setIs] = useState(get);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const on = () => setIs(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on);
    };
  }, [bp]);
  return is;
}

function normFrame(frame) {
  const d = frame?.desktop || {};
  const m = frame?.mobile || {};
  const num = (v, def = 0) => (Number.isFinite(v) ? v : def);
  return {
    desktop: { left: num(d.left, 50), top: num(d.top, 6), width: num(d.width, 52), height: num(d.height, 80) },
    mobile:  { left: num(m.left, 56), top: num(m.top, 10), width: num(m.width, 82), height: num(m.height, 58) },
  };
}

function useStageVars(frame) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const host = ref.current;
    if (!host) return;
    const stage = host.closest(".hero-stage");
    if (!stage) return;

    const F = normFrame(frame);
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      const rect = stage.getBoundingClientRect();
      const fv = mq.matches ? F.mobile : F.desktop;
      stage.style.setProperty("--hero-media-left", `${fv.left}%`);
      stage.style.setProperty("--hero-media-top", `${fv.top}%`);
      stage.style.setProperty("--hero-media-w", `${(fv.width / 100) * rect.width}px`);
      stage.style.setProperty("--hero-media-h", `${(fv.height / 100) * rect.height}px`);
    };
    apply();
    mq.addEventListener?.("change", apply);
    window.addEventListener("resize", apply);
    return () => {
      mq.removeEventListener?.("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, [frame]);
  return ref;
}

/* ---------- normalize media config ---------- */
function normalize(media) {
  if (!media) return { type: null, props: {} };
  const t = String(media.type || "").toLowerCase();

  const frame = media.frame || media.pos?.frame || null;
  const common = {
    className: media.className,
    style: media.style,
    alt: media.alt,
    frame,
    orientation: media.orientation,
  };

  if (t === "scroll-scene" || t === "scrollscene" || t === "scroller") {
    return {
      type: "scroll-scene",
      props: {
        svgSrc: media.svgSrc ?? media.svg ?? media.desktop?.svg,
        imgSrc: media.imgSrc ?? media.png ?? media.desktop?.img,
        svgSrcMobile: media.svgSrcMobile ?? media.mobile?.svg,
        imgSrcMobile: media.imgSrcMobile ?? media.mobile?.img,
        profile: media.profile || "med",
        start: media.start || "top 80%",
        end: media.end || "bottom top",
        pin: !!media.pin,
        buildTimeline: media.buildTimeline,
        ...common,
      },
    };
  }

  if (t === "video-alpha" || t === "alpha-video") {
    return {
      type: "video-alpha",
      props: {
        srcMov: media.hevc || media.srcMov || media.srcMp4,
        srcWebm: media.webm || media.srcWebm,
        srcPng: media.svgFallback || media.srcPng,
        autoPlay: media.autoPlay ?? true,
        loop: media.loop ?? true,
        muted: media.muted ?? true,
        playsInline: media.playsInline ?? true,
        ...common,
      },
    };
  }

  if (t === "model-3d" || t === "model3d" || t === "glb") {
    return { type: "model-3d", props: { modelUrl: media.modelUrl, autoRotate: media.autoRotate ?? true, primitive: media.primitive, ...common } };
  }

  if (t === "lottie") {
    return { type: "lottie", props: { srcJson: media.srcJson, animationData: media.animationData, loop: media.loop ?? true, speed: media.speed ?? 1, ...common } };
  }

  // IMMAGINI
  if (t === "avif" || t === "image-avif" || t === "image") {
    return {
      type: "image",
      props: {
        // desktop
        srcAvif: media.srcAvif,
        srcWebp: media.srcWebp,
        srcFallback: media.srcFallback ?? media.src ?? media.url,
        // mobile
        srcMobileAvif: media.srcMobileAvif,
        srcMobileWebp: media.srcMobileWebp,
        srcMobileFallback: media.srcMobileFallback ?? media.srcMobile,
        ...common,
      },
    };
  }

  return { type: t, props: { ...media, ...common } };
}

/* ---------- renderer ---------- */
export default function MediaRenderer(media) {
  const { type, props } = normalize(media);
  if (!type) return null;

  const isMobile = useIsMobile();
  const ref = useStageVars(props.frame);

  // stage “posizionale” (unico per mobile/desktop)
  const stageClass = clsx("pointer-events-none absolute inset-0 overflow-visible");
  const innerClass = clsx(
    "absolute right-0",
    props?.orientation === "portrait" ? "top-1/2 -translate-y-1/2" : "bottom-0"
  );

  // posizione/dimensione via CSS vars impostate da useStageVars
  const innerStyle = {
    width: "var(--hero-media-w)",
    height: "var(--hero-media-h)",
    left: "var(--hero-media-left)",
    top: "var(--hero-media-top)",
  };

  // IMMAGINE: gestisco direttamente il <picture> per selezione mobile/desktop
  const renderImage = () => {
    const srcAvif = isMobile ? (props.srcMobileAvif || props.srcAvif) : props.srcAvif;
    const srcWebp = isMobile ? (props.srcMobileWebp || props.srcWebp) : props.srcWebp;
    const fallback = isMobile
      ? (props.srcMobileFallback || props.srcFallback)
      : (props.srcFallback || props.srcMobileFallback);

    if (!srcAvif && !srcWebp && !fallback) return null;

    return (
      <picture>
        {srcAvif && <source srcSet={srcAvif} type="image/avif" />}
        {srcWebp && <source srcSet={srcWebp} type="image/webp" />}
        <img
          src={fallback}
          alt={props.alt || ""}
          className="block h-full w-auto max-w-none select-none"
          loading="eager"
          draggable="false"
        />
      </picture>
    );
  };

  return (
    <div ref={ref} className={stageClass} style={props.style}>
      <div className={innerClass} style={innerStyle}>
        {type === "image" && renderImage()}
        {type === "video-alpha" && <VideoAlpha {...props} />}
        {type === "lottie" && <LottieAnim {...props} />}
        {type === "model-3d" && <Model3D {...props} />}
        {type === "scroll-scene" && <ScrollScene {...props} />}
      </div>
    </div>
  );
}
