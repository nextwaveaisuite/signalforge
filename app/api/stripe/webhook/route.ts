import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Required for App Router webhook endpoints
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const maxDuration = 60;

// Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Supabase client (service role key required)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Get raw text, not JSON
    const rawBody = await req.text();

    const signature = req.headers.get("stripe-signature")!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error("❌ Invalid signature:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 🎯 Checkout session completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const email = session.customer_details?.email;

      console.log("Checkout completed for:", email);

      if (email) {
        const { error } = await supabase
          .from("profiles")
          .update({ plan: "pro" })
          .eq("email", email);

        if (error) {
          console.error("❌ Supabase update error:", error);
        } else {
          console.log(`✅ User upgraded to Pro: ${email}`);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Webhook handler failed:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
