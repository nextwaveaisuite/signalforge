import { NextResponse } from 'next/server';
let store:any[] = [];
export async function POST(req: Request) {
  const body = await req.json();
  store.push(body);
  return NextResponse.json({ ok: true });
}