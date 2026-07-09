import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');       // business slug
  const type = searchParams.get('type');   // 'google' or 'whatsapp'
  const targetUrl = searchParams.get('url') ?? searchParams.get('to');

  if (!id || !type || !targetUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Increment the specific click counter based on target type
    if (type === 'google') {
      await supabase.rpc('increment_google_clicks', { row_id: id });
    } else if (type === 'whatsapp') {
      await supabase.rpc('increment_whatsapp_clicks', { row_id: id });
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }

  // Instant native browser redirect to the external app
  return NextResponse.redirect(targetUrl);
}