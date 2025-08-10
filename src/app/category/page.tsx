export default function CategoryPage({
  searchParams,
}: {
  searchParams: { name: string }
}) {
  return <div>Category: {searchParams.name}</div>
}
