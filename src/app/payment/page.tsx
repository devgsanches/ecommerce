'use client'

import { useState } from 'react'

import { Steps } from '@/components/common/steps'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { ProductItem } from '../identification/components/product-item'

export default function PaymentPage() {
  const products = [
    {
      id: '1',
      image: '/product-01.svg',
      name: 'Nike Tech',
      description: "Men's Fleece Shacket",
      quantity: 1,
      price: 49000,
    },
    {
      id: '2',
      image: '/product-02.svg',
      name: 'Nike Tech',
      description: "Men's Fleece Shacket",
      quantity: 1,
      price: 49000,
    },
  ]
  const [payment, setPayment] = useState<boolean>(false)
  const [identification] = useState<boolean>(true)

  return (
    <div className="space-y-6 px-5">
      {/* Identification */}
      <Steps payment={payment} identification={identification} />
      <Card className="gap-0">
        <CardContent className="space-y-8 p-0 px-5">
          <h2 className="font-semibold">Identificação</h2>
          <div className="flex flex-col gap-8">
            <Card>
              <CardContent className="flex flex-col px-6">
                <div className="flex items-center gap-6 text-sm font-medium">
                  <Label htmlFor="address">
                    Satoshi, Rua Pitangueira, 842, Apto 15A, Jardim das Flores,
                    05845-230, São Paulo, SP, Brasil
                  </Label>
                </div>
              </CardContent>
            </Card>
            <Button
              className="h-12.5 w-full rounded-full bg-[#5131E8]"
              size="lg"
              onClick={() => setPayment(true)}
            >
              Finalizar a compra
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Your order */}
      <Card className="mb-15 px-5">
        <CardContent className="space-y-3 px-0">
          <div className="space-y-6">
            <h2 className="font-semibold">Seu pedido</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium">
                Subtotal
                <p className="text-sm text-[#656565]">R$980</p>
              </div>
              <div className="flex items-center justify-between text-sm font-medium">
                Transporte e Manuseio
                <p className="text-sm text-[#656565]">Grátis</p>
              </div>
              <div className="flex items-center justify-between text-sm font-medium">
                Taxa Estimada
                <p className="text-sm text-[#656565]">-</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <p className="text-sm font-medium">Total</p>
            R$980
          </div>
          <Separator />
          <div className="mt-4">
            {products.map((product, i) => {
              return (
                <div
                  className={`${i !== products.length - 1 ? 'border-b' : ''} flex gap-4 py-6`}
                  key={product.id}
                >
                  <ProductItem product={product} />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
