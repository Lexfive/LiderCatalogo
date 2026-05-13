import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/products'
import { CatalogClient } from '@/components/catalog/CatalogClient'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Catálogo Completo',
  description:
    'Explore nossa coleção completa de quadros decorativos, molduras artesanais e espelhos exclusivos. Filtre por categoria, estilo, preço e muito mais.',
  path: '/catalogo',
})

export default function CatalogPage() {
  const products = getAllProducts()

  return (
    <>
      {/* Cabeçalho da página */}
      <div className="bg-cream-100 border-b border-charcoal-200 pt-[72px]">
        <div className="container-elite px-5 sm:px-8 md:px-12 lg:px-16 pt-10 pb-8">
          <span className="section-tag">Coleção Completa</span>
          <h1 className="font-serif text-display-lg font-light text-charcoal mb-4">
            Nosso <em>Catálogo</em>
          </h1>
          <div className="gold-divider" />
          <p className="text-charcoal-400 text-sm leading-relaxed max-w-xl">
            Peças exclusivas criadas para transformar cada ambiente em uma obra de arte. Filtre
            por categoria, estilo ou faixa de preço para encontrar a peça ideal.
          </p>
        </div>
      </div>

      {/* Grid com filtros */}
      <div className="container-elite section">
        <CatalogClient initialProducts={products} />
      </div>
    </>
  )
}
