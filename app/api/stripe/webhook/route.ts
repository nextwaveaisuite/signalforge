import Stripe from "stripe";
import { NextResponse } from "next/server";
import { setUserPlan } from "@/lib/userStore";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")!;

  let event;
  const body = await request.text();

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 🔥 Handle subscription activation
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerId = session.customer as string;

    setUserPlan(customerId, "pro");
  }

  // 🔥 Handle subscription cancellation (optional)
  if (event.type === "customer.subscription.deleted") {
    const customerId = event.data.object.customer as string;
    setUserPlan(customerId, "free");
  }

  return NextResponse.json({ received: true });
}
