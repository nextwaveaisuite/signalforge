'use client'

import { useEffect, useMemo, useState } from 'react'

type Signal = {
  raw_text: string
  normalized: string
  score: number
  verdict: 'BUILD' | 'WATCH' | 'KILL'
  reason: string
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

  function loadSignals() {
    fetch('/api/signals')
      .then(res => res.json())
      .then(setSignals)
  }

  useEffect(() => {
    loadSignals()
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
    setStatus('Signal ingested ✅')
    loadSignals()
  }

  // ---- PHASE 3 INSIGHT ----
  const insights = useMemo(() => {
    const buckets: Record<string, Signal[]> = {}
    signals.forEach(s => {
      if (!buckets[s.normalized]) buckets[s.normalized] = []
      buckets[s.normalized].push(s)
    })

    return Object.entries(buckets).map(([normalized, items]) => ({
      normalized,
      count: items.length,
      avgScore: Math.round(
        items.reduce((a, b) => a + b.score, 0) / items.length
      )
    }))
  }, [signals])

  return (
    <main style={{ maxWidth: 960 }}>
      <h1>SignalForge</h1>

      {/* INGEST */}
      <section style={{ marginBottom: 24 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Describe the raw pain or frustration…"
        />
        <button onClick={submit}>Submit</button>
        {status && <p>{status}</p>}
      </section>

      {/* INTELLIGENCE */}
      {insights.length > 0 && (
        <section
          style={{
            border: '1px solid #333',
            padding: 16,
            borderRadius: 6,
            marginBottom: 24
          }}
        >
          <h2>Founder Intelligence</h2>
          {insights.map((i, idx) => (
            <p key={idx}>
              <strong>{i.normalized}</strong> — appears {i.count}× · avg
              score {i.avgScore}
            </p>
          ))}
        </section>
      )}

      {/* RESULTS */}
      {signals.map((s, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #333',
            padding: 16,
            borderRadius: 6,
            marginBottom: 16
          }}
        >
          <div
            style={{
              color: verdictColor[s.verdict],
              fontWeight: 700,
              fontSize: 18
            }}
          >
            {s.verdict} — Score {s.score}
          </div>

          <div style={{ background: '#222', height: 8, marginTop: 6 }}>
            <div
              style={{
                width: `${s.score}%`,
                background: verdictColor[s.verdict],
                height: '100%'
              }}
            />
          </div>

          <p><strong>Raw:</strong> {s.raw_text}</p>
          <p><strong>Normalized:</strong> {s.normalized}</p>

          <strong>Why:</strong>
          <ul>
            {s.reason.split(', ').map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  )
}
