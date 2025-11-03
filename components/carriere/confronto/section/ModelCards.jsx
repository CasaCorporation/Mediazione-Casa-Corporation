"use client";

/** Wrapper che mantiene la compatibilità con la pagina esistente:
 *  rende in sequenza le due nuove sezioni. */
import TopModelsCarousel from "./TopModelsCarousel";
import CasaShowcase from "./CasaShowcase";

export default function ModelCards(){
  return (
    <>
      <TopModelsCarousel />
      <CasaShowcase />
    </>
  );
}
