import { NextResponse } from "next/server";
import { getUserEmailFromCookie, findUserByEmail } from "@/lib/auth";

export async function GET() {
  const email = getUserEmailFromCookie();
  if (!email) return NextResponse.json({ user: null });

  const user = await findUserByEmail(email);
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: { email: user.email, plan: user.plan },
  });
}
