import Image from 'next/image'

import { formatCurrency } from '@/utils/formatCurrency'

export function ProductItem({
  product,
  productVariant,
}: {
  product: {
    id: string
    image: string
    name: string
    description: string
    quantity: number
    price: number
  }
  productVariant: {
    id: string
    name: string
    slug: string
    createdAt: Date
    productId: string
    color: string
    priceInCents: number
    imageUrl: string
    product: {
      name: string
      id: string
      slug: string
      createdAt: Date
      categoryId: string
      description: string
    }
  }
}) {
  return (
    <div className="flex w-full gap-4">
      <div className="relative h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-semibold">{product.name}</p>
          <p className="text-xs font-medium text-[#656565]">
            {productVariant.name}
          </p>
          <p className="text-xs font-medium text-[#656565]">
            {product.quantity}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price * product.quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}
