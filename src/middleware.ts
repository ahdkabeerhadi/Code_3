import { NextRequest, NextResponse } from 'next/server'

// Arabic pages live at /ar/* but are served by the exact same route files as
// their English counterparts (e.g. /ar/service/it-amc-dubai-uae -> service/[slug]).
// Stripping the prefix here means every existing route, redirect, and
// generateStaticParams entry keeps working unchanged for English.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isArabic = pathname === '/ar' || pathname.startsWith('/ar/')
  const locale = isArabic ? 'ar' : 'en'

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  if (isArabic) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/ar/, '') || '/'
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!api|admin|_next|next/|favicon\\.ico|robots\\.txt|sitemap|.*\\..*).*)'],
}
