"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

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
        if (user?.email) {
          setEmail(user.email);
        }
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
      setMessage({
        text: "Password reset link has been sent to your email.",
        type: "success",
      });
    } catch (err: any) {
      setMessage({
        text: err.message || "Failed to send password reset link.",
        type: "error",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2 animate-in fade-in duration-300">
      {/* Account Details Panel */}
      <section className="rounded-3xl border border-zinc-800/60 bg-[#111115] p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Profile Settings
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white">
          Account Settings
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Manage your account credentials and security settings.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
              Owner Email Address
            </label>
            <input
              type="email"
              readOnly
              value={loading ? "Loading..." : email}
              className="w-full rounded-2xl border border-zinc-800/60 bg-[#18181b] p-4 text-zinc-300 outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handlePasswordReset}
              disabled={resetLoading || loading}
              className="w-full rounded-2xl bg-zinc-900 border border-zinc-800/60 hover:bg-zinc-800 py-4 font-semibold text-white transition hover:border-zinc-700 disabled:opacity-60"
            >
              {resetLoading ? "Sending Link..." : "🔑 Reset Password"}
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 p-4 rounded-xl text-sm border ${
                message.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </section>

      {/* Subscription Details Panel */}
      <section className="rounded-3xl border border-zinc-800/60 bg-[#111115] p-7 shadow-sm flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Billing
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Subscription Details
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            View your plan, billing cycle, and subscription status.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-zinc-800/60">
              <span className="text-zinc-400 text-sm">Current Plan</span>
              <span className="text-amber-500 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs">
                PRO PLAN
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-zinc-800/60">
              <span className="text-zinc-400 text-sm">Status</span>
              <span className="text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs">
                Active
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-zinc-800/60">
              <span className="text-zinc-400 text-sm">Billing Cycle</span>
              <span className="text-zinc-200 text-sm font-medium">Monthly</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-2xl bg-[#141414] border border-zinc-800/60 p-5 text-center">
            <p className="text-xs text-zinc-400">
              Need to cancel or update payment method? Contact us at support@voucho.app
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
