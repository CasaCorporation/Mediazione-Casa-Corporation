"use client";

/**
 * Props:
 *  src, alt="", spill=true (permette “sbordo” oltre il box)
 */
export default function ImageSpill({ src, alt = "", spill = true }) {
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-contain"
      style={{
        // se spill true, permettiamo che l'immagine “esca” visivamente
        overflow: spill ? "visible" : "hidden",
      }}
      loading="eager"
    />
  );
}
