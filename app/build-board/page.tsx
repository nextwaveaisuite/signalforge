'use client'

import { useEffect, useState } from 'react'

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

export default function BuildBoard() {
  const [signals, setSignals] = useState<Signal[]>([])

  useEffect(() => {
    fetch('/api/signals')
      .then(res => res.json())
      .then(setSignals)
  }, [])

  return (
    <main style={{ maxWidth: 900 }}>
      <h1>Build Board</h1>

      {signals.length === 0 && (
        <p style={{ opacity: 0.6 }}>
          No persisted signals yet.
        </p>
      )}

      {signals.map((s, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #333',
            borderRadius: 6,
            padding: 16,
            marginBottom: 16
          }}
        >
          <div style={{ color: verdictColor[s.verdict], fontSize: 18, fontWeight: 700 }}>
            {s.verdict} — Score {s.score}
          </div>

          <div style={{ marginTop: 8, background: '#222', height: 8, borderRadius: 4 }}>
            <div
              style={{
                width: `${s.score}%`,
                background: verdictColor[s.verdict],
                height: '100%',
                borderRadius: 4
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
