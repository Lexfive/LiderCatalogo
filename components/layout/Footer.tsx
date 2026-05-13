import Link from 'next/link'
import { Instagram, Phone, Mail } from 'lucide-react'

const footerLinks = {
  navegacao: [
    { href: '/', label: 'Início' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/inspiracao', label: 'Inspiração' },
    { href: '/sobre', label: 'Sobre a Marca' },
    { href: '/contato', label: 'Contato' },
  ],
  colecoes: [
    { href: '/categoria/quadros', label: 'Quadros Decorativos' },
    { href: '/categoria/molduras', label: 'Molduras Artesanais' },
    { href: '/categoria/espelhos', label: 'Espelhos Exclusivos' },
    { href: '/catalogo', label: 'Ver Tudo' },
  ],
  atendimento: [
    { href: '/contato', label: 'Solicitar Orçamento' },
    { href: '#', label: 'Política de Entrega' },
    { href: '#', label: 'Trocas e Devoluções' },
    { href: '#', label: 'Perguntas Frequentes' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-white" aria-label="Rodapé">
      <div className="container-elite section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna da marca */}
          <div>
            <Link
              href="/"
              className="font-serif text-2xl font-light tracking-[0.1em] block mb-4"
              aria-label="Líder Molduras — Página inicial"
            >
              Líder<span className="text-gold">Molduras</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[280px] mb-8">
              Arte e sofisticação para transformar cada ambiente em uma experiência estética
              única e memorável.
            </p>
            {/* Redes sociais */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Líder Molduras"
                className="text-white/40 hover:text-gold transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`tel:+55${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '31999990000'}`}
                aria-label="Telefone da Líder Molduras"
                className="text-white/40 hover:text-gold transition-colors duration-300"
              >
                <Phone size={18} />
              </a>
              <a
                href="mailto:atendimento@lidermolduras.com.br"
                aria-label="E-mail da Líder Molduras"
                className="text-white/40 hover:text-gold transition-colors duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Coluna de navegação */}
          <div>
            <h3 className="text-[0.68rem] tracking-[0.2em] uppercase text-gold font-sans font-normal mb-5">
              Navegação
            </h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna de coleções */}
          <div>
            <h3 className="text-[0.68rem] tracking-[0.2em] uppercase text-gold font-sans font-normal mb-5">
              Coleções
            </h3>
            <ul className="space-y-3">
              {footerLinks.colecoes.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna de atendimento */}
          <div>
            <h3 className="text-[0.68rem] tracking-[0.2em] uppercase text-gold font-sans font-normal mb-5">
              Atendimento
            </h3>
            <ul className="space-y-3">
              {footerLinks.atendimento.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm text-white/30 leading-relaxed">
              <p>Seg – Sex: 9h às 18h</p>
              <p>Sáb: 9h às 13h</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25 tracking-wide">
            © {new Date().getFullYear()} Líder Molduras. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Privacidade
            </Link>
            <Link href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
