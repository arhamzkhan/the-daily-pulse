import { NextResponse } from "next/server";
import { isAuthError, requireUser } from "@/lib/auth";
import { isIndustryType } from "@/lib/themes";
import { getReviewUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase";

type OnboardingPayload = {
  business_name?: string;
  branch_name?: string;
  industry_type?: string;
  google_review_url?: string;
  manager_whatsapp?: string;
  existing_business_id?: string | null;
};

function toSlugPart(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

async function createUniqueBusinessId(name: string) {
  const client = getServiceSupabase();
  const base = toSlugPart(name) || "business";
  let candidate = base;
  let attempt = 1;

  while (attempt <= 25) {
    const { data, error } = await client
      .from("businesses")
      .select("id")
      .eq("id", candidate)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return candidate;
    }

    attempt += 1;
    candidate = `${base}-${attempt}`;
  }

  return `${base}-${Date.now()}`;
}

export async function POST(request: Request) {
  const userResult = await requireUser();
  if (isAuthError(userResult)) {
    return userResult;
  }

  try {
    const body = (await request.json()) as OnboardingPayload;
    const businessName = body.business_name?.trim() || "";
    const branchName = body.branch_name?.trim() || "";
    const industryType = body.industry_type?.trim() || "";
    const googleReviewUrl = body.google_review_url?.trim() || "";
    const managerWhatsapp = body.manager_whatsapp?.trim() || "";
    const existingBusinessId = body.existing_business_id?.trim() || null;

    if (!businessName || !branchName || !googleReviewUrl || !managerWhatsapp) {
      return NextResponse.json(
        { error: "Business name, branch, Google URL, and WhatsApp are required." },
        { status: 400 }
      );
    }

    if (!isIndustryType(industryType)) {
      return NextResponse.json({ error: "Please select a valid industry type." }, { status: 400 });
    }

    if (!/^92\d{10}$/.test(managerWhatsapp)) {
      return NextResponse.json(
        { error: "WhatsApp must begin with 92 followed by 10 digits." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (existingBusinessId) {
      const { data: ownedBusiness, error: ownershipError } = await supabase
        .from("businesses")
        .select("id")
        .eq("id", existingBusinessId)
        .eq("user_id", userResult.id)
        .maybeSingle();

      if (ownershipError || !ownedBusiness) {
        return NextResponse.json({ error: "Business record not found." }, { status: 404 });
      }

      const { error: updateError } = await supabase
        .from("businesses")
        .update({
          name: businessName,
          branch_name: branchName,
          industry_type: industryType,
          google_review_url: googleReviewUrl,
          manager_whatsapp: managerWhatsapp,
          onboarding_completed: true,
        })
        .eq("id", existingBusinessId)
        .eq("user_id", userResult.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 400 });
      }

      await supabase.auth.updateUser({
        data: { has_completed_onboarding: true }
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        business_id: existingBusinessId,
        has_completed_onboarding: true,
      });
    }

    const { data: existingForUser } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", userResult.id)
      .maybeSingle();

    if (existingForUser) {
      const { error: updateError } = await supabase
        .from("businesses")
        .update({
          name: businessName,
          branch_name: branchName,
          industry_type: industryType,
          google_review_url: googleReviewUrl,
          manager_whatsapp: managerWhatsapp,
          onboarding_completed: true,
        })
        .eq("user_id", userResult.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 400 });
      }

      await supabase.auth.updateUser({
        data: { has_completed_onboarding: true }
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        business_id: existingForUser.id,
        public_link: getReviewUrl(existingForUser.id),
        has_completed_onboarding: true,
      });
    }

    const businessId = await createUniqueBusinessId(businessName);

    const { error: insertError } = await supabase.from("businesses").insert({
      id: businessId,
      user_id: userResult.id,
      name: businessName,
      branch_name: branchName,
      industry_type: industryType,
      google_review_url: googleReviewUrl,
      manager_whatsapp: managerWhatsapp,
      language_preference: "english",
      is_active: true,
      onboarding_completed: true,
      total_scans: 0,
      google_clicks: 0,
      whatsapp_clicks: 0,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    await supabase.auth.updateUser({
      data: { has_completed_onboarding: true }
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      business_id: businessId,
      public_link: getReviewUrl(businessId),
      has_completed_onboarding: true,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save business profile.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
