import { NextRequest, NextResponse } from "next/server";
import {
  db,
  hashPassword,
  findUserByEmail,
  generateToken,
  User,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      plan: "free", // ✅ literal union
    };

    db.users.push(user);

    const token = generateToken({ id: user.id, email: user.email });

    const res = NextResponse.json({
      user: { email: user.email, plan: user.plan },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}
