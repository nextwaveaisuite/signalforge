'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

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
  const [undoPayload, setUndoPayload] = useState<{ session_id: string; data: Signal[] } | null>(null)
  const undoTimer = useRef<NodeJS.Timeout | null>(null)

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

  async function deleteSession(session_id: string, data: Signal[]) {
    if (!confirm('Delete this archived session? This cannot be undone after 10 seconds.')) {
      return
    }

    await fetch('/api/signals/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id })
    })

    setUndoPayload({ session_id, data })
    setSignals(prev => prev.filter(s => s.session_id !== session_id))
    setStatus('Session deleted — undo available')

    if (undoTimer.current) clearTimeout(undoTimer.current)
    undoTimer.current = setTimeout(() => {
      setUndoPayload(null)
      setStatus(null)
    }, 10000)
  }

  async function undoDelete() {
    if (!undoPayload) return

    for (const s of undoPayload.data) {
      await fetch('/api/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: s.raw_text })
      })
    }

    setUndoPayload(null)
    setStatus('Delete undone ✅')
    load()
  }

  const { currentSession, pastSessions } = useMemo(() => {
    const grouped: Record<string, Signal[]> = {}
    signals.forEach(s => {
      if (!grouped[s.session_id]) grouped[s.session_id] = []
      grouped[s.session_id].push(s)
    })

    const entries = Object.entries(grouped)
    const [current, ...past] = entries

    return {
      currentSession: current?.[1] ?? [],
      pastSessions: Object.fromEntries(past)
    }
  }, [signals])

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

      {undoPayload && (
        <button
          onClick={undoDelete}
          style={{ marginTop: 8, background: '#2563eb' }}
        >
          Undo delete
        </button>
      )}

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

      {/* ARCHIVED */}
      {Object.keys(pastSessions).length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2>Archived Sessions</h2>
          {Object.entries(pastSessions).map(([sid, items]) => (
            <details key={sid} style={{ marginBottom: 12 }}>
              <summary>Session ({items.length} signals)</summary>

              <button
                onClick={() => deleteSession(sid, items)}
                style={{ background: '#991b1b', marginTop: 8 }}
              >
                Delete Session
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
