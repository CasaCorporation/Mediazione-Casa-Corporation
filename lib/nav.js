// common/nav/mediazione-nav.js
// Menu ridotto: Valorizza, Vendita, Affitto (con anteprime)

const hero = (slug) => `/mediazione/hero/${slug}/desktop.avif`;

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
    label: "Affitto",
    href: "/affitto",
    preview: {
      title: "Affitto",
      desc: "Selezione inquilini, contratti e gestione completa.",
      image: hero("affitto"),
    },
  },
  // nessun esterno, niente Area Riservata qui
];

export default NAV;
