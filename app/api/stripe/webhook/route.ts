import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const USERS_FILE = process.cwd() + "/data/users.json";

function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  } catch {
    return { users: {} };
  }
}

function saveUsers(data: any) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 🔥 Handle successful subscription
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.customer) {
      console.warn("No customer ID in session");
      return NextResponse.json({ status: "ok" });
    }

    const customerId = session.customer.toString();
    const data = loadUsers();

    data.users[customerId] = { plan: "pro" };
    saveUsers(data);

    console.log("🔥 User upgraded:", customerId);
  }

  return NextResponse.json({ received: true });
}
