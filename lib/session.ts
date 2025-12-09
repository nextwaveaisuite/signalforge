let currentSessionId: string | null = null

export function getSessionId(): string {
  if (!currentSessionId) {
    currentSessionId = crypto.randomUUID()
  }
  return currentSessionId
}

export function rotateSession() {
  currentSessionId = crypto.randomUUID()
}
