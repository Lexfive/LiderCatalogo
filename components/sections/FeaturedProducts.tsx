import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="section bg-cream-100" aria-labelledby="featured-heading">
      <div className="container-elite">
        <AnimatedSection>
          <SectionHeader
            tag="Mais Vendidos"
            title="Destaques da<br /><em>Temporada</em>"
            subtitle="Peças escolhidas pela nossa curadoria com base em beleza, qualidade e aceitação dos nossos clientes."
          />
        </AnimatedSection>

        {/* Grid de produtos */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.id} delay={0.08 * i}>
              <ProductCard product={product} priority={i < 2} />
            </AnimatedSection>
          ))}
        </div>

        {/* Link para catálogo completo */}
        <div className="text-center mt-12">
          <AnimatedSection>
            <Link href="/catalogo" className="btn-primary group">
              Ver Catálogo Completo
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
