"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getTheme } from "@/lib/themes";
import type { Business } from "@/lib/supabase";
import QRCodeGenerator from "@/app/admin/components/QRCodeGenerator";

type DashboardClientProps = {
  business: Business;
};

export default function DashboardClient({ business: initialBusiness }: DashboardClientProps) {
  const [business, setBusiness] = useState(initialBusiness);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const theme = useMemo(() => getTheme(business.industry_type), [business.industry_type]);

  async function syncDatabase(updatedFields: Partial<Business>) {
    const updatedState = { ...business, ...updatedFields };
    setBusiness(updatedState);

    const response = await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedState),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.error || "Failed to save changes.");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const fields = {
      manager_whatsapp: formData.get("whatsapp") as string,
      google_review_url: formData.get("google_url") as string,
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

  const scans = business.total_scans ?? 0;
  const googleClicks = business.google_clicks ?? 0;
  const whatsappClicks = business.whatsapp_clicks ?? 0;

  return (
    <div className={`min-h-screen ${theme.pageBg} ${theme.bodyFont}`}>
      <div className={`pointer-events-none fixed inset-0 ${theme.pageGradient}`} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <header
          className={`mb-10 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between ${theme.cardBorder}`}
        >
          <div>
            <p className={`text-[11px] font-semibold uppercase ${theme.eyebrow}`}>
              {business.industry_type} dashboard
            </p>
            <h1 className={`mt-2 text-3xl ${theme.headingFont} ${theme.title}`}>
              {business.name}
            </h1>
            <p className={`mt-1 text-sm ${theme.subtitle}`}>{business.branch_name}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                business.is_active
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-400"
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

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "NFC / QR taps", value: scans },
            { label: "Google review clicks", value: googleClicks },
            { label: "WhatsApp contacts", value: whatsappClicks },
          ].map((metric) => (
            <div
              key={metric.label}
              className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${theme.subtitle}`}>
                {metric.label}
              </p>
              <p className={`mt-3 text-4xl ${theme.headingFont} ${theme.title}`}>{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`}>
            <h2 className={`text-xl ${theme.headingFont} ${theme.title}`}>Routing settings</h2>
            <p className={`mt-2 text-sm ${theme.subtitle}`}>
              Update where customers are sent when they tap your review page.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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

              {message ? <p className="text-sm text-emerald-400">{message}</p> : null}

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
                  } catch (err: unknown) {
                    setMessage(err instanceof Error ? err.message : "Failed to update status.");
                  }
                }}
                className={`h-7 w-12 rounded-full p-1 transition ${
                  business.is_active ? "bg-emerald-500" : "bg-zinc-600"
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

        <div className="mt-8">
          <QRCodeGenerator businessSlug={business.id} businessName={business.name} />
        </div>
      </div>
    </div>
  );
}
