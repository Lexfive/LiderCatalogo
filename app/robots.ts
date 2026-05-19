/**
 * app/robots.ts
 * Next.js gera /robots.txt automaticamente a partir deste arquivo.
 */
import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Não indexar rotas de admin ou APIs privadas (adicione conforme necessário)
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
