"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { loginAction } from "@/lib/auth-actions";
import MarketingShell, {
  MarketingCard,
  marketingButtonClass,
  marketingInputClass,
  marketingLinkClass,
} from "@/components/MarketingShell";

function ForgotPasswordModal({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) {
  const [resetEmail, setResetEmail] = useState(email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/login?reset=1`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        resetEmail.trim().toLowerCase(),
        { redirectTo }
      );

      if (resetError) {
        throw new Error(resetError.message);
      }

      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e1e24]/30 px-4 backdrop-blur-sm">
      <MarketingCard className="relative w-full max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-sm text-[#1e1e24]/45 hover:text-[#1e1e24]"
          aria-label="Close"
        >
          ✕
        </button>

        {sent ? (
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a5c4d]">Email sent</p>
            <h2 className="mt-2 text-xl font-semibold text-[#1e1e24]">Check your inbox</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#1e1e24]/60">
              We sent a password reset link to <strong>{resetEmail}</strong>. Follow the link to set a new password.
            </p>
            <button type="button" onClick={onClose} className={`mt-6 w-full ${marketingButtonClass}`}>
              Back to sign in
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a5c4d]">Reset password</p>
            <h2 className="mt-2 text-xl font-semibold text-[#1e1e24]">Forgot your password?</h2>
            <p className="mt-2 text-sm text-[#1e1e24]/60">
              Enter your account email and we will send you a secure reset link.
            </p>

            <form method="POST" onSubmit={onSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-[#1e1e24]/75">
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={resetEmail}
                  onChange={(event) => setResetEmail(event.target.value)}
                  className={marketingInputClass}
                />
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button type="submit" disabled={loading} className={marketingButtonClass}>
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        )}
      </MarketingCard>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";
  const verified = searchParams.get("verified") === "1";
  const reset = searchParams.get("reset") === "1";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  async function clientAction(formData: FormData) {
    setError("");
    setLoading(true);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
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
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1e1e24]">Welcome back</h1>
            <p className="mt-2 text-sm text-[#1e1e24]/60">Sign in to manage your business dashboard.</p>
          </div>

          {verified ? (
            <div className="mb-6 rounded-2xl border border-[#1a5c4d]/20 bg-[#1a5c4d]/8 px-4 py-3 text-sm text-[#1a5c4d]">
              Email verified successfully. You can now sign in.
            </div>
          ) : null}

          {reset ? (
            <div className="mb-6 rounded-2xl border border-[#1a5c4d]/20 bg-[#1a5c4d]/8 px-4 py-3 text-sm text-[#1a5c4d]">
              Password updated. Sign in with your new credentials.
            </div>
          ) : null}

          <form action={clientAction} className="grid gap-4">
            <input type="hidden" name="next" value={nextPath} />
            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="you@business.com"
                className={marketingInputClass}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#1e1e24]/75">
              <span className="flex items-center justify-between">
                Password
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs font-medium text-[#1a5c4d] hover:text-[#134539]"
                >
                  Forgot password?
                </button>
              </span>
              <input
                required
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                placeholder="Your password"
                className={marketingInputClass}
              />
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button type="submit" disabled={loading} className={`mt-2 ${marketingButtonClass}`}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#1e1e24]/50">
            New here?{" "}
            <Link href="/register" className={marketingLinkClass}>
              Create an account
            </Link>
          </p>
        </MarketingCard>
      </div>

      {showForgot ? (
        <ForgotPasswordModal email={form.email} onClose={() => setShowForgot(false)} />
      ) : null}
    </MarketingShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-[#fdfbf7] text-[#1e1e24]/50">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
