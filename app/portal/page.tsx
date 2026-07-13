"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

export default function PortalLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAction(username, password);
      if (res.success) {
        router.push("/portal/dashboard");
      } else {
        setError(res.error || "Login failed");
        setLoading(false);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 font-sans antialiased text-slate-900">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/65 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Security Gateway
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Administrative Operations Gateway
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Authorized personnel only. Sessions are audited.
          </p>
        </header>

        {error && (
          <div className="mb-5 p-3 rounded-lg border border-red-200 bg-red-50 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm font-medium">
          <div>
            <label htmlFor="username" className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-950 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-950 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-950 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 transition active:scale-[0.98] disabled:opacity-70 mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying Credentials...
              </>
            ) : (
              "Sign In to Operations"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
