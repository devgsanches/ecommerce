'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getCart } from '@/actions/get-cart'
import { updateCartItem } from '@/actions/update-cart-item'
import { Button } from '@/components/ui/button'
import { useItemsCart } from '@/hooks/ItemsCart'
import { useProductVariant } from '@/hooks/useProductVariant'

export default function QuantitySelector({
  bag,
  quantity,
  cartItemId,
}: {
  bag?: boolean
  quantity: number
  cartItemId?: string
}) {
  const { setItemsCart } = useItemsCart()
  const { productVariant, setProductVariant } = useProductVariant()
  const [quantityBag, setQuantityBag] = useState(quantity)
  const [quantityState, setQuantityState] = useState(1)
  const [isUpdating, setIsUpdating] = useState(false)
  const pathname = usePathname()

  // Sincroniza o estado local quando a prop quantity mudar
  useEffect(() => {
    if (bag) {
      setQuantityBag(quantity)
    }
  }, [quantity, bag])

  // Sincroniza o estado local com o contexto ProductVariant
  useEffect(() => {
    if (!bag && productVariant) {
      setQuantityState(productVariant.quantity)
    }
  }, [productVariant, bag])

  async function handleMinus() {
    if (bag) {
      if (!cartItemId) return

      setIsUpdating(true)
      try {
        const newQuantity = quantityBag - 1
        await updateCartItem({ cartItemId, quantity: newQuantity })

        // Atualiza o contexto com os novos dados
        const cartWithItems = await getCart(pathname)
        setItemsCart({
          items: cartWithItems.items,
          totalPriceInCents: cartWithItems.totalPriceInCents,
        })

        setQuantityBag(newQuantity)
        toast.success('Quantidade atualizada!')
      } catch (error) {
        toast.error('Erro ao atualizar quantidade')
        console.error(error)
      } finally {
        setIsUpdating(false)
      }
      return
    }

    if (quantityState === 1) return
    const newQuantity = quantityState - 1
    setQuantityState(newQuantity)

    // Atualiza o contexto ProductVariant
    if (productVariant) {
      setProductVariant({
        ...productVariant,
        quantity: newQuantity,
      })
    }
  }

  async function handlePlus() {
    if (bag) {
      if (!cartItemId) return

      setIsUpdating(true)
      try {
        const newQuantity = quantityBag + 1
        await updateCartItem({ cartItemId, quantity: newQuantity })

        // Atualiza o contexto com os novos dados
        const cartWithItems = await getCart(pathname)
        setItemsCart({
          items: cartWithItems.items,
          totalPriceInCents: cartWithItems.totalPriceInCents,
        })

        setQuantityBag(newQuantity)
        toast.success('Quantidade atualizada!')
      } catch (error) {
        toast.error('Erro ao atualizar quantidade')
        console.error(error)
      } finally {
        setIsUpdating(false)
      }
      return
    }

    const newQuantity = quantityState + 1
    setQuantityState(newQuantity)

    // Atualiza o contexto ProductVariant
    if (productVariant) {
      setProductVariant({
        ...productVariant,
        quantity: newQuantity,
      })
    }
  }

  async function handleRemove() {
    if (!cartItemId) return

    setIsUpdating(true)
    try {
      await updateCartItem({ cartItemId, quantity: 0 })

      // Atualiza o contexto com os novos dados
      const cartWithItems = await getCart(pathname)
      if (cartWithItems) {
        setItemsCart({
          items: cartWithItems.items,
          totalPriceInCents: cartWithItems.totalPriceInCents,
        })
      }

      toast.success('Item removido da sacola!')
    } catch (error) {
      toast.error('Erro ao remover item')
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-5">
      {!bag && <p className="font-medium">Quantidade</p>}
      <div className="flex max-w-[7rem] items-center rounded-lg border border-[#F1F1F1]">
        <Button
          variant={'ghost'}
          onClick={() => (bag ? handleRemove() : handleMinus())}
          disabled={isUpdating}
        >
          {bag ? <Trash2 size={20} /> : <Minus size={20} />}
        </Button>

        <p className="min-w-[30px] text-center text-lg font-medium">
          {bag ? quantityBag : quantityState}
        </p>

        <Button
          variant={'ghost'}
          onClick={() => handlePlus()}
          disabled={isUpdating}
        >
          <Plus size={20} />
        </Button>
      </div>
    </div>
  )
}
