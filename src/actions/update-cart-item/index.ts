'use server'

import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db } from '@/db'
import { cartItem as cartItemTable } from '@/db/schema'
import { auth } from '@/lib/auth'

import { UpdateCartItemSchema, updateCartItemSchema } from './schema'

export const updateCartItem = async (data: UpdateCartItemSchema) => {
  const { cartItemId, quantity } = updateCartItemSchema.parse(data)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // Verifica se o item pertence ao usuário
  const cartItem = await db.query.cartItem.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, cartItemId),
    with: {
      cart: true,
    },
  })

  if (!cartItem) {
    throw new Error('Cart item not found')
  }

  if (cartItem.cart.userId !== session.user.id) {
    throw new Error('Unauthorized')
  }

  if (quantity <= 0) {
    // Remove o item se quantidade for 0 ou menor
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItemId))
  } else {
    // Atualiza a quantidade
    await db
      .update(cartItemTable)
      .set({ quantity })
      .where(eq(cartItemTable.id, cartItemId))
  }
}
