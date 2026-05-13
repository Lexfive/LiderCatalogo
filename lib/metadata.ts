import type { Metadata } from 'next'

const siteName = 'Líder Molduras'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const defaultDescription =
  'Quadros decorativos, molduras artesanais e espelhos exclusivos de alto padrão. Peças que transformam ambientes com elegância e sofisticação.'

export function buildMetadata({
  title,
  description = defaultDescription,
  path = '',
  image,
}: {
  title: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const fullTitle = `${title} | ${siteName}`
  const url = `${siteUrl}${path}`
  const ogImage = image || `${siteUrl}/images/og-default.jpg`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}
