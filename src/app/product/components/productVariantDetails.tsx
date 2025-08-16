'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Product } from '@/app/page'
import type { productVariantTable } from '@/db/schema'
import { useProductVariant } from '@/hooks/useProductVariant'
import { formatCurrency } from '@/utils/formatCurrency'

type ProductVariant = typeof productVariantTable.$inferSelect

export function ProductVariantDetails({
  product,
}: {
  product: Product & { variants: ProductVariant[] }
}) {
  const [variantProduct, setVariantProduct] = useState<number>(0)

  const { setProductVariant } = useProductVariant()

  useEffect(() => {
    setProductVariant({
      ...product.variants[variantProduct],
      quantity: 1,
    })
  }, [variantProduct])

  function handleVariantChange(index: number) {
    setVariantProduct(index)
    redirect(`/product/${product.slug}?variant=${product.variants[index].slug}`)
  }

  return (
    <>
      <Image
        src={product.variants[variantProduct].imageUrl}
        alt={product.variants[variantProduct].name}
        width={365}
        height={460}
        className="h-full w-full rounded-3xl object-cover px-3.5"
        priority
      />
      {/* PRODUCT VARIANTS */}
      <div className="flex gap-4 px-5">
        {product?.variants.map((variant, index) => {
          return (
            <Image
              key={variant.id}
              src={variant.imageUrl}
              alt={variant.name}
              width={68}
              height={68}
              className="rounded-xl"
              onClick={() => handleVariantChange(index)}
            />
          )
        })}
      </div>
      <div className="space-y-4 px-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{product?.name}</h2>
          <p className="text-sm font-medium text-[#656565]">
            {product.variants[variantProduct].color}
          </p>
        </div>
        <p className="text-lg font-semibold">
          {formatCurrency(product.variants[variantProduct].priceInCents)}
        </p>
      </div>
    </>
  )
}
