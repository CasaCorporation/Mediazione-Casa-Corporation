// components/home/seo.jsx

import SEO from "@/common/seo/SEO";
import { absoluteUrl } from "@/lib/seo";

export default function HomeSEO() {
  return (
    <SEO
      // titolo vuoto → usa solo SITE_NAME
      title=""
      description="Percorsi chiari, strumenti proprietari e meritocrazia. Costruisci la tua carriera nel Real Estate con Casa Corporation."
      image={absoluteUrl("/home/seo.png")}       // <-- nuovo file per bustare la cache
      imageAlt="Carriere Casa Corporation"
      type="website"
      locale="it_IT"
      ogImageWidth={1200}               // <-- dimensioni esplicite per i crawler
      ogImageHeight={630}
      canonicalOverride={absoluteUrl("/")} // <-- canonical server-safe (niente JS)
      structuredData={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": absoluteUrl("#org"),
          name: "Casa Corporation",
          url: absoluteUrl("/"),
          logo: absoluteUrl("/apple-touch-icon.png"),
          sameAs: []
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": absoluteUrl("#website"),
          url: absoluteUrl("/"),
          name: "Casa Corporation — Carriere",
          publisher: { "@id": absoluteUrl("#org") },
          inLanguage: "it-IT"
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") }
          ]
        }
      ]}
    />
  );
}
