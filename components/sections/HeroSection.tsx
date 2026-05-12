import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Apresentação da Maison Élite"
    >
      {/* Background com gradiente sofisticado */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1814 0%, #2d2820 40%, #3d3328 70%, #1a1814 100%)',
        }}
        aria-hidden="true"
      />

      {/* Padrão sutil de fundo */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      {/* Elemento decorativo — linha dourada vertical */}
      <div
        className="absolute left-[8%] top-0 bottom-0 w-px opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #B8985A, transparent)' }}
        aria-hidden="true"
      />

      {/* Conteúdo principal */}
      <div className="container-elite section relative z-10 pt-32 lg:pt-0">
        <div className="max-w-3xl">
          {/* Tag animada */}
          <span
            className="section-tag opacity-0 animate-fade-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Arte · Elegância · Sofisticação
          </span>

          {/* Headline principal */}
          <h1
            className="font-serif text-display-xl font-light text-white leading-[1.05] mb-6
                       opacity-0 animate-fade-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Elegância que{' '}
            <em className="text-gold-light italic">transforma</em>
            <br />
            ambientes
          </h1>

          {/* Subtítulo */}
          <p
            className="text-white/60 max-w-[420px] leading-relaxed mb-10
                       opacity-0 animate-fade-up"
            style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
          >
            Quadros autorais, molduras artesanais e espelhos exclusivos que elevam cada espaço
            a uma experiência estética única.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
          >
            <Link href="/catalogo" className="btn-primary group">
              Ver Coleção
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline-white">
              Falar com Consultor
            </a>
          </div>
        </div>

        {/* Números de credibilidade — canto inferior direito (desktop) */}
        <div
          className="absolute bottom-16 right-0 hidden lg:flex gap-12
                     opacity-0 animate-fade-up"
          style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
          aria-label="Números da empresa"
        >
          {[
            { value: '8+', label: 'Anos de mercado' },
            { value: '2.400', label: 'Clientes satisfeitos' },
            { value: '100%', label: 'Artesanal' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <strong className="block font-serif text-5xl font-light text-white leading-none mb-1">
                {value}
              </strong>
              <span className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 text-white/40"
        aria-hidden="true"
      >
        <div className="w-px h-12 animate-scroll-line" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))' }} />
        <span className="text-[0.62rem] tracking-[0.2em] uppercase">Explorar</span>
      </div>
    </section>
  )
}
