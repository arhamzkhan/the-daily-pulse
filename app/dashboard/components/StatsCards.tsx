"use client";

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
          <span className="text-xl">📷</span>
        </div>
        <div className="text-3xl font-bold text-white font-mono">{totalScans}</div>
      </div>

      {/* Average Rating */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Average Rating
          </span>
          <span className="text-xl">⭐</span>
        </div>
        <div className="text-3xl font-bold text-white font-mono flex items-center gap-1">
          {avgRating} <span className="text-amber-400 text-xl">★</span>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Conversion
          </span>
          <span className="text-xl">📈</span>
        </div>
        <div className="text-3xl font-bold text-white font-mono">{conversion}%</div>
      </div>

      {/* Direct Clicks */}
      <div className="p-5 rounded-xl bg-[#111115] border border-zinc-800/60 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Direct Clicks
          </span>
          <span className="text-xl">🚀</span>
        </div>
        <div className="text-3xl font-bold text-white font-mono">{directClicks}</div>
      </div>
    </div>
  );
}