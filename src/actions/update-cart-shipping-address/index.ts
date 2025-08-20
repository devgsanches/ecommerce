'use server'

import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db } from '@/db'
import { cart as cartTable } from '@/db/schema'
import { auth } from '@/lib/auth'

export const updateCartShippingAddress = async (shippingAddressId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const cart = await db.query.cart.findFirst({
    where: eq(cartTable.userId, session.user.id),
  })

  if (!cart) {
    throw new Error('Cart not found')
  }

  // Atualiza o carrinho com o endereço selecionado
  await db
    .update(cartTable)
    .set({ shippingAddressId })
    .where(eq(cartTable.id, cart.id))

  return { success: true }
}
