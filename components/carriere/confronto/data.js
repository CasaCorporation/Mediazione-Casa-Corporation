// Dati di confronto (estendibili). Tutti i campi sono usati sia nelle card che nella tabella.
export const MODELS = [
  {
    key: "casa",
    name: "Casa Corporation",
    logo: "/images/brand/logo-cc.svg", // se non disponibile, lascia null
    provvigionePct: "60% + gara",
    spese: "€0",
    guadagnoPct: "Oltre il 100%",
    premi: "10% fatturato in palio (5%/3%/2%)",
    supporto: "Segretaria, annunci, pubblicità",
    formazione: "Completa (pre e post patentino)",
    sintesi: "Guadagno massimo senza rischio",
    metrics: { fee: 0, rischio: 1, supporto: 5, tecnologia: 5, formazione: 5 }
  },
  {
    key: "trad1",
    name: "Agenzia tradizionale",
    logo: null,
    provvigionePct: "~50%",
    spese: "€200–€300",
    guadagnoPct: "45%–50%",
    premi: "Rari o assenti",
    supporto: "Variabile",
    formazione: "Limitata",
    sintesi: "Stabilità, pochi vantaggi reali",
    metrics: { fee: 2, rischio: 3, supporto: 3, tecnologia: 2, formazione: 2 }
  },
  {
    key: "trad2",
    name: "Agenzia tradizionale 2",
    logo: null,
    provvigionePct: "15–20% + fisso iniziale",
    spese: "€0",
    guadagnoPct: "20%–30%",
    premi: "Rari o assenti",
    supporto: "Solo ufficio fisico",
    formazione: "Iniziale",
    sintesi: "Bassa pressione, guadagni scarsi",
    metrics: { fee: 1, rischio: 2, supporto: 2, tecnologia: 1, formazione: 2 }
  },
  {
    key: "autonomo",
    name: "Lavoro autonomo",
    logo: null,
    provvigionePct: "100%",
    spese: "Variabili (€1.000+)",
    guadagnoPct: "60%–70%",
    premi: "Nessuno",
    supporto: "Assente",
    formazione: "Assente",
    sintesi: "Totale libertà, rischio elevato",
    metrics: { fee: 5, rischio: 5, supporto: 1, tecnologia: 1, formazione: 1 }
  },
  {
    key: "innovativa",
    name: "Agenzia innovativa",
    logo: null,
    provvigionePct: "77%",
    spese: "€1.000",
    guadagnoPct: "70%–75%",
    premi: "Nessuno",
    supporto: "Solo ufficio fisico",
    formazione: "Iniziale",
    sintesi: "Tech avanzata, ma costi alti",
    metrics: { fee: 4, rischio: 3, supporto: 3, tecnologia: 4, formazione: 3 }
  },
];

// Mappa per ordinamenti numerici di massima (più alto = meglio) per "guadagno atteso".
export function expectedScore(m){
  // euristica semplice: guadagno + supporto + tecnologia + formazione - fee - rischio
  const s = m.metrics;
  return (4 * avgGuadagno(m.guadagnoPct)) + (s.supporto + s.tecnologia + s.formazione) - (s.fee + s.rischio);
}

function avgGuadagno(rangeStr){
  // "Oltre il 100%" => 1.10 ; "70%–75%" => 0.725 ; "45%–50%" => 0.475
  if(!rangeStr) return 0.0;
  const clean = rangeStr.replace(",", ".").trim().toLowerCase();
  if (clean.includes("oltre")) return 1.10;
  const m = clean.match(/(\d+)\s*%[–-]\s*(\d+)\s*%/);
  if (m) return ((parseFloat(m[1]) + parseFloat(m[2])) / 2) / 100;
  const s = clean.match(/(\d+)\s*%/);
  return s ? parseFloat(s[1])/100 : 0.0;
}
