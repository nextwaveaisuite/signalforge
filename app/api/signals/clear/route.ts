import { NextResponse } from 'next/server'
import { rotateSession } from '../../../../lib/session'

export async function POST() {
  rotateSession()
  return NextResponse.json({ success: true })
}
