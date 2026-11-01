import type { MetadataRoute } from 'next';

/**
 * Robots policy — allow everything except Next.js internals
 * (/_next/, /api/) and expose the sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  const base = 'https://pirroot.site';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
