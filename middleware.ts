import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory map for basic rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 60 // 1 request per second average

  const currentData = rateLimitMap.get(ip)

  if (!currentData || now > currentData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (currentData.count >= maxRequests) {
    return false
  }

  currentData.count++
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Resolve the TypeScript IP issue safely via headers
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"

  if (pathname === "/api/log" || pathname.startsWith("/review/")) {
    if (!checkRateLimit(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { 'content-type': 'application/json' } }
      )
    }
  }

  // Add the Content Security Policy cleanly to all outbound responses
  const response = NextResponse.next()
  
  // A standard, secure starter CSP for Next.js apps
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim()

  response.headers.set('Content-Security-Policy', cspHeader)
  
  return response
}

export const config = {
  matcher: ['/api/log', '/review/:path*', '/login', '/register', '/dashboard', '/dashboard/:path*'],
}
