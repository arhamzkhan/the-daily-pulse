"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { User, Shield, CreditCard, Mail, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

export default function AccountPanel() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [resetLoading, setResetLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) setEmail(user.email);
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [supabase]);

  const handlePasswordReset = async () => {
    if (!email) return;
    setResetLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
      });
      if (error) throw error;
      setMessage({ text: "Password reset link has been sent to your email.", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to send password reset link.", type: "error" });
    } finally {
      setResetLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-sm p-3.5 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-600";

  return (
    <div className="grid gap-6 xl:grid-cols-2 animate-in fade-in duration-300">

      {/* Account Details */}
      <section className="rounded-2xl border border-zinc-800/80 bg-[#121215] p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-[0.04] bg-blue-500" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
              <User className="h-3.5 w-3.5 text-blue-400" strokeWidth={1.75} />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Profile Settings
            </p>
          </div>

          <h2 className="mt-3 text-xl font-bold text-white tracking-tight">Account Settings</h2>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            Manage your account credentials and security settings.
          </p>

          <div className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
                <Mail className="h-3 w-3" strokeWidth={1.75} />
                Owner Email Address
              </label>
              <input
                type="email"
                readOnly
                value={loading ? "Loading..." : email}
                className={`${inputClass} text-zinc-400 cursor-default`}
              />
            </div>

            {/* Security */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">
                <Shield className="h-3 w-3" strokeWidth={1.75} />
                Security
              </label>
              <button
                onClick={handlePasswordReset}
                disabled={resetLoading || loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/60 hover:border-zinc-700/80 py-3.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <KeyRound className="h-4 w-4 text-zinc-400" strokeWidth={1.75} />
                {resetLoading ? "Sending Link..." : "Reset Password"}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm ${
                  message.type === "success"
                    ? "bg-emerald-500/[0.06] text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/[0.06] text-red-400 border-red-500/20"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.75} />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.75} />
                )}
                <span className="text-xs leading-relaxed">{message.text}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="rounded-2xl border border-zinc-800/80 bg-[#121215] p-6 flex flex-col relative overflow-hidden">
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-[0.04] bg-amber-500" />

        <div className="relative flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
              <CreditCard className="h-3.5 w-3.5 text-amber-400" strokeWidth={1.75} />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Billing
            </p>
          </div>

          <h2 className="mt-3 text-xl font-bold text-white tracking-tight">Subscription Details</h2>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            View your plan, billing cycle, and subscription status.
          </p>

          <div className="mt-6 space-y-0 rounded-xl border border-zinc-800/80 overflow-hidden">
            {[
              {
                label: "Current Plan",
                value: (
                  <span className="text-amber-400 font-bold text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 tracking-wider uppercase">
                    Pro Plan
                  </span>
                ),
              },
              {
                label: "Status",
                value: (
                  <span className="text-emerald-400 font-semibold text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                ),
              },
              {
                label: "Billing Cycle",
                value: <span className="text-zinc-300 text-sm font-medium">Monthly</span>,
              },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  i < arr.length - 1 ? "border-b border-zinc-800/80" : ""
                } bg-zinc-900/20`}
              >
                <span className="text-xs text-zinc-500 font-medium">{row.label}</span>
                {row.value}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/80 p-4 text-center">
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Need to cancel or update payment method?{" "}
                <a
                  href="mailto:support@voucho.app"
                  className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
                >
                  support@voucho.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
