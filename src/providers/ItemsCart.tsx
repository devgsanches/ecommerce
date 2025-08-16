'use client'

import { useState } from 'react'

import { ItemsCartContext } from '@/contexts/ItemsCart'
import type { ItemsCart } from '@/dtos/itemsCart'

export const ItemsCartProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [itemsCart, setItemsCart] = useState<{
    items: ItemsCart[]
    totalPriceInCents: number
  }>({
    items: [],
    totalPriceInCents: 0,
  })

  return (
    <ItemsCartContext.Provider value={{ itemsCart, setItemsCart }}>
      {children}
    </ItemsCartContext.Provider>
  )
}
