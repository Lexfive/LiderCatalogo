import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductsByCategoryDB } from '@/lib/supabase/products-db'
import type { ProductCategory } from '@/lib/products'
import { CatalogClient } from '@/components/catalog/CatalogClient'
import { buildMetadata } from '@/lib/metadata'

// Configuração de cada categoria
const categoryConfig: Record<
  string,
  {
    slug: ProductCategory
    title: string
    tag: string
    description: string
    longDescription: string
    gradient: string
  }
> = {
  quadros: {
    slug: 'quadro',
    title: 'Quadros Decorativos',
    tag: 'Linha de Arte',
    description: 'Arte que narra histórias e transforma paredes em experiências.',
    longDescription:
      'Nossa coleção de quadros decorativos reúne obras originais e reproduções artísticas de alta fidelidade. Cada peça é selecionada com rigor estético para garantir que cada ambiente ganhe personalidade, profundidade e elegância.',
    gradient: 'linear-gradient(135deg, #2d2520, #4a3830)',
  },
  molduras: {
    slug: 'moldura',
    title: 'Molduras Artesanais',
    tag: 'Artesanal',
    description: 'Cada moldura é trabalhada à mão, com materiais nobres e acabamento de excelência.',
    longDescription:
      'Produzidas por artesãos especializados com décadas de experiência, nossas molduras combinam tradição e design contemporâneo. Disponíveis em diferentes estilos, materiais e tamanhos — e sempre prontas para personalização.',
    gradient: 'linear-gradient(135deg, #1a2028, #2e3a48)',
  },
  espelhos: {
    slug: 'espelho',
    title: 'Espelhos Exclusivos',
    tag: 'Exclusivo',
    description: 'Design autoral que reflete personalidade e sofisticação.',
    longDescription:
      'Mais do que funcionais, nossos espelhos são peças de arte. Cada design foi concebido para ser o protagonista do ambiente, com molduras que vão do minimalismo contemporâneo ao mais elaborado classicismo.',
    gradient: 'linear-gradient(135deg, #1e2820, #2e4038)',
  },
}

// Gera parâmetros estáticos para as 3 categorias.
// dynamicParams = false garante 404 para qualquer slug fora desta lista,
// e é OBRIGATÓRIO para output: export (Hostinger).
export const dynamicParams = false

export async function generateStaticParams() {
  return [{ slug: 'quadros' }, { slug: 'molduras' }, { slug: 'espelhos' }]
}

// Gera metadata dinâmica por categoria
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const config = categoryConfig[params.slug]
  if (!config) return {}

  return buildMetadata({
    title: config.title,
    description: config.longDescription,
    path: `/categoria/${params.slug}`,
  })
}

export const dynamic = 'force-dynamic'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const config = categoryConfig[params.slug]
  if (!config) notFound()

  const rawProducts = await getProductsByCategoryDB(config.slug)
  const products = rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug, name: p.name,
    category: p.category as ProductCategory,
    styles: p.styles ?? [],
    dimensions: { width: p.width_cm, height: p.height_cm, depth: p.depth_cm ?? undefined },
    materials: p.materials ?? '',
    finish: p.finish ?? [],
    description: p.description ?? '',
    fullDescription: p.full_description ?? '',
    images: p.images ?? [],
    thumbnailColor: ['#2d2520', '#4a3830'],
    badge: p.badge ?? undefined,
    featured: p.featured,
    available: p.available,
    deliveryDays: p.delivery_days ?? undefined,
    marketplaceUrl: p.marketplace_url ?? undefined,
    createdAt: p.created_at,
  }))

  return (
    <>
      {/* Banner da categoria */}
      <div className="relative h-[360px] flex items-end overflow-hidden pt-[72px]">
        <div
          className="absolute inset-0"
          style={{ background: config.gradient }}
          aria-hidden="true"
        />
        <div className="overlay-dark" aria-hidden="true" />

        <div className="container-elite section relative z-10 pb-12">
          <span className="section-tag">{config.tag}</span>
          <h1 className="font-serif text-display-lg font-light text-white leading-tight mb-3">
            {config.title}
          </h1>
          <p className="text-white/60 text-sm max-w-[420px] leading-relaxed">
            {config.description}
          </p>
        </div>
      </div>

      {/* Descrição da linha */}
      <div className="bg-cream-100 border-b border-charcoal-200">
        <div className="container-elite px-6 md:px-12 lg:px-16 py-8">
          <p className="text-charcoal-400 text-sm leading-relaxed max-w-2xl">
            {config.longDescription}
          </p>
        </div>
      </div>

      {/* Grid de produtos (com filtros de estilo/ordenação) */}
      <div className="container-elite section">
        <CatalogClient initialProducts={products} initialCategory={config.slug} />
      </div>
    </>
  )
}
