'use client'

import { useEffect, useMemo, useState } from 'react'

type Signal = {
  raw_text: string
  normalized: string
  score: number
  verdict: 'BUILD' | 'WATCH' | 'KILL'
  reason: string
  session_id: string
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

  const load = () =>
    fetch('/api/signals')
      .then(r => r.json())
      .then(setSignals)

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
    setStatus('Signal added ✅')
    load()
  }

  async function deleteSession(session_id: string) {
    await fetch('/api/signals/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id })
    })
    load()
  }

  // ✅ SOURCE OF TRUTH: TIME, NOT MEMORY
  const grouped = useMemo(() => {
    const map: Record<string, Signal[]> = {}
    signals.forEach(s => {
      if (!map[s.session_id]) map[s.session_id] = []
      map[s.session_id].push(s)
    })
    return Object.entries(map).sort(
      (a, b) =>
        new Date(b[1][0].created_at).getTime() -
        new Date(a[1][0].created_at).getTime()
    )
  }, [signals])

  const currentSession = grouped[0]?.[1] ?? []
  const historySessions = grouped.slice(1)

  return (
    <main style={{ maxWidth: 960 }}>
      <h1>SignalForge</h1>

      {/* INGEST */}
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Describe the raw pain or frustration…"
      />
      <button onClick={submit}>Submit</button>
      {status && <p>{status}</p>}

      {/* CURRENT RESULTS */}
      <section style={{ marginTop: 24 }}>
        <h2>Current Results</h2>
        {currentSession.length === 0 && (
          <p style={{ opacity: 0.6 }}>No results yet.</p>
        )}
        {currentSession.map((s, i) => (
          <SignalCard key={i} s={s} />
        ))}
      </section>

      {/* HISTORY TOGGLE */}
      {historySessions.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <button
            onClick={() => setShowHistory(v => !v)}
            style={{ background: '#1f2937' }}
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>

          {showHistory && (
            <div style={{ marginTop: 16 }}>
              {historySessions.map(([sid, items]) => (
                <details key={sid} style={{ marginBottom: 12 }}>
                  <summary>
                    Session ({items.length} signals)
                  </summary>

                  <button
                    onClick={() => deleteSession(sid)}
                    style={{
                      background: '#991b1b',
                      margin: '8px 0'
                    }}
                  >
                    Delete Session
                  </button>

                  {items.map((s, i) => (
                    <SignalCard key={i} s={s} faded />
                  ))}
                </details>
              ))}
            </div>
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
      <div style={{ color: verdictColor[s.verdict], fontWeight: 700 }}>
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
