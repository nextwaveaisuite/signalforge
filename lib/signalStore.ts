// lib/signalStore.ts

export type Verdict = 'BUILD' | 'WATCH' | 'KILL'

export interface Signal {
  raw_text: string
  normalized: string
  score: number
  verdict: Verdict
  reason: string
}

// In-memory store (Phase 1 intentional)
const signalMemory: Signal[] = []

function normalize(text: string): string {
  const t = text.toLowerCase()

  if (t.includes('manual') || t.includes('slow')) {
    return 'manual or inefficient workflow'
  }

  if (t.includes('what can i build') || t.includes('what should i build')) {
    return 'founder ideation uncertainty'
  }

  if (t.includes('build software') || t.includes('saas')) {
    return 'software product ideation'
  }

  if (t.includes('time') || t.includes('waste')) {
    return 'time inefficiency problem'
  }

  return 'unclear but exploratory signal'
}

function scoreSignal(text: string): { score: number; reason: string } {
  const t = text.toLowerCase()

  // Baseline — anything human and non-spam starts here
  let score = 15
  const reasons: string[] = ['Baseline founder signal']

  if (t.includes('manual') || t.includes('slow')) {
    score += 25
    reasons.push('Manual or inefficient process')
  }

  if (t.includes('every day') || t.includes('always')) {
    score += 15
    reasons.push('High frequency pain')
  }

  if (t.includes('business') || t.includes('client') || t.includes('money')) {
    score += 15
    reasons.push('Commercial relevance')
  }

  if (t.includes('automate') || t.includes('tool') || t.includes('software')) {
    score += 15
    reasons.push('Automation potential')
  }

  if (t.includes('what can i build') || t.includes('what should i build')) {
    score += 10
    reasons.push('Founder searching for direction')
  }

  if (t.length < 20) {
    score -= 10
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
