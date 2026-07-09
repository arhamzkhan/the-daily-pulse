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
  is_active: boolean;
};

export async function getBusinessById(id: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from("businesses")
    .select(
      "id, user_id, name, branch_name, google_review_url, manager_whatsapp, language_preference, is_active"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Business;
}
