"use client";

import { useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
  exiting?: boolean;
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2, 9);

    setToasts((prev) => [...prev, { id, message, type }]);

    // Begin exit animation at 2.7s (300ms before removal)
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
    }, 2700);

    // Remove from DOM after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3050);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  return { toasts, addToast, dismissToast };
}

// ─── Config ──────────────────────────────────────────────────────────────────

const TOAST_CONFIG: Record<
  ToastType,
  { icon: React.ElementType; border: string; iconColor: string; bar: string }
> = {
  success: {
    icon: CheckCircle2,
    border: "border-emerald-500/25",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  error: {
    icon: AlertCircle,
    border: "border-red-500/25",
    iconColor: "text-red-500 dark:text-red-400",
    bar: "bg-red-500",
  },
  info: {
    icon: Info,
    border: "border-blue-500/25",
    iconColor: "text-blue-500 dark:text-blue-400",
    bar: "bg-blue-500",
  },
};

// ─── Single Toast ─────────────────────────────────────────────────────────────

function SingleToast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const cfg = TOAST_CONFIG[toast.type];
  const Icon = cfg.icon;

  return (
    <div
      className={`
        relative flex items-start gap-3 w-80 px-4 py-3.5 rounded-xl border
        ${cfg.border} bg-white dark:bg-[#121215] shadow-lg dark:shadow-2xl dark:shadow-black/70 overflow-hidden
        transition-all duration-300
        ${toast.exiting
          ? "opacity-0 translate-x-3 scale-95"
          : "opacity-100 translate-x-0 scale-100 animate-in slide-in-from-bottom-4 fade-in duration-300"
        }
      `}
    >
      {/* Auto-dismiss progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] ${cfg.bar} opacity-30`}
        style={{ animation: toast.exiting ? "none" : "toast-shrink 2.7s linear forwards" }}
      />

      {/* Icon */}
      <div className={`shrink-0 mt-0.5 ${cfg.iconColor}`}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>

      {/* Message */}
      <p className="flex-1 text-sm text-slate-800 dark:text-zinc-200 leading-snug">{toast.message}</p>

      {/* Dismiss button */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 mt-0.5 p-0.5 rounded text-slate-400 dark:text-zinc-600 hover:text-slate-600 hover:dark:text-zinc-300 hover:bg-slate-100 hover:dark:bg-zinc-800/60 transition-colors duration-150"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}

// ─── Container ───────────────────────────────────────────────────────────────

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <>
      {/* Keyframe injected once, self-contained */}
      <style>{`
        @keyframes toast-shrink {
          from { width: 100%; }
          to   { width: 0%;   }
        }
      `}</style>

      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <SingleToast toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </div>
    </>
  );
}
