import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { ContactForm } from '@/components/sections/ContactForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getWhatsAppUrl } from '@/lib/utils'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Contato',
  description:
    'Entre em contato com a Líder Molduras. Solicite um orçamento, tire dúvidas ou agende uma visita ao nosso showroom em Belo Horizonte, MG.',
  path: '/contato',
})

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '(31) 9 9999-0000',
    detail: 'Resposta em até 2 horas',
    href: getWhatsAppUrl(),
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: process.env.NEXT_PUBLIC_EMAIL || 'contato@seudominio.com.br',
    detail: 'Resposta em até 24 horas',
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || 'contato@seudominio.com.br'}`,
  },
  {
    icon: Clock,
    label: 'Horário de Atendimento',
    value: 'Seg – Sex: 9h às 18h',
    detail: 'Sábado: 9h às 13h',
    href: null,
  },
  {
    icon: MapPin,
    label: 'Showroom',
    value: 'Belo Horizonte, MG',
    detail: 'Com agendamento prévio',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <section className="section">
        <div className="container-elite">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Coluna de informações */}
            <AnimatedSection direction="left">
              <SectionHeader
                tag="Fale Conosco"
                title="Vamos criar algo<br /><em>especial juntos</em>"
                subtitle="Nossa equipe está disponível para ajudá-lo a encontrar a peça ideal ou criar algo totalmente personalizado para o seu espaço."
              />

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, detail, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 border border-charcoal-200 flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-[0.72rem] tracking-[0.12em] uppercase text-charcoal-400 font-sans mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-charcoal hover:text-gold transition-colors block"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-charcoal">{value}</p>
                      )}
                      <p className="text-xs text-charcoal-300 mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mapa placeholder */}
              <div
                className="mt-10 h-48 bg-cream-100 border border-charcoal-200 flex items-center justify-center"
                aria-label="Localização da Líder Molduras no mapa"
              >
                <div className="text-center">
                  <MapPin size={24} className="text-gold mx-auto mb-2" aria-hidden="true" />
                  <p className="text-xs text-charcoal-400 tracking-wide">
                    Belo Horizonte, Minas Gerais
                  </p>
                  <p className="text-[0.68rem] text-charcoal-300 mt-1">
                    Integre Google Maps aqui (API key necessária)
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Formulário */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white p-8 md:p-10">
                <h2 className="font-serif text-2xl font-light mb-8">
                  Solicitar <em>Orçamento</em>
                </h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
