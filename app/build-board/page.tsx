'use client'

import { useEffect, useState } from 'react'

export default function BuildBoard() {
  const [signals, setSignals] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/signals')
      .then(res => res.json())
      .then(setSignals)
  }, [])

  return (
    <main>
      <h1>Build Board</h1>

      {signals.length === 0 && <p>No signals yet.</p>}

      {signals.map((s, i) => (
        <div key={i} style={{ border: '1px solid #333', padding: 12, marginBottom: 10 }}>
          <strong>{s.verdict}</strong> — Score: {s.score}
          <p><em>Raw:</em> {s.raw_text}</p>
          <p><em>Normalized:</em> {s.normalized}</p>
          <p><em>Reason:</em> {s.reason}</p>
        </div>
      ))}
    </main>
  )
}
