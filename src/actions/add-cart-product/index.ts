'use server'

import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db } from '@/db'
import { cart as cartTable, cartItem as cartItemTable } from '@/db/schema'
import { auth } from '@/lib/auth'

import { AddProductToCartSchema, addProductToCartSchema } from './schema'

export const addProductToCart = async (data: AddProductToCartSchema) => {
  const { productVariantId, quantity } = addProductToCartSchema.parse(data)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) => eq(productVariant.id, productVariantId),
  })

  if (!productVariant) {
    throw new Error('Product variant not found')
  }

  const cart = await db.query.cart.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  })

  let cartId = cart?.id
  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning()
    cartId = newCart.id
  }

  const cartItem = await db.query.cartItem.findFirst({
    where: (cartItem, { eq }) =>
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, productVariantId),
  })
  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + quantity,
      })
      .where(eq(cartItemTable.id, cartItem.id))
    return
  }
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId,
    quantity,
  })
}
