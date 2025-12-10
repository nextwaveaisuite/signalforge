'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setAllowed(data.is_pro))
  }, [])

  if (allowed === null) return <p>Loading...</p>

  if (!allowed) {
    return (
      <main>
        <h1>Upgrade Required</h1>
        <p>This feature is available on Pro.</p>

        <button
          onClick={async () => {
            const res = await fetch('/api/stripe/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: 'user@email.com' })
            })
            const data = await res.json()
            window.location.href = data.url
          }}
        >
          Upgrade to Pro
        </button>
      </main>
    )
  }

  return <h1>✅ Pro Dashboard</h1>
}
