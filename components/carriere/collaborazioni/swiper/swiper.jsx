// components/carriere/collaborazioni/swiper/swiper.jsx
"use client";
import React from "react";
import NavSwiper from "@/common/nav/swiper";

export default function SwiperCollaborazioni() {
  return (
    <NavSwiper
      href="/carriere/altre-posizioni"   // ← target unico
      kicker="Prossima pagina"
      title="Altre posizioni"
      ctaLabel="Vai alla pagina"
      theme="dark"
      separator={false}
      spacing={{ top: "mt-0", bottom: "mb-0" }}
    />
  );
}
