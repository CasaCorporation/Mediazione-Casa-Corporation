import bundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: "camera=(), microphone=(), geolocation=()" },
];

const csp = [
  "default-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "frame-ancestors 'self'",
  "object-src 'none'",
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'gsap',
      '@studio-freight/lenis',
      '@headlessui/react',
      'lucide-react',
    ],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          // CSP SOLO IN PRODUZIONE (in dev rompe React Refresh se presente)
          ...(isProd ? [{ key: 'Content-Security-Policy', value: csp }] : []),
          ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }] : []),
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
