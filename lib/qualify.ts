type Input = {
  budget: string
  timeline: string
  intent: string
}

export function qualifyLead(input: Input) {
  let score = 0
  const reasons: string[] = []

  if (input.budget.toLowerCase().includes('high')) {
    score += 30
    reasons.push('High budget')
  }

  if (input.timeline.toLowerCase().includes('soon')) {
    score += 25
    reasons.push('Urgent timeline')
  }

  if (input.intent.toLowerCase().includes('automation')) {
    score += 30
    reasons.push('Automation intent')
  }

  let status: 'qualified' | 'review' | 'rejected' = 'review'

  if (score >= 60) status = 'qualified'
  if (score < 30) status = 'rejected'

  return {
    score,
    status,
    reason: reasons.join(', ') || 'Baseline lead'
  }
}
