"use client";
import React from "react";

const CalcoloCtx = React.createContext(null);

export function CalcoloProvider({ children }) {
  const [liveValue, setLiveValue] = React.useState(null);      // numero dinamico
  const [label, setLabel] = React.useState("Totale stimato");  // etichetta

  const value = React.useMemo(() => ({ liveValue, setLiveValue, label, setLabel }), [liveValue, label]);
  return <CalcoloCtx.Provider value={value}>{children}</CalcoloCtx.Provider>;
}

export function useCalcolo(){
  const ctx = React.useContext(CalcoloCtx);
  if(!ctx){
    // Fallback no-op se usato fuori dal provider (per sicurezza)
    return { liveValue: null, setLiveValue: () => {}, label: "Totale stimato", setLabel: () => {} };
  }
  return ctx;
}
