import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

const testimonials = [
  {
    stars: 5,
    text: 'O espelho Arco Florentino transformou completamente a entrada da minha casa. A qualidade do acabamento é simplesmente impecável. Superei todas as minhas expectativas.',
    author: 'Beatriz Monteiro',
    city: 'São Paulo, SP',
  },
  {
    stars: 5,
    text: 'Encomendei uma moldura personalizada e fiquei encantada com o resultado. O atendimento foi muito atencioso e o prazo foi cumprido com folga. Recomendo demais.',
    author: 'Fernanda Albuquerque',
    city: 'Belo Horizonte, MG',
  },
  {
    stars: 5,
    text: 'Comprei dois quadros da coleção abstrata para o meu escritório. Cada detalhe reflete o cuidado artesanal da marca. A embalagem chegou impecável, sem o menor defeito.',
    author: 'Ricardo Vasconcelos',
    city: 'Rio de Janeiro, RJ',
  },
]

export function TestimonialsSection() {
  return (
    <section
      className="section bg-charcoal text-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-elite">
        <AnimatedSection>
          <SectionHeader
            tag="Depoimentos"
            title="O que dizem<br /><em>nossos clientes</em>"
            subtitle="A satisfação de quem confiou na nossa curadoria é nossa maior recompensa."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ stars, text, author, city }, i) => (
            <AnimatedSection key={author} delay={0.12 * i}>
              <article className="border-t border-white/10 pt-8">
                {/* Estrelas */}
                <div className="flex gap-1 mb-4" aria-label={`Avaliação: ${stars} estrelas`}>
                  {Array.from({ length: stars }).map((_, j) => (
                    <span key={j} className="text-gold text-sm" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>

                {/* Depoimento */}
                <blockquote className="font-serif text-lg font-light italic leading-relaxed text-white/80 mb-6">
                  &ldquo;{text}&rdquo;
                </blockquote>

                {/* Autor */}
                <footer>
                  <cite className="not-italic">
                    <span className="block text-[0.72rem] tracking-[0.14em] uppercase text-gold font-sans">
                      {author}
                    </span>
                    <span className="block text-xs text-white/30 mt-0.5">{city}</span>
                  </cite>
                </footer>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
