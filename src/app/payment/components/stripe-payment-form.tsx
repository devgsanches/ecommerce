'use client'

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShippingAddressType } from '@/types/shipping-address'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

interface PaymentFormProps {
  shippingAddress: ShippingAddressType
  totalAmount: number
  onSuccess: () => void
  onError: (error: string) => void
}

function PaymentForm({
  shippingAddress,
  totalAmount,
  onSuccess,
  onError,
}: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      // Criar payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddress,
          totalAmount,
        }),
      })

      const { clientSecret } = await response.json()

      // Confirmar pagamento
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: shippingAddress.recipientName,
              email: shippingAddress.email,
            },
          },
        },
      )

      if (error) {
        onError(error.message || 'Erro no pagamento')
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess()
      }
    } catch {
      onError('Erro ao processar pagamento')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-4 px-3 py-2">
        <CardContent className="p-0">
          <div className="mb-4">
            <label className="mb-4 block text-sm font-medium">
              Informações do Cartão
            </label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="h-12.5 w-full rounded-full bg-[#5131E8]"
        size="lg"
      >
        {isProcessing
          ? 'Processando pagamento..'
          : `Pagar R$ ${(totalAmount / 100).toFixed(2)}`}
      </Button>
    </form>
  )
}

export function StripePaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  )
}
