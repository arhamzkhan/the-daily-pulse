"use client";

import {
  LayoutDashboard,
  QrCode,
  Settings,
  User,
  LogOut,
  Zap,
} from "lucide-react";

type DashboardSidebarProps = {
  activeTab: "overview" | "qr" | "settings" | "account";
  setActiveTab: (tab: "overview" | "qr" | "settings" | "account") => void;
  onSignOut: () => void;
};

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "qr", label: "QR & Standee", icon: QrCode },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "account", label: "Account", icon: User },
] as const;

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  onSignOut,
}: DashboardSidebarProps) {
  return (
    <div className="flex flex-col h-full justify-between">
      {/* Logo */}
      <div>
        <div className="px-3 py-1 mb-8 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
            <Zap className="h-4 w-4 text-zinc-950" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
            Voucho
          </span>
        </div>

        {/* Section Label */}
        <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.15em] text-slate-400 dark:text-zinc-600 uppercase">
          Navigation
        </p>

        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-[inset_0_1px_0_rgba(251,191,36,0.05)]"
                    : "text-slate-600 dark:text-zinc-500 hover:text-slate-900 hover:dark:text-zinc-200 hover:bg-slate-100 hover:dark:bg-zinc-800/40 border border-transparent"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                    isActive ? "text-amber-600 dark:text-amber-400" : "text-slate-400 dark:text-zinc-600 group-hover:text-slate-600 group-hover:dark:text-zinc-400"
                  }`}
                  strokeWidth={isActive ? 2 : 1.75}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="pt-4 border-t border-slate-200 dark:border-zinc-800/60 mt-auto">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-600 hover:text-red-600 hover:dark:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all duration-200 group"
        >
          <LogOut className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-600 group-hover:text-red-600 group-hover:dark:text-red-400 transition-colors duration-200" strokeWidth={1.75} />
          Sign Out
        </button>
      </div>
    </div>
  );
}