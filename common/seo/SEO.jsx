// common/seo/SEO.jsx
"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_NAME, DEFAULT_DESC, SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * SEO — centralizzato
 * Props:
 *  - title: string (solo la parte pagina; il suffisso "• SITE_NAME" è aggiunto qui)
 *  - description: string
 *  - image: string (preferibilmente /path relativo a /public, 1200×630)
 *  - imageAlt?: string
 *  - noIndex?: boolean
 */
export default function SEO({
  title = "",
  description = DEFAULT_DESC,
  image,
  imageAlt,
  noIndex = false,
}) {
  const { asPath } = useRouter();
  const path = (asPath?.split("?")[0] || "/").replace(/\/+$/, "") || "/";
  const canonical = SITE_URL ? `${SITE_URL}${path}` : null;
  const fullTitle = title ? `${title} • ${SITE_NAME}` : SITE_NAME;
  const absImage = image ? absoluteUrl(image) : null;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {absImage && <meta property="og:image" content={absImage} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      {/* Twitter */}
      <meta name="twitter:card" content={absImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {absImage && <meta name="twitter:image" content={absImage} />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
}
