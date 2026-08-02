"use client";

import { Eye, Star, MessageSquare, ScanLine } from "lucide-react";
import type { ComponentType } from "react";

type ScanLog = {
  id: number;
  business_id: string;
  action_type: "page_view" | "review_click" | "manager_click";
  rating?: number;
  device_type?: string;
  scanned_at: string;
};

type ActivityTimelineProps = {
  scanLogs: ScanLog[];
};

const ACTIONS: Record<
  ScanLog["action_type"],
  {
    icon: ComponentType<any>;
    title: string;
    iconBg: string;
    dot: string;
  }
> = {
  page_view: {
    icon: Eye,
    title: "Review Page Opened",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]",
  },
  review_click: {
    icon: Star,
    title: "Google Review Clicked",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.6)]",
  },
  manager_click: {
    icon: MessageSquare,
    title: "Private Feedback Sent",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-500 shadow-[0_0_6px_rgba(251,191,36,0.6)]",
  },
};

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ActivityTimeline({ scanLogs }: ActivityTimelineProps) {
  return (
    <section className="rounded-2xl border border-zinc-800/80 bg-[#121215] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">Recent Activity</h2>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Latest customer interactions in real-time
          </p>
        </div>
        {scanLogs.length > 0 && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60 uppercase tracking-wider">
            {scanLogs.length} event{scanLogs.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Feed */}
      <div className="divide-y divide-zinc-800/60">
        {scanLogs.length > 0 ? (
          scanLogs.slice(0, 10).map((log) => {
            const action = ACTIONS[log.action_type];
            const Icon = action.icon;

            return (
              <div
                key={log.id}
                className="group flex items-start gap-4 px-6 py-4 hover:bg-zinc-800/20 transition-all duration-200"
              >
                {/* Icon */}
                <div
                  className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-xl border ${action.iconBg} transition-all duration-200 group-hover:scale-105`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-zinc-200 truncate">
                      {action.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-medium text-zinc-600 tabular-nums">
                      {getRelativeTime(log.scanned_at)}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    {/* Dot indicator */}
                    <span className={`h-1.5 w-1.5 rounded-full ${action.dot}`} />

                    <span className="text-[11px] text-zinc-600">
                      {new Date(log.scanned_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {/* Device badge */}
                    <span className="rounded-full bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                      {log.device_type || "Unknown Device"}
                    </span>

                    {/* Rating badge — no emoji, uses Star icon text */}
                    {log.rating ? (
                      <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                        <Star className="h-2.5 w-2.5 fill-amber-400/50" strokeWidth={1.5} />
                        {log.rating}/5
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            {/* Icon placeholder — no emoji */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/60 border border-zinc-700/60 mb-5">
              <ScanLine className="h-6 w-6 text-zinc-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-zinc-400">No activity yet</h3>
            <p className="mt-2 text-sm text-zinc-600 max-w-xs">
              Customer activity will appear here once someone scans your QR code.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}