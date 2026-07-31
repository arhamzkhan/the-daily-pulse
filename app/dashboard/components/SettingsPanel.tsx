"use client";

import Link from "next/link";
import type { Business } from "@/lib/supabase";
import {
  INDUSTRY_OPTIONS,
  type IndustryType,
} from "@/lib/themes";

type SettingsPanelProps = {
  business: Business;
  saving: boolean;
  handleSettingsSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  syncDatabase: (updatedFields: Partial<Business>) => Promise<void>;
  setMessage: (message: string) => void;
};

export default function SettingsPanel({
  business,
  saving,
  handleSettingsSubmit,
  syncDatabase,
  setMessage,
}: SettingsPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">

      <section className="rounded-3xl border border-zinc-800/60 bg-[#111115] p-7 shadow-sm">

        <h2 className="text-2xl font-bold text-white">
          Business Settings
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Update your public review page configuration.
        </p>

        <form
          onSubmit={handleSettingsSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Industry
            </label>

            <select
              name="industry_type"
              defaultValue={business.industry_type}
              className="w-full rounded-2xl border border-zinc-800/60 bg-[#18181b] text-white p-4 outline-none focus:border-amber-500 transition-colors"
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-[#111115]"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Manager WhatsApp
            </label>

            <input
              name="whatsapp"
              defaultValue={business.manager_whatsapp}
              className="w-full rounded-2xl border border-zinc-800/60 bg-[#18181b] text-white p-4 outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Google Review URL
            </label>

            <input
              name="google_url"
              defaultValue={business.google_review_url}
              className="w-full rounded-2xl border border-zinc-800/60 bg-[#18181b] text-white p-4 outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-2xl bg-amber-500 hover:bg-amber-400 py-4 font-semibold text-zinc-950 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>

        </form>

      </section>

      <section className="rounded-3xl border border-zinc-800/60 bg-[#111115] p-7 shadow-sm">

        <h2 className="text-2xl font-bold text-white">
          Public Review Page
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Enable or pause your customer review page.
        </p>

        <div className="mt-8 flex items-center justify-between rounded-2xl border border-zinc-800/60 p-5 bg-[#141414]">

          <div>

            <h3 className="font-semibold text-white">
              Status
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              {business.is_active
                ? "Customers can leave reviews."
                : "Your review page is currently paused."}
            </p>

          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                await syncDatabase({
                  is_active: !business.is_active,
                });

                setMessage("Status updated.");
              } catch (err) {
                setMessage(
                  err instanceof Error
                    ? err.message
                    : "Failed to update."
                );
              }
            }}
            className={`h-7 w-12 rounded-full p-1 transition ${
              business.is_active
                ? "bg-emerald-500"
                : "bg-zinc-700"
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-zinc-100 transition ${
                business.is_active
                  ? "translate-x-5"
                  : ""
              }`}
            />
          </button>

        </div>

        <Link
          href={`/review/${business.id}`}
          target="_blank"
          className="mt-8 inline-flex rounded-xl bg-zinc-900 border border-zinc-800/60 hover:bg-zinc-800 px-5 py-3 font-semibold text-white transition hover:border-zinc-700"
        >
          Preview Review Page
        </Link>

      </section>

    </div>
  );
}