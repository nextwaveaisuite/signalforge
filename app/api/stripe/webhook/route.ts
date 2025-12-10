import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * IMPORTANT:
 * - Stripe SDK MUST be installed as a dependency
 * - STRIPE_SECRET_KEY must exist
 * - STRIPE_WEBHOOK_SECRET must exist
 */

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string,
  {
    apiVersion: "2023-10-16"
  }
);

export async function POST(req: Request) {
  // 1️⃣ Read raw body (required for Stripe signature verification)
  const body = await req.text();

  // 2️⃣ Get Stripe signature header
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  // 3️⃣ Verify webhook authenticity
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("❌ Stripe Webhook Verification Failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // 4️⃣ Handle relevant events
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // ✅ PAYMENT SUCCESS
        // TODO (Phase G+): mark user as PRO in database
        console.log("✅ Checkout completed:", session.id);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        // ✅ SUBSCRIPTION UPDATED
        console.log("🔄 Subscription updated:", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // ✅ SUBSCRIPTION CANCELLED
        console.log("🗑️ Subscription deleted:", subscription.id);
        break;
      }

      default:
        // Ignore other events safely
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("❌ Webhook handling error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  // 5️⃣ Acknowledge receipt to Stripe
  return NextResponse.json({ received: true });
}
