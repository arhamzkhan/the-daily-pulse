import type { IndustryType } from "@/lib/themes";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let serviceClient: SupabaseClient | null = null;

/** Server-side client with elevated privileges for auth admin + protected writes. */
export function getServiceSupabase(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    return supabase;
  }

  if (!serviceClient) {
    serviceClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return serviceClient;
}

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

const businessFields =
  "id, user_id, name, branch_name, google_review_url, manager_whatsapp, language_preference, industry_type, is_active, total_scans, google_clicks, whatsapp_clicks, order_requested";

export function normalizeBusinessMetrics<T extends Partial<Business>>(business: T): T & Business {
  return {
    ...business,
    total_scans: Number(business.total_scans ?? 0),
    google_clicks: Number(business.google_clicks ?? 0),
    whatsapp_clicks: Number(business.whatsapp_clicks ?? 0),
  } as T & Business;
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const cleanId = id.trim().toLowerCase();
  
  // Since id in PostgreSQL is case-sensitive, match lower(id) to ensure case-insensitive check
  const { data, error } = await supabase
    .from("businesses")
    .select(businessFields)
    .ilike("id", cleanId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeBusinessMetrics(data as Business);
}

export async function getBusinessByUserId(userId: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from("businesses")
    .select(businessFields)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeBusinessMetrics(data as Business);
}
