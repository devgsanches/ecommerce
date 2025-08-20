'use client'

import { useEffect, useState } from 'react'

import { getOrders } from '@/actions/get-orders'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'

import { Order } from './components/order'

interface OrderItem {
  id: string
  quantity: number
  priceInCents: number
  productVariant: {
    id: string
    name: string
    priceInCents: number
    imageUrl: string
    product: {
      id: string
      name: string
      description: string
    }
  }
}

interface Order {
  id: string
  totalPriceInCents: number
  status: string
  createdAt: Date
  items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [openOrders, setOpenOrders] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { orders } = await getOrders()
        setOrders(orders)
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const toggleOrder = (orderId: string) => {
    setOpenOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex min-h-[calc(100vh-12rem)] flex-col space-y-6 px-5">
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
          <p>Carregando...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="flex min-h-[calc(100vh-12rem)] flex-col space-y-6 px-5">
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
          <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-12rem)] flex-col space-y-6 px-5 pb-10">
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>

        {orders.map((order, index) => (
          <Order
            key={order.id}
            order={order}
            index={index}
            openOrders={openOrders}
            toggleOrder={toggleOrder}
            quantity={order.items.map((item) => item.quantity)}
          />
        ))}
      </div>

      <Footer />
    </>
  )
}
