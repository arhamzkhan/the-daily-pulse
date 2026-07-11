"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { INDUSTRY_OPTIONS, type IndustryType } from "@/lib/themes";

type OnboardingFormProps = {
  existingBusinessId: string | null;
};

export default function OnboardingForm({ existingBusinessId }: OnboardingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    business_name: "",
    branch_name: "Main Branch",
    industry_type: "retail" as IndustryType,
    google_review_url: "https://www.google.com/maps",
    manager_whatsapp: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          existing_business_id: existingBusinessId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to save your business profile.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#09090b] px-4 py-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#18181b_0%,#09090b_70%)]" />

      <section className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-[#111115] p-8 shadow-2xl shadow-black/40">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
            Business setup
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Tell us about your business
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            We will tailor your dashboard and public review page to your industry.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <label className="grid gap-2 text-sm text-zinc-300">
            Business name
            <input
              required
              value={form.business_name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, business_name: event.target.value }))
              }
              placeholder="e.g., Slotly Salon"
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Branch / location
            <input
              required
              value={form.branch_name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, branch_name: event.target.value }))
              }
              placeholder="e.g., Gulberg, Lahore"
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            What type of business do you run?
            <select
              required
              value={form.industry_type}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  industry_type: event.target.value as IndustryType,
                }))
              }
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Google review URL
            <input
              required
              type="url"
              value={form.google_review_url}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, google_review_url: event.target.value }))
              }
              placeholder="https://g.page/your-business/review"
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Manager WhatsApp (92XXXXXXXXXX)
            <input
              required
              pattern="92\d{10}"
              value={form.manager_whatsapp}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, manager_whatsapp: event.target.value }))
              }
              placeholder="923001234567"
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-[#09090b] transition active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Saving..." : "Launch my dashboard"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already set up?{" "}
          <Link href="/dashboard" className="font-medium text-emerald-400 hover:text-emerald-300">
            Go to dashboard
          </Link>
        </p>
      </section>
    </main>
  );
}
