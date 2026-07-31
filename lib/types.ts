/**
 * lib/types.ts
 * Shared type definitions used across the application.
 * Centralizes types to avoid duplication and ensure consistency.
 */

import type { IndustryType } from "@/lib/themes";

/* ── Business Entity ────────────────────────────── */

export type Business = {
  id: string;
  user_id?: string | null;
  name: string;
  branch_name: string;
  google_review_url: string;
  manager_whatsapp: string;
  language_preference: string;
  industry_type: IndustryType;
  is_active: boolean;
  total_scans: number;
  google_clicks: number;
  whatsapp_clicks: number;
  order_requested?: boolean;
};

/* ── Scan Log ───────────────────────────────────── */

export type ScanLog = {
  id: number;
  business_id: string;
  action_type: "page_view" | "review_click" | "manager_click";
  rating?: number;
  device_type?: string;
  scanned_at: string;
};

/* ── Dashboard Tab ──────────────────────────────── */

export type TabId = "overview" | "qr" | "settings";

export const DASHBOARD_TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "🏠" },
  { id: "qr", label: "QR & Standee", icon: "📱" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];
