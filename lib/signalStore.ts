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
  const lower = text.toLowerCase()

  if (lower.includes('manual') && lower.includes('slow')) {
    return 'process is manual and slow'
  }
  if (lower.includes('no tool') || lower.includes('hard to')) {
    return 'missing tooling causes friction'
  }
  if (lower.includes('waste') || lower.includes('too much time')) {
    return 'time inefficiency problem'
  }

  return 'general workflow pain'
}

function scoreSignal(text: string): { score: number; reason: string } {
  const t = text.toLowerCase()
  let score = 0
  const reasons: string[] = []

  if (t.includes('manual') || t.includes('slow')) {
    score += 30
    reasons.push('Manual process')
  }

  if (t.includes('every day') || t.includes('always')) {
    score += 20
    reasons.push('Frequent pain')
  }

  if (t.includes('business') || t.includes('client')) {
    score += 15
    reasons.push('Commercial relevance')
  }

  if (t.includes('automate') || t.includes('tool')) {
    score += 20
    reasons.push('Automation-ready')
  }

  if (score < 25) reasons.push('Weak or vague pain')

  return {
    score: Math.min(score, 100),
    reason: reasons.join(', ')
  }
}

function verdictFor(score: number): Verdict {
  if (score >= 70) return 'BUILD'
  if (score >= 40) return 'WATCH'
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
