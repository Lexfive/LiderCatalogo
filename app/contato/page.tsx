import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/metadata'
import { ContactForm } from '@/components/sections/ContactForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Contato',
  description:
    'Entre em contato com a Líder Molduras. Solicite um orçamento, tire dúvidas ou agende uma visita ao nosso showroom em Belo Horizonte, MG.',
  path: '/contato',
})

// Dados de contato reais
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
const EMAIL = 'liderquadrosemolduras@gmail.com'
const ADDRESS = 'R. José Félix Martins, 713 - Mantiqueira, Belo Horizonte - MG, 31660-100'
const MAPS_EMBED_URL = `https://www.google.com/maps/embed/v1/place?key=${
  process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'
}&q=${encodeURIComponent(ADDRESS)}&zoom=16`

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+55 (31) 7105-8790',
    detail: 'Resposta em até 2 horas',
    href: `https://wa.me/${WHATSAPP}`,
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: EMAIL,
    detail: 'Resposta em até 24 horas',
    href: `mailto:${EMAIL}`,
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
    label: 'Endereço',
    value: 'R. José Félix Martins, 713',
    detail: 'Mantiqueira, BH – MG, 31660-100',
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
  },
]

export default function ContactPage() {
  const hasApiKey = process.env.GOOGLE_MAPS_API_KEY && process.env.GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY'

  return (
    <div className="pt-[72px]">
      <section className="section">
        <div className="container-elite">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* ── Coluna de informações + mapa ─────────────────────── */}
            <AnimatedSection direction="left">
              <SectionHeader
                tag="Fale Conosco"
                title="Vamos criar algo<br /><em>especial juntos</em>"
                subtitle="Nossa equipe está disponível para ajudá-lo a encontrar a peça ideal ou criar algo totalmente personalizado para o seu espaço."
              />

              <div className="space-y-6 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, detail, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-charcoal-200 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gold" aria-hidden="true" />
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

              {/* ── Google Maps ─────────────────────────────────────── */}
              <div
                className="w-full h-64 overflow-hidden border border-charcoal-200"
                aria-label="Mapa de localização da Líder Molduras"
              >
                {hasApiKey ? (
                  /* Google Maps Embed com API Key */
                  <iframe
                    src={MAPS_EMBED_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Líder Molduras — R. José Félix Martins, 713, Mantiqueira, BH"
                  />
                ) : (
                  /* Fallback: Link direto para o Google Maps (sem API Key) */
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex flex-col items-center justify-center gap-3
                               bg-cream-100 hover:bg-cream-200 transition-colors duration-300
                               text-charcoal-400 group"
                    aria-label="Abrir no Google Maps"
                  >
                    {/* Mini mapa estático via OpenStreetMap (sem API key) */}
                    <Image
                      src={`https://staticmap.openstreetmap.de/staticmap.php?center=-19.826,-43.958&zoom=16&size=600x250&markers=-19.826,-43.958,red-pushpin`}
                      alt="Mapa Líder Molduras"
                      width={600}
                      height={250}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cream-100/70">
                      <MapPin size={28} className="text-gold" />
                      <p className="text-sm font-medium text-charcoal">Ver no Google Maps</p>
                      <p className="text-xs text-charcoal-400 text-center px-4">
                        {ADDRESS}
                      </p>
                      <span className="text-[0.65rem] tracking-[0.15em] uppercase text-charcoal-300
                                       border border-charcoal-200 px-3 py-1 mt-1 group-hover:border-gold
                                       group-hover:text-gold transition-colors">
                        Abrir no Maps →
                      </span>
                    </div>
                  </a>
                )}
              </div>

              {!hasApiKey && (
                <p className="text-xs text-charcoal-300 mt-2 leading-relaxed">
                  Para embutir o mapa interativo, adicione{' '}
                  <code className="bg-cream-100 px-1">GOOGLE_MAPS_API_KEY</code> nas variáveis
                  de ambiente do Netlify.
                </p>
              )}
            </AnimatedSection>

            {/* ── Formulário ───────────────────────────────────────── */}
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
