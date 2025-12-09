import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { normalizePain } from '../../../lib/normalize';
import { scoreSignal } from '../../../lib/scoring';

export async function POST(req: Request) {
  const { source, raw_text } = await req.json();

  // Normalize
  const normalized = await normalizePain(raw_text);

  // Score
  const result = scoreSignal(normalized);

  // Store in Supabase
  await supabase.from('signals_raw').insert({
    source,
    raw_text,
    normalized,
    final_score: result.score,
    verdict: result.verdict
  });

  return NextResponse.json({ ok: true });
}
