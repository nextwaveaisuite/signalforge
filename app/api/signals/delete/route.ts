import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getUserEmailFromCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const email = getUserEmailFromCookie();

  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Get the user
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Delete signal only if owned by user
  await supabase
    .from("signals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  return NextResponse.json({ success: true });
                                      }
    
