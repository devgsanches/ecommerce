import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { finishOrder } from '@/actions/finish-order'
import { updateCartShippingAddress } from '@/actions/update-cart-shipping-address'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        if (paymentIntent.status === 'succeeded') {
          try {
            const { shippingAddressId } = paymentIntent.metadata!

            // Atualiza o carrinho com o endereço
            await updateCartShippingAddress(shippingAddressId)

            // Finaliza o pedido
            await finishOrder()

            console.log(
              'Order completed successfully for payment intent:',
              paymentIntent.id,
            )
          } catch (error) {
            console.error('Error processing payment intent:', error)
            return NextResponse.json(
              { error: 'Error processing order' },
              { status: 500 },
            )
          }
        }
        break

      case 'checkout.session.completed':
        console.log('Checkout session completed:', event.data.object.id)
        break

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 },
    )
  }
}
