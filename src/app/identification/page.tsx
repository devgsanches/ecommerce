'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Steps } from '@/components/common/steps'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useItemsCart } from '@/hooks/ItemsCart'
import { useInitializeCart } from '@/hooks/useInitializeCart'
import { formatCurrency } from '@/utils/formatCurrency'

import { NewAddressForm } from './components/new-address-form'
import { ProductItem } from './components/product-item'

export default function IdentificationPage() {
  const [identification, setIdentification] = useState<boolean>(false)
  const [newAddress, setNewAddress] = useState(false)

  const { itemsCart } = useItemsCart()
  const { isLoading } = useInitializeCart() // Inicializa o carrinho com dados do servidor

  return (
    <>
      <Header />
      <div className="space-y-6 px-5">
        {/* Identification */}
        <Steps identification={identification} />
        <Card className="gap-0">
          <CardContent className="space-y-8 p-0 px-5">
            <h2 className="font-semibold">Identificação</h2>
            <div className="flex">
              <RadioGroup>
                <Card>
                  <CardContent className="flex px-6">
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <RadioGroupItem
                        value="address"
                        id="address"
                        className="h-4 w-4"
                        onClick={() => setNewAddress(false)}
                      />
                      <Label htmlFor="address">
                        Satoshi, Rua Pitangueira, 842, Apto 15A, Jardim das
                        Flores...
                      </Label>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex h-12.5 items-center">
                  <CardContent className="flex h-full w-full px-6">
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <RadioGroupItem
                        value="new-address"
                        id="new-address"
                        className="h-4 w-4"
                        onClick={() => setNewAddress(true)}
                      />
                      <Label htmlFor="new-address">
                        Adicionar novo endereço
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            {newAddress && (
              <>
                <Separator />
                <NewAddressForm setIdentification={setIdentification} />
              </>
            )}
            {!newAddress && (
              <Button
                className="h-12.5 w-full rounded-full bg-[#5131E8]"
                size="lg"
                asChild
                onClick={() => setIdentification(true)}
              >
                <Link href="/payment">Continuar com o pagamento</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Your order */}
        <Card className="mb-15 px-5">
          <CardContent className="space-y-3 px-0">
            <div className="space-y-6">
              <h2 className="font-semibold">Seu pedido</h2>
              {isLoading ? (
                <div className="space-y-3">
                  <p className="text-sm text-[#656565]">Carregando...</p>
                </div>
              ) : (
                <>
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
                  <div className="flex justify-between font-semibold">
                    <p className="text-sm font-medium">Total</p>
                    {formatCurrency(itemsCart.totalPriceInCents)}
                  </div>
                  <Separator />
                  <div className="mt-4">
                    {itemsCart.items.map((product, i) => {
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
                    })}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  )
}
