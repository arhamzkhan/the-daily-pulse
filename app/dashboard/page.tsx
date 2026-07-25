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

  // Fallback business object for users who haven't completed onboarding yet
  const defaultBusiness = {
    id: "",
    user_id: user.id,
    name: "",
    branch_name: "",
    google_review_url: "",
    manager_whatsapp: "",
    language_preference: "en",
    industry_type: "",
    is_active: false,
    total_scans: 0,
    google_clicks: 0,
    whatsapp_clicks: 0,
    onboarding_completed: false,
  };

  // Fetch scan logs for analytics (only if a real business exists)
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
      business={normalizeBusinessMetrics(business || defaultBusiness)}
      scanLogs={scanLogs || []}
    />
  );
}
