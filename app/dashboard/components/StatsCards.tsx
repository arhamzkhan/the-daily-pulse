"use client";

import { Scan, Star, TrendingUp, MousePointerClick } from "lucide-react";

interface StatsCardsProps {
  business?: any;
}

export default function StatsCards({ business }: StatsCardsProps) {
  // Safely parse values with explicit fallbacks
  const totalScans = business?.total_scans ?? 0;
  const avgRating = business?.avg_rating ?? business?.average_rating ?? "0.0";
  const conversion = business?.conversion_rate ?? business?.conversion ?? 0;
  const directClicks =
    (business?.google_clicks || 0) + (business?.whatsapp_clicks || 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Scans */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Total Scans
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Scan className="h-4.5 w-4.5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white font-mono">{totalScans}</div>
          <span className="text-[11px] text-zinc-500 mt-1 block">+0 today</span>
        </div>
      </div>

      {/* Average Rating */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Average Rating
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Star className="h-4.5 w-4.5 fill-amber-400/20" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white font-mono flex items-center gap-1">
            {avgRating} <span className="text-amber-400 text-xl">★</span>
          </div>
          <span className="text-[11px] text-zinc-500 mt-1 block">100% positive trend</span>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Conversion
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white font-mono">{conversion}%</div>
          <span className="text-[11px] text-zinc-500 mt-1 block">Stable this week</span>
        </div>
      </div>

      {/* Direct Clicks */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Direct Clicks
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <MousePointerClick className="h-4.5 w-4.5" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white font-mono">{directClicks}</div>
          <span className="text-[11px] text-zinc-500 mt-1 block">+0 clicks today</span>
        </div>
      </div>
    </div>
  );
}