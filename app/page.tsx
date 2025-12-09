'use client'

import { useState } from 'react'

export default function IntakePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    budget: '',
    timeline: '',
    intent: ''
  })
  const [status, setStatus] = useState<string | null>(null)

  function update(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit() {
    setStatus('Submitting...')
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      setStatus('Thanks! We will review and respond shortly.')
      setForm({
        name: '',
        email: '',
        budget: '',
        timeline: '',
        intent: ''
      })
    } else {
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <main style={{ maxWidth: 500 }}>
      <h1>Contact Us</h1>
      <p>Please answer a few quick questions.</p>

      <input name="name" placeholder="Name" value={form.name} onChange={update} />
      <input name="email" placeholder="Email" value={form.email} onChange={update} />

      <select name="budget" value={form.budget} onChange={update}>
        <option value="">Budget</option>
        <option>$0–$500</option>
        <option>$500–$2,000</option>
        <option>$2,000+</option>
      </select>

      <select name="timeline" value={form.timeline} onChange={update}>
        <option value="">Timeline</option>
        <option>Immediately</option>
        <option>Within 30 days</option>
        <option>1–3 months</option>
        <option>Just researching</option>
      </select>

      <select name="intent" value={form.intent} onChange={update}>
        <option value="">Purpose</option>
        <option>Ready to buy</option>
        <option>Comparing options</option>
        <option>General question</option>
      </select>

      <button onClick={submit}>Submit</button>

      {status && <p>{status}</p>}
    </main>
  )
}
