'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { Product } from '@/app/page'
import type { productVariantTable } from '@/db/schema'

type ProductVariant = typeof productVariantTable.$inferSelect

export function VariantListing({
  product,
}: {
  product: Product & { variants: ProductVariant[] }
}) {
  const [variantDefault] = useState<number>(0)
  const [variantProduct, setVariantProduct] = useState<ProductVariant>(
    product.variants[variantDefault],
  )

  function handleVariantChange(index: number) {
    setVariantProduct(product.variants[index])
  }

  return (
    <>
      <Image
        src={variantProduct.imageUrl}
        alt={variantProduct.name}
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
    </>
  )
}
