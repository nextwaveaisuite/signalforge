import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { hashPassword, generateToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = getSupabase();

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const password_hash = await hashPassword(password);

  const { data: user, error } = await supabase
    .from("users")
    .insert({ email, password_hash, plan: "free" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const token = generateToken({ id: user.id, email: user.email });

  const res = NextResponse.json({ user: { email, plan: user.plan } });
  res.cookies.set("auth", token, { httpOnly: true, path: "/" });

  return res;
}
