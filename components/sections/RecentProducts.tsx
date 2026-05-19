/**
 * components/sections/RecentProducts.tsx
 * Seção "Recém Adicionados" — puxa os produtos mais recentes do Supabase.
 * Substitui "Destaques da Temporada" na home.
 */
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProductCardDB } from '@/components/ui/ProductCardDB'

export async function RecentProducts() {
  const supabase = createServerSupabaseClient()

  // Busca os 4 produtos mais recentes disponíveis
  const { data: products } = await supabase
    .from('products')
    .select('id, slug, name, category, width_cm, height_cm, images, badge, available, featured')
    .eq('available', true)
    .order('created_at', { ascending: false })
    .limit(4)

  // Se não há produtos cadastrados ainda, não renderiza a seção
  if (!products || products.length === 0) return null

  return (
    <section className="section bg-cream-100" aria-label="Recém adicionados ao catálogo">
      <div className="container-elite">
        <AnimatedSection>
          <SectionHeader
            tag="Recém Adicionados"
            title="Novidades do<br /><em>Catálogo</em>"
            subtitle="Os produtos mais recentes adicionados ao nosso catálogo. Sempre renovando."
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <AnimatedSection key={product.id} delay={0.08 * i}>
              <ProductCardDB product={product} priority={i < 2} />
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedSection>
            <Link href="/catalogo" className="btn-primary group">
              Ver Catálogo Completo
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
