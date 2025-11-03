"use client";
import React from "react";
import NavSwiper from "@common/nav/swiper";

/**
 * SwiperBackOffice — slim, full width
 * Coerente con lo Swiper degli Agenti. Porta a /carriere/collaborazioni.
 */
export default function SwiperBackOffice() {
  return (
    <NavSwiper
      id="next-collab"
      href="/carriere/collaborazioni"
      title="Collaborazioni"
      kicker="Prossima pagina"
      theme="dark"
      separator={false}
      spacing={{ top: "mt-0", bottom: "mb-0" }}
      onNavigate={() => {
        // hook per analytics se serve
        // e.g., window.gtag?.("event", "nav_swiper_next", { to: "collaborazioni" });
      }}
    />
  );
}
