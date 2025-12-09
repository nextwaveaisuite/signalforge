export async function normalizePain(raw: string): Promise<string> {
  // Simple AI-like normalization until we add OpenAI
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}
