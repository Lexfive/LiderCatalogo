import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/utils'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CtaBanner() {
  return (
    <section className="section bg-gold-pale" aria-label="Chamada para ação">
      <div className="container-elite">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <span className="section-tag justify-center flex">Atendimento Exclusivo</span>
            <h2 className="font-serif text-display-md font-light text-charcoal mb-4">
              <em>Crie o ambiente</em>
              <br />
              dos seus sonhos
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-charcoal-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Nossa equipe de consultores está pronta para ajudá-lo a encontrar a peça perfeita
              para cada espaço — ou criar algo totalmente exclusivo para você.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Falar no WhatsApp
              </a>
              <Link href="/contato" className="btn-outline">
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
