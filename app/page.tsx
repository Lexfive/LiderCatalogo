import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Líder Molduras — Quadros, Molduras & Espelhos Premium',
  description:
    'Quadros decorativos, molduras artesanais e espelhos exclusivos de alto padrão. Peças que transformam ambientes com elegância e sofisticação.',
}

// Dados da galeria de inspiração (substituir por imagens reais)
const inspirationItems = [
  { gradient: 'linear-gradient(135deg, #2d2520, #4a3830)', label: 'Sala de Estar' },
  { gradient: 'linear-gradient(135deg, #1a2028, #2e3a48)', label: 'Escritório Premium' },
  { gradient: 'linear-gradient(135deg, #1e2820, #2e4038)', label: 'Quarto Master' },
  { gradient: 'linear-gradient(135deg, #282018, #3a3020)', label: 'Hall de Entrada' },
  { gradient: 'linear-gradient(135deg, #201828, #302840)', label: 'Lavabo Sofisticado' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero de impacto */}
      <HeroSection />

      {/* 3 categorias */}
      <CategoriesSection />

      {/* Produtos em destaque */}
      <FeaturedProducts />

      {/* Galeria de inspiração */}
      <section className="section" aria-labelledby="inspiration-heading">
        <div className="container-elite">
          <AnimatedSection>
            <SectionHeader
              tag="Ambientes"
              title="Inspirações que<br /><em>encantam</em>"
              subtitle="Uma curadoria de espaços criados com nossas peças. Deixe-se inspirar."
            />
          </AnimatedSection>

          <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[500px]">
            {inspirationItems.map(({ gradient, label }, i) => {
              // Layout editorial: colunas variadas
              const colSpans = [5, 3, 4, 4, 8]
              return (
                <AnimatedSection
                  key={label}
                  delay={0.08 * i}
                  className={`col-span-${colSpans[i]} relative overflow-hidden group cursor-pointer`}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
                    style={{ background: gradient }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[0.62rem] tracking-[0.18em] uppercase text-white/60">
                      {label}
                    </span>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <AnimatedSection>
              <Link href="/inspiracao" className="btn-outline">
                Ver Galeria Completa
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* CTA final */}
      <CtaBanner />
    </>
  )
}
