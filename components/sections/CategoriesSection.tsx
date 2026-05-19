import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Cards das 3 categorias na home.
 *
 * COMO TROCAR AS IMAGENS:
 * 1. Coloque os arquivos em /public/images/categories/
 *    - quadros.jpg    (proporção 3:4 ideal, mín. 600×800px)
 *    - molduras.jpg
 *    - espelhos.jpg
 * 2. As imagens já estão configuradas abaixo — só substituir os arquivos.
 * 3. Enquanto não há foto, o gradiente de fundo é exibido automaticamente.
 */
const categories = [
  {
    href: '/categoria/quadros',
    tag: 'Linha de Arte',
    title: 'Quadros\nDecorativos',
    description: 'Arte que narra histórias e transforma paredes em experiências únicas.',
    image: '/images/categories/quadros.jpg',
    gradient: 'linear-gradient(145deg, #2a2118, #4a3828)',
    frameType: 'rect' as const,
  },
  {
    href: '/categoria/molduras',
    tag: 'Artesanal',
    title: 'Molduras\nArtesanais',
    description: 'Acabamento à mão, materiais nobres e precisão construtiva de excelência.',
    image: '/images/categories/molduras.jpg',
    gradient: 'linear-gradient(145deg, #1a2028, #2e3a48)',
    frameType: 'rect-inner' as const,
  },
  {
    href: '/categoria/espelhos',
    tag: 'Exclusivo',
    title: 'Espelhos\nExclusivos',
    description: 'Design autoral que reflete personalidade e sofisticação em cada detalhe.',
    image: '/images/categories/espelhos.jpg',
    gradient: 'linear-gradient(145deg, #1e2820, #2e4038)',
    frameType: 'circle' as const,
  },
]

function CategoryFrame({ type }: { type: 'rect' | 'rect-inner' | 'circle' }) {
  if (type === 'circle') {
    return (
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[52%] aspect-square rounded-full border border-gold/25 z-10"
        aria-hidden="true"
      />
    )
  }
  if (type === 'rect-inner') {
    return (
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[58%] h-[70%] border-2 border-gold/25 z-10"
        aria-hidden="true"
      />
    )
  }
  return (
    <div
      className="absolute inset-[22%] border border-gold/20 z-10"
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
          {categories.map(({ href, tag, title, description, image, gradient, frameType }, i) => (
            <AnimatedSection key={href} delay={0.1 * i}>
              <Link
                href={href}
                className="relative block overflow-hidden aspect-[3/4] group
                           focus-visible:outline-2 focus-visible:outline-gold"
                aria-label={`Ver coleção de ${title.replace('\n', ' ')}`}
              >
                {/* Imagem real (quando disponível) — gradiente como fallback */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
                  style={{ background: gradient }}
                >
                  <Image
                    src={image}
                    alt={title.replace('\n', ' ')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    // onError é tratado pelo fallback do gradiente
                  />
                </div>

                {/* Frame decorativo */}
                <CategoryFrame type={frameType} />

                {/* Overlay gradiente */}
                <div className="overlay-dark z-[2]" aria-hidden="true" />

                {/* Conteúdo */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-[3]">
                  <span className="text-[0.62rem] tracking-[0.22em] uppercase text-gold-light block mb-2">
                    {tag}
                  </span>
                  <h3 className="font-serif text-3xl font-light text-white leading-tight whitespace-pre-line mb-3">
                    {title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">{description}</p>
                  <span className="text-[0.68rem] tracking-[0.14em] uppercase
                                   text-white/50 group-hover:text-gold-light
                                   transition-colors duration-300 inline-flex items-center gap-2">
                    Explorar coleção
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Instrução visível apenas em desenvolvimento */}
        {process.env.NODE_ENV === 'development' && (
          <p className="text-center text-xs text-charcoal-300 mt-6 border border-dashed border-charcoal-200 py-3 px-4">
            💡 Substitua as imagens em <code>/public/images/categories/quadros.jpg</code>,{' '}
            <code>molduras.jpg</code> e <code>espelhos.jpg</code>
          </p>
        )}
      </div>
    </section>
  )
}
