type ItemsCart = {
  id: string
  cartId: string
  productVariantId: string
  quantity: number
  productVariant: {
    id: string
    name: string
    slug: string
    createdAt: Date
    productId: string
    color: string
    priceInCents: number
    imageUrl: string
    product: {
      name: string
      id: string
      slug: string
      createdAt: Date
      categoryId: string
      description: string
    }
  }
}

export type { ItemsCart }
