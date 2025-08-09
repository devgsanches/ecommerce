import Image from 'next/image'

import { formatCurrency } from '@/utils/formatCurrency'

export function ProductItem({
  product,
}: {
  product: {
    id: number
    image: string
    name: string
    description: string
    price: number
  }
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative min-h-[16.25rem] min-w-[12.5rem] rounded-3xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="rounded-3xl object-cover"
        />
      </div>
      <div className="flex min-h-[4.125rem] flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{product.name}</p>
          <p className="text-sm font-medium text-[#656565]">
            {product.description}
          </p>
        </div>
        <p className="text-sm font-bold">{formatCurrency(product.price)}</p>
      </div>
    </div>
  )
}
