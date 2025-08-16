'use client'

import { createContext } from 'react'

import type { ProductVariant } from '@/dtos/productVariant.d'

export const ProductVariantContext = createContext<{
  productVariant: ProductVariant | null
  setProductVariant: (productVariant: ProductVariant | null) => void
}>({
  productVariant: null,
  setProductVariant: () => {},
})
