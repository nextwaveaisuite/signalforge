import { NextResponse } from "next/server";
import { getUserPlan } from "@/lib/userStore";

export async function GET() {
  try {
    const plan = await getUserPlan("default-user"); 
    // ⚠️ Replace "default-user" with real auth later
    
    return NextResponse.json({ plan });
  } catch (err) {
    return NextResponse.json({ plan: "free" });
  }
}
