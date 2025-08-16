'use client'

import { useState } from 'react'

import { ProductVariantContext } from '@/contexts/ProductVariant'
import type { ProductVariant } from '@/dtos/productVariant'

export const ProductVariantProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [productVariant, setProductVariant] = useState<ProductVariant | null>(
    null,
  )

  return (
    <ProductVariantContext.Provider
      value={{ productVariant, setProductVariant }}
    >
      {children}
    </ProductVariantContext.Provider>
  )
}
