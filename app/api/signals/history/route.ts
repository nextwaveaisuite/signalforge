import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getUserEmailFromCookie, findUserByEmail } from "@/lib/auth";

export async function GET() {
  const email = getUserEmailFromCookie();
  if (!email) return NextResponse.json([]);

  const user = await findUserByEmail(email);
  if (!user) return NextResponse.json([]);

  const { data } = await supabase
    .from("signals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json(data || []);
}
