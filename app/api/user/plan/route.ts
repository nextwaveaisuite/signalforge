import { NextResponse } from "next/server";
import { getUserEmailFromCookie, findUserByEmail } from "@/lib/auth";

export async function GET() {
  const email = getUserEmailFromCookie();
  if (!email) return NextResponse.json({ plan: "free" });

  const user = await findUserByEmail(email);
  return NextResponse.json({ plan: user?.plan || "free" });
}
