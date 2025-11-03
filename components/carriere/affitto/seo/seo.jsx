import SEO from "@/common/seo/SEO";
import { absoluteUrl } from "@/lib/seo";

<SEO
  title="Agenti immobiliari — provvigione 60% + gara"
  description="Percorsi per Junior, Agent e Team Lead. Provvigioni fino al 60%, gara trimestrale e strumenti proprietari."
  image="/carriere/seo/agenti-immobiliari.png"
  imageAlt="Hero Agenti immobiliari Casa Corporation"
  type="website"
  locale="it_IT"
  twitterSite="@CasaCorp"      // opzionale
  structuredData={{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type":"ListItem", position:1, name:"Carriere", item:absoluteUrl("/carriere") },
      { "@type":"ListItem", position:2, name:"Agenti immobiliari", item:absoluteUrl("/carriere/agenti-immobiliari") },
    ]
  }}
/>
