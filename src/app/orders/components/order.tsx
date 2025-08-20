import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/utils/formatCurrency'

interface OrderItem {
  id: string
  quantity: number
  priceInCents: number
  productVariant: {
    id: string
    name: string
    priceInCents: number
    imageUrl: string
    product: {
      id: string
      name: string
      description: string
    }
  }
}

interface Order {
  id: string
  totalPriceInCents: number
  status: string
  createdAt: Date
  items: OrderItem[]
}

export function Order({
  order,
  index,
  openOrders,
  toggleOrder,
  quantity,
}: {
  order: Order
  index: number
  openOrders: Record<string, boolean>
  toggleOrder: (orderId: string) => void
  quantity: number[]
}) {
  return (
    <Collapsible
      key={order.id}
      open={openOrders[order.id]}
      onOpenChange={() => toggleOrder(order.id)}
      className="flex h-full w-[350px] flex-col gap-2 rounded-lg border py-5"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Número do Pedido</p>
          <p className="text-sm font-medium text-[#656565]">
            #{index + 1 < 10 ? '00' : index + 1 < 100 ? '0' : ''}
            {index + 1}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(order.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="size-10">
            {!openOrders[order.id] ? (
              <ChevronDown color="#5131E8" strokeWidth={2} size={28} />
            ) : (
              <ChevronUp color="#5131E8" strokeWidth={2} size={28} />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex h-full flex-col gap-2">
        <div className="px-4 py-2 text-sm">
          <Separator />
        </div>

        <div className="h-full px-4 py-2 text-sm">
          <div className="h-full space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex h-full items-center justify-between"
              >
                <div className="flex gap-3">
                  <div className="relative h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
                    {item.productVariant.imageUrl && (
                      <Image
                        src={item.productVariant.imageUrl}
                        alt={item.productVariant.name}
                        fill
                        className="rounded-md object-cover"
                        sizes="48px"
                      />
                    )}
                  </div>
                  <div className="flex h-full flex-col">
                    <p className="font-semibold">
                      {item.productVariant.product.name}
                    </p>
                    <p className="text-sm font-medium text-[#656565]">
                      {item.productVariant.name}
                    </p>
                    <p className="text-sm font-medium text-[#656565]">
                      {item.quantity}x
                    </p>
                  </div>
                </div>
                <div className="flex min-h-[4.5rem] items-end">
                  <p className="text-sm font-medium">
                    {formatCurrency(item.priceInCents)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-2 text-sm">
          <Separator />
        </div>

        <div className="px-4 py-2 text-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-medium">
              Subtotal
              <p className="text-sm text-[#656565]">
                {formatCurrency(order.totalPriceInCents)}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm font-medium">
              Transporte e Manuseio
              <p className="text-sm text-[#656565]">Grátis</p>
            </div>
            <div className="flex items-center justify-between text-sm font-medium">
              Taxa Estimada
              <p className="text-sm text-[#656565] capitalize">—</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between px-4 font-semibold">
          <p className="text-sm font-medium">Total</p>
          <p className="text-sm font-medium">
            {formatCurrency(order.totalPriceInCents)}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
