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

    // Validate targetUrl against the registered business properties to prevent open redirects
    const { data: business } = await supabase
      .from('businesses')
      .select('google_review_url, manager_whatsapp')
      .eq('id', id)
      .maybeSingle();

    if (!business) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const decodedTarget = decodeURIComponent(targetUrl);
    const allowedTargets = [
      business.google_review_url,
      business.manager_whatsapp ? `https://wa.me/${business.manager_whatsapp}` : null
    ].filter((url): url is string => !!url);

    const isAllowed = allowedTargets.some(allowed =>
      targetUrl === allowed ||
      targetUrl.startsWith(allowed + '?') ||
      targetUrl.startsWith(allowed + '&') ||
      decodedTarget === allowed ||
      decodedTarget.startsWith(allowed + '?') ||
      decodedTarget.startsWith(allowed + '&') ||
      targetUrl.startsWith(allowed) ||
      decodedTarget.startsWith(allowed)
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL('/', request.url));
    }

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
