"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      router.push(nextPath);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#09090b] px-4 py-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#18181b_0%,#09090b_70%)]" />

      <section className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#111115] p-8 shadow-2xl shadow-black/40">
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-zinc-500 transition hover:text-zinc-300">
            ← Back to home
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
            The Daily Pulse
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-400">Sign in to manage your business dashboard.</p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <label className="grid gap-2 text-sm text-zinc-300">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@business.com"
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="Your password"
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-[#09090b] transition active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          New here?{" "}
          <Link href="/register" className="font-medium text-emerald-400 hover:text-emerald-300">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-[#09090b] text-zinc-400">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
