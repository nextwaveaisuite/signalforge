import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const passwordHash = await hashPassword(password);

  const { data: user, error } = await supabase
    .from("users")
    .insert({
      email,
      password_hash: passwordHash,
      plan: "free",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
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
