import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { getReviewUrl } from "@/lib/site";

type RegisterPayload = {
  email?: string;
  password?: string;
  business_name?: string;
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
  try {
    const body = (await request.json()) as RegisterPayload;
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";
    const businessName = body.business_name?.trim() || "";

    if (!email || !password || !businessName) {
      return NextResponse.json(
        { error: "Email, password, and business name are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const client = getServiceSupabase();
    const origin = new URL(request.url).origin;

    const { data: authData, error: signUpError } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { business_name: businessName },
        emailRedirectTo: `${origin}/login?verified=1`,
      },
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Account could not be created. Please try again." },
        { status: 400 }
      );
    }

    const businessId = await createUniqueBusinessId(businessName);

    const { error: insertError } = await client.from("businesses").insert({
      id: businessId,
      user_id: authData.user.id,
      name: businessName,
      branch_name: "Main Branch",
      google_review_url: "https://www.google.com/maps",
      manager_whatsapp: "920000000000",
      language_preference: "english",
      is_active: true,
      total_scans: 0,
      google_clicks: 0,
      whatsapp_clicks: 0,
    });

    if (insertError) {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        await client.auth.admin.deleteUser(authData.user.id);
      }

      return NextResponse.json(
        { error: insertError.message || "Failed to create business profile." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      business_id: businessId,
      user_id: authData.user.id,
      public_link: getReviewUrl(businessId),
      email_confirmation_required: !authData.session,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create account.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
