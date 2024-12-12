
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const middleware = (request: NextRequest) => {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Only handle subdomain logic for clinis.io domain
  if (hostname.endsWith('clinis.io')) {
    // Redirect www to non-www
    if (hostname.startsWith('www.')) {
      return NextResponse.redirect(
        `https://clinis.io${request.nextUrl.pathname}${request.nextUrl.search}`
      )
    }

    const subdomain = hostname.split('.')[0]
    const isPrimaryDomain = hostname === 'clinis.io' || hostname.includes('localhost') || hostname.includes('0.0.0.0')

    // For static files, redirect to main domain
    if (url.pathname.includes('/_next/')) {
      return NextResponse.rewrite(
        new URL(`https://clinis.io${url.pathname}${url.search}`, request.url)
      )
    }

    if (!isPrimaryDomain) {
      const newUrl = new URL(`/doctor/${subdomain}`, request.url)
      return NextResponse.rewrite(newUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|favicon.ico|images).*)',
  ],
}

export default middleware
