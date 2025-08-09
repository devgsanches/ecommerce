import Image from 'next/image'

import { categoryItems } from '@/utils/category-items'
import { partnerItems } from '@/utils/partner-items'

import { CategoryItem } from './components/category-item'
import { PartnerItem } from './components/partner-item'
import { ProductItem } from './components/product-item'

export default function Home() {
  const bestSellers = [
    {
      id: 1,
      image: '/product-01.svg',
      name: 'Nike Therma FIT Headed',
      description: "Men's Fleece Shacket",
      price: 490,
    },
    {
      id: 2,
      image: '/product-02.svg',
      name: 'Nike Therma FIT Headed',
      description: "Men's Fleece Shacket",
      price: 749,
    },
    {
      id: 3,
      image: '/product-03.svg',
      name: 'Nike Therma FIT Headed',
      description: "Men's Fleece Shacket",
      price: 490,
    },
  ]
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
      <div className="mt-15 flex w-full flex-col gap-6 pl-5">
        <h2 className="text-left font-semibold">Mais vendidos</h2>
        <div className="flex w-full gap-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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
      <div className="flex w-full flex-col gap-6 py-15 pl-5">
        <h2 className="text-left font-semibold">Novos produtos</h2>
        <div className="flex w-full gap-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {bestSellers.map((product) => {
            return <ProductItem key={product.id} product={product} />
          })}
        </div>
      </div>
    </div>
  )
}
