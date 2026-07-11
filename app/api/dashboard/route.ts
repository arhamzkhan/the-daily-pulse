import { NextResponse } from "next/server";
import { isAuthError, requireUser } from "@/lib/auth";
import { isIndustryType } from "@/lib/themes";
import { createClient } from "@/lib/supabase/server";
import { normalizeBusinessMetrics } from "@/lib/supabase";

export async function GET() {
  const userResult = await requireUser();
  if (isAuthError(userResult)) {
    return userResult;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select(
      "id, user_id, name, branch_name, google_review_url, manager_whatsapp, language_preference, industry_type, is_active, total_scans, google_clicks, whatsapp_clicks"
    )
    .eq("user_id", userResult.id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Business profile not found." }, { status: 404 });
  }

  return NextResponse.json(normalizeBusinessMetrics(data));
}

export async function POST(request: Request) {
  const userResult = await requireUser();
  if (isAuthError(userResult)) {
    return userResult;
  }

  try {
    const body = await request.json();
    const { id, google_review_url, manager_whatsapp, is_active, industry_type } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing business identifier." }, { status: 400 });
    }

    if (manager_whatsapp && !/^92\d{10}$/.test(manager_whatsapp)) {
      return NextResponse.json(
        { error: "Invalid WhatsApp format. Must begin with 92 followed by 10 digits." },
        { status: 400 }
      );
    }

    if (industry_type !== undefined && !isIndustryType(industry_type)) {
      return NextResponse.json({ error: "Invalid industry type." }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: ownedBusiness, error: ownershipError } = await supabase
      .from("businesses")
      .select("id")
      .eq("id", id)
      .eq("user_id", userResult.id)
      .maybeSingle();

    if (ownershipError || !ownedBusiness) {
      return NextResponse.json({ error: "Unauthorized business access." }, { status: 403 });
    }

    const updateData: Record<string, string | boolean> = {};
    if (google_review_url !== undefined) updateData.google_review_url = google_review_url;
    if (manager_whatsapp !== undefined) updateData.manager_whatsapp = manager_whatsapp;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (industry_type !== undefined) updateData.industry_type = industry_type;

    const { error } = await supabase
      .from("businesses")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", userResult.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update business.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
