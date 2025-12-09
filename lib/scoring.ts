export function scoreSignal(normalized: string) {
  let score = 0;

  // Strong signals
  if (normalized.includes('make money')) score += 30;
  if (normalized.includes('automate')) score += 25;
  if (normalized.includes('niche')) score += 20;

  // Weak signals
  if (normalized.includes('help')) score += 5;

  // AI-like heuristics (simple for now)
  if (normalized.length > 30) score += 10;

  let verdict = 'WATCH';
  if (score >= 60) verdict = 'BUILD';
  if (score <= 20) verdict = 'KILL';

  return { score, verdict };
}
