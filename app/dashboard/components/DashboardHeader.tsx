"use client";

import type { Business } from "@/lib/supabase";

type DashboardHeaderProps = {
  business: Business;
};

export default function DashboardHeader({
  business,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white tracking-tight">
          {business?.name || "My Business"}
        </h1>
        {business?.branch_name && (
          <p className="text-sm text-zinc-400">{business.branch_name}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>
    </div>
  );
}