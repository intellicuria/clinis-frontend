
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const middleware = (request: NextRequest) => {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Redirect www to non-www for any domain
  if (hostname.startsWith('www.')) {
    const nonWwwHost = hostname.replace('www.', '')
    return NextResponse.redirect(
      `https://${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`
    )
  }

  // Extract subdomain for any domain
  const parts = hostname.split('.')
  const isLocalhost = hostname.includes('localhost') || hostname.includes('0.0.0.0')
  const isPrimaryDomain = parts.length <= 2 || isLocalhost
  
  // For static files, redirect to main domain
  if (url.pathname.includes('/_next/')) {
    const mainDomain = parts.slice(-2).join('.')
    return NextResponse.rewrite(
      new URL(`https://${mainDomain}${url.pathname}${url.search}`, request.url)
    )
  }

  // Handle subdomain routing
  if (!isPrimaryDomain) {
    const subdomain = parts[0]
    const newUrl = new URL(`/doctor/${subdomain}`, request.url)
    return NextResponse.rewrite(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|favicon.ico|images).*)',
  ],
}

export default middleware
