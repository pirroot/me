import type { MetadataRoute } from 'next';

/**
 * Sitemap — single-page portfolio. We expose the homepage plus the
 * main in-page sections as separate entries so search engines index
 * each anchor's intent. (`lastModified` is set at request time so the
 * generated XML stays fresh without code changes.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://pirroot.site';
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/#experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/#projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/#contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
