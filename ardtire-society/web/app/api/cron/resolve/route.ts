import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // 1. Verify Secret (To prevent public users from triggering resolution)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Bypass RLS for system maintenance
  );

  // 2. Call the RPC function
  const { data, error } = await supabase.rpc('resolve_expired_proposals');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json({ resolved: data });
}