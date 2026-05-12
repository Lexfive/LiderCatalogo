/**
 * app/manifest.ts
 * Next.js gera /manifest.webmanifest automaticamente.
 * Habilita instalação como PWA leve (Add to Home Screen) sem service worker complexo.
 *
 * Para PWA completo com offline support no futuro, adicione:
 * - next-pwa (npm i next-pwa)
 * - Service worker em public/sw.js
 */
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Maison Élite — Decoração Premium',
    short_name: 'Maison Élite',
    description: 'Quadros, molduras e espelhos exclusivos de alto padrão.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF7',  // --cream
    theme_color: '#B8985A',       // --gold
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['shopping', 'lifestyle'],
    lang: 'pt-BR',
  }
}
