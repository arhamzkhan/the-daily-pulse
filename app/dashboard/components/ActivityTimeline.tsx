"use client";

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
  { icon: string; title: string; color: string }
> = {
  page_view: {
    icon: "👀",
    title: "Review Page Opened",
    color: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  review_click: {
    icon: "⭐",
    title: "Google Review Clicked",
    color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  manager_click: {
    icon: "💬",
    title: "Private Feedback Opened",
    color: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  },
};

export default function ActivityTimeline({
  scanLogs,
}: ActivityTimelineProps) {
  return (
    <section className="rounded-3xl border border-zinc-800/60 bg-[#111115] shadow-sm">
      <div className="border-b border-zinc-800/60 p-6">
        <h2 className="text-xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Latest customer interactions.
        </p>
      </div>

      <div className="divide-y divide-zinc-800/60">
        {scanLogs.length > 0 ? (
          scanLogs.slice(0, 10).map((log) => {
            const action = ACTIONS[log.action_type];

            return (
              <div
                key={log.id}
                className="flex items-start gap-4 p-5 transition hover:bg-zinc-900/30"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl border ${action.color}`}
                >
                  {action.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-200">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {new Date(log.scanned_at).toLocaleString()}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-zinc-900 border border-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-400">
                      {log.device_type || "Unknown Device"}
                    </span>

                    {log.rating ? (
                      <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
                        ⭐ {log.rating}/5
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <div className="text-5xl">📭</div>

            <h3 className="mt-4 text-lg font-semibold text-zinc-300">
              No activity yet
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Customer activity will appear here once someone scans your QR code.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}