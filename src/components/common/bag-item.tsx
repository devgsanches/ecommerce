import Image from 'next/image'

import QuantitySelector from '@/app/product/components/quantitySelector'
import type { ItemsCart } from '@/dtos/itemsCart'
import { formatCurrency } from '@/utils/formatCurrency'

export function BagItem({ product }: { product: ItemsCart }) {
  return (
    <div className="flex w-full gap-4">
      <div className="relative h-20 w-28 items-center justify-center rounded-lg bg-[#EAEAEA]">
        <Image
          src={product.productVariant.imageUrl}
          alt={product.productVariant.name}
          fill
          className="rounded-lg"
        />
      </div>

      <div className="w-full">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="w-full">
            <h3 className="text-sm font-semibold">
              {product.productVariant.product.name}
            </h3>
            <p className="w-full text-xs font-medium text-[#656565]">
              {product.productVariant.color}
            </p>
          </div>

          <div className="flex items-center justify-between pr-6">
            <QuantitySelector
              bag={true}
              quantity={product.quantity}
              cartItemId={product.id}
            />
            <div className="flex h-full items-end">
              <p className="text-sm font-semibold">
                {formatCurrency(
                  product.productVariant.priceInCents * product.quantity,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
