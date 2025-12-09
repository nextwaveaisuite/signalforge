'use client'

import { useState } from 'react'

export default function IngestPage() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function submit() {
    setStatus('Processing...')
    await fetch('/api/signals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    setText('')
    setStatus('Signal ingested ✅')
  }

  return (
    <main>
      <h1>Signal Ingest</h1>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Describe the raw pain or frustration"
      />
      <button onClick={submit}>Submit</button>
      {status && <p>{status}</p>}
    </main>
  )
}
