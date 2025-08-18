import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

import { ProductItem } from '@/app/components/product-item'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { db } from '@/db'
import { productTable } from '@/db/schema'

import { Buttons } from '../components/buttons'
import { ProductVariantDetails } from '../components/productVariantDetails'
import QuantitySelector from '../components/quantitySelector'

export default async function ProductPage({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const { slug } = await params

  const bestSellers = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  })

  const product = await db.query.productTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      variants: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <>
      <Header />
      {/* PRODUCT IMAGE AND PRODUCT DETAILS */}
      <div className="w-full space-y-9">
        <ProductVariantDetails product={product} />

        {/* QUANTITY SELECTOR */}
        <div className="px-5">
          <QuantitySelector bag={false} quantity={1} />
        </div>

        {/* BUTTONS */}
        <div className="space-y-3 px-5">
          <Buttons />
        </div>

        {/* DESCRIPTION */}
        <div className="px-5">
          <p className="text-sm font-medium text-[#656565]">
            {product.description}
          </p>
        </div>

        {/* You may also like */}
        <div className="space-y-6 pb-15 pl-5">
          <h3 className="text-left font-semibold">Você também pode gostar</h3>
          <div className="flex w-full gap-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {bestSellers.map((product) => {
              return <ProductItem key={product.id} product={product} />
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
