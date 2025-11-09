"use client";

/* ====== Costanti e util ====== */
export const PROVVIGIONE_BASE = 0.60;

/* Solo Senior partecipa alla gara: Top 3 trimestrale (5% / 3% / 2%) */
export const BONUS_SHARES = [
  { key: "none",   label: "Fuori Top 3 (0%)", pct: 0.00 },
  { key: "third",  label: "3° posto (2%)",    pct: 0.02 },
  { key: "second", label: "2° posto (3%)",    pct: 0.03 },
  { key: "first",  label: "1° posto (5%)",    pct: 0.05 },
];

export const DEFAULTS = {
  personal: 45000,     // fatturato personale trimestrale
  company:  2000000,   // fatturato aziendale trimestrale
  position: "none",    // posizione in classifica (gara)
};

export function formatEUR(n){
  return (Number(n) || 0).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}
