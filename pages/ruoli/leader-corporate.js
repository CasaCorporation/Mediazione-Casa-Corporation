import RolePage from "@/components/roles/RolePage";

export default function LeaderCorporatePage() {
  return (
    <RolePage
      metaTitle="Leader Corporate — Carriere | Casa Corporation"
      metaDescription="Guida team, governa i processi e scala risultati con responsabilità su persone e numeri."
      roleTitle="Leader Corporate"
      roleSubtitle="Leadership di team, governance dei processi, strategia e responsabilità su risultati."
      bgImage="/ruoli/leader-bg.png"

      overview="Definisci priorità, governi i processi e garantisci qualità esecutiva su persone e numeri. Dashboard, controlli non aggirabili e governance chiara per scalare risultati in modo prevedibile."

      responsibilities={[
        "Pianificare obiettivi, forecast e controllo performance.",
        "Coaching, affiancamenti e feedback strutturati al team.",
        "Governance su pipeline, priorità e standard operativi.",
        "Relazioni corporate e sviluppo partnership strategiche.",
      ]}

      activities={[
        "Allocare incarichi e monitorare SLA interni.",
        "Organizzare meeting operativi e allineamenti periodici.",
        "Supportare trattative e decisioni critiche sul campo.",
        "Gestire budget, premi produzione e crescita del team.",
      ]}

      compensation={[
        {
          label: "Variabile Team",
          value: "Risultati di squadra",
          desc: "Componente variabile collegata ai KPI del team.",
          note: "Definisci qui le % su produzione team e obiettivi.",
        },
        {
          label: "Override Leadership",
          value: "Quote su portfolio",
          desc: "Meccanismo di override su incarichi e volumi gestiti.",
        },
        {
          label: "Premi Executive",
          value: "Bonus strategici",
          desc: "Premialità speciali su progetti corporate e crescita.",
        },
      ]}

      benefitsCards={[
        { title: "Team dedicato", desc: "Selezione, tutoring e supporto cross-funzionale." },
        { title: "Governance & KPI", desc: "Controlli non aggirabili, dashboard e forecast." },
        { title: "Progetti corporate", desc: "Deal complessi, partnership e iniziative speciali." },
        { title: "Budget & premi", desc: "Struttura premiante chiara e sostenibile." },
        { title: "Crescita territoriale", desc: "Sviluppo aree, spin-off e responsabilità estese." },
        { title: "Leadership coaching", desc: "Percorsi executive e strumenti di people management." },
      ]}
    />
  );
}
