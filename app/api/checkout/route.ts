import { NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'

export async function POST(req: Request) {
  const { email } = await req.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?upgrade=cancelled`,
  })

  return NextResponse.json({ url: session.url })
}
