import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Sobre a Marca',
  description:
    'Conheça a história da Líder Molduras, nossa filosofia de curadoria, proposta de valor e os diferenciais que nos tornam referência em decoração premium no Brasil.',
  path: '/sobre',
})

const values = [
  {
    title: 'Curadoria Rigorosa',
    description:
      'Selecionamos apenas peças que passam pelo nosso padrão de excelência estética e qualidade construtiva. Cada produto é analisado em detalhe antes de entrar no catálogo.',
  },
  {
    title: 'Acabamento Artesanal',
    description:
      'Cada peça é trabalhada à mão por artesãos especializados, garantindo unicidade em cada detalhe. O que chega ao seu espaço é verdadeiro trabalho de ofício.',
  },
  {
    title: 'Atendimento Consultivo',
    description:
      'Mais que vender, orientamos. Nossos consultores ajudam a compor ambientes com harmonia, proporção e identidade — do apartamento ao projeto de alto padrão.',
  },
  {
    title: 'Sustentabilidade',
    description:
      'Materiais certificados, embalagens reutilizáveis e fornecedores comprometidos com práticas responsáveis. Beleza com consciência.',
  },
  {
    title: 'Prazo Comprometido',
    description:
      'Cada entrega é tratada como uma promessa. Embalagem artística especializada e rastreamento em tempo real para você acompanhar sua peça até o destino.',
  },
  {
    title: 'Personalização',
    description:
      'Dimensões fora do padrão, combinações de materiais exclusivas ou projetos de encomenda: nossa equipe está preparada para criar a peça ideal para o seu espaço.',
  },
]

export default function AboutPage() {
  return (
    <>
      <div className="pt-[72px]">
        <section className="section">
          <div className="container-elite">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
              {/* Imagem / Visual */}
              <AnimatedSection direction="left" className="relative">
                {/* Imagem principal (placeholder) */}
                <div
                  className="w-full aspect-[3/4] relative"
                  style={{ background: 'linear-gradient(135deg, #2d2520, #4a3830)' }}
                  aria-label="Ambiente decorado com peças Líder Molduras"
                >
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div className="w-1/2 h-2/3 border border-gold/30" />
                  </div>
                  {/* Quote overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="border border-gold/30 p-6">
                      <blockquote className="font-serif text-lg font-light italic text-white/80 leading-relaxed">
                        &ldquo;Acreditamos que cada ambiente merece ser habitado com beleza e
                        intenção.&rdquo;
                      </blockquote>
                      <cite className="block mt-3 text-[0.65rem] tracking-[0.2em] uppercase text-gold not-italic">
                        — Fundadoras, Líder Molduras
                      </cite>
                    </div>
                  </div>
                </div>

                {/* Elementos decorativos */}
                <div
                  className="absolute -top-6 -right-6 w-[55%] aspect-square bg-gold-pale -z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 -left-6 w-[45%] h-[35%] bg-cream-200 -z-10"
                  aria-hidden="true"
                />
              </AnimatedSection>

              {/* Texto */}
              <AnimatedSection delay={0.15}>
                <SectionHeader
                  tag="Nossa História"
                  title="Mais que decoração,<br /><em>uma filosofia</em>"
                />

                <div className="space-y-4 text-charcoal-600 text-sm leading-relaxed mb-10">
                  <p>
                    Fundada em 2016 por duas artistas apaixonadas por design de interiores, a
                    Líder Molduras nasceu da vontade de trazer ao mercado brasileiro peças com o
                    refinamento das melhores casas europeias — mas com alma e identidade
                    genuinamente nossas.
                  </p>
                  <p>
                    Cada peça do nosso catálogo é selecionada com critério rigoroso: materiais
                    nobres, acabamentos artesanais e um design intemporal que dialoga com
                    diferentes estilos de vida. Não vendemos apenas objetos — criamos experiências
                    visuais que elevam a qualidade de vida.
                  </p>
                  <p>
                    Hoje, atendemos clientes em todo o Brasil, de arquitetos e decoradores a
                    famílias que simplesmente querem transformar a casa em um lugar mais bonito.
                    Em todos os casos, a resposta é a mesma: atenção ao detalhe, paixão pelo
                    belo e compromisso com a excelência.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/catalogo" className="btn-primary">
                    Ver Coleção
                  </Link>
                  <Link href="/contato" className="btn-outline">
                    Falar Conosco
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="section bg-charcoal" aria-label="Números da empresa">
          <div className="container-elite">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '8+', label: 'Anos de experiência' },
                { value: '2.400+', label: 'Clientes atendidos' },
                { value: '500+', label: 'Produtos curados' },
                { value: '100%', label: 'Artesanal' },
              ].map(({ value, label }) => (
                <AnimatedSection key={label} className="text-center">
                  <strong className="block font-serif text-5xl font-light text-white mb-2">
                    {value}
                  </strong>
                  <span className="text-[0.65rem] tracking-[0.18em] uppercase text-white/40 font-sans">
                    {label}
                  </span>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="section" aria-labelledby="values-heading">
          <div className="container-elite">
            <AnimatedSection>
              <SectionHeader
                tag="Nossos Diferenciais"
                title="Por que escolher a<br /><em>Líder Molduras?</em>"
                align="center"
              />
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map(({ title, description }, i) => (
                <AnimatedSection key={title} delay={0.08 * i}>
                  <div className="border-l-2 border-gold pl-5">
                    <h3 className="font-serif text-xl font-normal mb-2 text-charcoal">
                      {title}
                    </h3>
                    <p className="text-charcoal-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </div>

      <CtaBanner />
    </>
  )
}
