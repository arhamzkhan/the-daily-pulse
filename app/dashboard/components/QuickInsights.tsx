"use client";

interface QuickInsightsProps {
  business?: any;
  scanLogs?: any[];
}

export default function QuickInsights({ business, scanLogs = [] }: QuickInsightsProps) {
  const googleClicks = business?.google_clicks || 0;
  const whatsappClicks = business?.whatsapp_clicks || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Action Distribution */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60">
        <h3 className="text-sm font-semibold text-zinc-400 mb-4 tracking-wider uppercase">
          Action Distribution
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-300">Google Reviews</span>
              <span className="text-zinc-400 font-mono">{googleClicks}</span>
            </div>
            <div className="w-full bg-[#18181b] h-2 rounded-full overflow-hidden border border-zinc-800/60">
              <div
                className="bg-amber-500 h-full rounded-full transition-all"
                style={{ width: `${googleClicks > 0 ? 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-300">Private Feedback</span>
              <span className="text-zinc-400 font-mono">{whatsappClicks}</span>
            </div>
            <div className="w-full bg-[#18181b] h-2 rounded-full overflow-hidden border border-zinc-800/60">
              <div
                className="bg-zinc-600 h-full rounded-full transition-all"
                style={{ width: `${whatsappClicks > 0 ? 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights Box */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60">
        <h3 className="text-sm font-semibold text-zinc-400 mb-4 tracking-wider uppercase">
          Quick Insights
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {scanLogs.length > 0
            ? `You have collected ${scanLogs.length} total activity logs. Keep monitoring direct conversion rates below.`
            : "No scan data available yet. Deploy your QR standee to start collecting analytics."}
        </p>
      </div>
    </div>
  );
}