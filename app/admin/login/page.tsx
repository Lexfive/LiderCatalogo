'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, LogIn, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/admin/produtos'

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Preencha e-mail e senha.'); return }

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('E-mail ou senha incorretos. Tente novamente.')
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-gradient-to-br from-[#1a1814] to-[#2d2820]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-serif text-3xl font-light tracking-[0.1em] text-white mb-1">
            Líder<span className="text-[#B8985A]">Molduras</span>
          </p>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2">
            Painel Administrativo
          </p>
        </div>

        {/* Card de login */}
        <div className="bg-white p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-[#B8985A]/10 flex items-center justify-center">
              <Lock size={16} className="text-[#B8985A]" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-[#0A0A0A] tracking-wide">Acesso restrito</h1>
              <p className="text-xs text-[#9E9A91]">Somente equipe autorizada</p>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 mb-6 leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate>
            {/* E-mail */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-[0.68rem] tracking-[0.15em] uppercase
                                                text-[#9E9A91] mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lidermolduras.com.br"
                className="w-full border border-[#E8E6DF] px-4 py-3 text-sm text-[#0A0A0A]
                           placeholder:text-[#C8C4BB] outline-none
                           focus:border-[#B8985A] transition-colors duration-200"
              />
            </div>

            {/* Senha */}
            <div className="mb-7">
              <label htmlFor="password" className="block text-[0.68rem] tracking-[0.15em] uppercase
                                                   text-[#9E9A91] mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#E8E6DF] px-4 py-3 pr-11 text-sm text-[#0A0A0A]
                             placeholder:text-[#C8C4BB] outline-none
                             focus:border-[#B8985A] transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2
                             text-[#C8C4BB] hover:text-[#9E9A91] transition-colors"
                  aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5
                         bg-[#B8985A] text-white font-sans text-xs tracking-[0.14em] uppercase
                         py-3.5 transition-colors duration-300
                         hover:bg-[#D4B87A] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Entrando…
                </>
              ) : (
                <>
                  <LogIn size={15} />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Líder Molduras
        </p>
      </div>
    </div>
  )
}
