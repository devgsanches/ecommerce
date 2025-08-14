import Image from 'next/image'

import QuantitySelector from '@/app/product/components/quantitySelector'

export function BagItem() {
  return (
    <div className="flex w-full gap-4">
      <div className="relative h-20 w-28 items-center justify-center rounded-lg bg-[#EAEAEA]">
        <Image
          src={'/product-01.svg'}
          alt={'Nike Tech'}
          fill
          className="rounded-lg"
        />
      </div>

      <div className="w-full">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="w-full">
            <h3 className="text-sm font-semibold">Nike Tech</h3>
            <p className="w-full text-xs font-medium text-[#656565]">
              Men&apos;s Fleece Shacket{' '}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <QuantitySelector bag={true} />
            <div className="flex h-full items-end">
              <p className="text-sm font-semibold">R$ 749</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
