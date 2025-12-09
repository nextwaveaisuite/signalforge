'use client'

import { useEffect, useState } from 'react'

type Lead = {
  id: string
  name: string
  email: string
  budget: string
  timeline: string
  intent: string
  score: number
  status: 'qualified' | 'review' | 'rejected'
  reason: string
  created_at: string
}

const statusColor = {
  qualified: '#22c55e',
  review: '#f59e0b',
  rejected: '#ef4444'
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<'all' | Lead['status']>('all')

  async function load() {
    const res = await fetch('/api/leads/list')
    const data = await res.json()
    setLeads(data)
  }

  useEffect(() => {
    load()
  }, [])

  const visible =
    filter === 'all'
      ? leads
      : leads.filter(l => l.status === filter)

  return (
    <main style={{ maxWidth: 1000 }}>
      <h1>Leads Dashboard</h1>

      {/* FILTER */}
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('qualified')}>Qualified</button>
        <button onClick={() => setFilter('review')}>Review</button>
        <button onClick={() => setFilter('rejected')}>Rejected</button>
      </div>

      {/* TABLE */}
      {visible.length === 0 && <p>No leads.</p>}

      {visible.map(lead => (
        <div
          key={lead.id}
          style={{
            border: '1px solid #333',
            padding: 16,
            marginBottom: 12,
            borderRadius: 6
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: statusColor[lead.status]
            }}
          >
            {lead.status.toUpperCase()} — Score {lead.score}
          </div>

          <p><strong>{lead.name}</strong> ({lead.email})</p>

          <p>
            Budget: {lead.budget} · Timeline: {lead.timeline} · Intent:{' '}
            {lead.intent}
          </p>

          <p>
            <strong>Why:</strong> {lead.reason}
          </p>

          <p style={{ opacity: 0.6 }}>
            Submitted {new Date(lead.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </main>
  )
}
