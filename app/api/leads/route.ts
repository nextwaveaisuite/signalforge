import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { qualifyLead } from '../../../lib/qualify'
import { sendEmail } from '../../../lib/email'

function emailByStatus(status: string) {
  if (status === 'qualified') {
    return {
      subject: 'Let’s take the next step',
      body: `<p>Thanks for reaching out. You’re a great fit.<br/>Book a call here: <a href="https://calendly.com/you">Schedule</a></p>`
    }
  }
  if (status === 'review') {
    return {
      subject: 'We’re reviewing your request',
      body: `<p>Thanks for your submission. We’ll review and get back shortly.</p>`
    }
  }
  return {
    subject: 'Thanks for reaching out',
    body: `<p>Thanks for your interest. At this time we’re unable to proceed, but here’s a helpful resource.</p>`
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, budget, timeline, intent } = body

  if (!name || !email || !budget || !timeline || !intent) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { score, status, reason } = qualifyLead({ budget, timeline, intent })

  await supabase.from('leads').insert({
    name, email, budget, timeline, intent, score, status, reason
  })

  const emailTemplate = emailByStatus(status)
  await sendEmail(email, emailTemplate.subject, emailTemplate.body)

  return NextResponse.json({ success: true, status })
}
