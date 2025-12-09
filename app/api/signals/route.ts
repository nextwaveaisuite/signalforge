import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { normalizePain } from '../../../lib/normalize';
import { scoreSignal } from '../../../lib/scoring';

export async function POST(req: Request) {
  const body = await req.json();
  const raw_text = body.raw_text;
  const source = body.source || "manual";

  // Normalize
  const normalized = await normalizePain(raw_text);

  // Score
  const result = scoreSignal(normalized);

  // Save
  await supabase.from('signals_raw').insert({
    source,
    raw_text,
    normalized,
    final_score: result.score,
    verdict: result.verdict
  });

  return NextResponse.json({ ok: true });
}
