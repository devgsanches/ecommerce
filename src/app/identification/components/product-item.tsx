import Image from 'next/image'

import { formatCurrency } from '@/utils/formatCurrency'

export function ProductItem({
  product,
}: {
  product: {
    id: string
    image: string
    name: string
    description: string
    quantity: number
    price: number
  }
}) {
  return (
    <>
      <div className="relative h-20 w-20 items-center justify-center rounded-lg bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-semibold">{product.name}</p>
          <p className="text-xs font-medium text-[#656565]">
            {product.description}
          </p>
          <p className="text-xs font-medium text-[#656565]">
            {product.quantity}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </>
  )
}
