/**
 * middleware.ts
 * Protege todas as rotas /admin/* exigindo sessão autenticada.
 * Redireciona para /admin/login se o usuário não estiver logado.
 * Redireciona para /admin/produtos se já estiver logado e acessar /admin/login.
 */
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next({ request })

  // Cria cliente Supabase com acesso aos cookies do request/response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: Record<string, unknown>) { response.cookies.set({ name, value, ...options }) },
        remove(name: string, options: Record<string, unknown>) { response.cookies.set({ name, value: '', ...options }) },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // ── Rotas protegidas: /admin (exceto /admin/login) ──────────────────────────
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // ── Se já está logado e acessa /admin/login, redireciona para o painel ──────
  if (pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin/produtos', request.url))
  }

  // ── Redireciona /admin para /admin/produtos ──────────────────────────────────
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/produtos', request.url))
  }

  return response
}

export const config = {
  // Aplica o middleware apenas nas rotas /admin
  matcher: ['/admin', '/admin/:path*'],
}
