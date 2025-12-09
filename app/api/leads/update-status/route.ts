import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { sendEmail } from '../../../../lib/email'

export async function POST(req: Request) {
  const { id, status, email } = await req.json()

  if (!id || !status) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 })
  }

  await supabase.from('leads').update({ status }).eq('id', id)

  if (email && status === 'qualified') {
    await sendEmail(
      email,
      'Approved — Let’s talk',
      `<p>You’ve been approved. Book here: <a href="https://calendly.com/you">Schedule</a></p>`
    )
  }

  return NextResponse.json({ success: true })
}
