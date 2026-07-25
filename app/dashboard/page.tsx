export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizeBusinessMetrics } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login?next=/dashboard");
    }

    // Attempt to fetch existing business record
    const { data: business } = await supabase
      .from("businesses")
      .select(
        "id, user_id, name, branch_name, google_review_url, manager_whatsapp, language_preference, industry_type, is_active, total_scans, google_clicks, whatsapp_clicks, onboarding_completed"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    let activeBusiness = business;

    // Auto-create a business record if one doesn't exist
    if (!activeBusiness) {
      const { data: newBusiness } = await supabase
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

      activeBusiness = newBusiness;
    }

    // If we still don't have a business (insert failed, RLS denied, etc.), use a safe default
    if (!activeBusiness) {
      const defaultBusiness = {
        id: "temp_id",
        user_id: user.id,
        name: user.email?.split("@")[0] || "My Business",
        branch_name: "",
        google_review_url: "",
        manager_whatsapp: "",
        language_preference: "en",
        industry_type: "",
        is_active: true,
        total_scans: 0,
        google_clicks: 0,
        whatsapp_clicks: 0,
        onboarding_completed: false,
      };

      return (
        <DashboardClient
          business={normalizeBusinessMetrics(defaultBusiness as any)}
          scanLogs={[]}
        />
      );
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
  } catch (err: unknown) {
    // Re-throw Next.js redirect errors so navigation still works
    if (err instanceof Error && err.message === "NEXT_REDIRECT") {
      throw err;
    }

    console.error("[DashboardPage] Unhandled server error:", err);

    // Render a clean fallback UI instead of a 500 crash
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p style={{ color: "#888", marginTop: "0.5rem" }}>
          We couldn&apos;t load your dashboard. Please try refreshing the page or
          contact support if the problem persists.
        </p>
      </div>
    );
  }
}
