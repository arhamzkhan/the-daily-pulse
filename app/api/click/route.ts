import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
    const supabase = await createClient();
    // Increment the specific click counter based on target type
    if (type === 'google') {
      const { error } = await supabase.rpc('increment_google_clicks', { row_id: id });
      if (error) {
        console.error('[Tracking] increment_google_clicks failed:', error.message);
      }
    } else if (type === 'whatsapp') {
      const { error } = await supabase.rpc('increment_whatsapp_clicks', { row_id: id });
      if (error) {
        console.error('[Tracking] increment_whatsapp_clicks failed:', error.message);
      }
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }

  // Instant native browser redirect to the external app
  return NextResponse.redirect(targetUrl);
}