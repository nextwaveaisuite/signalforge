import { NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'
import { supabase } from '../../../../lib/supabase'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any

    await supabase
      .from('users')
      .upsert({
        email: session.customer_email,
        is_pro: true,
        stripe_customer_id: session.customer,
      })
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as any

    await supabase
      .from('users')
      .update({ is_pro: false })
      .eq('stripe_customer_id', sub.customer)
  }

  return NextResponse.json({ received: true })
}
