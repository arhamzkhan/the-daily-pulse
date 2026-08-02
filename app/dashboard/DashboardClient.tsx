"use client";

import { useState, useEffect } from "react";
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
import { useToast, ToastContainer } from "./components/Toast";

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

  // ── Toast system ──────────────────────────────────────────────────────────
  const { toasts, addToast, dismissToast } = useToast();

  // ── Theme system (Light Mode default) ──────────────────────────────────────
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Add/remove class from html/document tag to enable tailwind dark: variant
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ── UI state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<"overview" | "qr" | "settings" | "account">("overview");
  const [saving, setSaving] = useState(false);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // ── DB sync ───────────────────────────────────────────────────────────────
  const syncDatabase = async (updatedFields: Partial<Business>): Promise<void> => {
    try {
      if (business?.id) {
        await supabase.from("businesses").update(updatedFields).eq("id", business.id);
      }
      router.refresh();
    } catch (err) {
      console.error("Failed to sync database:", err);
      throw err; // propagate so callers can surface via toast
    }
  };

  // ── Settings form submit ──────────────────────────────────────────────────
  const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      const updatedFields: Partial<Business> = {
        name:               (formData.get("name")              as string) || business.name,
        branch_name:        (formData.get("branch_name")       as string) || business.branch_name,
        google_review_url:  (formData.get("google_url")        as string) || business.google_review_url,
        manager_whatsapp:   (formData.get("whatsapp")          as string) || business.manager_whatsapp,
      };
      await syncDatabase(updatedFields);
      addToast("Settings saved successfully.", "success");
    } catch {
      addToast("Failed to save settings. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row antialiased transition-colors duration-200"
      style={{ background: theme === "dark" ? "#09090b" : "#f8fafc" }}
    >
      {/* Sidebar */}
      <aside
        className="w-full md:w-60 shrink-0 flex flex-col p-4 border-r transition-colors duration-200"
        style={{
          background: theme === "dark" ? "#0e0e11" : "#ffffff",
          borderColor: theme === "dark" ? "rgba(39,39,42,0.8)" : "#e2e8f0"
        }}
      >
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSignOut={handleSignOut}
        />
      </aside>

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky frosted header */}
        <header
          className="sticky top-0 z-20 border-b px-6 py-4 backdrop-blur-xl transition-colors duration-200"
          style={{
            background: theme === "dark" ? "rgba(9,9,11,0.85)" : "rgba(255,255,255,0.85)",
            borderColor: theme === "dark" ? "rgba(39,39,42,0.8)" : "#e2e8f0"
          }}
        >
          <DashboardHeader
            business={business}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </header>

        {/* Tab content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">

          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <StatsCards business={business} scanLogs={scanLogs} />
              <QuickInsights business={business} scanLogs={scanLogs} />
              <ActivityTimeline scanLogs={scanLogs} />
            </div>
          )}

          {activeTab === "qr" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <QRPanel
                business={business}
                addToast={addToast}
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
                addToast={addToast}
              />
            </div>
          )}

          {activeTab === "account" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AccountPanel addToast={addToast} />
            </div>
          )}

        </main>
      </div>

      {/* Global floating toast layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}