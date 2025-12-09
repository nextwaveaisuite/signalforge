type LeadInput = {
  budget: string
  timeline: string
  intent: string
}

export function qualifyLead(input: LeadInput) {
  let score = 0
  const reasons: string[] = []

  // Budget
  if (input.budget.includes('2,000')) {
    score += 40
    reasons.push('High budget')
  } else if (input.budget.includes('500')) {
    score += 20
    reasons.push('Medium budget')
  }

  // Timeline
  if (input.timeline === 'Immediately' || input.timeline === 'Within 30 days') {
    score += 30
    reasons.push('Short timeline')
  } else if (input.timeline === '1–3 months') {
    score += 10
    reasons.push('Moderate timeline')
  }

  // Intent
  if (input.intent === 'Ready to buy') {
    score += 30
    reasons.push('High intent')
  } else if (input.intent === 'Comparing options') {
    score += 15
    reasons.push('Moderate intent')
  }

  let status: 'qualified' | 'review' | 'rejected' = 'rejected'
  if (score >= 70) status = 'qualified'
  else if (score >= 40) status = 'review'

  return {
    score,
    status,
    reason: reasons.join(', ')
  }
}
