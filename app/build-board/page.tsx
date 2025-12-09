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
    <main style={{ maxWidth: 860 }}>
      <h1>Build Board</h1>

      {signals.length === 0 && (
        <div style={{ opacity: 0.7 }}>
          <p>No signals yet.</p>
          <p>
            Good signals describe <strong>daily pain</strong>,{" "}
            <strong>manual work</strong>, or clear{" "}
            <strong>automation needs</strong>.
          </p>
        </div>
      )}

      {signals.map((s, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #333',
            padding: 16,
            marginBottom: 16,
            borderRadius: 6
          }}
        >
          <div
            style={{
              color: verdictColor[s.verdict],
              fontWeight: 700,
              fontSize: 18
            }}
          >
            {s.verdict} — Score: {s.score}
          </div>

          {/* Score Bar */}
          <div
            style={{
              marginTop: 8,
              height: 8,
              background: '#222',
              borderRadius: 4,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${s.score}%`,
                height: '100%',
                background: verdictColor[s.verdict]
              }}
            />
          </div>

          <p style={{ marginTop: 12 }}>
            <strong>Raw:</strong> {s.raw_text}
          </p>

          <p>
            <strong>Normalized:</strong> {s.normalized}
          </p>

          <div>
            <strong>Why:</strong>
            <ul>
              {s.reason.split(', ').map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </main>
  )
}
