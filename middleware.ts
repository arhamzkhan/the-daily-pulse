import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Simple in-memory rate limiting map for edge runtime to prevent brute-force burst spam.
// Note: In serverless/edge environments, memory is isolated per instance.
// For production multi-region global enforcement, we advise replacing this with Upstash/Vercel KV (Redis).
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 3; // Allow max 3 logs/page-views per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    // Cleanup old records lazily
    if (rateLimitCache.size > 5000) {
      for (const [key, val] of rateLimitCache.entries()) {
        if (now > val.resetTime) rateLimitCache.delete(key);
      }
    }
    return true;
  }

  record.count++;
  if (record.count > MAX_REQUESTS_PER_MINUTE) {
    return false; // Limit exceeded
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply strict IP-based rate-limiting on 'scan_logs' endpoint (/api/log) and review landing page
  if (pathname === "/api/log" || pathname.startsWith("/review/")) {
    const ip = request.ip || request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    
    if (!checkRateLimit(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  await supabase.auth.getUser();
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/api/dashboard/:path*",
    "/api/onboarding/:path*",
    "/api/admin/:path*",
    "/api/log",
    "/review/:path*",
  ],
};
