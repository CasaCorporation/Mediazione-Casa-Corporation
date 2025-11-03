"use client";
import React from "react";
import NavSwiper from "@/common/nav/swiper";

export default function SwiperAltrePosizioni() {
  return (
    <NavSwiper
      href="/carriere/processo"
      kicker="Prossima pagina"
      title="Processo di selezione"
      ctaLabel="Continua"
      theme="dark"
      // full-bleed: la barra è la sezione
      separator={false}
      spacing={{ top: "mt-0", bottom: "mb-0" }}
      onNavigate={() => {
        // hook analytics opzionale
      }}
    />
  );
}
