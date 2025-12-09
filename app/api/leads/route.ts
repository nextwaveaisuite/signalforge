import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { qualifyLead } from '../../../lib/qualify'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, budget, timeline, intent } = body

  if (!name || !email || !budget || !timeline || !intent) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { score, status, reason } = qualifyLead({
    budget,
    timeline,
    intent
  })

  const { error } = await supabase.from('leads').insert({
    name,
    email,
    budget,
    timeline,
    intent,
    score,
    status,
    reason
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    score,
    status
  })
}
