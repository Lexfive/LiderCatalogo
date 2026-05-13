/**
 * app/admin/layout.tsx
 * Layout exclusivo para o painel administrativo.
 * Completamente isolado do layout público — sem Navbar, Footer ou WhatsApp float.
 */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Admin — Líder Molduras',
    default: 'Painel Admin — Líder Molduras',
  },
  robots: { index: false, follow: false }, // Não indexar pelo Google
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F8F6] font-sans">
      {children}
    </div>
  )
}
