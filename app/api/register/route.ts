import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type RegisterPayload = {
  name?: string;
  branch_name?: string;
  google_review_url?: string;
  manager_whatsapp?: string;
};

function toSlugPart(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

async function createUniqueBusinessId(name: string, branchName: string) {
  const base = `${toSlugPart(name)}-${toSlugPart(branchName)}` || "business";
  let candidate = base;
  let attempt = 1;

  while (attempt <= 25) {
    const { data, error } = await supabase
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
    const name = body.name?.trim() || "";
    const branchName = body.branch_name?.trim() || "";
    const googleReviewUrl = body.google_review_url?.trim() || "";
    const managerWhatsapp = body.manager_whatsapp?.trim() || "";

    if (!name || !branchName || !googleReviewUrl || !managerWhatsapp) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 1. Strict Pakistani WhatsApp validator
    if (!/^92\d{10}$/.test(managerWhatsapp)) {
      return NextResponse.json(
        {
          error:
            "Invalid WhatsApp number. It must start with 92 and be followed by 10 digits.",
        },
        { status: 400 }
      );
    }

    // 2. Google Maps / Review Link Validation 
    // Matches: google.com/maps..., maps.google.com..., goo.gl/maps..., and updates containing business/place IDs
    // Matches standard google urls, goo.gl, and maps.app.goo.gl short links
// Catch-all for standard google domains, mobile app links, maps, and shorteners
    const googleRegex = /^(https?:\/\/)?(www\.)?([a-z0-9.]*\.)?(google\.[a-z.]+|goo\.gl)\/.*$/i;
    if (!googleRegex.test(googleReviewUrl)) {
      return NextResponse.json(
        {
          error:
            "Invalid Google Review link. Please provide a valid Google Maps, Google Search, or goo.gl link.",
        },
        { status: 400 }
      );
    }

    const id = await createUniqueBusinessId(name, branchName);

    const { error } = await supabase.from("businesses").insert({
      id,
      name,
      branch_name: branchName,
      google_review_url: googleReviewUrl,
      manager_whatsapp: managerWhatsapp,
      language_preference: "english",
      is_active: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const publicLink = `${origin}/review/${id}`;

    return NextResponse.json({
      success: true,
      business_id: id,
      public_link: publicLink,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create account." },
      { status: 500 }
    );
  }
}