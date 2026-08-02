"use client";

import { Scan, Star, TrendingUp, MousePointerClick, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatsCardsProps {
  business?: any;
  scanLogs?: any[];
}

type StatCardProps = {
  label: string;
  value: string | number;
  todayLine: string;
  trend?: string;
  trendDir?: "up" | "down" | "flat" | "none";
  icon: React.ReactNode;
  iconBg: string;
  glowColor: string;
};

// ─── Trend computation helpers ────────────────────────────────────────────────

function getMidnight(offsetDays = 0): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - offsetDays);
  return d;
}

function pctChange(today: number, yesterday: number): string | undefined {
  if (today === 0 && yesterday === 0) return undefined;
  if (yesterday === 0) return today > 0 ? "+100%" : undefined;
  const pct = Math.round(((today - yesterday) / yesterday) * 100);
  if (pct === 0) return "Same as yesterday";
  return pct > 0 ? `+${pct}% vs yesterday` : `${pct}% vs yesterday`;
}

function trendDir(today: number, yesterday: number): "up" | "down" | "flat" | "none" {
  if (today === 0 && yesterday === 0) return "none";
  if (today > yesterday) return "up";
  if (today < yesterday) return "down";
  return "flat";
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function TrendBadge({ dir, text }: { dir: StatCardProps["trendDir"]; text?: string }) {
  if (!text || dir === "none") return null;

  const cls =
    dir === "up"
      ? "bg-emerald-500/10 text-emerald-400"
      : dir === "down"
      ? "bg-red-500/10 text-red-400"
      : "bg-zinc-800 text-zinc-500";

  const Icon =
    dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : Minus;

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${cls}`}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
      {text}
    </span>
  );
}

function StatCard({ label, value, todayLine, trend, trendDir, icon, iconBg, glowColor }: StatCardProps) {
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

      {/* Value + trend */}
      <div>
        <div className="text-[2rem] font-bold text-white font-mono tabular-nums leading-none tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <TrendBadge dir={trendDir} text={trend} />
          <span className="text-[11px] text-zinc-600">{todayLine}</span>
        </div>
      </div>
    </div>
  );
}

// ─── StatsCards ───────────────────────────────────────────────────────────────

export default function StatsCards({ business, scanLogs = [] }: StatsCardsProps) {
  // ── Base metrics from business object ──
  const totalScans  = business?.total_scans  ?? 0;
  const avgRating   = business?.avg_rating   ?? business?.average_rating ?? "0.0";
  const conversion  = business?.conversion_rate ?? business?.conversion ?? 0;

  // ── Date boundaries ──
  const todayMidnight     = getMidnight(0);
  const yesterdayMidnight = getMidnight(1);

  // ── Partition scan logs ──
  const todayLogs = scanLogs.filter(
    (l) => new Date(l.scanned_at) >= todayMidnight
  );
  const yesterdayLogs = scanLogs.filter((l) => {
    const d = new Date(l.scanned_at);
    return d >= yesterdayMidnight && d < todayMidnight;
  });

  // ── Today counts ──
  const todayScans    = todayLogs.length;
  const yesterdayScansCount = yesterdayLogs.length;

  const todayClicks = todayLogs.filter(
    (l) => l.action_type === "review_click" || l.action_type === "manager_click"
  ).length;
  const yesterdayClicks = yesterdayLogs.filter(
    (l) => l.action_type === "review_click" || l.action_type === "manager_click"
  ).length;

  // ── Today conversion rate (google clicks / page views) ──
  const todayPageViews = todayLogs.filter((l) => l.action_type === "page_view").length;
  const todayGoogleClicks = todayLogs.filter((l) => l.action_type === "review_click").length;
  const todayConversionPct =
    todayPageViews > 0 ? Math.round((todayGoogleClicks / todayPageViews) * 100) : null;

  // ── Scan trend ──
  const scanTrendText = pctChange(todayScans, yesterdayScansCount);
  const scanTrendDir  = trendDir(todayScans, yesterdayScansCount);
  const scanTodayLine =
    todayScans === 0 ? "No scans today" : `+${todayScans} scan${todayScans !== 1 ? "s" : ""} today`;

  // ── Clicks trend ──
  const clicksTrendText = pctChange(todayClicks, yesterdayClicks);
  const clicksTrendDir  = trendDir(todayClicks, yesterdayClicks);
  const clicksTodayLine =
    todayClicks === 0 ? "No clicks today" : `+${todayClicks} click${todayClicks !== 1 ? "s" : ""} today`;

  const stats: StatCardProps[] = [
    {
      label: "Total Scans",
      value: totalScans,
      todayLine: scanTodayLine,
      trend: scanTrendText,
      trendDir: scanTrendDir,
      icon: <Scan className="h-4 w-4" strokeWidth={1.75} />,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glowColor: "bg-blue-500",
    },
    {
      label: "Average Rating",
      value: `${avgRating} ★`,
      todayLine: "All-time average",
      trend: undefined,
      trendDir: "none",
      icon: <Star className="h-4 w-4 fill-amber-400/30" strokeWidth={1.75} />,
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glowColor: "bg-amber-500",
    },
    {
      label: "Conversion",
      value: `${conversion}%`,
      todayLine:
        todayConversionPct !== null
          ? `${todayConversionPct}% today`
          : "No data today",
      trend: undefined,
      trendDir: "none",
      icon: <TrendingUp className="h-4 w-4" strokeWidth={1.75} />,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glowColor: "bg-emerald-500",
    },
    {
      label: "Direct Clicks",
      value: (business?.google_clicks || 0) + (business?.whatsapp_clicks || 0),
      todayLine: clicksTodayLine,
      trend: clicksTrendText,
      trendDir: clicksTrendDir,
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