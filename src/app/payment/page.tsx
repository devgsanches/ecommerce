'use client'

import { CircleX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { finishOrder } from '@/actions/finish-order'
import { updateCartShippingAddress } from '@/actions/update-cart-shipping-address'
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
import { ShippingAddressType } from '@/types/shipping-address'
import { formatCpfOrCnpj } from '@/utils/format-cpf-or-cnpj'
import { formatCurrency } from '@/utils/formatCurrency'

import { ProductItem } from '../identification/components/product-item'
import { StripePaymentForm } from './components/stripe-payment-form'

export default function PaymentPage() {
  const [sucess, setSucess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()
  const { itemsCart, setItemsCart } = useItemsCart()
  const { isLoading } = useInitializeCart() // Inicializa o carrinho com dados do servidor
  const [payment, setPayment] = useState<boolean>(false)
  const [identification] = useState<boolean>(true)
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddressType | null>(null)

  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedShippingAddress')
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress))
    }
  }, [])

  function formatAddress(address: ShippingAddressType): string {
    const parts = [
      address.recipientName,
      address.street,
      address.number,
      address.complement,
      address.neighborhood,
      address.zipCode,
      address.city,
      address.state,
      address.country,
    ].filter(Boolean)

    return parts.join(', ')
  }

  async function handlePaymentSuccess() {
    try {
      setPayment(true)

      if (!shippingAddress) {
        throw new Error('Endereço de entrega não encontrado')
      }

      // Atualiza o carrinho com o endereço selecionado antes de finalizar o pedido
      await updateCartShippingAddress(shippingAddress.id)

      // Finaliza o pedido
      await finishOrder()

      // Limpa o contexto do carrinho após finalizar o pedido com sucesso
      setItemsCart({ items: [], totalPriceInCents: 0 })

      setSucess(true)
      router.push('/orders')
    } catch (error) {
      setError(true)
      console.error('Erro ao finalizar pedido:', error)
      setPayment(false)
    }
  }

  function handlePaymentError() {
    setError(true)
    setPayment(false)
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
                <CardContent className="flex flex-col gap-4 px-6">
                  <div className="flex items-center gap-6 text-sm font-medium">
                    <Label htmlFor="address">
                      {shippingAddress
                        ? formatAddress(shippingAddress)
                        : 'Carregando endereço..'}
                    </Label>
                  </div>
                  {shippingAddress && (
                    <div className="flex flex-col gap-2 text-xs text-gray-600">
                      <p>Email: {shippingAddress.email}</p>
                      <p>Telefone: {shippingAddress.phone}</p>
                      <p>
                        CPF/CNPJ: {formatCpfOrCnpj(shippingAddress.cpfOrCnpj)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {shippingAddress && (
                <StripePaymentForm
                  shippingAddress={shippingAddress}
                  totalAmount={itemsCart.totalPriceInCents}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}

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
                      asChild
                    >
                      <Link href="/orders">Ver meu pedido</Link>
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
              <Dialog open={error} onOpenChange={() => setError(false)}>
                <DialogContent className="flex flex-col justify-center">
                  <DialogHeader className="flex flex-col items-center gap-4">
                    <CircleX color="#ea3434" size={100} />
                    <div className="flex flex-col gap-4">
                      <DialogTitle className="text-2xl font-semibold">
                        Erro ao finalizar pedido
                      </DialogTitle>
                      <DialogDescription className="text-center text-sm font-medium">
                        Ocorreu um erro ao finalizar seu pedido. Por favor,
                        tente novamente.
                      </DialogDescription>
                    </div>
                  </DialogHeader>
                  {/* BUTTONS */}
                  <div className="flex w-full flex-col gap-4">
                    <Button
                      variant={'outline'}
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
