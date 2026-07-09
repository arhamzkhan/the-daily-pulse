/**
 * app/api/log/route.ts
 * POST /api/log
 *
 * Accepts tracking payloads from navigator.sendBeacon.
 * Security layers:
 *   1. Input validation (businessId, actionType) — strict allow-list
 *   2. 5-second CGNAT/Wi-Fi duplicate-suppression (User-Agent keyed)
 *   3. Parameterized INSERT — no SQL injection surface
 *   4. No redirect URLs emitted — pure logging endpoint
 */
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { validateActionType } from "@/lib/validators";
import { isDuplicate } from "@/lib/rateLimit";

// Business ID allow-list pattern: alphanumeric + hyphens, max 50 chars
const BUSINESS_ID_RE = /^[a-zA-Z0-9\-_]{1,50}$/;

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    // sendBeacon sends as text/plain blob — handle both JSON and plain text
    const contentType = req.headers.get("content-type") ?? "";
    const raw = await req.text();
    if (!raw) {
      return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { businessId, actionType } = body as Record<string, unknown>;

  // --- Input validation ---
  if (typeof businessId !== "string" || !BUSINESS_ID_RE.test(businessId)) {
    return NextResponse.json({ error: "Invalid businessId" }, { status: 400 });
  }
  if (typeof actionType !== "string" || !validateActionType(actionType)) {
    return NextResponse.json({ error: "Invalid actionType" }, { status: 400 });
  }

  // --- 5-second duplicate suppression ---
  const userAgent = req.headers.get("user-agent") ?? "unknown";
  if (isDuplicate(businessId, actionType, userAgent)) {
    // Silently discard — return 200 so beacon does not retry
    return NextResponse.json({ status: "deduplicated" }, { status: 200 });
  }

  // --- Parameterized INSERT ---
  try {
    await db.query(
      `INSERT INTO scan_logs (business_id, action_type)
       VALUES ($1, $2)`,
      [businessId, actionType]
    );
  } catch (err) {
    console.error("[API /log] DB insert error:", (err as Error).message);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ status: "logged" }, { status: 200 });
}

// Reject all non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
