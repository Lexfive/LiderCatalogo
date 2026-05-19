import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'

// ─── FONTES ───────────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

// ─── METADATA GLOBAL ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lidermolduras.com.br'),
  title: {
    template: '%s | Líder Molduras',
    default: 'Líder Molduras — Quadros, Molduras & Espelhos Premium',
  },
  description:
    'Quadros decorativos, molduras artesanais e espelhos exclusivos de alto padrão. Peças que transformam ambientes com elegância e sofisticação.',
  keywords: [
    'quadros decorativos',
    'molduras artesanais',
    'espelhos decorativos',
    'decoração premium',
    'arte para parede',
    'decoração de interiores',
    'quadros para sala',
    'espelhos exclusivos',
  ],
  authors: [{ name: 'Líder Molduras' }],
  creator: 'Líder Molduras',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Líder Molduras',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Líder Molduras — Quadros, Molduras & Espelhos Premium',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
