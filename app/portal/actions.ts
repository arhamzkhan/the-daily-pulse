"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function loginAction(username: string, password: string) {
  const adminUser = process.env.PORTAL_ADMIN_USER;
  const adminPass = process.env.PORTAL_ADMIN_PASSWORD;

  if (adminUser === undefined || adminPass === undefined) {
    throw new Error("Portal admin credentials are not configured in environment variables.");
  }

  if (username === adminUser && password === adminPass) {
    const cookieStore = await cookies();
    cookieStore.set("portal_session", "active", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return { success: true };
  }

  return { success: false, error: "Invalid credentials. Access Denied." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("portal_session");
  return { success: true };
}

export async function toggleActiveAction(id: string, currentStatus: boolean) {
  const cookieStore = await cookies();
  if (cookieStore.get("portal_session")?.value !== "active") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from("businesses")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Database update failed" };
  }
}

export async function terminateBusinessAction(id: string) {
  const cookieStore = await cookies();
  if (cookieStore.get("portal_session")?.value !== "active") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from("businesses")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Database deletion failed" };
  }
}

export async function updateServiceTierAction(id: string, newTier: string) {
  const cookieStore = await cookies();
  if (cookieStore.get("portal_session")?.value !== "active") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from("businesses")
      .update({ service_tier: newTier } as any)
      .eq("id", id);

    if (error) {
      return { 
        success: false, 
        error: error.message, 
        isColumnMissing: error.message.includes("column") || error.code === "P0002" || error.code === "42703"
      };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Tier update failed" };
  }
}
