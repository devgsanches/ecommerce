'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1)

  function handleMinus() {
    if (quantity === 1) return

    setQuantity((prev) => prev - 1)
  }

  function handlePlus() {
    setQuantity((prev) => prev + 1)
  }
  return (
    <div className="space-y-5">
      <p className="font-medium">Quantidade</p>
      <div className="flex max-w-[7rem] items-center rounded-lg border border-[#F1F1F1]">
        <Button variant={'ghost'} onClick={() => handleMinus()}>
          <Minus size={20} />
        </Button>

        <p className="min-w-[30px] text-center text-lg font-medium">
          {quantity}
        </p>

        <Button variant={'ghost'} onClick={() => handlePlus()}>
          <Plus size={20} />
        </Button>
      </div>
    </div>
  )
}
