'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Steps } from '@/components/common/steps'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useItemsCart } from '@/hooks/ItemsCart'
import { useInitializeCart } from '@/hooks/useInitializeCart'
import { formatCurrency } from '@/utils/formatCurrency'

import { ProductItem } from '../identification/components/product-item'

export default function PaymentPage() {
  const [sucess, setSucess] = useState<boolean>(false)
  const { itemsCart } = useItemsCart()
  const { isLoading } = useInitializeCart() // Inicializa o carrinho com dados do servidor
  const [payment, setPayment] = useState<boolean>(false)
  const [identification] = useState<boolean>(true)

  function handlePayment() {
    setPayment(true)
    setSucess(true)
  }

  return (
    <>
      <Header />
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
                      Satoshi, Rua Pitangueira, 842, Apto 15A, Jardim das
                      Flores, 05845-230, São Paulo, SP, Brasil
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Button
                className="h-12.5 w-full rounded-full bg-[#5131E8]"
                size="lg"
                onClick={handlePayment}
              >
                Finalizar a compra
              </Button>

              <Dialog open={sucess} onOpenChange={() => setSucess(false)}>
                <DialogContent className="flex flex-col justify-center">
                  <DialogHeader className="flex flex-col items-center gap-8">
                    <Image
                      src="/illustration.svg"
                      alt="Pedido Efetuado"
                      width={275}
                      height={275}
                      className="pt-8"
                    />
                    <div className="flex flex-col gap-6">
                      <DialogTitle className="text-2xl font-semibold">
                        Pedido Efetuado!
                      </DialogTitle>
                      <DialogDescription className="text-center text-sm font-medium">
                        Seu pedido foi efetuado com sucesso. Você pode
                        acompanhar o status na seção de “Meus Pedidos”.
                      </DialogDescription>
                    </div>
                  </DialogHeader>
                  {/* BUTTONS */}
                  <div className="flex w-full flex-col gap-4">
                    <Button
                      variant={'default'}
                      size={'lg'}
                      className="h-12.5 rounded-full bg-[#5131E8] text-sm font-semibold"
                    >
                      Ver meu pedido
                    </Button>
                    <Button
                      variant={'ghost'}
                      size={'lg'}
                      className="h-12.5 rounded-full text-sm font-semibold"
                      asChild
                    >
                      <Link href="/">Página inicial</Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <p className="text-sm text-[#656565]">
                    {formatCurrency(itemsCart.totalPriceInCents)}
                  </p>
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
              {formatCurrency(itemsCart.totalPriceInCents)}
            </div>
            <Separator />
            <div className="mt-4">
              {isLoading ? (
                <p>Carregando..</p>
              ) : (
                itemsCart.items.map((product, i) => {
                  return (
                    <div
                      className={`${i !== itemsCart.items.length - 1 ? 'border-b' : ''} flex gap-4 py-6`}
                      key={product.productVariant.id}
                    >
                      <ProductItem
                        product={{
                          id: product.productVariant.id,
                          image: product.productVariant.imageUrl,
                          name: product.productVariant.product.name,
                          description:
                            product.productVariant.product.description,
                          quantity: product.quantity,
                          price: product.productVariant.priceInCents,
                        }}
                        productVariant={product.productVariant}
                      />
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  )
}
