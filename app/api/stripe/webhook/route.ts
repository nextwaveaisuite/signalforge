import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; // REQUIRED — replaces `config = {}`

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature mismatch:", err.message);
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 🔥 When payment succeeded → Update user to PRO
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const email = session.customer_details?.email;
    if (!email) return NextResponse.json({ received: true });

    await supabase
      .from("profiles")
      .update({ plan: "pro" })
      .eq("email", email);

    console.log("User upgraded to PRO:", email);
  }

  return NextResponse.json({ received: true });
}
