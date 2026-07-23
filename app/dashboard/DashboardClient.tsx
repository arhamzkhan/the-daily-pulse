"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getTheme, INDUSTRY_OPTIONS, type IndustryType } from "@/lib/themes";
import type { Business } from "@/lib/supabase";
import QRCodeGenerator from "@/app/admin/components/QRCodeGenerator";

type ScanLog = {
  id: number;
  business_id: string;
  action_type: "page_view" | "review_click" | "manager_click";
  rating?: number;
  device_type?: string;
  scanned_at: string;
};

type DashboardClientProps = {
  business: Business;
  scanLogs: ScanLog[];
};

type TabId = "overview" | "qr" | "settings";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "qr", label: "QR & Standee" },
  { id: "settings", label: "Settings" },
];

export default function DashboardClient({ business: initialBusiness, scanLogs }: DashboardClientProps) {
  const [business, setBusiness] = useState(initialBusiness);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [standeeForm, setStandeeForm] = useState({ address: "", phone: "" });
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [standeeOrdered, setStandeeOrdered] = useState(false);
  const theme = useMemo(() => getTheme(business.industry_type), [business.industry_type]);

  async function detectLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data && data.display_name) {
            setStandeeForm((prev) => ({ ...prev, address: data.display_name }));
          }
        } catch (err) {
          console.error("Geocoding failed", err);
        } finally {
          setDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation failed", error);
        setDetecting(false);
        alert("Unable to retrieve location. Please enter your address manually.");
      }
    );
  }

  async function syncDatabase(updatedFields: Partial<Business>) {
    const payload = {
      id: business.id,
      ...updatedFields,
    };

    const response = await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.error || "Failed to save changes.");
    }

    setBusiness((prev) => ({ ...prev, ...updatedFields }));
  }

  async function handleSettingsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const fields = {
      manager_whatsapp: formData.get("whatsapp") as string,
      google_review_url: formData.get("google_url") as string,
      industry_type: formData.get("industry_type") as IndustryType,
    };

    if (!/^92\d{10}$/.test(fields.manager_whatsapp)) {
      setMessage("WhatsApp must begin with 92 followed by 10 digits.");
      setSaving(false);
      return;
    }

    try {
      await syncDatabase(fields);
      setMessage("Settings saved successfully.");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  async function handleStandeeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fullPhone = `92${standeeForm.phone}`;
    const fullAddress = `${standeeForm.address}${secondaryAddress ? `, ${secondaryAddress}` : ""}`;
    if (!standeeForm.address.trim() || !/^92\d{10}$/.test(fullPhone)) {
      setMessage("Enter a delivery address and valid 10-digit phone number.");
      return;
    }
    try {
      await syncDatabase({ order_requested: true });
      setStandeeOrdered(true);
      setMessage("Standee order received. Our team will contact you within 24 hours.");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Failed to request standee.");
    }
  }

  const scans = business.total_scans;
  const googleClicks = business.google_clicks;
  const whatsappClicks = business.whatsapp_clicks;

  // Analytics calculations
  const totalScans = scanLogs.length;
  const ratingLogs = scanLogs.filter((log) => log.rating && log.rating > 0);
  const avgRating = ratingLogs.length
    ? (ratingLogs.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratingLogs.length).toFixed(1)
    : "0.0";
  const conversionRate = totalScans ? ((ratingLogs.length / totalScans) * 100).toFixed(0) : "0";

  const actionDistribution = {
    google: scanLogs.filter((l) => l.action_type === "review_click").length,
    private: scanLogs.filter((l) => l.action_type === "manager_click").length,
  };

  return (
    <div className={`min-h-screen ${theme.pageBg} ${theme.bodyFont}`}>
      <div className={`pointer-events-none fixed inset-0 ${theme.pageGradient}`} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <header
          className={`mb-8 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between ${theme.cardBorder}`}
        >
          <div>
            <p className={`text-[11px] font-semibold uppercase ${theme.eyebrow}`}>
              {business.industry_type} dashboard
            </p>
            <h1 className={`mt-2 text-3xl ${theme.headingFont} ${theme.title}`}>{business.name}</h1>
            <p className={`mt-1 text-sm ${theme.subtitle}`}>{business.branch_name}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                business.is_active
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-600"
              }`}
            >
              {business.is_active ? "Live" : "Paused"}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className={`rounded-xl border px-4 py-2 text-sm font-medium ${theme.cardBorder} ${theme.subtitle}`}
            >
              Sign out
            </button>
          </div>
        </header>

        <nav className={`mb-8 flex flex-wrap gap-2 border-b pb-4 ${theme.cardBorder}`}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? `${theme.googleButton}`
                  : `border ${theme.cardBorder} ${theme.subtitle}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {message ? (
          <p className={`mb-6 text-sm ${message.includes("success") || message.includes("received") ? "text-emerald-600" : "text-rose-600"}`}>
            {message}
          </p>
        ) : null}

        {activeTab === "overview" ? (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Scans", value: totalScans },
                { label: "Avg Rating", value: `${avgRating} ★` },
                { label: "Conversion", value: `${conversionRate}%` },
                { label: "Direct Clicks", value: googleClicks + whatsappClicks },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${theme.subtitle}`}>
                    {metric.label}
                  </p>
                  <p className={`mt-3 text-3xl font-extrabold ${theme.headingFont} ${theme.title}`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.title}`}>
                  Action Distribution
                </h3>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className={theme.subtitle}>Google Reviews</span>
                      <span className={theme.title}>{actionDistribution.google}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                      <div
                        className="h-full bg-emerald-500 transition-all"
                        style={{
                          width: `${totalScans ? (actionDistribution.google / totalScans) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className={theme.subtitle}>Private Feedback</span>
                      <span className={theme.title}>{actionDistribution.private}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{
                          width: `${totalScans ? (actionDistribution.private / totalScans) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.title}`}>
                  Quick Insights
                </h3>
                <p className={`mt-4 text-sm leading-relaxed ${theme.subtitle}`}>
                  {totalScans > 0
                    ? `Your business has seen ${totalScans} total scans. ${
                        Number(conversionRate) > 50
                          ? "Engagement is high! Your customers are actively sharing feedback."
                          : "Try placing your QR standee in a more visible location to boost engagement."
                      }`
                    : "No scan data available yet. Deploy your QR standee to start collecting analytics."}
                </p>
              </div>
            </div>

            <div className={`overflow-hidden rounded-2xl border ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}>
              <div className="border-b border-neutral-800 p-6">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.title}`}>
                  Recent Scan Activity
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b border-neutral-800 ${theme.subtitle} uppercase tracking-wider`}>
                      <th className="px-6 py-4 font-bold">Timestamp</th>
                      <th className="px-6 py-4 font-bold">Action</th>
                      <th className="px-6 py-4 font-bold">Device</th>
                      <th className="px-6 py-4 font-bold text-right">Rating</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-neutral-800 ${theme.title}`}>
                    {scanLogs.length > 0 ? (
                      scanLogs.slice(0, 10).map((log) => (
                        <tr key={log.id} className="hover:bg-neutral-800/30 transition-colors">
                          <td className="whitespace-nowrap px-6 py-4 text-neutral-400">
                            {new Date(log.scanned_at).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="capitalize">{log.action_type.replace("_", " ")}</span>
                          </td>
                          <td className="px-6 py-4 text-neutral-500">{log.device_type || "Unknown"}</td>
                          <td className="px-6 py-4 text-right">
                            {log.rating ? (
                              <span className="font-bold text-emerald-400">{log.rating} ★</span>
                            ) : (
                              <span className="text-neutral-600">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-neutral-500 italic">
                          No recent activity recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "qr" ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <QRCodeGenerator
              businessSlug={business.id}
              businessName={business.name}
              theme={theme}
            />

            <section className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}>
              <p className={`text-[11px] font-bold uppercase ${theme.eyebrow}`}>Physical standee</p>
              <h2 className={`mt-2 text-xl ${theme.headingFont} ${theme.title}`}>
                Order Acrylic Standee
              </h2>
              <p className={`mt-2 text-sm leading-relaxed ${theme.subtitle}`}>
                Premium countertop acrylic with your QR code. We encode your unique{" "}
                <strong>Voucho</strong> review link and ship ready to place at reception.
              </p>

              {standeeOrdered ? (
                <div className={`mt-6 rounded-xl border p-4 ${theme.cardBorder} ${theme.pageBg}`}>
                  <p className={`font-semibold ${theme.title}`}>Order submitted</p>
                  <p className={`mt-1 text-sm ${theme.subtitle}`}>
                    We will confirm delivery details and apply your QR code before dispatch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleStandeeOrder} className="mt-6 grid gap-4">
                  <div className="grid gap-2">
                    <span className={`text-sm font-semibold ${theme.subtitle}`}>Delivery Location</span>
                    <button
                      type="button"
                      onClick={detectLocation}
                      disabled={detecting}
                      className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 dark:bg-stone-850 dark:hover:bg-stone-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-stone-200/50 dark:border-stone-700/50 cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-rose-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {detecting ? "Locating & Geocoding..." : "Detect & Pre-fill Address on Map"}
                    </button>
                    {coords && (
                      <iframe
                        width="100%"
                        height="180"
                        className="rounded-xl border border-stone-200 dark:border-stone-700 mt-2 shadow-inner"
                        src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      />
                    )}
                  </div>

                  <label className={`grid gap-2 text-sm ${theme.subtitle}`}>
                    Primary delivery address
                    <textarea
                      required
                      rows={2}
                      value={standeeForm.address}
                      onChange={(event) =>
                        setStandeeForm((prev) => ({ ...prev, address: event.target.value }))
                      }
                      placeholder="Street address / area"
                      className={`rounded-xl border px-4 py-3 outline-none ${theme.cardBorder} ${theme.pageBg} ${theme.title}`}
                    />
                  </label>

                  <label className={`grid gap-2 text-sm ${theme.subtitle}`}>
                    Shop / Suite / Floor / Landmark (Secondary)
                    <input
                      value={secondaryAddress}
                      onChange={(event) => setSecondaryAddress(event.target.value)}
                      placeholder="e.g. Shop # 4, G-Flr, near Gloria Jeans"
                      className={`rounded-xl border px-4 py-3 outline-none ${theme.cardBorder} ${theme.pageBg} ${theme.title}`}
                    />
                  </label>

                  <label className={`grid gap-2 text-sm ${theme.subtitle}`}>
                    Contact phone number
                    <div className="flex">
                      <div className="flex items-center justify-center px-4 bg-stone-100 dark:bg-stone-850 border border-r-0 border-stone-200 dark:border-stone-700 rounded-l-xl text-stone-500 font-bold text-sm">
                        +92
                      </div>
                      <input
                        required
                        pattern="3\d{9}"
                        maxLength={10}
                        value={standeeForm.phone}
                        onChange={(event) => {
                          const val = event.target.value.replace(/\D/g, "");
                          if (val.length <= 10) setStandeeForm((prev) => ({ ...prev, phone: val }));
                        }}
                        placeholder="3001234567"
                        className={`rounded-xl rounded-l-none border px-4 py-3 outline-none ${theme.cardBorder} ${theme.pageBg} ${theme.title} w-full`}
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98] ${theme.googleButton}`}
                  >
                    Request Standees
                  </button>
                </form>
              )}
            </section>
          </div>
        ) : null}

        {activeTab === "settings" ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}>
              <h2 className={`text-xl ${theme.headingFont} ${theme.title}`}>Business settings</h2>
              <p className={`mt-2 text-sm ${theme.subtitle}`}>
                Update routing URLs, industry theme, and brand-facing preferences.
              </p>

              <form onSubmit={handleSettingsSubmit} className="mt-6 grid gap-4">
                <label className={`grid gap-2 text-sm ${theme.subtitle}`}>
                  Industry type
                  <select
                    name="industry_type"
                    defaultValue={business.industry_type}
                    className={`rounded-xl border px-4 py-3 outline-none ${theme.cardBorder} ${theme.pageBg} ${theme.title}`}
                  >
                    {INDUSTRY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={`grid gap-2 text-sm ${theme.subtitle}`}>
                  Manager WhatsApp
                  <input
                    name="whatsapp"
                    defaultValue={business.manager_whatsapp}
                    className={`rounded-xl border px-4 py-3 outline-none ${theme.cardBorder} ${theme.pageBg} ${theme.title}`}
                  />
                </label>

                <label className={`grid gap-2 text-sm ${theme.subtitle}`}>
                  Google review URL
                  <input
                    name="google_url"
                    defaultValue={business.google_review_url}
                    className={`rounded-xl border px-4 py-3 outline-none ${theme.cardBorder} ${theme.pageBg} ${theme.title}`}
                  />
                </label>

                <button
                  type="submit"
                  disabled={saving}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-70 ${theme.googleButton}`}
                >
                  {saving ? "Saving..." : "Save settings"}
                </button>
              </form>
            </section>

            <section className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}>
              <h2 className={`text-xl ${theme.headingFont} ${theme.title}`}>Page status</h2>
              <p className={`mt-2 text-sm leading-relaxed ${theme.subtitle}`}>
                Pause your public review page instantly. Customers will still see your business name,
                but action buttons will be hidden while paused.
              </p>

              <div
                className={`mt-6 flex items-center justify-between rounded-xl border p-4 ${theme.cardBorder} ${theme.pageBg}`}
              >
                <div>
                  <p className={`font-semibold ${theme.title}`}>Public page</p>
                  <p className={`text-xs ${theme.subtitle}`}>
                    {business.is_active ? "Accepting customer feedback" : "Temporarily unavailable"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await syncDatabase({ is_active: !business.is_active });
                      setMessage("Page status updated.");
                    } catch (err: unknown) {
                      setMessage(err instanceof Error ? err.message : "Failed to update status.");
                    }
                  }}
                  className={`h-7 w-12 rounded-full p-1 transition ${
                    business.is_active ? "bg-emerald-500" : "bg-zinc-400"
                  }`}
                  aria-label="Toggle page status"
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white transition ${
                      business.is_active ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <Link
                href={`/review/${business.id}`}
                target="_blank"
                className={`mt-6 inline-block text-sm font-medium underline-offset-4 hover:underline ${theme.eyebrow}`}
              >
                Preview public review page →
              </Link>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
