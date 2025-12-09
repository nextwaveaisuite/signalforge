import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { qualifyLead } from '../../../lib/qualify'
import { sendEmail } from '../../../lib/email'

function emailTemplate(status: string) {
  if (status === 'qualified') {
    return {
      subject: 'You’re approved – let’s talk',
      body: `<p>You’re a great fit. Book a call here:<br/>
             <a href="https://calendly.com/you">Schedule</a></p>`
    }
  }

  if (status === 'review') {
    return {
      subject: 'We’re reviewing your request',
      body: `<p>Thanks for reaching out. We’ll review and follow up.</p>`
    }
  }

  return {
    subject: 'Thanks for reaching out',
    body: `<p>Appreciate your interest. At this time we’re unable to proceed.</p>`
  }
}

export async function POST(req: Request) {
  const { name, email, budget, timeline, intent } = await req.json()

  if (!name || !email || !budget || !timeline || !intent) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { score, status, reason } = qualifyLead({ budget, timeline, intent })

  await supabase.from('leads').insert({
    name,
    email,
    budget,
    timeline,
    intent,
    score,
    status,
    reason
  })

  const mail = emailTemplate(status)
  await sendEmail(email, mail.subject, mail.body)

  return NextResponse.json({ success: true, status, score })
}
