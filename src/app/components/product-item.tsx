import Image from 'next/image'
import Link from 'next/link'

import { productTable, productVariantTable } from '@/db/schema'
import { formatCurrency } from '@/utils/formatCurrency'

type Product = typeof productTable.$inferSelect
type ProductVariant = typeof productVariantTable.$inferSelect

export function ProductItem({
  product,
}: {
  product: Product & { variants: ProductVariant[] }
}) {
  const firstVariant = product.variants[0]

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`flex w-full flex-col gap-6`}
    >
      <div>
        <Image
          src={firstVariant.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className={`max-w-[12.5rem] rounded-3xl`}
        />
      </div>

      <div className="flex min-h-[4.125rem] flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{product.name}</p>
          <p
            className={
              'w-[12.5rem] truncate text-sm font-medium text-[#656565]'
            }
          >
            {product.description}
          </p>
        </div>
        <p className="text-sm font-bold">
          {formatCurrency(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  )
}
