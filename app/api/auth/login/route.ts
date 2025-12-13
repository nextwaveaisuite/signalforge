import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateToken, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

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

  res.cookies.set("sf_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
