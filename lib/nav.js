// lib/nav.js — MEDIAZIONI

// Helper: immagine hero per anteprime (usa cartelle/asset che hai o aggiungi placeholder)
const hero = (slug) => `/mediazioni/hero/${slug}.avif`;

const NAV = [
  /* 1) AFFITTO */
  {
    label: "Affitto",
    href: "/affitto",
    preview: {
      title: "Affitto",
      desc: "Gestione locazioni, selezione conduttori, tutela e incasso puntuale.",
      image: hero("affitto"),
    },
    groups: [
      {
        title: "Per proprietari",
        items: [
          { label: "Mandato di locazione", href: "/affitto/mandato", preview: { title: "Mandato", desc: "Affidaci la locazione, pensiamo a tutto.", image: hero("affitto") } },
          { label: "Selezione conduttori", href: "/affitto/selezione", preview: { title: "Selezione", desc: "Screening, documenti e garanzie.", image: hero("affitto") } },
          { label: "Gestione affitti", href: "/affitto/gestione", preview: { title: "Gestione", desc: "Incassi, rinnovi, pratiche e scadenze.", image: hero("affitto") } },
        ],
      },
      {
        title: "Per inquilini",
        items: [
          { label: "Cerca casa", href: "/affitto/cerca", preview: { title: "Cerca", desc: "Annunci verificati e supporto pratiche.", image: hero("affitto") } },
          { label: "Documenti e tutela", href: "/affitto/documenti", preview: { title: "Documenti", desc: "Contratti, subentri, modelli.", image: hero("affitto") } },
        ],
      },
    ],
  },

  /* 2) VENDITA */
  {
    label: "Vendita",
    href: "/vendita",
    preview: {
      title: "Vendita",
      desc: "Valutazione, piano marketing, negoziazione e rogito in sicurezza.",
      image: hero("vendita"),
    },
    groups: [
      {
        title: "Per proprietari",
        items: [
          { label: "Mandato di vendita", href: "/vendita/mandato", preview: { title: "Mandato", desc: "Strategia, prezzo e timeline chiara.", image: hero("vendita") } },
          { label: "Piano marketing", href: "/vendita/marketing", preview: { title: "Marketing", desc: "Foto pro, tour 3D, ADS e portali top.", image: hero("vendita") } },
          { label: "Open House", href: "/vendita/open-house", preview: { title: "Open House", desc: "Massimizziamo la domanda in un giorno.", image: hero("vendita") } },
        ],
      },
      {
        title: "Per acquirenti",
        items: [
          { label: "Trova immobile", href: "/vendita/trova", preview: { title: "Trova", desc: "Matching esigenze/budget + prequalifica.", image: hero("vendita") } },
          { label: "Mutuo & pratiche", href: "/vendita/mutuo", preview: { title: "Mutuo", desc: "Consulenza mutuo e iter notarile.", image: hero("vendita") } },
        ],
      },
    ],
  },

  /* 3) VALORIZZA */
  {
    label: "Valorizza",
    href: "/valorizza",
    preview: {
      title: "Valorizza",
      desc: "Home staging, rendering, micro-restyling e servizi premium.",
      image: hero("valorizza"),
    },
    groups: [
      {
        title: "Valorizzazione immobile",
        items: [
          { label: "Home Staging", href: "/valorizza/home-staging", preview: { title: "Home Staging", desc: "Aumenti l’appeal, riduci i tempi.", image: hero("valorizza") } },
          { label: "Foto Pro & Tour 3D", href: "/valorizza/foto-tour", preview: { title: "Foto & 3D", desc: "Media di qualità editoriale.", image: hero("valorizza") } },
          { label: "Virtual & Render", href: "/valorizza/virtual", preview: { title: "Virtual", desc: "Render/virtual staging per proiezione.", image: hero("valorizza") } },
        ],
      },
    ],
  },

  /* 4) VALUTAZIONI */
  {
    label: "Valutazioni",
    href: "/valutazioni",
    preview: {
      title: "Valutazioni",
      desc: "Dati OMI e metodi proprietari. Base e Storica.",
      image: hero("valutazioni"),
    },
    children: [
      { label: "Valutazione Base", href: "/valutazioni/base", preview: { title: "Base", desc: "Forbice realistica per posizionarsi.", image: hero("valutazioni") } },
      { label: "Valutazione Storica", href: "/valutazioni/storica", preview: { title: "Storica", desc: "Confronto acquisto/oggi per zona.", image: hero("valutazioni") } },
    ],
  },

  /* 5) RISORSE */
  {
    label: "Risorse",
    href: "/risorse",
    preview: {
      title: "Risorse",
      desc: "Guide, modelli e risposte rapide.",
      image: hero("risorse"),
    },
    groups: [
      {
        title: "Guide",
        items: [
          { label: "Guida alla vendita", href: "/risorse/guida-vendita", preview: { title: "Guida vendita", desc: "Step-by-step per proprietari.", image: hero("risorse") } },
          { label: "Guida all’affitto", href: "/risorse/guida-affitto", preview: { title: "Guida affitto", desc: "Contratti, cauzioni e rinnovi.", image: hero("risorse") } },
          { label: "FAQ & Glossario", href: "/risorse/faq", preview: { title: "FAQ", desc: "Termini e risposte frequenti.", image: hero("risorse") } },
        ],
      },
      {
        title: "Documenti",
        items: [
          { label: "Modelli & Check-list", href: "/risorse/documenti", preview: { title: "Documenti", desc: "PDF e modelli scaricabili.", image: hero("risorse") } },
          { label: "Privacy & Termini", href: "/privacy", preview: { title: "Compliance", desc: "Trasparenza e tutele.", image: hero("risorse") } },
        ],
      },
    ],
  },

  // Esterno — AREA UTENTE
  { label: "Area Utente", href: "https://super-dashboard-v-1-0-0.vercel.app/", external: true },
];

export default NAV;
