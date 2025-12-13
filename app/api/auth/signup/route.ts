import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword, generateToken, findUserByEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  }

  const password_hash = await hashPassword(password);

  const { data, error } = await supabase
    .from("users")
    .insert({
      email,
      password_hash,
      plan: "free",
    })
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }

  const token = generateToken({ id: data.id, email: data.email });

  const res = NextResponse.json({ user: { email, plan: data.plan } });
  res.cookies.set("signalforge_token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
