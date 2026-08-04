"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Server action to handle dashboard login strictly on the backend.
 * This ensures session tokens and cookie setting happen via Next.js server-side logic.
 */
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const next = (formData.get("next") as string) || "/dashboard";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    return { error: error.message };
  }

  let targetUrl = "/dashboard";
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    targetUrl = next;
  }

  revalidatePath("/", "layout");
  redirect(targetUrl);
}

/**
 * Server action to handle sign out.
 */
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
