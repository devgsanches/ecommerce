export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      Product: <p>{params.slug}</p>
    </div>
  )
}
