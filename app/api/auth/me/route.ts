import { NextResponse } from "next/server";
import { getTokenName, verifyToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const tokenName = getTokenName();

  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${tokenName}=`))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const decoded = verifyToken<{ email: string }>(decodeURIComponent(token));

  if (!decoded?.email) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: { email: decoded.email } }, { status: 200 });
}
