'use client'

import { useEffect, useState } from 'react'

type Lead = {
  id: string
  name: string
  email: string
  score: number
  status: 'qualified' | 'review' | 'rejected'
  reason: string
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([])

  async function load() {
    const res = await fetch('/api/leads/list')
    setLeads(await res.json())
  }

  async function update(id: string, status: Lead['status'], email: string) {
    await fetch('/api/leads/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, email })
    })
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <main style={{ maxWidth: 900 }}>
      <h1>Leads Dashboard</h1>

      {leads.map(l => (
        <div key={l.id} style={{ border: '1px solid #333', padding: 16, marginBottom: 12 }}>
          <strong>{l.name}</strong> ({l.score}) — {l.status}
          <p>{l.reason}</p>

          <button onClick={() => update(l.id, 'qualified', l.email)}>Approve</button>
          <button onClick={() => update(l.id, 'review', l.email)}>Review</button>
          <button onClick={() => update(l.id, 'rejected', l.email)}>Reject</button>
        </div>
      ))}
    </main>
  )
}
