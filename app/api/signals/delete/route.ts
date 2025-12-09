import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function POST(req: Request) {
  const { session_id } = await req.json()

  if (!session_id) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  await supabase.from('signals').delete().eq('session_id', session_id)

  return NextResponse.json({ success: true })
}
