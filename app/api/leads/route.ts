import { NextResponse } from "next/server";

/**
 * Temporary Lead Intake Endpoint
 * Phase: Pre-email / Pre-database
 *
 * Collects lead data and acknowledges receipt.
 * No external services.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body || !body.email || !body.purpose) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // ✅ For now, just log (Phase F locked)
    console.log("✅ Lead captured:", {
      name: body.name,
      email: body.email,
      budget: body.budget,
      timeline: body.timeline,
      purpose: body.purpose
    });

    return NextResponse.json({
      success: true,
      message: "Lead received"
    });
  } catch (error) {
    console.error("Lead intake failed", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
