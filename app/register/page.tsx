"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import MarketingShell, {
  MarketingCard,
  marketingButtonClass,
  marketingInputClass,
  marketingLinkClass,
} from "@/components/MarketingShell";
import { getReviewUrl } from "@/lib/site";

type RegisterResponse = {
  success: boolean;
  business_id: string;
  user_id: string;
  public_link: string;
  email_confirmation_required?: boolean;
};

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    business_name: "",
    industry_type: "salon",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegisterResponse | null>(null);
  const [downloading, setDownloading] = useState(false);

  const reviewUrl = useMemo(() => {
    if (!result?.business_id) return "";
    return result.public_link || getReviewUrl(result.business_id);
  }, [result]);

  const qrUrl = useMemo(() => {
    if (!reviewUrl) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=340x340&format=png&data=${encodeURIComponent(reviewUrl)}`;
  }, [reviewUrl]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to create account.");
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadQr() {
    if (!qrUrl || !result) return;
    setDownloading(true);
    try {
      const response = await fetch(qrUrl);
      if (!response.ok) {
        throw new Error("Failed to download QR code.");
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `${result.business_id}-qr.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to download QR code.");
    } finally {
      setDownloading(false);
    }
  }

  if (result) {
    const needsVerification = Boolean(result.email_confirmation_required);

    return (
      <MarketingShell maxWidth="md">
        <div className="flex min-h-[80dvh] items-center justify-center">
          <MarketingCard className="w-full text-center">
            {needsVerification ? (
              <div className="mb-6 rounded-2xl border border-[#1a5c4d]/20 bg-[#1a5c4d]/8 px-5 py-4 text-left">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a5c4d]">
                  Verify your email
                </p>
                <h2 className="mt-2 text-lg font-semibold text-[#1e1e24]">Check your inbox</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#1e1e24]/65">
                  We sent a verification link to <strong>{form.email}</strong>. Confirm your email
                  before signing in to your dashboard.
                </p>
              </div>
            ) : (
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1a5c4d]">
                Account created
              </p>
            )}

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1e1e24]">
              {needsVerification ? "Almost there" : "Your public page is ready"}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#1e1e24]/60">
              {needsVerification
                ? "Your review link is reserved. After verification, complete onboarding to launch your dashboard."
                : "Share this link or print the QR code for your counter."}
            </p>

            <div className="mt-5 rounded-xl border border-[#1e1e24]/10 bg-white/80 px-4 py-3 text-sm text-[#1e1e24]/75">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1e1e24]/45">
                Your review URL
              </p>
              <p className="mt-1 break-all font-medium">{reviewUrl}</p>
            </div>

            {qrUrl ? (
              <div className="mt-6 grid place-items-center gap-4">
                <img
                  src={qrUrl}
                  alt="QR code for business public page"
                  width={260}
                  height={260}
                  className="rounded-2xl border border-[#1e1e24]/10 bg-white p-2"
                />
                <button
                  type="button"
                  onClick={downloadQr}
                  disabled={downloading}
                  className={`w-full max-w-[260px] ${marketingButtonClass}`}
                >
                  {downloading ? "Downloading..." : "Download QR Code"}
                </button>
              </div>
            ) : null}

            {needsVerification ? (
              <Link href="/login" className={`mt-6 inline-block text-sm ${marketingLinkClass}`}>
                Go to sign in →
              </Link>
            ) : (
              <Link href="/onboarding" className={`mt-6 inline-block text-sm ${marketingLinkClass}`}>
                Complete business setup →
              </Link>
            )}
          </MarketingCard>
        </div>
      </MarketingShell>
    );
  }

  return (
    <MarketingShell maxWidth="md">
      <div className="flex min-h-[80dvh] items-center justify-center">
        <MarketingCard className="w-full">
          <div className="mb-8">
            <Link href="/" className="text-sm font-medium text-[#1e1e24]/50 transition hover:text-[#1e1e24]">
              ← Back to home
            </Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#1a5c4d]">
              Voucho
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1e1e24]">Create your account</h1>
            <p className="mt-2 text-sm text-[#1e1e24]/60">
              Sign up with your email and get your unique customer feedback link instantly.
            </p>
          </div>

          <form method="POST" onSubmit={onSubmit} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="you@business.com"
                className={marketingInputClass}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Password
              <input
                required
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                placeholder="At least 8 characters"
                className={marketingInputClass}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Business Name
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
              Industry Type
              <select
                required
                value={form.industry_type}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, industry_type: event.target.value }))
                }
                className={marketingInputClass}
              >
                <option value="salon">Salon & Spa</option>
                <option value="gym">Gym & Fitness</option>
                <option value="dining">Fine Dining</option>
                <option value="cafe">Cafe & Casual</option>
              </select>
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="mt-4 mb-6 flex items-start gap-3">
              <input
                required
                type="checkbox"
                id="legal-consent"
                className="mt-1 rounded border-[#EAEAE7] text-[#1A202C] focus:ring-[#1A202C]"
              />
              <label htmlFor="legal-consent" className="text-xs text-[#1A202C]/70">
                By signing up, you agree to our{' '}
                <Link href="/privacy-policy" className="underline hover:text-[#1A202C]">Privacy Policy</Link>{' '}
                and{' '}
                <Link href="/terms-of-service" className="underline hover:text-[#1A202C]">Terms of Service</Link>.
              </label>
            </div>

            <button type="submit" disabled={loading} className={`mt-2 ${marketingButtonClass}`}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#1e1e24]/50">
            Already have an account?{" "}
            <Link href="/login" className={marketingLinkClass}>
              Sign in
            </Link>
          </p>
        </MarketingCard>
      </div>
    </MarketingShell>
  );
}
