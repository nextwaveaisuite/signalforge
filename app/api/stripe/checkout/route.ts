// app/api/stripe/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // e.g. price_1234
          quantity: 1,
        },
      ],
      success_url: "https://signal.nextwaveaisuite.com/dashboard?upgraded=true",
      cancel_url: "https://signal.nextwaveaisuite.com/pricing",
    });

    // 🔥 MAGIC LINE — redirect instead of JSON
    return NextResponse.redirect(session.url!, 303);

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
