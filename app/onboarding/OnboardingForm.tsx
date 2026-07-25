"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useMemo } from "react";
import { INDUSTRY_OPTIONS, type IndustryType } from "@/lib/themes";
import MarketingShell, {
  MarketingCard,
  marketingButtonClass,
  marketingInputClass,
  marketingLinkClass,
} from "@/components/MarketingShell";
import { supabase } from "@/lib/supabase";

type OnboardingFormProps = {
  existingBusinessId: string | null;
};

export default function OnboardingForm({ existingBusinessId }: OnboardingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    business_name: "",
    branch_name: "Main Branch",
    industry_type: "salon" as IndustryType,
    google_review_url: "",
    whatsapp_number: "", // 10 digits starting with 3
  });

  const totalSteps = 3;

  const manager_whatsapp = useMemo(() => {
    if (!form.whatsapp_number) return "";
    return `92${form.whatsapp_number}`;
  }, [form.whatsapp_number]);

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
          manager_whatsapp,
          existing_business_id: existingBusinessId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to save your business profile.");
      }

      await supabase.auth.refreshSession().catch(console.error);
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MarketingShell maxWidth="lg" className="bg-slate-50">
      <div className="flex min-h-[80dvh] items-center justify-center py-12 px-4">
        <MarketingCard className="w-full max-w-xl bg-white border border-slate-200 shadow-xl overflow-hidden p-0">
          {/* Progress Header */}
          <div className="bg-slate-50 border-b border-slate-100 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 mb-1">
                  Step {step} of {totalSteps}
                </p>
                <h1 className="text-xl font-bold text-slate-900">
                  {step === 1 && "Business Profile"}
                  {step === 2 && "Public Review Page"}
                  {step === 3 && "Contact Details"}
                </h1>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                      s <= step ? "bg-teal-500" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-500">
              {step === 1 && "Tell us the basics of your business establishment."}
              {step === 2 && "Connect your Google Maps review link to start growing your rating."}
              {step === 3 && "Where should we send private feedback from customers?"}
            </p>
          </div>

          <div className="p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step < totalSteps) setStep(step + 1);
                else onSubmit(e);
              }}
              className="grid gap-6"
            >
              {step === 1 && (
                <div className="grid gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Business Name
                    <input
                      required
                      autoFocus
                      value={form.business_name}
                      onChange={(e) => setForm((p) => ({ ...p, business_name: e.target.value }))}
                      placeholder="e.g., Voucho Cafe"
                      className={marketingInputClass}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Industry Category
                    <select
                      required
                      value={form.industry_type}
                      onChange={(e) => setForm((p) => ({ ...p, industry_type: e.target.value as IndustryType }))}
                      className={marketingInputClass}
                    >
                      {INDUSTRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Branch / Location Name
                    <input
                      required
                      value={form.branch_name}
                      onChange={(e) => setForm((p) => ({ ...p, branch_name: e.target.value }))}
                      placeholder="e.g., Main Branch, Gulberg"
                      className={marketingInputClass}
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Google Maps Review Link
                    <input
                      required
                      type="url"
                      autoFocus
                      value={form.google_review_url}
                      onChange={(e) => setForm((p) => ({ ...p, google_review_url: e.target.value }))}
                      placeholder="https://g.page/r/your-id/review"
                      className={marketingInputClass}
                    />
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                      Copy your "Request reviews" link from your Google Business Profile manager.
                    </p>
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    WhatsApp Number for Private Feedback
                    <div className="flex">
                      <div className="flex items-center justify-center px-4 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-600 font-bold text-sm">
                        +92
                      </div>
                      <input
                        required
                        autoFocus
                        type="tel"
                        pattern="3\d{9}"
                        maxLength={10}
                        value={form.whatsapp_number}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length <= 10) setForm((p) => ({ ...p, whatsapp_number: val }));
                        }}
                        placeholder="3001234567"
                        className={`${marketingInputClass} rounded-l-none`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                      When customers have a negative experience, they can send private WhatsApp messages here instead of public reviews.
                    </p>
                  </label>
                </div>
              )}

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-4 py-3.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-[2] flex items-center justify-center gap-2 ${marketingButtonClass}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    step === totalSteps ? "Finish & Launch Dashboard" : "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-slate-50 border-t border-slate-100 px-8 py-4">
            <p className="text-center text-xs text-slate-500">
              Need help? <Link href="mailto:support@voucho.com" className="text-teal-600 font-semibold hover:underline">Contact Support</Link>
            </p>
          </div>
        </MarketingCard>
      </div>
    </MarketingShell>
  );
}
