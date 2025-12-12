import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, generateToken, findUserByEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Already exists?
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      plan: "free",
    };

    db.users.push(user);

    const token = generateToken(user.id);

    const res = NextResponse.json({ user: { email, plan: user.plan } });

    // Set JWT cookie
    res.cookies.set("sf_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (e) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
