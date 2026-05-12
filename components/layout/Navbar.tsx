'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/categoria/quadros', label: 'Quadros' },
  { href: '/categoria/molduras', label: 'Molduras' },
  { href: '/categoria/espelhos', label: 'Espelhos' },
  { href: '/inspiracao', label: 'Inspiração' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Detecta scroll para mudar background da navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fecha menu mobile ao navegar
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Trava o scroll quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isHome = pathname === '/'

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 lg:px-16',
          'transition-all duration-400 ease-luxury',
          scrolled || !isHome
            ? 'bg-cream/95 backdrop-blur-nav border-b border-charcoal-200 shadow-sm'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Maison Élite — Página inicial"
          className={cn(
            'font-serif text-2xl font-light tracking-[0.12em]',
            'transition-colors duration-300',
            scrolled || !isHome ? 'text-charcoal' : 'text-white'
          )}
        >
          Maison<span className="text-gold">Élite</span>
        </Link>

        {/* Links desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-[0.72rem] tracking-[0.14em] uppercase font-sans font-light',
                'transition-colors duration-300',
                'hover:text-gold',
                pathname === href ? 'text-gold' : scrolled || !isHome ? 'text-charcoal-600' : 'text-white/80'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <Link
          href="/contato"
          className={cn(
            'hidden lg:inline-flex text-[0.72rem] tracking-[0.12em] uppercase font-sans',
            'px-5 py-2.5 border transition-all duration-300',
            scrolled || !isHome
              ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
              : 'border-white/50 text-white hover:border-gold-light hover:text-gold-light'
          )}
        >
          Solicitar Orçamento
        </Link>

        {/* Botão hamburger (mobile) */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          className={cn(
            'lg:hidden p-2 -mr-2',
            scrolled || !isHome ? 'text-charcoal' : 'text-white'
          )}
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Menu mobile com animação */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed right-0 top-0 bottom-0 w-[min(320px,90vw)] bg-white z-[70] flex flex-col"
              aria-modal="true"
              role="dialog"
              aria-label="Menu de navegação"
            >
              {/* Header do drawer */}
              <div className="flex items-center justify-between px-8 h-[72px] border-b border-charcoal-200">
                <Link href="/" className="font-serif text-xl font-light tracking-wide">
                  Maison<span className="text-gold">Élite</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="p-2 -mr-2 text-charcoal hover:text-gold transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-8 py-10 gap-6 flex-1" aria-label="Menu mobile">
                {navLinks.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={href}
                      className={cn(
                        'font-serif text-2xl font-light block',
                        'transition-colors duration-200 hover:text-gold',
                        pathname === href ? 'text-gold' : 'text-charcoal'
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA no drawer */}
              <div className="px-8 pb-10">
                <Link href="/contato" className="btn-primary w-full justify-center">
                  Solicitar Orçamento
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
