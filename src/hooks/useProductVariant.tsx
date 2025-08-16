import { useContext } from 'react'

import { ProductVariantContext } from '@/contexts/ProductVariant'

export const useProductVariant = () => {
  const context = useContext(ProductVariantContext)

  if (!context) {
    throw new Error(
      'useProductVariant must be used within a ProductVariantContext',
    )
  }

  return context
}
