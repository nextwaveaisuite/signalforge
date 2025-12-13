import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getUserEmailFromCookie, findUserByEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const email = getUserEmailFromCookie();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await findUserByEmail(email);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { id } = await req.json();

  await supabase
    .from("signals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  return NextResponse.json({ success: true });
}
