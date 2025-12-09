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
  const [focusMode, setFocusMode] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const load = () =>
    fetch('/api/signals')
      .then(r => r.json())
      .then(setSignals)

  useEffect(() => { load() }, [])

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        submit()
      }
      if (e.key === 'Escape') {
        setText('')
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'n') {
        archiveSession()
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        setFocusMode(f => !f)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

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
    textareaRef.current?.focus()
  }

  async function archiveSession() {
    await fetch('/api/signals/clear', { method: 'POST' })
    setStatus('New session started ✅')
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
        ref={textareaRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Describe the raw pain or frustration…
Ctrl+Enter to submit"
      />
      <button onClick={submit}>Submit</button>

      {status && <p>{status}</p>}

      {/* CONTROLS */}
      {currentSession.length > 0 && (
        <div style={{ margin: '16px 0' }}>
          <button
            onClick={archiveSession}
            style={{ background: '#7f1d1d', marginRight: 8 }}
          >
            Archive Session
          </button>

          <button
            onClick={() => setFocusMode(f => !f)}
            style={{ background: '#1f2937' }}
          >
            {focusMode ? 'Exit Focus Mode' : 'Focus Mode'}
          </button>
        </div>
      )}

      {/* CURRENT SESSION */}
      <section>
        <h2>Current Session</h2>
        {currentSession.map((s, i) => (
          <SignalCard key={i} s={s} />
        ))}
      </section>

      {/* HISTORY */}
      {!focusMode && Object.keys(pastSessions).length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2>Archived Sessions</h2>
          {Object.entries(pastSessions).map(([sid, items]) => (
            <details key={sid} style={{ marginBottom: 12 }}>
              <summary>Session ({items.length} signals)</summary>
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
