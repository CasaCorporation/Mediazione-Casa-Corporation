// Dati base: fatturato per posizione (1→50). Premi per top3.
// Il resto è calcolato (60% provvigione, totale, % sul fatturato).
export const FATTURATI = [
  95000, 90000, 85000, 47000, 47000, 46000, 45000, 44000, 43000, 43000,
  41000, 41000, 40000, 40000, 39000, 37000, 37000, 36000, 35000, 34000,
  34000, 32000, 32000, 31000, 30000, 29000, 26000, 26000, 24000, 22000,
  21000, 21000, 18000, 18000, 18000, 17000, 17000, 16000, 16000, 15000,
  15000, 14000, 14000, 12000, 0, 0, 0, 0, 0, 0
];

export const PREMI = { 1: 75000, 2: 45000, 3: 30000 };

export function buildRows(){
  return FATTURATI.map((fatturato, idx) => {
    const pos = idx + 1;
    const premio = PREMI[pos] ?? 0;
    const provvigione = Math.round(fatturato * 0.60);
    const totale = provvigione + premio;
    const pct = fatturato > 0 ? Math.round((totale / fatturato) * 100) : null;
    return { pos, fatturato, premio, provvigione, totale, pct };
  });
}
