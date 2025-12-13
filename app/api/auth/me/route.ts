import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.id,
        email: payload.email,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
