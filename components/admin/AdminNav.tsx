'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LayoutGrid, PlusCircle, LogOut, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/produtos', icon: LayoutGrid, label: 'Produtos' },
  { href: '/admin/produtos/novo', icon: PlusCircle, label: 'Novo Produto' },
]

export function AdminNav({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-[#1a1814] text-white h-14 flex items-center px-5 sm:px-8 shrink-0 gap-6">
      {/* Logo */}
      <Link href="/admin/produtos"
        className="font-serif text-lg font-light tracking-[0.08em] shrink-0 mr-4">
        Líder<span className="text-[#B8985A]">Molduras</span>
        <span className="text-white/30 text-xs font-sans font-normal tracking-widest ml-2">ADMIN</span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1 flex-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 text-xs tracking-wide transition-colors duration-200 rounded-sm',
              pathname === href || (href !== '/admin/produtos' && pathname.startsWith(href))
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            )}>
            <Icon size={14} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Usuário + logout */}
      <div className="flex items-center gap-3 shrink-0">
        {userEmail && (
          <span className="text-white/35 text-xs hidden sm:block truncate max-w-[180px]">
            {userEmail}
          </span>
        )}
        <button onClick={handleLogout} disabled={loggingOut}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80
                     transition-colors duration-200 px-3 py-1.5 hover:bg-white/5 rounded-sm">
          <LogOut size={13} />
          Sair
        </button>
      </div>
    </header>
  )
}
