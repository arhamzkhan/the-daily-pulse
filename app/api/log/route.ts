import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validateActionType } from "@/lib/validators";
import { isDuplicate } from "@/lib/rateLimit";

const BUSINESS_ID_RE = /^[a-zA-Z0-9\-_]{1,50}$/;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: any;

  try {
    const raw = await req.text();
    if (!raw) {
      return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { businessId, actionType } = body;

  if (typeof businessId !== "string" || !BUSINESS_ID_RE.test(businessId)) {
    return NextResponse.json({ error: "Invalid businessId" }, { status: 400 });
  }
  if (typeof actionType !== "string" || !validateActionType(actionType)) {
    return NextResponse.json({ error: "Invalid actionType" }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent") ?? "unknown";
  if (isDuplicate(businessId, actionType, userAgent)) {
    return NextResponse.json({ status: "deduplicated" }, { status: 200 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("scan_logs")
      .insert({
        business_id: businessId,
        action_type: actionType,
      });

    if (error) {
      console.error("[API /log] DB insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (err) {
    console.error("[API /log] Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

  return NextResponse.json({ status: "logged" }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

