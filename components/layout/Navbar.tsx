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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

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
          'fixed top-0 left-0 right-0 z-50 h-[72px]',
          'flex items-center justify-between',
          'px-5 sm:px-8 md:px-12 lg:px-16',
          'transition-all duration-400 ease-luxury',
          scrolled || !isHome
            ? 'bg-cream/96 backdrop-blur-sm border-b border-charcoal-200/70 shadow-sm'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Líder Molduras — Página inicial"
          className={cn(
            'font-serif text-[1.35rem] font-light tracking-[0.1em] shrink-0',
            'transition-colors duration-300',
            scrolled || !isHome ? 'text-charcoal' : 'text-white'
          )}
        >
          Líder<span className="text-gold">Molduras</span>
        </Link>

        {/* Links desktop — só aparece em telas grandes */}
        <nav
          aria-label="Navegação principal"
          className="hidden xl:flex items-center gap-7"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-[0.7rem] tracking-[0.12em] uppercase font-sans font-normal',
                'transition-colors duration-300 hover:text-gold',
                pathname === href
                  ? 'text-gold'
                  : scrolled || !isHome ? 'text-charcoal-600' : 'text-white/80'
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
            'hidden xl:inline-flex',
            'text-[0.68rem] tracking-[0.12em] uppercase font-sans',
            'px-5 py-2.5 border transition-all duration-300 shrink-0',
            scrolled || !isHome
              ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
              : 'border-white/50 text-white hover:border-gold-light hover:text-gold-light'
          )}
        >
          Orçamento
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          className={cn(
            'xl:hidden p-2 -mr-2 transition-colors',
            scrolled || !isHome ? 'text-charcoal' : 'text-white'
          )}
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/50 z-[60] xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed right-0 top-0 bottom-0 w-[min(300px,88vw)] bg-white z-[70]
                         flex flex-col shadow-2xl"
              aria-modal="true"
              role="dialog"
              aria-label="Menu de navegação"
            >
              {/* Header do drawer */}
              <div className="flex items-center justify-between px-7 h-[72px] border-b border-charcoal-200">
                <Link href="/" className="font-serif text-[1.25rem] font-light tracking-[0.08em]"
                  onClick={() => setMobileOpen(false)}>
                  Líder<span className="text-gold">Molduras</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu"
                  className="p-2 -mr-2 text-charcoal hover:text-gold transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-7 py-8 gap-1 flex-1 overflow-y-auto"
                aria-label="Menu mobile">
                {navLinks.map(({ href, label }, i) => (
                  <motion.div key={href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}>
                    <Link href={href}
                      className={cn(
                        'block py-3 font-serif text-[1.35rem] font-light',
                        'border-b border-charcoal-200/50',
                        'transition-colors duration-200 hover:text-gold',
                        pathname === href ? 'text-gold' : 'text-charcoal'
                      )}>
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <div className="px-7 py-6 border-t border-charcoal-200">
                <Link href="/contato" onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full">
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
