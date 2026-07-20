"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  logoutAction,
  toggleActiveAction,
  terminateBusinessAction,
  updateServiceTierAction,
} from "../actions";

type BusinessDetail = {
  id: string;
  user_id?: string | null;
  name: string;
  branch_name: string;
  google_review_url: string;
  manager_whatsapp: string;
  language_preference: string;
  industry_type: string;
  is_active: boolean;
  total_scans: number;
  google_clicks: number;
  whatsapp_clicks: number;
  service_tier?: string;
};

type PortalDashboardClientProps = {
  initialBusinesses: BusinessDetail[];
};

export default function PortalDashboardClient({
  initialBusinesses,
}: PortalDashboardClientProps) {
  const [businesses, setBusinesses] = useState<BusinessDetail[]>(initialBusinesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBizId, setSelectedBizId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Search filtering
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [businesses, searchQuery]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    let scans = 0;
    let google = 0;
    let whatsapp = 0;

    businesses.forEach((b) => {
      scans += b.total_scans;
      google += b.google_clicks;
      whatsapp += b.whatsapp_clicks;
    });

    const totalClicks = google + whatsapp;
    const redirectRate = scans > 0 ? ((totalClicks / scans) * 100).toFixed(1) : "0.0";

    return { scans, google, whatsapp, redirectRate };
  }, [businesses]);

  const selectedBiz = useMemo(() => {
    return businesses.find((b) => b.id === selectedBizId) || null;
  }, [businesses, selectedBizId]);

  // Actions
  const handleLogout = async () => {
    await logoutAction();
    router.push("/portal");
  };

  const showNotification = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      // Optimistically update UI
      setBusinesses((prev) =>
        prev.map((b) => (b.id === id ? { ...b, is_active: !currentStatus } : b))
      );

      const res = await toggleActiveAction(id, currentStatus);
      if (!res.success) {
        // Rollback on error
        setBusinesses((prev) =>
          prev.map((b) => (b.id === id ? { ...b, is_active: currentStatus } : b))
        );
        showNotification(res.error || "Failed to update status", "error");
      } else {
        showNotification(`Status updated successfully for business ${id}`);
      }
    });
  };

  const handleServiceTierChange = (id: string, newTier: string) => {
    startTransition(async () => {
      const originalBusinesses = [...businesses];

      // Optimistically update UI
      setBusinesses((prev) =>
        prev.map((b) => (b.id === id ? { ...b, service_tier: newTier } : b))
      );

      const res = await updateServiceTierAction(id, newTier);
      if (!res.success) {
        if (res.isColumnMissing) {
          // Dev Mode fallback - keep UI state but warn user
          showNotification(
            `Pricing plan updated to '${newTier.toUpperCase()}' in mock mode (DB schema unmodified).`,
            "success"
          );
        } else {
          // Rollback on actual database network/error
          setBusinesses(originalBusinesses);
          showNotification(res.error || "Failed to update service tier", "error");
        }
      } else {
        showNotification(`Pricing plan upgraded to '${newTier.toUpperCase()}' successfully.`);
      }
    });
  };

  const handleTerminate = (id: string) => {
    if (!window.confirm("Permanently wipe this business context row from core tables?")) {
      return;
    }

    startTransition(async () => {
      const res = await terminateBusinessAction(id);
      if (res.success) {
        setBusinesses((prev) => prev.filter((b) => b.id !== id));
        if (selectedBizId === id) setSelectedBizId(null);
        showNotification(`Permanently wiped business context node: ${id}`);
      } else {
        showNotification(res.error || "Failed to delete business context", "error");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative overflow-x-hidden">
      {/* Toast Notification */}
      {message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-5 py-3 rounded-full shadow-lg border text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${
            messageType === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${messageType === "success" ? "bg-emerald-500" : "bg-red-500"}`} />
          {message}
        </div>
      )}

      <div className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 transition-all duration-300 ${selectedBiz ? "pr-[440px]" : ""}`}>
        {/* Header Control Console */}
        <header className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xs font-bold tracking-widest text-slate-500 uppercase font-mono">
                System Operations control
              </h1>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Administrative Control Console
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs bg-white text-slate-500 px-3.5 py-2 rounded-xl border border-slate-200 font-medium">
              Mode: <span className="font-semibold text-slate-800">Admin Override</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 transition"
            >
              Gateway Sign Out
            </button>
          </div>
        </header>

        {/* Statistical Metric Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { label: "Global Taps / Scans", value: metrics.scans, color: "text-slate-900" },
            { label: "Google Profile Visits", value: metrics.google, color: "text-emerald-600" },
            { label: "WhatsApp Direct Chats", value: metrics.whatsapp, color: "text-blue-600" },
            { label: "Avg Redirection Rate", value: `${metrics.redirectRate}%`, color: "text-slate-800" },
          ].map((metric) => (
            <div key={metric.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {metric.label}
              </p>
              <p className={`mt-2 text-3xl font-extrabold tracking-tight ${metric.color}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </section>

        {/* Filters Panel */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search branches by business name, branch label, or system ID..."
            className="max-w-md w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-350 transition shadow-sm"
          />
        </div>

        {/* Data Workspace Table */}
        <main>
          {filteredBusinesses.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-sm text-slate-500 font-medium">
                No business entities matched the current query.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="p-4">Entity Identity / Location</th>
                    <th className="p-4 text-center">Conversion Matrix</th>
                    <th className="p-4">Service Tier</th>
                    <th className="p-4">Operational Status</th>
                    <th className="p-4 text-right">Intercept Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredBusinesses.map((biz) => {
                    const isSelected = biz.id === selectedBizId;
                    return (
                      <tr
                        key={biz.id}
                        onClick={() => setSelectedBizId(biz.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? "bg-slate-100/60" : "hover:bg-slate-50/50"
                        }`}
                      >
                        {/* Interactive Clickable Info Area */}
                        <td className="p-4">
                          <div className="font-semibold text-slate-900">
                            {biz.name}
                          </div>
                          <div className="text-xs text-slate-400 font-medium mt-0.5">
                            {biz.branch_name}{" "}
                            <span className="text-[10px] font-mono text-slate-350">
                              ({biz.id})
                            </span>
                          </div>
                        </td>

                        {/* Metrics Block */}
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-4 text-xs font-mono font-medium">
                            <div className="text-center">
                              <span className="text-[9px] font-bold text-slate-400 block uppercase">
                                Scans
                              </span>
                              {biz.total_scans}
                            </div>
                            <div className="border-l border-slate-200 pl-4 text-center">
                              <span className="text-[9px] font-bold text-slate-400 block uppercase">
                                Google
                              </span>
                              {biz.google_clicks}
                            </div>
                            <div className="border-l border-slate-200 pl-4 text-center">
                              <span className="text-[9px] font-bold text-slate-400 block uppercase">
                                WhatsApp
                              </span>
                              {biz.whatsapp_clicks}
                            </div>
                          </div>
                        </td>

                        {/* Plan Tier Dropdown */}
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={biz.service_tier || "basic"}
                            onChange={(e) => handleServiceTierChange(biz.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-350 transition font-semibold"
                          >
                            <option value="basic">Basic Plan</option>
                            <option value="growth">Growth Plan</option>
                            <option value="enterprise">Enterprise Plan</option>
                          </select>
                        </td>

                        {/* Status Label */}
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                              biz.is_active
                                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                : "bg-red-50 border-red-100 text-red-700"
                            }`}
                          >
                            {biz.is_active ? "Active" : "Suspended"}
                          </span>
                        </td>

                        {/* Instant Controls */}
                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleActive(biz.id, biz.is_active)}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                                biz.is_active
                                  ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                                  : "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700"
                              }`}
                            >
                              {biz.is_active ? "Suspend" : "Activate"}
                            </button>

                            <button
                              onClick={() => handleTerminate(biz.id)}
                              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                            >
                              Wipe
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* --- SLIDEOUT DETAIL MANAGEMENT DRAWER PANEL --- */}
      {selectedBiz && (
        <aside className="fixed top-0 right-0 h-full w-[400px] bg-white border-l border-slate-200 shadow-2xl p-6 overflow-y-auto z-40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono">
                Entity Configuration Details
              </h3>
              <button
                onClick={() => setSelectedBizId(null)}
                className="text-slate-400 hover:text-slate-900 text-xs font-semibold bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-lg border border-slate-200"
              >
                Close ✕
              </button>
            </div>

            {/* Entity Identification Context */}
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                  Database Unique Slug ID
                </label>
                <div className="font-mono text-slate-800 break-all select-all font-semibold">
                  {selectedBiz.id}
                </div>

                <label className="text-[9px] font-bold text-slate-400 uppercase block mt-3 mb-1">
                  User Foreign Auth Key
                </label>
                <div className="font-mono text-slate-800 break-all select-all font-semibold">
                  {selectedBiz.user_id || "Orphan Node / Demo Account"}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  Business Label
                </label>
                <div className="font-semibold text-slate-800 bg-white border border-slate-200 p-2.5 rounded-xl">
                  {selectedBiz.name}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  Branch Location Label
                </label>
                <div className="font-semibold text-slate-800 bg-white border border-slate-200 p-2.5 rounded-xl">
                  {selectedBiz.branch_name}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  Manager WhatsApp Destination
                </label>
                <div className="font-semibold text-slate-800 bg-white border border-slate-200 p-2.5 rounded-xl font-mono">
                  {selectedBiz.manager_whatsapp}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  Google Review Targeting URL
                </label>
                <div className="font-semibold text-slate-800 bg-white border border-slate-200 p-2.5 rounded-xl font-mono break-all">
                  {selectedBiz.google_review_url}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                    Industry Type
                  </label>
                  <div className="font-semibold text-slate-700 bg-white border border-slate-200 p-2 rounded-xl text-center uppercase tracking-wide text-[10px]">
                    {selectedBiz.industry_type}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">
                    Language Pref
                  </label>
                  <div className="font-semibold text-slate-700 bg-white border border-slate-200 p-2 rounded-xl text-center uppercase tracking-wide text-[10px]">
                    {selectedBiz.language_preference}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 mt-6">
            <div className="text-[10px] font-bold text-slate-400 uppercase text-center font-mono">
              Voucho Operations Control
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
