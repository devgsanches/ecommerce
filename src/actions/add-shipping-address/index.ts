'use server'

import { headers } from 'next/headers'

import { db } from '@/db'
import {
  cart as cartTable,
  shippingAddress as shippingAddressTable,
} from '@/db/schema'
import { auth } from '@/lib/auth'

import { AddShippingAddressSchema, addShippingAddressSchema } from './schema'

export const addShippingAddress = async (data: AddShippingAddressSchema) => {
  const {
    email,
    firstName,
    lastName,
    cpfOrCnpj,
    phone,
    cep,
    address,
    number,
    complement,
    neighborhood,
    city,
    state,
  } = addShippingAddressSchema.parse(data)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
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

  const cartBelongsToUser = await db.query.cart.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  })

  if (!cartBelongsToUser) {
    throw new Error('Unauthorized')
  }

  // Removendo a verificação que impede múltiplos endereços
  // Permitindo que o usuário tenha vários endereços de entrega

  const [newShippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      email,
      recipientName: `${firstName} ${lastName}`,
      cpfOrCnpj,
      phone,
      zipCode: cep,
      street: address,
      number,
      complement: complement || null,
      neighborhood,
      city,
      state,
      country: 'BR',
    })
    .returning()

  return newShippingAddress
}
