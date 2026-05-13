import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Galeria de Inspiração',
  description:
    'Uma curadoria de ambientes criados com peças da Líder Molduras. Deixe-se inspirar para transformar sua casa.',
  path: '/inspiracao',
})

const rooms = [
  { gradient: 'linear-gradient(135deg, #2d2520, #4a3830)', label: 'Sala de Estar Contemporânea', tag: 'Sala' },
  { gradient: 'linear-gradient(135deg, #1a2028, #2e3a48)', label: 'Escritório Premium', tag: 'Home Office' },
  { gradient: 'linear-gradient(135deg, #1e2820, #2e4038)', label: 'Quarto Master Sofisticado', tag: 'Quarto' },
  { gradient: 'linear-gradient(135deg, #282018, #3a3020)', label: 'Hall de Entrada Elegante', tag: 'Hall' },
  { gradient: 'linear-gradient(135deg, #201828, #302840)', label: 'Lavabo Minimalista', tag: 'Lavabo' },
  { gradient: 'linear-gradient(135deg, #182028, #283848)', label: 'Sala de Jantar Clássica', tag: 'Sala de Jantar' },
  { gradient: 'linear-gradient(135deg, #2a1818, #403028)', label: 'Varanda Decorada', tag: 'Varanda' },
  { gradient: 'linear-gradient(135deg, #182018, #283828)', label: 'Corredor com Arte', tag: 'Corredor' },
  { gradient: 'linear-gradient(135deg, #202828, #303840)', label: 'Closet Luxuoso', tag: 'Closet' },
]

export default function InspirationPage() {
  return (
    <>
      <div className="pt-[72px]">
        {/* Hero da página */}
        <div className="relative h-[400px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1a1814 0%, #2d2820 50%, #1a1814 100%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }}
            aria-hidden="true"
          />
          <div className="container-elite section relative z-10">
            <span className="section-tag">Galeria Editorial</span>
            <h1 className="font-serif text-display-lg font-light text-white mb-4">
              Ambientes que <em>inspiram</em>
            </h1>
            <div className="gold-divider" />
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Uma curadoria de espaços criados com nossas peças. Cada ambiente conta uma história
              de elegância, cuidado e identidade.
            </p>
          </div>
        </div>

        {/* Galeria */}
        <section className="section" aria-label="Galeria de ambientes inspiradores">
          <div className="container-elite">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map(({ gradient, label, tag }, i) => (
                <AnimatedSection key={label} delay={0.06 * i}>
                  <article
                    className="relative overflow-hidden group cursor-pointer"
                    style={{
                      aspectRatio: i % 3 === 0 ? '4/5' : '3/4',
                    }}
                    aria-label={label}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
                      style={{ background: gradient }}
                      aria-hidden="true"
                    />
                    {/* Decoração interna */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-10"
                      aria-hidden="true"
                    >
                      <div className="w-1/2 h-3/5 border border-gold/50" />
                    </div>
                    <div className="overlay-dark" aria-hidden="true" />

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <span className="text-[0.62rem] tracking-[0.2em] uppercase text-gold-light block mb-1">
                        {tag}
                      </span>
                      <h3 className="font-serif text-xl font-light text-white leading-tight">
                        {label}
                      </h3>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            {/* Nota sobre as imagens */}
            <p className="text-center text-xs text-charcoal-300 mt-10 leading-relaxed">
              Ambientes decorados com peças do catálogo Líder Molduras.{' '}
              <span className="text-charcoal-400">
                Substitua os placeholders pelas fotos reais dos seus projetos.
              </span>
            </p>
          </div>
        </section>
      </div>

      <CtaBanner />
    </>
  )
}
