"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Props:
 *  srcMov, srcWebm, srcPng, rate=0.25, cropTopPx=3
 *  className, style
 */
export default function VideoAlpha({
  srcMov,
  srcWebm,
  srcPng,
  rate = 0.25,
  cropTopPx = 3,
  className = "absolute inset-0 h-full w-full object-contain",
  style = {},
}) {
  const [fallbackImg, setFallbackImg] = useState(false);
  const ref = useRef(null);
  const clip = `inset(${Math.max(0, cropTopPx)}px 0 0 0)`;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const applyRate = () => {
      try {
        v.defaultPlaybackRate = rate;
        v.playbackRate = rate;
      } catch {}
    };
    const tryPlay = () => v.play().catch(() => {});
    const onLoaded = () => {
      applyRate();
      tryPlay();
    };
    const onError = () => setFallbackImg(true);

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("canplay", onLoaded);
    v.addEventListener("error", onError);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) tryPlay();
          else v.pause();
        }),
      { threshold: 0.15 }
    );
    io.observe(v);

    applyRate();
    tryPlay();

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("canplay", onLoaded);
      v.removeEventListener("error", onError);
      io.disconnect();
    };
  }, [rate]);

  return (
    <div className="pointer-events-none relative z-10 h-full w-full">
      {!fallbackImg ? (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={className}
          style={{ clipPath: clip, background: "transparent", ...style }}
        >
          {srcMov && <source src={srcMov} type='video/quicktime; codecs="hvc1"' />}
          {srcWebm && <source src={srcWebm} type='video/webm; codecs="vp9"' />}
        </video>
      ) : (
        srcPng && (
          <img
            src={srcPng}
            alt=""
            className={className}
            style={{ clipPath: clip, ...style }}
            loading="lazy"
          />
        )
      )}

      {/* Layer ottici brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 60% at 60% 65%, rgba(29,45,94,0.34), transparent 65%)",
          mixBlendMode: "screen",
          clipPath: clip,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,.06) 0 1px, transparent 1px 3px)",
          mixBlendMode: "soft-light",
          clipPath: clip,
        }}
      />
    </div>
  );
}
