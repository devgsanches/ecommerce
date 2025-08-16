// Defino a tipagem > aproveitando da tipagem criada em user.d.ts

import { createContext } from 'react'

import type { ItemsCart } from '@/dtos/itemsCart'

type ItemsCartContext = {
  itemsCart: { items: ItemsCart[]; totalPriceInCents: number }
  setItemsCart: (
    itemsCart:
      | { items: ItemsCart[]; totalPriceInCents: number }
      | ((prev: { items: ItemsCart[]; totalPriceInCents: number }) => {
          items: ItemsCart[]
          totalPriceInCents: number
        }),
  ) => void
}

export const ItemsCartContext = createContext<ItemsCartContext>({
  itemsCart: { items: [], totalPriceInCents: 0 },
  setItemsCart: () => {},
})
