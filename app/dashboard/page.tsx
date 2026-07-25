export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizeBusinessMetrics } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: business, error } = await supabase
    .from("businesses")
    .select(
      "id, user_id, name, branch_name, google_review_url, manager_whatsapp, language_preference, industry_type, is_active, total_scans, google_clicks, whatsapp_clicks, onboarding_completed"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  // Auto-create a business record if one doesn't exist for this user
  let activeBusiness = business;

  if (!activeBusiness) {
    const { data: newBusiness, error: insertError } = await supabase
      .from("businesses")
      .insert({
        user_id: user.id,
        name: user.user_metadata?.business_name || "My Business",
        is_active: true,
      })
      .select(
        "id, user_id, name, branch_name, google_review_url, manager_whatsapp, language_preference, industry_type, is_active, total_scans, google_clicks, whatsapp_clicks, onboarding_completed"
      )
      .single();

    if (insertError || !newBusiness) {
      throw new Error(
        `Failed to create business record: ${insertError?.message ?? "unknown error"}`
      );
    }

    activeBusiness = newBusiness;
  }

  // Fetch scan logs for analytics
  const { data: scanLogs } = await supabase
    .from("scan_logs")
    .select("*")
    .eq("business_id", activeBusiness.id)
    .order("scanned_at", { ascending: false });

  return (
    <DashboardClient
      business={normalizeBusinessMetrics(activeBusiness)}
      scanLogs={scanLogs || []}
    />
  );
}
