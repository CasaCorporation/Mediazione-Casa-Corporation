// common/nav/mediazione-nav.js — READY TO PASTE
// Menu ridotto a tre voci: Valorizza, Vendita, Affitto
// Pagine previste: pages/valorizza/index.js, pages/vendita/index.js, pages/affitto/index.js

/* Helper: percorso hero standard (mantieni le cartelle degli asset) */
const hero = (slug) => `/mediazione/hero/${slug}/desktop.avif`;

/* NAV — Mediazione (solo 3 pagine) */
const NAV = [
  {
    label: "Valorizza",
    href: "/valorizza",
    preview: {
      title: "Valorizza",
      desc: "Studi, interventi mirati e marketing per aumentare il valore.",
      image: hero("valorizza"),
    },
  },
  {
    label: "Vendita",
    href: "/vendita",
    preview: {
      title: "Vendita",
      desc: "Strategia, qualificazione acquirenti e negoziazione assistita.",
      image: hero("vendita"),
    },
  },
  {
    label: "Affitta",
    href: "/affitta",
    preview: {
      title: "Affitta",
      desc: "Selezione inquilini, contratti e gestione completa.",
      image: hero("affitto"),
    },
  },
];

export default NAV;
