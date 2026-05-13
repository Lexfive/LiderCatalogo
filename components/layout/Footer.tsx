import Link from 'next/link'
import { Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react'

const footerLinks = {
  navegacao: [
    { href: '/', label: 'Início' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/inspiracao', label: 'Galeria de Inspiração' },
    { href: '/sobre', label: 'Sobre a Marca' },
    { href: '/contato', label: 'Contato' },
  ],
  colecoes: [
    { href: '/categoria/quadros', label: 'Quadros Decorativos' },
    { href: '/categoria/molduras', label: 'Molduras Artesanais' },
    { href: '/categoria/espelhos', label: 'Espelhos Exclusivos' },
    { href: '/catalogo', label: 'Ver Tudo' },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white" aria-label="Rodapé">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-elite px-5 sm:px-8 md:px-12 lg:px-16 py-10
                        flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-xl font-light text-white mb-1">
              Pronto para transformar seu espaço?
            </p>
            <p className="text-sm text-white/40">
              Fale conosco e receba um orçamento personalizado.
            </p>
          </div>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5531999990000'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2.5 bg-[#25D366] text-white
                       text-[0.72rem] tracking-[0.14em] uppercase font-sans px-7 py-3.5
                       transition-colors duration-300 hover:bg-[#1ebe59] whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-elite px-5 sm:px-8 md:px-12 lg:px-16 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Marca */}
          <div>
            <Link href="/" className="font-serif text-2xl font-light tracking-[0.08em] block mb-4"
              aria-label="Líder Molduras — Página inicial">
              Líder<span className="text-gold">Molduras</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[240px] mb-7">
              Arte e sofisticação para transformar cada ambiente em uma experiência estética única.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Phone, href: `tel:+55${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '31999990000'}`, label: 'Telefone' },
                { icon: Mail, href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || 'contato@seudominio.com.br'}`, label: 'E-mail' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center
                             text-white/40 hover:text-gold hover:border-gold/60
                             transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-[0.65rem] tracking-[0.22em] uppercase text-gold font-sans font-normal mb-5">
              Navegação
            </h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-[0.82rem] text-white/40 hover:text-white/75 transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coleções */}
          <div>
            <h3 className="text-[0.65rem] tracking-[0.22em] uppercase text-gold font-sans font-normal mb-5">
              Coleções
            </h3>
            <ul className="space-y-3">
              {footerLinks.colecoes.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-[0.82rem] text-white/40 hover:text-white/75 transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-[0.65rem] tracking-[0.22em] uppercase text-gold font-sans font-normal mb-5">
              Atendimento
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <Clock size={13} className="text-gold mt-0.5 shrink-0" />
                <span className="text-[0.82rem] text-white/40 leading-snug">
                  Seg – Sex: 9h às 18h<br />Sábado: 9h às 13h
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-gold mt-0.5 shrink-0" />
                <span className="text-[0.82rem] text-white/40 leading-snug">
                  Belo Horizonte, MG<br />
                  <span className="text-white/25 text-[0.73rem]">Showroom com agendamento</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={13} className="text-gold mt-0.5 shrink-0" />
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'contato@seudominio.com.br'}`}
                  className="text-[0.82rem] text-white/40 hover:text-white/70 transition-colors duration-200 leading-snug">
                  {process.env.NEXT_PUBLIC_EMAIL || 'contato@lidermolduras.com.br'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-7
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.72rem] text-white/25 tracking-wide order-2 sm:order-1">
            © {year} Líder Molduras. Todos os direitos reservados.
          </p>
          <p className="text-[0.68rem] text-white/20 tracking-wide order-1 sm:order-2">
            Desenvolvido por{' '}
            <span className="text-gold/50 font-medium">Ramires Mohamed</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
