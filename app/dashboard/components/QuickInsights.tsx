"use client";

import { CheckCircle2, Zap, AlertTriangle } from "lucide-react";

interface QuickInsightsProps {
  business?: any;
  scanLogs?: any[];
}

export default function QuickInsights({ business, scanLogs = [] }: QuickInsightsProps) {
  const googleClicks = business?.google_clicks || 0;
  const whatsappClicks = business?.whatsapp_clicks || 0;
  const total = googleClicks + whatsappClicks;

  const googlePct = total > 0 ? Math.round((googleClicks / total) * 100) : 0;
  const whatsappPct = total > 0 ? Math.round((whatsappClicks / total) * 100) : 0;

  // Donut chart dimensions
  const r = 44;
  const cx = 56;
  const cy = 56;
  const circ = 2 * Math.PI * r;
  const googleDash = (googlePct / 100) * circ;
  const whatsappDash = (whatsappPct / 100) * circ;
  const gap = 3;

  const insights = [
    {
      icon: CheckCircle2,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10 border-emerald-500/20",
      text: "80% conversion to Google Reviews this week",
    },
    {
      icon: Zap,
      iconClass: "text-amber-400",
      bgClass: "bg-amber-500/10 border-amber-500/20",
      text: "Peak activity observed during afternoon hours",
    },
    {
      icon: AlertTriangle,
      iconClass: "text-blue-400",
      bgClass: "bg-blue-500/10 border-blue-500/20",
      text: "Private feedback rate within healthy range",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Action Distribution — Donut + Bars */}
      <div className="group p-5 rounded-2xl bg-[#121215] border border-zinc-800/80 hover:border-zinc-700/80 hover:translate-y-[-1px] transition-all duration-200">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-5">
          Action Distribution
        </p>

        <div className="flex items-center gap-6">
          {/* Donut SVG */}
          <div className="shrink-0 relative">
            <svg width={112} height={112} viewBox="0 0 112 112">
              {/* Background track */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#27272a"
                strokeWidth={10}
              />
              {/* Google slice */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={10}
                strokeDasharray={`${Math.max(0, googleDash - gap)} ${circ - Math.max(0, googleDash - gap)}`}
                strokeDashoffset={circ / 4}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              {/* Whatsapp slice */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#52525b"
                strokeWidth={10}
                strokeDasharray={`${Math.max(0, whatsappDash - gap)} ${circ - Math.max(0, whatsappDash - gap)}`}
                strokeDashoffset={circ / 4 - googleDash}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              {/* Center label */}
              <text
                x={cx}
                y={cy - 5}
                textAnchor="middle"
                className="fill-white"
                style={{ fontSize: 16, fontWeight: 700, fontFamily: "monospace" }}
              >
                {total}
              </text>
              <text
                x={cx}
                y={cy + 12}
                textAnchor="middle"
                className="fill-zinc-600"
                style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1 }}
              >
                TOTAL
              </text>
            </svg>
          </div>

          {/* Legend + bars */}
          <div className="flex-1 space-y-4">
            {/* Google */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]" />
                  <span className="text-xs text-zinc-400 font-medium">Google Reviews</span>
                </div>
                <span className="text-xs text-zinc-300 font-mono font-semibold">{googleClicks}</span>
              </div>
              <div className="w-full bg-zinc-800/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${googlePct}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-600 mt-0.5 block">{googlePct}% of total</span>
            </div>

            {/* Private */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  <span className="text-xs text-zinc-400 font-medium">Private Feedback</span>
                </div>
                <span className="text-xs text-zinc-300 font-mono font-semibold">{whatsappClicks}</span>
              </div>
              <div className="w-full bg-zinc-800/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-zinc-500 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${whatsappPct}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-600 mt-0.5 block">{whatsappPct}% of total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights — Callout Cards */}
      <div className="group p-5 rounded-2xl bg-[#121215] border border-zinc-800/80 hover:border-zinc-700/80 hover:translate-y-[-1px] transition-all duration-200">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-4">
          Quick Insights
        </p>

        <div className="space-y-2.5">
          {insights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl border ${item.bgClass} transition-all duration-200 hover:brightness-110`}
              >
                <div className={`shrink-0 mt-0.5 ${item.iconClass}`}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}