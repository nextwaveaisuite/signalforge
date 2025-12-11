import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { setUserPlan } from "@/lib/userStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook signature error: ${err.message}` },
      { status: 400 }
    );
  }

  // ✔ Handle checkout success
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const customerId = session.customer;

    if (customerId) {
      setUserPlan(customerId, "pro");
    }
  }

  return NextResponse.json({ received: true });
}
