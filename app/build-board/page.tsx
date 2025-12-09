'use client'

import { useEffect, useMemo, useState } from 'react'

type Signal = {
  raw_text: string
  normalized: string
  score: number
  verdict: 'BUILD' | 'WATCH' | 'KILL'
  reason: string
  created_at?: string
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

  // ---------- PHASE 3: INTELLIGENCE ----------
  const insights = useMemo(() => {
    if (signals.length === 0) return null

    const buckets: Record<string, Signal[]> = {}

    signals.forEach(s => {
      const key = s.normalized
      if (!buckets[key]) buckets[key] = []
      buckets[key].push(s)
    })

    const ranked = Object.entries(buckets)
      .map(([normalized, items]) => {
        const avgScore =
          items.reduce((a, b) => a + b.score, 0) / items.length

        const buildCount = items.filter(i => i.verdict === 'BUILD').length

        return {
          normalized,
          count: items.length,
          avgScore: Math.round(avgScore),
          buildPressure: buildCount
        }
      })
      .sort((a, b) => b.count * b.avgScore - a.count * a.avgScore)

    return ranked
  }, [signals])

  return (
    <main style={{ maxWidth: 1000 }}>
      <h1>Build Board</h1>

      {/* ---------- PHASE 3: INSIGHTS PANEL ---------- */}
      {insights && insights.length > 0 && (
        <section
          style={{
            border: '1px solid #333',
            borderRadius: 6,
            padding: 16,
            marginBottom: 24
          }}
        >
          <h2>Founder Intelligence</h2>
          <p style={{ opacity: 0.75 }}>
            Repeating pains indicate stronger opportunities.
          </p>

          {insights.slice(0, 5).map((i, idx) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <strong>{i.normalized}</strong>
              <div style={{ fontSize: 14, opacity: 0.85 }}>
                Appears {i.count}× · Avg score {i.avgScore} · BUILD signals{' '}
                {i.buildPressure}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ---------- SIGNALS ---------- */}
      {signals.length === 0 && (
        <p style={{ opacity: 0.6 }}>No persisted signals yet.</p>
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
          <div
            style={{
              color: verdictColor[s.verdict],
              fontSize: 18,
              fontWeight: 700
            }}
          >
            {s.verdict} — Score {s.score}
          </div>

          <div
            style={{
              marginTop: 8,
              background: '#222',
              height: 8,
              borderRadius: 4
            }}
          >
            <div
              style={{
                width: `${s.score}%`,
                background: verdictColor[s.verdict],
                height: '100%',
                borderRadius: 4
              }}
            />
          </div>

          <p>
            <strong>Raw:</strong> {s.raw_text}
          </p>
          <p>
            <strong>Normalized:</strong> {s.normalized}
          </p>

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
