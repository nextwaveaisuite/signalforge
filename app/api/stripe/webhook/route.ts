import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const runtime = "nodejs"; // Required for raw body

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("⚠️ Webhook signature failed:", err.message);
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  // CONNECT TO SUPABASE
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service role key
  );

  // HANDLE SUBSCRIPTION ACTIVATED
  if (event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated") {

    const subscription = event.data.object as any;
    const customerId = subscription.customer;

    console.log("📌 Subscription webhook received:", subscription.status);

    // LOOKUP user with matching Stripe customer_id
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("stripe_customer_id", customerId)
      .single();

    if (user) {
      await supabase
        .from("users")
        .update({ plan: "pro" })
        .eq("id", user.id);

      console.log("🎉 User upgraded to PRO:", user.email);
    }
  }

  // HANDLE SUBSCRIPTION CANCELLED
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as any;
    const customerId = subscription.customer;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("stripe_customer_id", customerId)
      .single();

    if (user) {
      await supabase
        .from("users")
        .update({ plan: "free" })
        .eq("id", user.id);

      console.log("⚠️ Subscription canceled — user downgraded:", user.email);
    }
  }

  return NextResponse.json({ received: true });
}
