import Image from 'next/image'

export function PartnerItem({
  partner,
}: {
  partner: {
    id: number
    img: string
    name: string
  }
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        key={partner.id}
        className="flex h-[5rem] w-[5rem] items-center rounded-xl border-[0.1rem] border-[#F1F1F1] p-6"
      >
        <Image src={partner.img} alt={partner.name} width={32} height={32} />
      </div>
      <p className="text-center text-sm font-medium whitespace-nowrap">
        {partner.name}
      </p>
    </div>
  )
}
