"use client";

import { Scan, Star, TrendingUp, MousePointerClick, ArrowUpRight } from "lucide-react";

interface StatsCardsProps {
  business?: any;
}

type StatCardProps = {
  label: string;
  value: string | number;
  subtext: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  iconBg: string;
  glowColor: string;
};

function StatCard({ label, value, subtext, trend, trendUp, icon, iconBg, glowColor }: StatCardProps) {
  return (
    <div className="group relative p-5 rounded-2xl bg-[#121215] border border-zinc-800/80 flex flex-col justify-between gap-4 hover:border-zinc-700/80 hover:translate-y-[-1px] transition-all duration-200 overflow-hidden">
      {/* Ambient glow */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl opacity-[0.07] ${glowColor}`} />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
          {label}
        </p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${iconBg} shrink-0`}>
          {icon}
        </div>
      </div>

      {/* Value */}
      <div>
        <div className="text-[2rem] font-bold text-white font-mono tabular-nums leading-none tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {trend && (
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${trendUp ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-500"}`}>
              {trendUp && <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2.5} />}
              {trend}
            </span>
          )}
          <span className="text-[11px] text-zinc-600">{subtext}</span>
        </div>
      </div>
    </div>
  );
}

export default function StatsCards({ business }: StatsCardsProps) {
  const totalScans = business?.total_scans ?? 0;
  const avgRating = business?.avg_rating ?? business?.average_rating ?? "0.0";
  const conversion = business?.conversion_rate ?? business?.conversion ?? 0;
  const directClicks =
    (business?.google_clicks || 0) + (business?.whatsapp_clicks || 0);

  const stats: StatCardProps[] = [
    {
      label: "Total Scans",
      value: totalScans,
      subtext: "+0 today",
      trend: "+18% vs yesterday",
      trendUp: true,
      icon: <Scan className="h-4 w-4" strokeWidth={1.75} />,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glowColor: "bg-blue-500",
    },
    {
      label: "Average Rating",
      value: `${avgRating} ★`,
      subtext: "100% positive",
      trend: "Excellent",
      trendUp: true,
      icon: <Star className="h-4 w-4 fill-amber-400/30" strokeWidth={1.75} />,
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glowColor: "bg-amber-500",
    },
    {
      label: "Conversion",
      value: `${conversion}%`,
      subtext: "Stable this week",
      trend: undefined,
      icon: <TrendingUp className="h-4 w-4" strokeWidth={1.75} />,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glowColor: "bg-emerald-500",
    },
    {
      label: "Direct Clicks",
      value: directClicks,
      subtext: "+0 clicks today",
      trend: undefined,
      icon: <MousePointerClick className="h-4 w-4" strokeWidth={1.75} />,
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      glowColor: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}