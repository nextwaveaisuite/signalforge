import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { email } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    await supabase.from("profiles").insert({
      email,
      plan: "free",
      created_at: new Date().toISOString(),
    });
  }

  return NextResponse.json({ ok: true });
}
