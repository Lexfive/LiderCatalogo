/**
 * middleware.ts
 * Protege todas as rotas /admin/* exigindo sessão autenticada.
 *
 * Usa apenas next/server (sem @supabase/ssr) para evitar o erro
 * "@opentelemetry/api" no bundler de Edge Functions do Netlify.
 * A verificação real de JWT acontece nos Server Components.
 */
import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirecionar /admin → /admin/produtos
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/produtos', request.url))
  }

  const isLoggedIn = hasSessionCookie(request)

  // Rotas protegidas — redireciona para login se não há sessão
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isLoggedIn) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Já logado acessando /admin/login — vai para o painel
  if (pathname === '/admin/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/produtos', request.url))
  }

  return NextResponse.next()
}

/**
 * Detecta o cookie de sessão do Supabase Auth.
 * O Supabase define cookies com o padrão: sb-<project-ref>-auth-token
 */
function hasSessionCookie(request: NextRequest): boolean {
  return request.cookies.getAll().some(
    (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
  )
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
