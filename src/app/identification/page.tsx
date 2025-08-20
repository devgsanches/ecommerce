'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getShippingAddress } from '@/actions/get-shipping-address'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Steps } from '@/components/common/steps'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useItemsCart } from '@/hooks/ItemsCart'
import { useInitializeCart } from '@/hooks/useInitializeCart'
import { ShippingAddressType } from '@/types/shipping-address'
import { formatCurrency } from '@/utils/formatCurrency'

import { NewAddressForm } from './components/new-address-form'
import { ProductItem } from './components/product-item'
import { ShippingAddress } from './components/shipping-address'

export default function IdentificationPage() {
  const [identification, setIdentification] = useState<boolean>(false)
  const [newAddress, setNewAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] =
    useState<ShippingAddressType | null>(null)
  const [shippingAddresses, setShippingAddresses] = useState<
    ShippingAddressType[]
  >([])

  const { itemsCart } = useItemsCart()
  const { isLoading } = useInitializeCart() // Inicializa o carrinho com dados do servidor

  const fetchShippingAddress = async () => {
    const response = await getShippingAddress()
    setShippingAddresses(response)
  }

  const handleAddressSelection = (address: ShippingAddressType) => {
    setSelectedAddress(address)
    // Salva o endereço selecionado no localStorage
    localStorage.setItem('selectedShippingAddress', JSON.stringify(address))
  }

  useEffect(() => {
    fetchShippingAddress()
  }, [])

  return (
    <>
      <Header />
      <div className="space-y-6 px-5">
        {/* Identification */}
        <Steps identification={identification} />
        <Card className="gap-0">
          <CardContent className="space-y-8 p-0 px-5">
            <h2 className="font-semibold">Identificação</h2>
            <div className="flex min-w-full">
              {shippingAddresses.map((address) => {
                return (
                  <ShippingAddress
                    key={address.id}
                    setNewAddress={setNewAddress}
                    address={address}
                    onSelect={() => handleAddressSelection(address)}
                    isSelected={selectedAddress?.id === address.id}
                  />
                )
              })}
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
                disabled={!selectedAddress}
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
