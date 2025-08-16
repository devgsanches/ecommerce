'use client'

import Link from 'next/link'
import { toast } from 'sonner'

import { addProductToCart } from '@/actions/add-cart-product'
import { getCart } from '@/actions/get-cart'
import { Button } from '@/components/ui/button'
import { useItemsCart } from '@/hooks/ItemsCart'
import { useProductVariant } from '@/hooks/useProductVariant'

export function Buttons() {
  const { productVariant } = useProductVariant()
  const { setItemsCart } = useItemsCart()

  async function handleAddToCart() {
    if (!productVariant) return

    await addProductToCart({
      productVariantId: productVariant.id,
      quantity: productVariant.quantity,
    })
    const cartWithItems = await getCart()
    setItemsCart({
      items: cartWithItems.items,
      totalPriceInCents: cartWithItems.totalPriceInCents,
    })

    toast.success('Produto adicionado à sacola!')
  }
  return (
    <>
      <Button
        className="w-full rounded-full text-sm font-semibold"
        variant={'outline'}
        size={'lg'}
        onClick={handleAddToCart}
      >
        Adicionar à sacola
      </Button>

      <Button className="w-full rounded-full bg-[#5131E8]" size={'lg'} asChild>
        <Link href="/identification">Comprar agora</Link>
      </Button>
    </>
  )
}
