
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const middleware = (request: NextRequest) => {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Skip subdomain logic for Replit preview domains
  if (hostname.includes('.replit.dev')) {
    return NextResponse.next()
  }

  // Handle www to non-www redirect for custom domains
  if (hostname.startsWith('www.')) {
    const nonWwwHost = hostname.replace('www.', '')
    return NextResponse.redirect(
      `${request.nextUrl.protocol}//${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`
    )
  }

  // Extract subdomain for custom domains
  const parts = hostname.split('.')
  const isLocalhost = hostname.includes('localhost') || hostname.includes('0.0.0.0')
  const isCustomDomain = !hostname.includes('.replit.dev') && parts.length > 2 && !isLocalhost
  
  // For static files
  if (url.pathname.includes('/_next/')) {
    return NextResponse.next()
  }

  // Handle subdomain routing for custom domains
  if (isCustomDomain) {
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
