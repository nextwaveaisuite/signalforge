import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function POST(req: Request) {
  const { ids } = await req.json()

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'No ids provided' }, { status: 400 })
  }

  await supabase.from('signals').delete().in('id', ids)

  return NextResponse.json({ success: true })
}
