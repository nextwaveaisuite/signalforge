import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function GET(req: Request) {
  const email = req.headers.get('x-user-email')

  if (!email) {
    return NextResponse.json({ is_pro: false })
  }

  const { data } = await supabase
    .from('users')
    .select('is_pro')
    .eq('email', email)
    .single()

  return NextResponse.json({ is_pro: data?.is_pro ?? false })
}
