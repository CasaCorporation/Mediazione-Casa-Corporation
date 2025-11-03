"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Carica e registra GSAP + ScrollTrigger lato client in modo _deterministico_,
 * li espone su window per debug/compat e fa una prima configurazione safe.
 */
export default function GSAPProvider() {
  useEffect(() => {
    try {
      if (!gsap.core.globals().ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
      // Espone per debug/compat
      window.gsap = gsap;
      window.ScrollTrigger = ScrollTrigger;

      // Qualche default utile
      ScrollTrigger.clearScrollMemory?.();
      ScrollTrigger.config?.({ ignoreMobileResize: true });

      // Primo refresh dopo mount
      requestAnimationFrame(() => {
        try { ScrollTrigger.refresh(); } catch {}
      });
    } catch (e) {
      // Se per qualche ragione fallisse il register, meglio sapere in console.
      console.warn("GSAPProvider: register failed", e);
    }
  }, []);

  return null;
}
