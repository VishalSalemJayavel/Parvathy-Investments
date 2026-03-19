import type { MetadataRoute } from 'next';

const BASE = 'https://parvathyinvestments.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified: new Date('2026-03-19'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date('2026-03-19'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/investments`,
      lastModified: new Date('2026-03-19'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/approach`,
      lastModified: new Date('2026-03-19'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date('2026-03-19'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
