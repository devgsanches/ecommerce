import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { getCart } from '@/actions/get-cart'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { shippingAddress, totalAmount } = await request.json()

    if (!shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 },
      )
    }

    // Busca o carrinho atual
    const cart = await getCart('/payment')

    if (!cart.items || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Cria o payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'brl',
      metadata: {
        cartId: cart.id,
        shippingAddressId: shippingAddress.id,
        userId: cart.userId,
      },
      receipt_email: shippingAddress.email,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
