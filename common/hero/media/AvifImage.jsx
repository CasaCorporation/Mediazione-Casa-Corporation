"use client";

import React from "react";

/**
 * AVIF “semplice” e sicuro:
 * - Mobile: block w-full h-auto (non taglia mai).
 * - Desktop: absolute bottom-0 right-0 h-full w-auto (sempre appoggiato al bordo basso).
 * Nessun parallax: prima rendiamolo stabile/visibile, poi — se vuoi — lo riattiviamo.
 */
export default function AvifImage({
  srcAvif,
  srcFallback,
  alt = "",
  className = "",
  style = {},
  loading = "eager",
  decoding = "async",
  fetchPriority = "high",
}) {
  return (
    <picture>
      <source srcSet={srcAvif} type="image/avif" />
      <img
        src={srcFallback || srcAvif}
        alt={alt}
        className={[
          "block w-full h-auto object-contain object-right object-bottom",
          "lg:absolute lg:bottom-0 lg:right-0 lg:h-full lg:w-auto",
          className,
        ].join(" ")}
        style={{ objectPosition: "right bottom", ...style }}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
