"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { INDUSTRY_OPTIONS, type IndustryType } from "@/lib/themes";
import MarketingShell, {
  MarketingCard,
  marketingButtonClass,
  marketingInputClass,
  marketingLinkClass,
} from "@/components/MarketingShell";

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
    google_review_url: "",
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
    <MarketingShell maxWidth="lg">
      <div className="flex min-h-[80dvh] items-center justify-center">
        <MarketingCard className="w-full">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a5c4d]">
              Business setup
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1e1e24]">
              Tell us about your business
            </h1>
            <p className="mt-2 text-sm text-[#1e1e24]/60">
              We will tailor your dashboard and public review page to your industry.
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Business name
              <input
                required
                value={form.business_name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, business_name: event.target.value }))
                }
                placeholder="e.g., Slotly Salon"
                className={marketingInputClass}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Branch / location
              <input
                required
                value={form.branch_name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, branch_name: event.target.value }))
                }
                placeholder="e.g., Gulberg, Lahore"
                className={marketingInputClass}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
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
                className={marketingInputClass}
              >
                {INDUSTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Google review URL
              <input
                required
                type="url"
                value={form.google_review_url}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, google_review_url: event.target.value }))
                }
                placeholder="https://g.page/your-business/review"
                className={marketingInputClass}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Manager WhatsApp (92XXXXXXXXXX)
              <input
                required
                pattern="92\d{10}"
                value={form.manager_whatsapp}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, manager_whatsapp: event.target.value }))
                }
                placeholder="923001234567"
                className={marketingInputClass}
              />
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button type="submit" disabled={loading} className={`mt-2 ${marketingButtonClass}`}>
              {loading ? "Saving..." : "Launch my dashboard"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#1e1e24]/50">
            Already set up?{" "}
            <Link href="/dashboard" className={marketingLinkClass}>
              Go to dashboard
            </Link>
          </p>
        </MarketingCard>
      </div>
    </MarketingShell>
  );
}
