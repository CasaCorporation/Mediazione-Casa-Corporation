import RolePage from "@/components/roles/RolePage";

export default function CorporateSeniorPage() {
  return (
    <RolePage
      metaTitle="Corporate Senior — Carriere | Casa Corporation"
      metaDescription="Gestione autonoma di portafoglio e trattative complesse con risultati misurabili."
      roleTitle="Corporate Senior"
      roleSubtitle="Portafoglio attivo, incarichi di qualità e negoziazioni strutturate."
      bgImage="/ruoli/senior-bg.png"

      overview="Gestisci un portafoglio attivo, conduci trattative strutturate e coordini in autonomia le fasi operative. KPI e performance sono tracciati in real-time con report condivisi e priorità chiare."

      responsibilities={[
        "Gestire incarichi esclusivi e operazioni a maggior valore.",
        "Curare due diligence documentale con Back Office e consulenti.",
        "Definire strategia di prezzo, posizionamento e media plan.",
        "Mentor operativo per profili Junior su task selezionati.",
      ]}

      activities={[
        "Coordinare visite, pubblicazioni e materiali media.",
        "Negoziare condizioni e gestire obiezioni con metodo.",
        "Curare la documentazione fino al rogito/notarile.",
        "Monitorare KPI, forecast e priorità su Super Dashboard.",
      ]}

      compensation={[
        {
          label: "Provvigione avanzata",
          value: "Percentuale superiore",
          desc: "Percentuali più alte in base a portfolio e performance.",
          note: "Imposta qui le tue soglie interne (es. +X% su incarichi esclusivi).",
        },
        {
          label: "Premi produzione",
          value: "Bonus su target",
          desc: "Premialità legate a volumi, margini e qualità incarichi.",
        },
        {
          label: "Gara trimestrale",
          value: "Montepremi",
          desc: "Classifica con premi, regole chiare e verificabili.",
        },
      ]}

      benefitsCards={[
        { title: "Incarichi prioritari", desc: "Accesso a lead e immobili di fascia superiore." },
        { title: "Media & Marketing Pro", desc: "Foto, video e distribuzione coordinata." },
        { title: "Autonomia operativa", desc: "Governance della pipeline e delle priorità." },
        { title: "Supporto consulenti", desc: "Due diligence con team tecnico e legale." },
        { title: "Dashboard avanzata", desc: "KPI di performance, forecast e storico operazioni." },
        { title: "Premialità competitiva", desc: "Sistema trasparente e scalabile." },
      ]}
    />
  );
}
