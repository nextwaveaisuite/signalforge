import { NextResponse } from 'next/server'
import { ingestSignal, getSignals } from '../../../lib/signalStore'
import { supabase } from '../../../lib/supabase'

export async function POST(req: Request) {
  const body = await req.json()

  if (!body?.text) {
    return NextResponse.json({ error: 'Missing text' }, { status: 400 })
  }

  const signal = ingestSignal(body.text)

  // Write-through persistence (non-blocking)
  try {
    await supabase.from('signals').insert({
      raw_text: signal.raw_text,
      normalized: signal.normalized,
      score: signal.score,
      verdict: signal.verdict,
      reason: signal.reason
    })
  } catch {
    // intentionally silent — memory is fallback
  }

  return NextResponse.json({ success: true, signal })
}

export async function GET() {
  // Prefer DB
  const { data, error } = await supabase
    .from('signals')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) {
    // Fallback to memory if DB fails
    return NextResponse.json(getSignals())
  }

  return NextResponse.json(data)
}
