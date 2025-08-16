import { useContext } from 'react'

import { ItemsCartContext } from '@/contexts/ItemsCart'

export const useItemsCart = () => {
  const context = useContext(ItemsCartContext)

  if (!context) {
    throw new Error('useItemsCart must be used within a ItemsCartContext')
  }

  return context
}
