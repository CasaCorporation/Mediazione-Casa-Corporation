// components/carriere/strumenti/seo/seo.jsx
// (SSR — niente "use client")

import SEO from "@/common/seo/SEO";
import { absoluteUrl } from "@/lib/seo";

export default function SeoStrumenti() {
  return (
    <SEO
      title="Strumenti — CRM, playbook e dashboard KPI"
      description="CRM proprietario, pipeline non aggirabili, dashboard KPI, integrazioni e automazioni. Strumenti concreti per lavorare meglio."
      image={absoluteUrl("/carriere/seo/strumenti.png")}   // URL assoluto
      imageAlt="Suite strumenti Casa Corporation"
      type="website"
      locale="it_IT"
      ogImageWidth={1200}
      ogImageHeight={630}
      canonicalOverride={absoluteUrl("/carriere/strumenti")}
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Strumenti",
          url: absoluteUrl("/carriere/strumenti"),
          description:
            "CRM proprietario, pipeline non aggirabili, dashboard KPI, integrazioni e automazioni.",
          inLanguage: "it-IT"
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Carriere", item: absoluteUrl("/carriere") },
            { "@type": "ListItem", position: 2, name: "Strumenti", item: absoluteUrl("/carriere/strumenti") }
          ]
        }
      ]}
    />
  );
}
