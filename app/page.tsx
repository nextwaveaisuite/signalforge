'use client'

import { useEffect, useMemo, useState } from 'react'

type Signal = {
  raw_text: string
  normalized: string
  score: number
  verdict: 'BUILD' | 'WATCH' | 'KILL'
  reason: string
  session_id: string
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

  const load = () =>
    fetch('/api/signals')
      .then(r => r.json())
      .then(setSignals)

  useEffect(() => { load() }, [])

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
    load()
  }

  async function archiveSession() {
    await fetch('/api/signals/clear', { method: 'POST' })
    setStatus('New session started ✅')
    load()
  }

  async function deleteSession(session_id: string) {
    await fetch('/api/signals/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id })
    })
    setStatus('Archived session deleted ✅')
    load()
  }

  const { currentSessionId, currentSession, pastSessions } = useMemo(() => {
    if (signals.length === 0) {
      return { currentSessionId: null, currentSession: [], pastSessions: {} }
    }

    const grouped: Record<string, Signal[]> = {}
    signals.forEach(s => {
      if (!grouped[s.session_id]) grouped[s.session_id] = []
      grouped[s.session_id].push(s)
    })

    const ordered = Object.entries(grouped)
    const [current, ...past] = ordered

    return {
      currentSessionId: current?.[0],
      currentSession: current?.[1] ?? [],
      pastSessions: Object.fromEntries(past)
    }
  }, [signals])

  return (
    <main style={{ maxWidth: 960 }}>
      <h1>SignalForge</h1>

      {/* INGEST */}
      <section>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Describe the raw pain or frustration…"
        />
        <button onClick={submit}>Submit</button>
        {status && <p>{status}</p>}
      </section>

      {/* CONTROLS */}
      {currentSession.length > 0 && (
        <button
          onClick={archiveSession}
          style={{ background: '#7f1d1d', margin: '16px 0' }}
        >
          Archive Current Session & Start New
        </button>
      )}

      {/* CURRENT SESSION */}
      <section>
        <h2>Current Session</h2>
        {currentSession.map((s, i) => (
          <SignalCard key={i} s={s} />
        ))}
      </section>

      {/* HISTORY */}
      {Object.keys(pastSessions).length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2>Archived Sessions</h2>

          {Object.entries(pastSessions).map(([sid, items]) => (
            <details key={sid} style={{ marginBottom: 12 }}>
              <summary>
                Session ({items.length} signals)
              </summary>

              <button
                onClick={() => deleteSession(sid)}
                style={{
                  margin: '8px 0',
                  background: '#991b1b'
                }}
              >
                Delete This Session
              </button>

              {items.map((s, i) => (
                <SignalCard key={i} s={s} faded />
              ))}
            </details>
          ))}
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
