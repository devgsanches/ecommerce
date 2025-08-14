import { eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { db } from '@/db'
import { categoryTable, productTable } from '@/db/schema'
import { formatCurrency } from '@/utils/formatCurrency'

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ name: string }>
}) {
  const { name } = await searchParams

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, name),
  })

  if (!category) {
    return notFound()
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category?.id),
    with: {
      variants: true,
    },
  })

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <>
      <div className="h-full w-full px-5 pt-6">
        <h2 className="text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 pt-6 pb-15">
          {products.map((product) => {
            const firstVariant = product.variants[0]
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className={`flex min-h-[19rem] min-w-full flex-col gap-6`}
              >
                <div className="relative h-[16.25rem] w-full">
                  <Image
                    src={firstVariant.imageUrl}
                    alt={product.name}
                    fill
                    className="rounded-3xl object-cover"
                  />
                </div>

                <div className="flex min-h-[4.125rem] flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p
                      className={
                        'w-[11.5rem] truncate text-sm font-medium break-all text-[#656565]'
                      }
                    >
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-bold">
                    {formatCurrency(firstVariant.priceInCents)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
