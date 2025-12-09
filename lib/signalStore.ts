// lib/signalStore.ts

export type Verdict = 'BUILD' | 'WATCH' | 'KILL'

export interface Signal {
  raw_text: string
  normalized: string
  score: number
  verdict: Verdict
  reason: string
}

const signalMemory: Signal[] = []

function normalize(text: string): string {
  const t = text.toLowerCase()

  if (t.includes('manual') || t.includes('slow')) {
    return 'manual or inefficient workflow'
  }

  if (t.includes('what can i build') || t.includes('what should i build')) {
    return 'founder ideation uncertainty'
  }

  if (t.includes('automation') || t.includes('automate')) {
    return 'automation opportunity'
  }

  return 'unclear but exploratory signal'
}

function scoreSignal(text: string): { score: number; reason: string } {
  const t = text.toLowerCase()

  let score = 20
  const reasons: string[] = ['Baseline founder signal']

  if (t.includes('manual') || t.includes('slow')) {
    score += 25
    reasons.push('Manual or inefficient process')
  }

  if (t.includes('every day') || t.includes('daily') || t.includes('each day')) {
    score += 20
    reasons.push('High frequency pain')
  }

  if (t.includes('automation') || t.includes('automate') || t.includes('automated')) {
    score += 30
    reasons.push('Explicit automation requirement')
  }

  if (t.includes('business') || t.includes('client') || t.includes('leads')) {
    score += 10
    reasons.push('Commercial relevance')
  }

  if (t.length < 20) {
    score -= 15
    reasons.push('Low clarity input')
  }

  const finalScore = Math.max(0, Math.min(score, 100))

  return {
    score: finalScore,
    reason: reasons.join(', ')
  }
}

function verdictFor(score: number): Verdict {
  if (score >= 70) return 'BUILD'
  if (score >= 35) return 'WATCH'
  return 'KILL'
}

export function ingestSignal(raw_text: string): Signal {
  const normalized = normalize(raw_text)
  const { score, reason } = scoreSignal(raw_text)
  const verdict = verdictFor(score)

  const signal: Signal = {
    raw_text,
    normalized,
    score,
    verdict,
    reason
  }

  signalMemory.unshift(signal)
  return signal
}

export function getSignals(): Signal[] {
  return signalMemory
}
