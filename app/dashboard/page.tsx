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

  // NOTE: onboarding redirect removed to prevent redirect loop.
  // If no business record exists yet, render dashboard with safe defaults.

  // Fetch scan logs for analytics (only if a business exists)
  const scanLogs = business
    ? (
        await supabase
          .from("scan_logs")
          .select("*")
          .eq("business_id", business.id)
          .order("scanned_at", { ascending: false })
      ).data
    : null;

  return (
    <DashboardClient
      business={business ? normalizeBusinessMetrics(business) : null}
      scanLogs={scanLogs || []}
    />
  );
}
