import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, generateToken, findUserByEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = generateToken({ id: user.id, email: user.email });

  const res = NextResponse.json({
    user: { email: user.email, plan: user.plan },
  });

  res.cookies.set("signalforge_token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
