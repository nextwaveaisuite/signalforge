import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, generateToken, findUserByEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = findUserByEmail(email);
    if (!user)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const token = generateToken(user.id);

    const res = NextResponse.json({
      user: { email: user.email, plan: user.plan },
    });

    res.cookies.set("sf_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
