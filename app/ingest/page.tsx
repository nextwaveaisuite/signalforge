'use client';
import { useState } from 'react';

export default function Ingest() {
  const [text, setText] = useState('');
  async function submit() {
    await fetch('/api/signals', {
      method: 'POST',
      body: JSON.stringify({ source: 'manual', raw_text: text })
    });
    alert('Signal ingested');
  }
  return (
    <div>
      <textarea onChange={e=>setText(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}