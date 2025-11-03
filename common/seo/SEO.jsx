// common/seo/SEO.jsx
// (server component: NIENTE "use client")

import Head from "next/head";
import {
  SITE_NAME,
  DEFAULT_DESC,
  buildCanonical,
  absoluteUrl,
  ogImage as toOgImage,
} from "@/lib/seo";

/**
 * SEO — centralizzato e flessibile (SSR-friendly)
 *
 * Props:
 * - title?: string
 * - description?: string
 * - image?: string | absolute URL
 * - imageAlt?: string
 * - type?: "website"|"article"|"profile"|"product"|"job"
 * - noIndex?: boolean
 * - noFollow?: boolean
 * - canonicalOverride?: string  // PASSA QUI l’URL ASSOLUTO (es. absoluteUrl("/"))
 * - locale?: string
 * - twitterSite?: string
 * - ogImageWidth?: number
 * - ogImageHeight?: number
 * - structuredData?: object|object[]
 */
export default function SEO({
  title = "",
  description = DEFAULT_DESC,
  image,
  imageAlt,
  type = "website",
  noIndex = false,
  noFollow = false,
  canonicalOverride,
  locale = "it_IT",
  twitterSite,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  structuredData,
}) {
  // Canonical: se non viene passato, ricadiamo alla home
  const canonical = canonicalOverride || buildCanonical("/");

  // Titolo finale
  const fullTitle = title ? `${title} • ${SITE_NAME}` : SITE_NAME;

  // Immagine OG assoluta (accetta già assoluta; se relativa, la risolve)
  const absImage = image ? toOgImage(image) : null;

  // Robots
  const robots = [
    noIndex ? "noindex" : "index",
    noFollow ? "nofollow" : "follow",
  ].join(",");

  return (
    <Head>
      {/* Titolo & description */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {/* Robots */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph base */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Open Graph image */}
      {absImage && <meta property="og:image" content={absImage} />}
      {absImage && absImage.startsWith("https://") && (
        <meta property="og:image:secure_url" content={absImage} />
      )}
      {absImage && ogImageWidth && (
        <meta property="og:image:width" content={String(ogImageWidth)} />
      )}
      {absImage && ogImageHeight && (
        <meta property="og:image:height" content={String(ogImageHeight)} />
      )}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      {/* Twitter */}
      <meta name="twitter:card" content={absImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {absImage && <meta name="twitter:image" content={absImage} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {/* Structured Data (JSON-LD) opzionale */}
      {structuredData
        ? (Array.isArray(structuredData) ? structuredData : [structuredData]).map((obj, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
            />
          ))
        : null}
    </Head>
  );
}
