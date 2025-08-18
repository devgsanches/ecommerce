import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { useItemsCart } from '@/hooks/ItemsCart'
import { useInitializeCart } from '@/hooks/useInitializeCart'
import { formatCurrency } from '@/utils/formatCurrency'

import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { BagItem } from './bag-item'

export function BagContent() {
  const { itemsCart } = useItemsCart()
  const { isLoading } = useInitializeCart() // Inicializa o carrinho com dados do servidor

  if (isLoading) {
    return (
      <SheetContent className="w-[85%] px-5">
        <SheetHeader className="px-0 pt-6">
          <SheetTitle className="flex items-center gap-2.5">
            <ShoppingBag color="#656565" /> Sacola
          </SheetTitle>
          <SheetDescription> </SheetDescription>
        </SheetHeader>
        <div className="space-y-8">
          <p className="text-sm font-medium text-[#656565]">Carregando...</p>
        </div>
      </SheetContent>
    )
  }

  return (
    <>
      <SheetContent className="flex h-screen w-[85%] flex-col px-3">
        <SheetHeader className="px-0 pt-6">
          <SheetTitle className="flex items-center gap-2.5">
            <ShoppingBag color="#656565" /> Sacola
          </SheetTitle>
          <SheetDescription> </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-full w-full">
          {itemsCart.items.length > 0 ? (
            <>
              <div className="mb-4 flex h-[calc(100vh-110px)] w-full flex-col space-y-8">
                {itemsCart.items.map((item) => (
                  <BagItem key={item.productVariantId} product={item} />
                ))}
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="flex w-full justify-between gap-3 px-5 pb-3 text-sm font-medium">
                      <p>Subtotal</p>
                      <p className="text-[#656565]">
                        {formatCurrency(itemsCart.totalPriceInCents)}
                      </p>
                    </div>
                    <Separator />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex w-full justify-between gap-3 px-5 pb-3 text-sm font-medium">
                      <p>Transporte e Manuseio</p>
                      <p className="text-[#656565]">Grátis</p>
                    </div>
                    <Separator />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex w-full justify-between gap-3 px-5 pb-3 text-sm font-medium">
                      <p>Total</p>
                      <p className="text-[#656565]">
                        {formatCurrency(itemsCart.totalPriceInCents)}
                      </p>
                    </div>
                    <Separator />
                  </div>
                  {/* BUTTONS PAYMENT */}
                  <div className="w-full px-5 pb-4">
                    <Button
                      variant="default"
                      size={'lg'}
                      className="w-full rounded-full bg-[#5131E8]"
                      asChild
                    >
                      <Link href="/identification"> Finalizar a compra</Link>
                    </Button>
                    <Button
                      variant={'link'}
                      size={'lg'}
                      className="w-full text-black underline"
                    >
                      Continuar comprando
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm font-medium text-[#656565]">
              Nenhum item no carrinho.
            </p>
          )}
        </ScrollArea>
      </SheetContent>
    </>
  )
}
