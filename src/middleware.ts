import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Verifica se existe um cookie de sessão do better-auth
  const sessionCookie = request.cookies.get('better-auth.session_token')

  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ['/identification', '/payment', '/orders']
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  )

  // Se é uma rota protegida e não tem cookie de sessão
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Se tem cookie de sessão e tenta acessar /auth, redireciona para home
  if (request.nextUrl.pathname === '/auth' && sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/identification/:path*', '/payment/:path*', '/orders', '/auth'],
}
