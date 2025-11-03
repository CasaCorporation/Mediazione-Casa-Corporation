// pages/_app.js
import "@/styles/globals.css";
import "@/styles/fixes.css";
import "@/styles/buttons.css";

import Head from "next/head";
import dynamic from "next/dynamic";

// SEO centralizzato (se non esiste ancora, commenta <SEO /> sotto)
import SEO from "@common/seo/SEO";

// I pezzi che possono toccare window/DOM li carichiamo client-only
const GSAPProvider = dynamic(() => import("@common/ux/GSAPProvider"), { ssr: false });
const PageTransition = dynamic(() => import("@common/ux/PageTransition"), { ssr: true });
const ScrollProgressBar = dynamic(() => import("@common/ux/ScrollProgressBar"), { ssr: false });

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* fallback minimo per evitare layout shift */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* SEO di default per il sito; le pagine possono sovrascrivere con <Head> o props al <SEO /> */}
      <SEO />

      {/* Providers/UX solo client */}
      <GSAPProvider />
      {/* Se in qualche pagina inserisci di nuovo ScrollProgressBar, potresti vedere doppio: in quel caso toglilo dalla pagina */}
      <ScrollProgressBar />

      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </>
  );
}
//pre disastro gti