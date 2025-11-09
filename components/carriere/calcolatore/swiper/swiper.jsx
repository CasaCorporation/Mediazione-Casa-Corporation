// components/carriere/calcolatore/swiper/swiper.jsx
"use client";
import React from "react";
import NavSwiper from "@/common/nav/swiper";

export default function SwiperCalcolatore() {
  return (
    <NavSwiper
      href="/carriere/metodo" // ← target unico richiesto
      kicker="Prossima pagina"
      title="Metodo"
      ctaLabel="Continua"
      theme="dark"
      separator={false}
      spacing={{ top: "mt-0", bottom: "mb-0" }}
    />
  );
}
