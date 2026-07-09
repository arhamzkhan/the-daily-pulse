"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

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
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegisterResponse | null>(null);
  const [downloading, setDownloading] = useState(false);

  const qrUrl = useMemo(() => {
    if (!result?.public_link) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=340x340&format=png&data=${encodeURIComponent(result.public_link)}`;
  }, [result?.public_link]);

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
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
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
    } catch (err: any) {
      setError(err?.message || "Unable to download QR code.");
    } finally {
      setDownloading(false);
    }
  }

  if (result) {
    return (
      <main className="min-h-[100dvh] bg-[#09090b] flex items-center justify-center px-4 py-8">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#18181b_0%,#09090b_70%)]" />
        <section className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/40">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-400">
            Account created
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Your public page is ready
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {result.email_confirmation_required
              ? "Check your inbox to confirm your email, then share your link below."
              : "Share this link or print the QR code for your counter."}
          </p>

          <a
            href={result.public_link}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block break-all rounded-xl border border-white/10 bg-[#111115] px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/[0.06]"
          >
            {result.public_link}
          </a>

          {qrUrl ? (
            <div className="mt-6 grid place-items-center gap-4">
              <img
                src={qrUrl}
                alt="QR code for business public page"
                width={260}
                height={260}
                className="rounded-2xl border border-white/10 bg-white p-2"
              />
              <button
                type="button"
                onClick={downloadQr}
                disabled={downloading}
                className="w-full max-w-[260px] rounded-xl bg-white py-3 text-sm font-semibold text-[#09090b] transition active:scale-[0.98] disabled:opacity-70"
              >
                {downloading ? "Downloading..." : "Download QR Code"}
              </button>
            </div>
          ) : null}

          <Link
            href="/admin"
            className="mt-6 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Go to dashboard →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#09090b] flex items-center justify-center px-4 py-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#18181b_0%,#09090b_70%)]" />

      <section className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/40">
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-zinc-500 transition hover:text-zinc-300">
            ← Back to home
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
            The Daily Pulse
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Create your account</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign up with your email and get your unique customer feedback link instantly.
          </p>
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
              autoComplete="new-password"
              minLength={8}
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="At least 8 characters"
              className="rounded-xl border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>

          <label className="grid gap-2 text-sm text-zinc-300">
            Business Name
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

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-[#09090b] transition active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </section>
    </main>
  );
}
