// common/nav/careers-nav.js — READY TO PASTE

// Helper: hero standard per pagina (usa le cartelle esistenti)
const hero = (slug) => `/carriere/hero/${slug}/desktop.avif`;

// NAV Carriere in 4 macro-sezioni + speciale "Agenti Immobiliari".
// "Area Riservata" resta esterno.
const NAV = [
  /* 1) SPECIALE: Agenti Immobiliari (3 ruoli) */
  {
    label: "Agenti Immobiliari",
    href: "/carriere/agenti-immobiliari",
    preview: {
      title: "Agenti immobiliari",
      desc: "Junior Executive, Corporate Senior, Leader Corporate.",
      image: hero("agenti"), // <-- cartella esatta
    },
    children: [
      {
        label: "Junior Executive",
        href: "/ruoli/junior-executive",
        preview: {
          title: "Junior Executive",
          desc: "Primo step, training e supporto.",
          image: "/carriere/section/agenti-immobiliari/junior.avif",
        },
      },
      {
        label: "Corporate Senior",
        href: "/ruoli/corporate-senior",
        preview: {
          title: "Corporate Senior",
          desc: "Esperienza, processi e portafoglio.",
          image: "/carriere/section/agenti-immobiliari/senior.avif",
        },
      },
      {
        label: "Leader Corporate",
        href: "/ruoli/leader-corporate",
        preview: {
          title: "Leader Corporate",
          desc: "Guidi team e sviluppi business.",
          image: "/carriere/section/agenti-immobiliari/leader.avif",
        },
      },
    ],
  },

  /* 2) Offerte di lavoro */
  {
    label: "Offerte di lavoro",
    href: "/carriere",
    preview: {
      title: "Offerte di lavoro",
      desc: "Posizioni aperte e collaborazioni.",
      image: hero("agenti"), // non esiste /carriere; uso "agenti" come hero generale
    },
    groups: [
      {
        title: "Offerte di lavoro",
        items: [
          {
            label: "Agenti Immobiliari",
            href: "/carriere/agenti-immobiliari",
            preview: {
              title: "Agenti",
              desc: "Junior, Senior, Leader.",
              image: hero("agenti"),
            },
          },
          {
            label: "Back Office",
            href: "/carriere/back-office",
            preview: {
              title: "Back Office",
              desc: "Agenda, workflow, pubblicazioni.",
              image: hero("back-office"),
            },
          },
        ],
      },
      {
        title: "Partnership & Altre figure",
        items: [
          {
            label: "Collaborazioni",
            href: "/carriere/collaborazioni",
            preview: {
              title: "Collaborazioni",
              desc: "Partner e studi tecnici.",
              image: hero("collaborazioni"),
            },
          },
          {
            label: "Altre posizioni",
            href: "/carriere/altre-posizioni",
            preview: {
              title: "Altre figure",
              desc: "Fotografo, IT, Marketing.",
              image: hero("altre-posizioni"),
            },
          },
        ],
      },
      {
        title: "Processo di selezione",
        items: [
          {
            label: "Processo di selezione",
            href: "/carriere/processo",
            preview: {
              title: "Processo di selezione",
              desc: "Step, tempi e cosa aspettarti.",
              image: hero("processo"),
            },
          },
        ],
      },
    ],
  },

  /* 3) Gara Aziendale */
  {
    label: "Gara Aziendale",
    href: "/carriere/gara",
    preview: {
      title: "Gara aziendale",
      desc: "Economics, vantaggi e simulazioni.",
      image: hero("gara"),
    },
    groups: [
      {
        title: "Economics & Vantaggi",
        items: [
          {
            label: "Gara Trimestrale",
            href: "/carriere/gara",
            preview: {
              title: "Gara",
              desc: "Montepremi trimestrale.",
              image: hero("gara"),
            },
          },
          {
            label: "Confronto modelli",
            href: "/carriere/confronto",
            preview: {
              title: "Confronto",
              desc: "Numeri a confronto.",
              image: hero("confronto"),
            },
          },
          {
            label: "Calcolatore guadagni",
            href: "/carriere/calcolatore",
            preview: {
              title: "Calcolatore",
              desc: "Simulazioni provvigioni.",
              image: hero("calcolatore"),
            },
          },
        ],
      },
    ],
  },

  /* 4) Benefits e Strumenti */
  {
    label: "Benefits e Strumenti",
    href: "/carriere/metodo",
    preview: {
      title: "Benefits e Strumenti",
      desc: "Metodo, formazione, tool e software.",
      image: hero("metodo"),
    },
    groups: [
      {
        title: "Metodo & Formazione",
        items: [
          {
            label: "Metodo",
            href: "/carriere/metodo",
            preview: {
              title: "Metodo",
              desc: "Processo non aggirabile.",
              image: hero("metodo"),
            },
          },
          {
            label: "Formazione",
            href: "/carriere/formazione",
            preview: {
              title: "Formazione",
              desc: "Onboarding e tutoring.",
              image: hero("formazione"),
            },
          },
        ],
      },
      {
        title: "Strumenti & Software",
        items: [
          {
            label: "Strumenti",
            href: "/carriere/strumenti",
            preview: {
              title: "Strumenti",
              desc: "Portali, materiali, supporto.",
              image: hero("strumenti"),
            },
          },
          {
            label: "Software (Experience)",
            href: "/carriere/software",
            preview: {
              title: "Software",
              desc: "Super Dashboard, KPI, compliance.",
              // non c'è cartella /software → uso hero 'strumenti' come fallback
              image: hero("strumenti"),
            },
          },
        ],
      },
    ],
  },

  // Esterno
  { label: "Area Riservata", href: "https://super-dashboard-v-1-0-0.vercel.app/", external: true },
];

export default NAV;
