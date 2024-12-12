
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Allow Replit preview URLs to work normally
  if (hostname.includes('replit.dev') || hostname.includes('pike.replit.dev')) {
    // Handle static files on Replit
    if (url.pathname.includes('/_next/')) {
      return NextResponse.next()
    }
    return NextResponse.next()
  }

  // Only handle subdomain logic for clinis.io domain
  if (hostname.endsWith('clinis.io')) {
    // Redirect www to non-www
    if (hostname.startsWith('www.')) {
      return NextResponse.redirect(
        `https://clinis.io${request.nextUrl.pathname}${request.nextUrl.search}`
      )
    }

    const subdomain = hostname.split('.')[0]
    const isPrimaryDomain = hostname === 'clinis.io'

    // For static files on subdomains, redirect to main domain
    if (!isPrimaryDomain && url.pathname.includes('/_next/')) {
      return NextResponse.rewrite(
        new URL(`https://clinis.io${url.pathname}${url.search}`, request.url)
      )
    }

    // Handle subdomain routing
    if (!isPrimaryDomain) {
      const newUrl = new URL(`/doctor/${subdomain}`, request.url)
      return NextResponse.rewrite(newUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
