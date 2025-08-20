'use server'

import { headers } from 'next/headers'

import { db } from '@/db'
import { auth } from '@/lib/auth'

export const getShippingAddress = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const shippingAddresses = await db.query.shippingAddress.findMany({
    where: (shippingAddress, { eq }) =>
      eq(shippingAddress.userId, session.user.id),
  })

  if (!shippingAddresses) {
    throw new Error('Shipping address not found')
  }

  // garante que o usuário certo está acessando seus endereços
  const addressBelongToUser = session.user.id === shippingAddresses[0]?.userId

  if (!addressBelongToUser) {
    throw new Error('Unauthorized')
  }

  return shippingAddresses
}
