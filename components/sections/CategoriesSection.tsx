import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

const categories = [
  {
    href: '/categoria/quadros',
    tag: 'Linha de Arte',
    title: 'Quadros\nDecorativos',
    description: 'Arte que narra histórias e transforma paredes em experiências.',
    gradient: 'linear-gradient(135deg, #2a2118, #4a3828)',
    frameType: 'rect' as const,
  },
  {
    href: '/categoria/molduras',
    tag: 'Artesanal',
    title: 'Molduras\nArtesanais',
    description: 'Acabamento à mão, materiais nobres e precisão construtiva.',
    gradient: 'linear-gradient(135deg, #1a2028, #2e3a48)',
    frameType: 'rect-inner' as const,
  },
  {
    href: '/categoria/espelhos',
    tag: 'Exclusivo',
    title: 'Espelhos\nExclusivos',
    description: 'Design autoral que reflete personalidade e sofisticação.',
    gradient: 'linear-gradient(135deg, #1e2820, #2e4038)',
    frameType: 'circle' as const,
  },
]

function CategoryFrame({ type }: { type: 'rect' | 'rect-inner' | 'circle' }) {
  if (type === 'circle') {
    return (
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[55%] aspect-square rounded-full border border-gold/30"
        aria-hidden="true"
      />
    )
  }
  if (type === 'rect-inner') {
    return (
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[60%] h-[75%] border-2 border-gold/30"
        aria-hidden="true"
      />
    )
  }
  return (
    <div
      className="absolute inset-[20%] border border-gold/25"
      aria-hidden="true"
    />
  )
}

export function CategoriesSection() {
  return (
    <section className="section" aria-labelledby="categories-heading">
      <div className="container-elite">
        <AnimatedSection>
          <SectionHeader
            tag="Nossas Linhas"
            title="Três categorias,<br /><em>uma identidade</em>"
            subtitle="Cada linha foi curada para oferecer o melhor em arte, artesanato e design de interiores."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(({ href, tag, title, description, gradient, frameType }, i) => (
            <AnimatedSection key={href} delay={0.1 * i}>
              <Link
                href={href}
                className="relative block overflow-hidden aspect-[3/4] group
                           focus-visible:outline-2 focus-visible:outline-gold"
                aria-label={`Ver coleção de ${title.replace('\n', ' ')}`}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
                  style={{ background: gradient }}
                />

                {/* Frame decorativo */}
                <CategoryFrame type={frameType} />

                {/* Overlay */}
                <div className="overlay-dark" aria-hidden="true" />

                {/* Conteúdo */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-[0.62rem] tracking-[0.22em] uppercase text-gold-light block mb-2">
                    {tag}
                  </span>
                  <h3 className="font-serif text-3xl font-light text-white leading-tight whitespace-pre-line mb-3">
                    {title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">{description}</p>
                  <span
                    className="text-[0.68rem] tracking-[0.14em] uppercase
                               text-white/50 group-hover:text-gold-light
                               transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    Explorar coleção
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
