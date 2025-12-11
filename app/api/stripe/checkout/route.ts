import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?upgrade=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?upgrade=cancelled`,
    customer_email: user.email!,
    metadata: {
      userId: user.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
