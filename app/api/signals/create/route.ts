import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, raw, verdict, score } = body;

    const { error } = await supabase.from("signals").insert({
      user_id,
      raw,
      verdict,
      score
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
