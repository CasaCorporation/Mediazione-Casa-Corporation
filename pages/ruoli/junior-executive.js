import RolePage from "@/components/roles/RolePage";

export default function JuniorExecutivePage() {
  return (
    <RolePage
      metaTitle="Junior Executive — Carriere | Casa Corporation"
      metaDescription="Primo step nel percorso: metodo, formazione continua, supporto operativo e strumenti proprietari."
      roleTitle="Junior Executive"
      roleSubtitle="Ingresso nel metodo: training continuo, affiancamento e strumenti che semplificano."
      bgImage="/ruoli/junior-bg.png"

      overview="È il punto di ingresso nel nostro percorso. Impari e applichi il metodo non aggirabile, utilizzi strumenti proprietari e vieni affiancato nelle prime operazioni. Focus su relazione, qualifiche, ordine operativo e pipeline tracciata."

      responsibilities={[
        "Seguire processi e check-list di onboarding e compliance.",
        "Gestire i lead in entrata e mantenere aggiornata la pipeline.",
        "Raccogliere documentazione guidata e aggiornare il CRM.",
        "Supportare visite, sopralluoghi e pubblicazioni coordinate.",
      ]}

      activities={[
        "Primo contatto qualificato e pianificazione appuntamenti.",
        "Preparazione materiali (schede immobile, foto, note).",
        "Aggiornamento KPI personali sul Super Dashboard.",
        "Report veloce post-attività condiviso con il tutor.",
      ]}

      compensation={[
        {
          label: "Provvigione base",
          value: "30% sul fatturato",
          desc: "Percentuale sul fatturato generato dalle tue operazioni.",
          note: "Esempio: immobile 200.000€ — fee 8.000€ → 2.400€ al Junior.",
        },
        {
          label: "Premialità KPI",
          value: "Step su obiettivi",
          desc: "Bonus al superamento soglie trimestrali (pipeline, incarichi, chiusure).",
        },
        {
          label: "Gara trimestrale",
          value: "Montepremi",
          desc: "Premi extra su classifica interna, regole trasparenti.",
        },
      ]}

      benefitsCards={[
        { title: "Formazione continua", desc: "Onboarding, tutoring e aggiornamenti periodici." },
        { title: "Processi non aggirabili", desc: "Check-list e controlli che riducono errori." },
        { title: "Materiali e script", desc: "Kit operativo per chiamate, visite e pubblicazioni." },
        { title: "Supporto Back Office", desc: "Documenti, scadenze, allineamenti sempre sotto controllo." },
        { title: "Dashboard & KPI", desc: "Report in tempo reale e storico sempre disponibile." },
        { title: "Nessun costo fisso", desc: "Focus sui risultati: costi operativi centralizzati." },
      ]}
    />
  );
}
