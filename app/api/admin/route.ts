import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getServiceSupabase } from '@/lib/supabase';

async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: 'Authentication required.', status: 401 };
  }

  const isAdmin = user.user_metadata?.is_admin === true;
  if (!isAdmin) {
    return { error: 'Access forbidden. Admin privileges required.', status: 403 };
  }

  return { user };
}

// 1. GET handler to fetch business configuration live on dashboard mount
export async function GET(request: Request) {
  try {
    const authResult = await verifyAdmin();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing required business identification identifier (id).' }, { status: 400 });
    }

    // Use elevated service client to allow administrative operations
    const client = getServiceSupabase();
    const { data, error } = await client
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to pull profile configurations.' }, { status: 500 });
  }
}

// 2. POST handler to update business settings live over secure HTTPS
export async function POST(request: Request) {
  try {
    const authResult = await verifyAdmin();
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    const { id, name, branch_name, google_review_url, manager_whatsapp, is_active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing business identifier (id).' }, { status: 400 });
    }

    // Validate incoming Pakistani phone configuration format strictly
    if (manager_whatsapp && !/^92\d{10}$/.test(manager_whatsapp)) {
      return NextResponse.json({ error: 'Invalid WhatsApp format. Must begin with 92 followed by 10 digits.' }, { status: 400 });
    }

    // Build update object dynamically to mirror old COALESCE database logic
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (branch_name !== undefined) updateData.branch_name = branch_name;
    if (google_review_url !== undefined) updateData.google_review_url = google_review_url;
    if (manager_whatsapp !== undefined) updateData.manager_whatsapp = manager_whatsapp;
    if (is_active !== undefined) updateData.is_active = is_active;

    const client = getServiceSupabase();
    const { error } = await client
      .from('businesses')
      .update(updateData)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Live parameters synchronized successfully over HTTPS.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal API communication breakdown.' }, { status: 500 });
  }
}
