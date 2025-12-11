export const config = {
  api: {
    bodyParser: false, // REQUIRED for Stripe signature verification
  },
};

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Initialize Supabase (service role key required)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function buffer(readable: ReadableStream<Uint8Array>) {
  const chunks: Uint8Array[] = [];
  const reader = readable.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await buffer(req.body!);

    const sig = req.headers.get("stripe-signature")!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err: any) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // 🟢 Handle checkout session completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const userEmail = session.customer_details?.email;

      console.log("Checkout completed for:", userEmail);

      if (userEmail) {
        const { error } = await supabase
          .from("profiles")
          .update({ plan: "pro" })
          .eq("email", userEmail);

        if (error) {
          console.error("Supabase update error:", error);
        } else {
          console.log(`🔐 User upgraded to Pro: ${userEmail}`);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Webhook Handler Error:", err);
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}
