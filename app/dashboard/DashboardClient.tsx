"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import type { Business } from "@/lib/supabase";

import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import QuickInsights from "./components/QuickInsights";
import ActivityTimeline from "./components/ActivityTimeline";
import QRPanel from "./components/QRPanel";
import SettingsPanel from "./components/SettingsPanel";
import AccountPanel from "./components/AccountPanel";

interface DashboardClientProps {
  business: Business;
  scanLogs?: any[];
}

export default function DashboardClient({ business, scanLogs = [] }: DashboardClientProps) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [activeTab, setActiveTab] = useState<"overview" | "qr" | "settings" | "account">("overview");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const syncDatabase = async (updatedFields: Partial<Business>): Promise<void> => {
    try {
      if (business?.id) {
        await supabase.from("businesses").update(updatedFields).eq("id", business.id);
      }
      router.refresh();
    } catch (err) {
      console.error("Failed to sync database:", err);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const formData = new FormData(e.currentTarget);
      const updatedFields: Partial<Business> = {
        name: (formData.get("name") as string) || business.name,
        branch_name: (formData.get("branch_name") as string) || business.branch_name,
        google_review_url: (formData.get("google_review_url") as string) || business.google_review_url,
        manager_whatsapp: (formData.get("manager_whatsapp") as string) || business.manager_whatsapp,
      };
      await syncDatabase(updatedFields);
      setMessage("Settings saved successfully!");
    } catch (err: any) {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen text-zinc-100 flex flex-col md:flex-row antialiased"
      style={{ background: "#09090b" }}
    >
      {/* Sidebar */}
      <aside
        className="w-full md:w-60 shrink-0 flex flex-col p-4 border-r"
        style={{
          background: "#0e0e11",
          borderColor: "rgba(39,39,42,0.8)",
        }}
      >
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onSignOut={handleSignOut} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className="sticky top-0 z-20 border-b px-6 py-4 backdrop-blur-xl"
          style={{
            background: "rgba(9,9,11,0.85)",
            borderColor: "rgba(39,39,42,0.8)",
          }}
        >
          <DashboardHeader business={business} />
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <StatsCards business={business} />
              <QuickInsights business={business} scanLogs={scanLogs} />
              <ActivityTimeline scanLogs={scanLogs} />
            </div>
          )}

          {activeTab === "qr" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <QRPanel
                business={business}
                message={message}
                setMessage={setMessage}
                syncDatabase={syncDatabase}
              />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <SettingsPanel
                business={business}
                saving={saving}
                handleSettingsSubmit={handleSettingsSubmit}
                syncDatabase={syncDatabase}
                setMessage={setMessage}
              />
            </div>
          )}

          {activeTab === "account" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AccountPanel />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}