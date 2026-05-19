import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildMetadata } from '@/lib/metadata'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Instagram } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Sobre a Marca',
  description:
    'Conheça Marcos Pereira, fundador da Líder Molduras, e a história de uma empresa que transforma ambientes com quadros decorativos, molduras e espelhos de alto padrão.',
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

        {/* ── Seção do Fundador ─────────────────────────────────────────── */}
        <section className="section">
          <div className="container-elite">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

              {/* Foto do Marcos */}
              <AnimatedSection direction="left" className="relative">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/marcos-pereira.png"
                    alt="Marcos Pereira — Fundador da Líder Molduras"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Overlay sutil na parte inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3
                                  bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Nome sobre a foto */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="font-serif text-2xl font-light text-white leading-tight">
                      Marcos Pereira
                    </p>
                    <p className="text-[0.68rem] tracking-[0.22em] uppercase text-gold-light mt-1">
                      Fundador · Líder Molduras
                    </p>
                    <a
                      href="https://www.instagram.com/marcospereira.ecommerce/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram de Marcos Pereira"
                      className="inline-flex items-center gap-1.5 mt-3
                                 text-white/50 hover:text-gold-light transition-colors duration-300
                                 text-[0.72rem] tracking-wide"
                    >
                      <Instagram size={13} />
                      @marcospereira.ecommerce
                    </a>
                  </div>
                </div>

                {/* Elementos decorativos */}
                <div
                  className="absolute -top-5 -right-5 w-[45%] aspect-square bg-gold-pale -z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-5 -left-5 w-[35%] h-[30%] bg-cream-200 -z-10"
                  aria-hidden="true"
                />
              </AnimatedSection>

              {/* Texto da empresa + fundador */}
              <AnimatedSection delay={0.15}>
                <SectionHeader
                  tag="Nossa História"
                  title="Mais que decoração,<br /><em>uma filosofia</em>"
                />

                <div className="space-y-4 text-charcoal-600 text-sm leading-relaxed mb-10">
                  {/* Parágrafo sobre o Marcos */}
                  <p>
                    A Líder Molduras foi fundada por{' '}
                    <strong className="text-charcoal font-medium">Marcos Pereira</strong>,
                    empreendedor com trajetória sólida no e-commerce e uma visão clara: levar
                    arte decorativa de qualidade para lares e espaços de todo o Brasil. Com
                    experiência no mercado digital e paixão por estética, Marcos construiu a
                    Líder Molduras como um negócio que une curadoria refinada, atendimento
                    próximo e operação eficiente.
                  </p>

                  {/* Textos mantidos conforme solicitado */}
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

                {/* Quote do fundador */}
                <div className="border-l-2 border-gold pl-5 mb-10">
                  <blockquote className="font-serif text-lg font-light italic text-charcoal-600 leading-relaxed">
                    &ldquo;Acreditamos que cada ambiente merece ser habitado com beleza
                    e intenção.&rdquo;
                  </blockquote>
                  <cite className="block mt-2 text-[0.65rem] tracking-[0.2em] uppercase text-gold not-italic">
                    — Marcos Pereira, Fundador
                  </cite>
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

        {/* ── Números ──────────────────────────────────────────────────────── */}
        <section className="section bg-charcoal" aria-label="Números da empresa">
          <div className="container-elite">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 'BH', label: 'Belo Horizonte, MG' },
                { value: 'BR', label: 'Entrega em todo o Brasil' },
                { value: '100%', label: 'Artesanal' },
                { value: '★★★★★', label: 'Satisfação dos clientes' },
              ].map(({ value, label }) => (
                <AnimatedSection key={label} className="text-center">
                  <strong className="block font-serif text-4xl font-light text-white mb-2">
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

        {/* ── Diferenciais ─────────────────────────────────────────────────── */}
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
