import Link from 'next/link'
import { Mail, MapPin, Clock } from 'lucide-react'

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

// Ícone TikTok SVG (não existe no Lucide)
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const wppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const email = process.env.NEXT_PUBLIC_EMAIL || 'liderquadrosemolduras@gmail.com'

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
            href={`https://wa.me/${wppNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2.5 bg-[#25D366] text-white
                       text-[0.72rem] tracking-[0.14em] uppercase font-sans px-7 py-3.5
                       transition-colors duration-300 hover:bg-[#1ebe59] whitespace-nowrap"
          >
            {/* WhatsApp icon */}
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

          {/* Marca + redes sociais */}
          <div>
            <Link href="/"
              className="font-serif text-2xl font-light tracking-[0.08em] block mb-4"
              aria-label="Líder Molduras — Página inicial">
              Líder<span className="text-gold">Molduras</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[240px] mb-7">
              Arte e sofisticação para transformar cada ambiente em uma experiência estética única.
            </p>

            {/* Redes sociais: Instagram · TikTok · E-mail */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/lidermolduras/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Líder Molduras"
                className="w-9 h-9 border border-white/15 flex items-center justify-center
                           text-white/40 hover:text-gold hover:border-gold/60
                           transition-all duration-300"
              >
                {/* Instagram icon SVG */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@lidermolduras"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok da Líder Molduras"
                className="w-9 h-9 border border-white/15 flex items-center justify-center
                           text-white/40 hover:text-gold hover:border-gold/60
                           transition-all duration-300"
              >
                <TikTokIcon size={15} />
              </a>

              {/* E-mail */}
              <a
                href={`mailto:${email}`}
                aria-label="E-mail da Líder Molduras"
                className="w-9 h-9 border border-white/15 flex items-center justify-center
                           text-white/40 hover:text-gold hover:border-gold/60
                           transition-all duration-300"
              >
                <Mail size={14} />
              </a>
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

          {/* Atendimento */}
          <div>
            <h3 className="text-[0.65rem] tracking-[0.22em] uppercase text-gold font-sans font-normal mb-5">
              Atendimento
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <Clock size={13} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-[0.82rem] text-white/40 leading-snug">
                  Seg – Sex: 9h às 18h<br />Sábado: 9h às 13h
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-[0.82rem] text-white/40 leading-snug">
                  R. José Félix Martins, 713<br />
                  Mantiqueira, BH – MG<br />
                  <span className="text-white/25 text-[0.73rem]">Showroom com agendamento</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={13} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                <a href={`mailto:${email}`}
                  className="text-[0.82rem] text-white/40 hover:text-white/70 transition-colors duration-200 leading-snug break-all">
                  {email}
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
