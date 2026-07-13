import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalDashboardClient from "./PortalDashboardClient";

export const dynamic = "force-dynamic";

export default async function PortalDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("portal_session")?.value;

  if (session !== "active") {
    redirect("/portal");
  }

  const supabase = await createClient();
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch businesses for dashboard:", error.message);
  }

  // Normalize data and apply fallbacks
  const normalized = (businesses || []).map((b) => ({
    ...b,
    total_scans: Number(b.total_scans ?? 0),
    google_clicks: Number(b.google_clicks ?? 0),
    whatsapp_clicks: Number(b.whatsapp_clicks ?? 0),
    service_tier: b.service_tier || "basic",
  }));

  return <PortalDashboardClient initialBusinesses={normalized} />;
}
