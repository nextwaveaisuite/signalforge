'use client'

import { useEffect, useState } from 'react'

type Signal = {
  id: string
  raw_text: string
  normalized: string
  score: number
  verdict: 'BUILD' | 'WATCH' | 'KILL'
  reason: string
  created_at: string
}

const verdictColor = {
  BUILD: '#22c55e',
  WATCH: '#f59e0b',
  KILL: '#ef4444'
}

export default function Home() {
  const [text, setText] = useState('')
  const [signals, setSignals] = useState<Signal[]>([])
  const [status, setStatus] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  async function load() {
    const res = await fetch('/api/signals')
    const data = await res.json()
    setSignals(data)
  }

  useEffect(() => {
    load()
  }, [])

  async function submit() {
    if (!text.trim()) return
    setStatus('Processing...')
    await fetch('/api/signals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    setText('')
    setStatus('Added ✅')
    await load()
  }

  async function resetAll() {
    if (!confirm('Delete ALL history? This cannot be undone.')) return
    await fetch('/api/signals/reset', { method: 'POST' })
    setSignals([])
    setStatus('All history cleared ✅')
  }

  const [latest, ...history] = signals

  return (
    <main style={{ maxWidth: 900 }}>
      <h1>SignalForge</h1>

      {/* INGEST */}
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Describe the raw pain or frustration…"
      />
      <button onClick={submit}>Submit</button>
      {status && <p>{status}</p>}

      {/* CURRENT RESULT */}
      <section style={{ marginTop: 24 }}>
        <h2>Latest Result</h2>
        {!latest && <p style={{ opacity: 0.6 }}>No results yet.</p>}
        {latest && <SignalCard s={latest} />}
      </section>

      {/* HISTORY */}
      {history.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <button
            onClick={() => setShowHistory(v => !v)}
            style={{ background: '#1f2937' }}
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>

          {showHistory && (
            <>
              <button
                onClick={resetAll}
                style={{ background: '#7f1d1d', marginLeft: 12 }}
              >
                Delete ALL History
              </button>

              <div style={{ marginTop: 16 }}>
                {history.map(s => (
                  <SignalCard key={s.id} s={s} faded />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </main>
  )
}

function SignalCard({ s, faded }: { s: Signal; faded?: boolean }) {
  return (
    <div
      style={{
        border: '1px solid #333',
        padding: 16,
        marginBottom: 12,
        opacity: faded ? 0.65 : 1
      }}
    >
      <div
        style={{
          color: verdictColor[s.verdict],
          fontWeight: 700
        }}
      >
        {s.verdict} — Score {s.score}
      </div>
      <p><strong>Raw:</strong> {s.raw_text}</p>
      <p><strong>Normalized:</strong> {s.normalized}</p>
      <ul>
        {s.reason.split(', ').map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  )
}
