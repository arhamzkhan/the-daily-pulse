"use client";

type DashboardSidebarProps = {
  activeTab: "overview" | "qr" | "settings" | "account";
  setActiveTab: (tab: "overview" | "qr" | "settings" | "account") => void;
  onSignOut: () => void;
};

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  onSignOut,
}: DashboardSidebarProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: "🏠" },
    { id: "qr", label: "QR & Standee", icon: "🔲" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "account", label: "Account", icon: "👤" },
  ] as const;

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="px-3 py-2 mb-6">
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Navigation
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-zinc-800/60 mt-auto">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 transition-all"
        >
          <span className="text-base">🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  );
}