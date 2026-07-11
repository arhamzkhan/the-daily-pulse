import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function requireUser(): Promise<User | NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  return user;
}

export function isAuthError(result: User | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}
