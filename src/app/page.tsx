import Image from 'next/image'

import { getCart } from '@/actions/get-cart'
import { db } from '@/db'
import { productTable, type productVariantTable } from '@/db/schema'
import { partnerItems } from '@/utils/partner-items'

import { CategoryItem } from './components/category-item'
import { PartnerItem } from './components/partner-item'
import { ProductItem } from './components/product-item'

export type Product = typeof productTable.$inferSelect & {
  variants: (typeof productVariantTable.$inferSelect)[]
}

export default async function Home() {
  const bestSellers: Product[] = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  })

  const categoryItems = await db.query.categoryTable.findMany({})

  return (
    <div className="flex flex-col items-center">
      {/* BANNER */}
      <div className="relative min-h-[28.75rem] min-w-[22.8125rem] px-3.5">
        <Image src="/banner.svg" alt="Banner Home" fill />
      </div>

      {/* Partner brands */}
      <div className="mt-6 flex w-full flex-col gap-6 pl-5">
        <h2 className="text-left font-semibold">Marcas parceiras</h2>
        <div className="flex w-full gap-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {partnerItems.map((partner) => {
            return <PartnerItem key={partner.id} partner={partner} />
          })}
        </div>
      </div>

      {/* Best sellers */}
      <div className="mt-15 flex w-full flex-col gap-6">
        <h2 className="px-5 text-left font-semibold">Mais vendidos</h2>
        <div className="flex w-full gap-6 overflow-x-scroll pl-5 [&::-webkit-scrollbar]:hidden">
          {bestSellers.map((product) => {
            return <ProductItem key={product.id} product={product} />
          })}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="px-5 py-8">
        <div className="grid grid-cols-2 gap-5 rounded-3xl bg-[#F4EFFF] px-5 py-6">
          {categoryItems.map((category) => {
            return <CategoryItem key={category.id} category={category} />
          })}
        </div>
      </div>

      {/* BANNER 02 */}
      <div className="relative min-h-[28.75rem] min-w-[22.8125rem] px-3.5">
        <Image src="/banner-02.svg" alt="Banner Home" fill />
      </div>

      {/* NEW PRODUCTS */}
      <div className="flex w-full flex-col gap-6 px-0 py-15">
        <h2 className="px-5 text-left font-semibold">Novos produtos</h2>
        <div className="flex w-full gap-6 overflow-x-scroll pl-5 [&::-webkit-scrollbar]:hidden">
          {bestSellers.map((product) => {
            return <ProductItem key={product.id} product={product} />
          })}
        </div>
      </div>
    </div>
  )
}
