import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data } = await supabase
    .from('signals_raw')
    .select('*')
    .order('created_at', { ascending: false });

  return NextResponse.json(data || []);
}
