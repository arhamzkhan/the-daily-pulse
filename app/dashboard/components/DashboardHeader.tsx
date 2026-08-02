"use client";

import { useState, useEffect } from "react";
import { MapPin, Bell, ExternalLink, RefreshCw, Sun, Moon } from "lucide-react";
import type { Business } from "@/lib/supabase";

type DashboardHeaderProps = {
  business: Business;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export default function DashboardHeader({
  business,
  theme,
  toggleTheme,
}: DashboardHeaderProps) {
  // ── Ticking clock — updates every 60s, never goes stale ──
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Set on client to avoid hydration mismatch
    setNow(new Date());

    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    : "--:-- --";

  const dateStr = now
    ? now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    : "";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Identity */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-600">
              Dashboard
            </p>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
              LIVE
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            {business?.name || "My Business"}
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin className="h-3 w-3 text-slate-400 dark:text-zinc-600 shrink-0" strokeWidth={1.75} />
            <p className="text-xs text-slate-500 dark:text-zinc-500">
              {business?.branch_name ? business.branch_name : "Main Branch"}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Live Clock + Actions */}
      <div className="flex items-center gap-3">
        {/* Live clock */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300 font-mono tabular-nums tracking-wide">
            {timeStr}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-600">{dateStr}</span>
        </div>

        <div className="w-px h-8 bg-slate-200 dark:bg-zinc-800/80 hidden md:block" />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-slate-100 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-200 hover:border-slate-300 dark:hover:border-zinc-700/80 transition-all duration-200"
        >
          {theme === "light" ? (
            <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />
          ) : (
            <Sun className="h-3.5 w-3.5" strokeWidth={1.75} />
          )}
        </button>

        {/* Notification button */}
        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-slate-100 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-200 hover:border-slate-300 dark:hover:border-zinc-700/80 transition-all duration-200"
        >
          <Bell className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
        </button>

        {/* Refresh */}
        <button
          aria-label="Refresh page"
          onClick={() => window.location.reload()}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-slate-100 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-200 hover:border-slate-300 dark:hover:border-zinc-700/80 transition-all duration-200"
        >
          <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>

        {/* Preview review page */}
        {business?.id && (
          <a
            href={`/review/${business.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-zinc-800/80 bg-slate-100 dark:bg-zinc-900/50 text-xs font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 hover:dark:text-white hover:border-slate-300 dark:hover:border-zinc-700/80 hover:bg-slate-200/60 dark:hover:bg-zinc-800/60 transition-all duration-200"
          >
            <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
            Preview Page
          </a>
        )}
      </div>
    </div>
  );
}