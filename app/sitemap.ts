/**
 * app/sitemap.ts
 * Next.js gera /sitemap.xml automaticamente a partir deste arquivo.
 * Adicionar novos produtos em lib/products.ts já os inclui aqui — zero manutenção.
 */
import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/products'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Páginas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogo`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categoria/quadros`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categoria/molduras`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categoria/espelhos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/inspiracao`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Rotas dinâmicas de produtos (geradas automaticamente de lib/products.ts)
  const productRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/produto/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
