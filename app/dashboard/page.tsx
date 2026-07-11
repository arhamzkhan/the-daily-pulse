import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizeBusinessMetrics } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";

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
      "id, user_id, name, branch_name, google_review_url, manager_whatsapp, language_preference, industry_type, is_active, total_scans, google_clicks, whatsapp_clicks"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !business) {
    redirect("/onboarding");
  }

  return <DashboardClient business={normalizeBusinessMetrics(business)} />;
}
