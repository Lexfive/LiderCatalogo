import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

// Impede geração estática — a página depende de query params e cookies
export const dynamic = 'force-dynamic'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-gradient-to-br from-[#1a1814] to-[#2d2820]">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <p className="font-serif text-3xl font-light tracking-[0.1em] text-white mb-1">
            Líder<span className="text-[#B8985A]">Molduras</span>
          </p>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2">
            Painel Administrativo
          </p>
        </div>

        {/* Suspense obrigatório para useSearchParams dentro do LoginForm */}
        <Suspense fallback={
          <div className="bg-white p-8 shadow-2xl flex items-center justify-center h-48">
            <svg className="animate-spin w-6 h-6 text-[#B8985A]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          </div>
        }>
          <LoginForm />
        </Suspense>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Líder Molduras
        </p>
      </div>
    </div>
  )
}
