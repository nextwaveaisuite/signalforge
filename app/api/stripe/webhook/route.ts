import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs"; // Fixes deprecated config
export const dynamic = "force-dynamic"; // Required for webhooks

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

/**
 * Stripe Webhook Handler
 */
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook signature failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Only handle checkout completion for now
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("🔔 Payment received:", session.id);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
