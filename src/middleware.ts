
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  const isPrimaryDomain = hostname === 'clinis.io' || hostname.includes('localhost') || hostname.includes('0.0.0.0')

  // Handle static files differently
  if (url.pathname.includes('/_next/')) {
    return NextResponse.next()
  }

  if (!isPrimaryDomain && hostname.endsWith('clinis.io')) {
    const newUrl = new URL(`/doctor/${subdomain}`, request.url)
    return NextResponse.rewrite(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
