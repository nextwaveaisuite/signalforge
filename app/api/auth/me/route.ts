import { NextRequest, NextResponse } from "next/server";
import { verifyToken, findUserById } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("sf_token")?.value;

  if (!token) return NextResponse.json({ user: null });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ user: null });

  const user = findUserById(decoded.userId);
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      email: user.email,
      plan: user.plan,
    },
  });
}
