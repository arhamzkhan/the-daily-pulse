import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServiceSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface BusinessBranch {
  id: string;
  name: string;
  branch_name: string;
  manager_whatsapp: string;
  is_active: boolean;
  total_scans: number;
  google_clicks: number;
  whatsapp_clicks: number;
  industry_type: string;
  user_id: string;
  google_review_url?: string;
}

// --- SERVER ACTIONS FOR LIVE DATABASE INTERACTION ---

async function checkAdminSession() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() { return (await cookieStore).getAll(); },
        async setAll(cookiesToSet) { 
          const resolvedCookies = await cookieStore;
          cookiesToSet.forEach(({ name, value, options }) => resolvedCookies.set(name, value, options)); 
        },
      },
    }
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user || user.user_metadata?.is_admin !== true) {
    throw new Error('Unauthorized access. Admin privileges required.');
  }
}

async function updateBusinessStatus(id: string, currentStatus: boolean) {
  'use server';
  await checkAdminSession();

  const supabase = getServiceSupabase();
  await supabase
    .from('businesses')
    .update({ is_active: !currentStatus })
    .eq('id', id);

  revalidatePath('/admin');
}

async function updateBusinessDetails(formData: FormData) {
  'use server';
  await checkAdminSession();

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const branch_name = formData.get('branch_name') as string;
  const manager_whatsapp = formData.get('manager_whatsapp') as string;
  const industry_type = formData.get('industry_type') as string;

  const supabase = getServiceSupabase();
  await supabase
    .from('businesses')
    .update({ name, branch_name, manager_whatsapp, industry_type })
    .eq('id', id);

  revalidatePath('/admin');
}

async function terminateBusiness(id: string) {
  'use server';
  await checkAdminSession();

  const supabase = getServiceSupabase();
  await supabase
    .from('businesses')
    .delete()
    .eq('id', id);

  revalidatePath('/admin');
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; activeId?: string }>;
}) {
  const cookieStore = cookies();
  const query = (await searchParams).q || '';
  const activeId = (await searchParams).activeId || '';
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() { return (await cookieStore).getAll(); },
        async setAll(cookiesToSet) { 
          const resolvedCookies = await cookieStore;
          cookiesToSet.forEach(({ name, value, options }) => resolvedCookies.set(name, value, options)); 
        },
      },
    }
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) redirect('/login');

  const isAdmin = user.user_metadata?.is_admin === true;
  if (!isAdmin) redirect('/');

  let dbQuery = supabase
    .from('businesses')
    .select('id, name, branch_name, manager_whatsapp, is_active, total_scans, google_clicks, whatsapp_clicks, industry_type, user_id, google_review_url');

  if (query) {
    dbQuery = dbQuery.or(`id.ilike.%${query}%,branch_name.ilike.%${query}%,name.ilike.%${query}%`);
  }

  const { data: branches, error: fetchError } = await dbQuery.order('name', { ascending: true });
  
  const selectedBiz = branches?.find(b => b.id === activeId);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-sans antialiased relative overflow-x-hidden">
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${selectedBiz ? 'pr-[450px]' : ''}`}>
        
        {/* Header Console */}
        <header className="mb-10 border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white uppercase">HQ Operations Control</h1>
            <p className="text-xs text-neutral-500 mt-1 font-mono">System-wide performance monitoring & state management</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs bg-neutral-900 text-neutral-400 px-3.5 py-2 rounded-lg border border-neutral-800 font-mono">
              Root: {user.email}
            </div>
          </div>
        </header>

        {/* Filters Panel */}
        <div className="mb-8">
          <form method="GET" className="max-w-md flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search assets by ID, title, or branch location..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-700 font-mono"
            />
            {activeId && <input type="hidden" name="activeId" value={activeId} />}
            <button type="submit" className="bg-neutral-100 hover:bg-white text-neutral-950 px-4 py-2 rounded-lg text-sm font-medium transition-colors font-mono">
              Query
            </button>
          </form>
        </div>

        {/* Data Workspace */}
        <main>
          {fetchError ? (
            <div className="p-4 bg-red-950/30 border border-red-950 text-red-400 rounded-xl text-xs font-mono">
              Database pipeline error instance mapping failed: {fetchError.message}
            </div>
          ) : !branches || branches.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/20 border border-neutral-950 rounded-xl">
              <p className="text-sm text-neutral-600 font-mono">Zero live business entity nodes found match parameters.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/10 backdrop-blur-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/40 text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">
                    <th className="p-4">Entity Identity</th>
                    <th className="p-4 text-center">Conversion Metrics Matrix</th>
                    <th className="p-4">Operational Status</th>
                    <th className="p-4 text-right">Instant Intercept Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/40 text-sm">
                  {branches.map((biz: BusinessBranch) => {
                    const isRowSelected = biz.id === activeId;
                    return (
                      <tr 
                        key={biz.id} 
                        className={`transition-colors cursor-pointer group ${
                          isRowSelected ? 'bg-neutral-900 border-l-2 border-neutral-400' : 'hover:bg-neutral-900/40'
                        }`}
                      >
                        {/* Interactive Clickable Info Area */}
                        <td className="p-4">
                          <a href={`?q=${query}&activeId=${biz.id}`} className="block focus:outline-none">
                            <div className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                              {biz.name || 'Unnamed Asset'} 
                              {biz.branch_name && <span className="text-neutral-500 font-normal text-xs ml-1 font-mono">[{biz.branch_name}]</span>}
                            </div>
                            <div className="text-xs text-neutral-500 font-mono mt-1">{biz.manager_whatsapp || 'No verification terminal linked'}</div>
                          </a>
                        </td>
                        
                        {/* Metrics Block */}
                        <td className="p-4 text-center">
                          <div className="inline-flex gap-4 font-mono text-xs text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-900">
                            <div><span className="text-neutral-600 text-[9px] font-bold block">SCANS</span>{biz.total_scans || 0}</div>
                            <div className="border-l border-neutral-800 pl-4"><span className="text-emerald-600 text-[9px] font-bold block">G-CLICKS</span>{biz.google_clicks || 0}</div>
                            <div className="border-l border-neutral-800 pl-4"><span className="text-cyan-600 text-[9px] font-bold block">WA-CLICKS</span>{biz.whatsapp_clicks || 0}</div>
                          </div>
                        </td>
                        
                        {/* Status Label */}
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-mono font-medium ${
                            biz.is_active 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {biz.is_active ? 'Active' : 'Suspended'}
                          </span>
                        </td>
                        
                        {/* Instant Controls */}
                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <form action={updateBusinessStatus.bind(null, biz.id, biz.is_active)}>
                              <button 
                                type="submit"
                                className={`text-xs font-mono px-3 py-1.5 rounded border transition-all active:scale-95 ${
                                  biz.is_active 
                                    ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-400'
                                    : 'bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-900/40 text-emerald-400'
                                }`}
                              >
                                {biz.is_active ? 'Suspend Service' : 'Activate Service'}
                              </button>
                            </form>
                            
                            <form 
                              action={terminateBusiness.bind(null, biz.id)}
                              onSubmit={(e) => { if(!confirm("Permanently wipe this business context row from core tables?")) e.preventDefault(); }}
                            >
                              <button 
                                type="submit"
                                className="bg-rose-950/20 hover:bg-rose-950/60 text-rose-400 text-xs font-mono px-3 py-1.5 rounded border border-rose-950/60 transition-all active:scale-95"
                              >
                                Terminate
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* --- SLIDEOUT PROFILE MANAGEMENT DRAWER PANEL --- */}
      {selectedBiz && (
        <div className="fixed top-0 right-0 h-full w-[420px] bg-neutral-900 border-l border-neutral-800 shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out z-50">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
            <h2 className="text-sm font-bold tracking-widest uppercase font-mono text-white">Entity Data Scope</h2>
            <a href={`?q=${query}`} className="text-neutral-500 hover:text-neutral-200 text-xs font-mono bg-neutral-950 px-2 py-1 rounded border border-neutral-800">
              Close ✕
            </a>
          </div>

          {/* Hard Structural UUID Identification Node */}
          <div className="mb-6 p-3 bg-neutral-950 rounded-lg border border-neutral-800 select-all">
            <label className="text-[10px] font-bold text-neutral-500 font-mono uppercase block mb-1">Database Primary Key ID (UUID)</label>
            <div className="text-xs font-mono text-neutral-300 break-all bg-neutral-900/50 p-2 rounded border border-neutral-900">{selectedBiz.id}</div>
            
            <label className="text-[10px] font-bold text-neutral-500 font-mono uppercase block mt-3 mb-1">User Foreign Authentication Key (User ID)</label>
            <div className="text-xs font-mono text-neutral-300 break-all bg-neutral-900/50 p-2 rounded border border-neutral-900">{selectedBiz.user_id}</div>
          </div>

          {/* Live Profile Form Updates */}
          <form action={updateBusinessDetails} className="space-y-4 text-xs font-mono">
            <input type="hidden" name="id" value={selectedBiz.id} />
            
            <div>
              <label className="text-neutral-500 block mb-1 uppercase font-bold text-[10px]">Business Label</label>
              <input 
                type="text" 
                name="name" 
                defaultValue={selectedBiz.name} 
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none focus:border-neutral-700"
              />
            </div>

            <div>
              <label className="text-neutral-500 block mb-1 uppercase font-bold text-[10px]">Branch Location Name</label>
              <input 
                type="text" 
                name="branch_name" 
                defaultValue={selectedBiz.branch_name} 
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none focus:border-neutral-700"
              />
            </div>

            <div>
              <label className="text-neutral-500 block mb-1 uppercase font-bold text-[10px]">Manager Telegram / WhatsApp Node</label>
              <input 
                type="text" 
                name="manager_whatsapp" 
                defaultValue={selectedBiz.manager_whatsapp} 
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none focus:border-neutral-700"
              />
            </div>

            <div>
              <label className="text-neutral-500 block mb-1 uppercase font-bold text-[10px]">Industry Vertical Grouping</label>
              <input 
                type="text" 
                name="industry_type" 
                defaultValue={selectedBiz.industry_type} 
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none focus:border-neutral-700"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-neutral-100 hover:bg-white text-neutral-950 py-2.5 rounded font-bold transition-all uppercase tracking-wider text-xs shadow-md active:scale-[0.99]"
              >
                Commit Context Updates
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}