import Link from 'next/link'

export function CategoryItem({
  category,
}: {
  category: {
    name: string
    slug: string
  }
}) {
  return (
    <Link
      href={`/category?name=${category.slug}`}
      className="rounded-full bg-white px-[0.609375rem] py-[0.6875rem]"
    >
      <p className="text-center text-xs font-semibold whitespace-nowrap">
        {category.name}
      </p>
    </Link>
  )
}
