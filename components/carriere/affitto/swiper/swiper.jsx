"use client";
import React from "react";
import NavSwiper from "@/common/nav/swiper";

export default function SwiperAgentiImmobiliari() {
  return (
    <NavSwiper
      href="/carriere/back-office"
      kicker="Prossima pagina"
      title="Back Office & Coordinamento"
      ctaLabel="Continua"
      theme="dark"
      // full-bleed: nessuno spacing extra, la barra è la sezione
      separator={false}
      spacing={{ top: "mt-0", bottom: "mb-0" }}
      onNavigate={() => {
        // analytics opzionale
      }}
    />
  );
}
