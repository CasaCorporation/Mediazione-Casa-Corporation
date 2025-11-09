"use client";
import React from "react";
import NavSwiper from "@common/nav/swiper";

/**
 * SwiperConfronto — slim, full width
 * Coerente con gli altri (Agenti/Back Office). Porta al Calcolatore.
 */
export default function SwiperConfronto() {
  return (
    <NavSwiper
      id="next-calcolatore"
      href="/carriere/confronto"
      title="Confronto modelli"
      kicker="Prossima pagina"
      ctaLabel="Continua"
      theme="dark"
      // full-bleed: nessuno spacing extra, la barra è la sezione
      separator={false}
      spacing={{ top: "mt-0", bottom: "mb-0" }}
      onNavigate={() => {
        // hook analytics opzionale
        // es: window.gtag?.("event", "nav_swiper_next", { from: "confronto", to: "calcolatore" });
      }}
    />
  );
}
