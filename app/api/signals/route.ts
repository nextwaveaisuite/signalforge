// app/api/signals/route.ts
import { NextResponse } from 'next/server'
import { ingestSignal, getSignals } from '../../../lib/signalStore'

export async function POST(req: Request) {
  const body = await req.json()

  if (!body?.text) {
    return NextResponse.json(
      { error: 'Missing text' },
      { status: 400 }
    )
  }

  const signal = ingestSignal(body.text)

  return NextResponse.json({
    success: true,
    signal
  })
}

export async function GET() {
  return NextResponse.json(getSignals())
}
