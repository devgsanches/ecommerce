'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getCart } from '@/actions/get-cart'
import { useItemsCart } from '@/hooks/ItemsCart'

export const useInitializeCart = () => {
  const { setItemsCart } = useItemsCart()
  const [isLoading, setIsLoading] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Só inicializa se ainda não foi inicializado
    if (hasInitialized) {
      setIsLoading(false)
      return
    }

    const initializeCart = async () => {
      try {
        const cartWithItems = await getCart(pathname)
        console.log('useInitializeCart - dados carregados:', cartWithItems)
        setItemsCart({
          items: cartWithItems.items,
          totalPriceInCents: cartWithItems.totalPriceInCents,
        })
      } catch (error) {
        console.error('Erro ao inicializar carrinho:', error)
        // Se não conseguir carregar, mantém o estado vazio
        setItemsCart({ items: [], totalPriceInCents: 0 })
      } finally {
        setIsLoading(false)
        setHasInitialized(true)
      }
    }

    initializeCart()
  }, [setItemsCart, hasInitialized, pathname])

  return { isLoading }
}
