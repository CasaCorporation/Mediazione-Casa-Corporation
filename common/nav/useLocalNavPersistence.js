// components/common/nav/useLocalNavPersistence.js
"use client";
import * as React from "react";

export function useLocalNavPersistence(storageKey, items) {
  const ids = React.useMemo(() => (items || []).map(i => i.id), [items]);

  // salva su click
  const onNavClick = React.useCallback((id) => {
    try { sessionStorage.setItem(storageKey, id); } catch {}
  }, [storageKey]);

  // ripristina on mount (solo se non c'è hash esplicito)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (location.hash && ids.includes(location.hash.slice(1))) return;
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved && ids.includes(saved)) {
        const el = document.getElementById(saved);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    } catch {}
  }, [ids, storageKey]);

  return { onNavClick };
}
