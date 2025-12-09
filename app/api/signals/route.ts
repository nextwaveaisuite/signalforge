import { NextResponse } from 'next/server'
import { ingestSignal } from '../../../lib/signalStore'
import { supabase } from '../../../lib/supabase'

export async function POST(req: Request) {
  const body = await req.json()
  if (!body?.text) {
    return NextResponse.json({ error: 'Missing text' }, { status: 400 })
  }

  const signal = ingestSignal(body.text)

  // write to DB
  await supabase.from('signals').insert({
    raw_text: signal.raw_text,
    normalized: signal.normalized,
    score: signal.score,
    verdict: signal.verdict,
    reason: signal.reason
  })

  return NextResponse.json({ success: true })
}

export async function GET() {
  // ✅ ALWAYS return newest first
  const { data } = await supabase
    .from('signals')
    .select('*')
    .order('created_at', { ascending: false })

  return NextResponse.json(data ?? [])
}
