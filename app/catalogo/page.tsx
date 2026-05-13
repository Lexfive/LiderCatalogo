import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { CatalogClient } from '@/components/catalog/CatalogClient'
import { getAllProductsDB } from '@/lib/supabase/products-db'

// SSR — sempre reflete os dados mais recentes do Supabase
export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'Catálogo Completo',
  description: 'Explore nossa coleção de quadros decorativos, molduras artesanais e espelhos exclusivos.',
  path: '/catalogo',
})

export default async function CatalogPage() {
  const products = await getAllProductsDB()

  // Adapta ProductRow para o formato esperado pelo CatalogClient
  const adapted = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category as 'quadro' | 'moldura' | 'espelho',
    styles: p.styles ?? [],
    dimensions: { width: p.width_cm, height: p.height_cm, depth: p.depth_cm ?? undefined },
    materials: p.materials ?? '',
    finish: p.finish ?? [],
    description: p.description ?? '',
    fullDescription: p.full_description ?? '',
    images: p.images ?? [],
    thumbnailColor: ['#2d2520', '#4a3830'], // placeholder genérico
    badge: p.badge ?? undefined,
    featured: p.featured,
    available: p.available,
    deliveryDays: p.delivery_days ?? undefined,
    marketplaceUrl: p.marketplace_url ?? undefined,
    createdAt: p.created_at,
  }))

  return (
    <>
      <div className="bg-cream-100 border-b border-charcoal-200 pt-[72px]">
        <div className="container-elite px-5 sm:px-8 md:px-12 lg:px-16 pt-10 pb-8">
          <span className="section-tag">Coleção Completa</span>
          <h1 className="font-serif text-display-lg font-light text-charcoal mb-4">
            Nosso <em>Catálogo</em>
          </h1>
          <div className="gold-divider" />
          <p className="text-charcoal-400 text-sm leading-relaxed max-w-xl">
            Peças exclusivas para transformar cada ambiente. Filtre por categoria ou estilo.
          </p>
        </div>
      </div>

      <div className="container-elite section">
        <CatalogClient initialProducts={adapted} />
      </div>
    </>
  )
}
