import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 👉 TEMP simple plan check (always "free")
    return NextResponse.json({ plan: "free" });
  } catch {
    return NextResponse.json({ plan: "free" });
  }
}
