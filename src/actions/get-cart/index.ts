'use server'

import { headers } from 'next/headers'

import { db } from '@/db'
import { cart as cartTable } from '@/db/schema'
import { auth } from '@/lib/auth'

export const getCart = async (pathname: string) => {
  // Se não estiver na página de produto, página inicial, ou páginas de checkout, retorna carrinho vazio
  if (
    !pathname.startsWith('/product/') &&
    pathname !== '/' &&
    !pathname.startsWith('/identification') &&
    !pathname.startsWith('/payment')
  ) {
    return {
      id: '',
      userId: '',
      shippingAddressId: null,
      createdAt: new Date(),
      items: [],
      totalPriceInCents: 0,
    }
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    // Se não há sessão, retorna carrinho vazio
    return {
      id: '',
      userId: '',
      shippingAddressId: null,
      createdAt: new Date(),
      items: [],
      totalPriceInCents: 0,
    }
  }

  const cart = await db.query.cart.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  })

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning()
    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
    }
  }

  return {
    ...cart,
    totalPriceInCents: cart.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    ),
  }
}
