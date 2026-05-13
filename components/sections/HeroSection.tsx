import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Apresentação da Líder Molduras"
    >
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg,#1a1814 0%,#2d2820 45%,#3d3328 75%,#1a1814 100%)' }}
        aria-hidden="true" />

      {/* Textura sutil */}
      <div className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage:'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize:'18px 18px' }}
        aria-hidden="true" />

      {/* Linha decorativa dourada */}
      <div className="absolute left-[6%] top-0 bottom-0 w-px hidden lg:block"
        style={{ background:'linear-gradient(to bottom,transparent,rgba(184,152,90,0.3),transparent)' }}
        aria-hidden="true" />

      {/* Conteúdo — com padding-top para não ficar atrás da navbar */}
      <div className="container-elite section relative z-10 pt-28 sm:pt-24 lg:pt-0 pb-20 lg:pb-0">
        <div className="max-w-2xl">
          <span
            className="section-tag opacity-0 animate-fade-up"
            style={{ animationDelay:'0.3s', animationFillMode:'forwards' }}
          >
            Quadros · Molduras · Espelhos
          </span>

          <h1
            className="font-serif text-display-xl font-light text-white leading-[1.05] mb-5
                       opacity-0 animate-fade-up"
            style={{ animationDelay:'0.5s', animationFillMode:'forwards' }}
          >
            Elegância que{' '}
            <em className="text-gold-light italic">transforma</em>
            <br className="hidden sm:block" /> ambientes
          </h1>

          <p
            className="text-white/55 max-w-[400px] leading-relaxed text-sm sm:text-base mb-10
                       opacity-0 animate-fade-up"
            style={{ animationDelay:'0.7s', animationFillMode:'forwards' }}
          >
            Molduras artesanais, quadros decorativos e espelhos exclusivos que elevam cada
            espaço a uma experiência estética única.
          </p>

          <div
            className="flex flex-wrap gap-3 opacity-0 animate-fade-up"
            style={{ animationDelay:'0.9s', animationFillMode:'forwards' }}
          >
            <Link href="/catalogo" className="btn-primary group">
              Ver Catálogo
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
              className="btn-outline-white">
              Pedir Orçamento
            </a>
          </div>
        </div>

        {/* Números — desktop, posicionados com margin para não colidir */}
        <div
          className="hidden lg:flex gap-10 xl:gap-14 mt-20 xl:mt-0
                     xl:absolute xl:bottom-20 xl:right-0
                     opacity-0 animate-fade-up"
          style={{ animationDelay:'1.1s', animationFillMode:'forwards' }}
          aria-label="Números da empresa"
        >
          {[
            { value: '10+', label: 'Anos de mercado' },
            { value: '3.000+', label: 'Clientes atendidos' },
            { value: '100%', label: 'Artesanal' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <strong className="block font-serif text-4xl xl:text-5xl font-light text-white leading-none mb-1.5">
                {value}
              </strong>
              <span className="text-[0.62rem] tracking-[0.18em] uppercase text-white/35">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 text-white/30 hidden sm:flex"
        aria-hidden="true"
      >
        <div className="w-px h-10 animate-scroll-line"
          style={{ background:'linear-gradient(to bottom,transparent,rgba(255,255,255,0.3))' }} />
        <span className="text-[0.58rem] tracking-[0.2em] uppercase">Explorar</span>
      </div>
    </section>
  )
}
