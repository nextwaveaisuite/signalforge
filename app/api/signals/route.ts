import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(req: Request) {
  const { source, raw_text } = await req.json();

  await supabase.from('signals_raw').insert({ source, raw_text });
  return NextResponse.json({ ok: true });
}
