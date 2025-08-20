'use server'

import { headers } from 'next/headers'

import { db } from '@/db'
import { auth } from '@/lib/auth'

export const getOrders = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return {
      orders: [],
    }
  }

  const orders = await db.query.orderTable.findMany({
    where: (orders, { eq }) => eq(orders.userId, session.user.id),
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
    orderBy: (orders, { asc }) => [asc(orders.createdAt)],
  })

  return {
    orders: orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        productVariant: {
          ...item.productVariant,
          product: item.productVariant.product,
        },
      })),
      with: {
        orderItems: {
          quantity: true,
        },
      },
    })),
  }
}
