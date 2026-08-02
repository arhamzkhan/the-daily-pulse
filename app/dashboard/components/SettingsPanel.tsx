"use client";

import Link from "next/link";
import type { Business } from "@/lib/supabase";
import { INDUSTRY_OPTIONS } from "@/lib/themes";
import { Settings, ToggleLeft, ToggleRight, ExternalLink, Save } from "lucide-react";
import type { ToastType } from "./Toast";

type SettingsPanelProps = {
  business: Business;
  saving: boolean;
  handleSettingsSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  syncDatabase: (updatedFields: Partial<Business>) => Promise<void>;
  addToast: (message: string, type?: ToastType) => void;
};

const inputClass =
  "w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-white text-sm p-3.5 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-600";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500";

export default function SettingsPanel({
  business,
  saving,
  handleSettingsSubmit,
  syncDatabase,
  addToast,
}: SettingsPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">

      {/* Business Settings */}
      <section className="rounded-2xl border border-zinc-800/80 bg-[#121215] p-6 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-[0.04] bg-amber-500" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700/60">
              <Settings className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Configuration
            </p>
          </div>

          <h2 className="mt-3 text-xl font-bold text-white tracking-tight">
            Business Settings
          </h2>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            Update your public review page configuration.
          </p>

          <form onSubmit={handleSettingsSubmit} className="mt-6 space-y-4">
            <div>
              <label className={labelClass}>Industry</label>
              <select
                name="industry_type"
                defaultValue={business.industry_type}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {INDUSTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#121215]">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Manager WhatsApp</label>
              <input
                name="whatsapp"
                defaultValue={business.manager_whatsapp}
                placeholder="+92 300 0000000"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Google Review URL</label>
              <input
                name="google_url"
                defaultValue={business.google_review_url}
                placeholder="https://g.page/r/..."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3.5 text-sm font-bold text-zinc-950 transition-all hover:from-amber-400 hover:to-amber-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" strokeWidth={2} />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </section>

      {/* Review Page Control */}
      <section className="rounded-2xl border border-zinc-800/80 bg-[#121215] p-6 flex flex-col relative overflow-hidden">
        <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-[0.04] bg-emerald-500" />

        <div className="relative flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              {business.is_active ? (
                <ToggleRight className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.75} />
              ) : (
                <ToggleLeft className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.75} />
              )}
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Page Control
            </p>
          </div>

          <h2 className="mt-3 text-xl font-bold text-white tracking-tight">
            Public Review Page
          </h2>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            Enable or pause your customer review page.
          </p>

          {/* Toggle row */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-zinc-800/80 p-4 bg-zinc-900/40">
            <div>
              <h3 className="text-sm font-semibold text-white">Page Status</h3>
              <p className="mt-0.5 text-xs text-zinc-500">
                {business.is_active
                  ? "Customers can leave reviews."
                  : "Review page is currently paused."}
              </p>
            </div>

            <button
              type="button"
              aria-label="Toggle review page"
              onClick={async () => {
                try {
                  await syncDatabase({ is_active: !business.is_active });
                  addToast(
                    business.is_active ? "Review page paused." : "Review page is now live.",
                    "success"
                  );
                } catch (err) {
                  addToast(
                    err instanceof Error ? err.message : "Failed to update status.",
                    "error"
                  );
                }
              }}
              className={`relative h-6 w-11 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 ${
                business.is_active
                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                  : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                  business.is_active ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Status badge */}
          <div
            className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
              business.is_active
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-zinc-800/60 text-zinc-500 border border-zinc-700/60"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                business.is_active ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
              }`}
            />
            {business.is_active
              ? "Your page is live and accepting reviews"
              : "Your page is paused"}
          </div>

          <div className="mt-auto pt-6">
            <Link
              href={`/review/${business.id}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700/80 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-200"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
              Preview Review Page
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}