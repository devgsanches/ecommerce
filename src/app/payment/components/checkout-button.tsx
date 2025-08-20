'use client'

import { Button } from '@/components/ui/button'

export function CheckoutButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="h-12.5 w-full rounded-full bg-[#5131E8]"
      size="lg"
      onClick={onClick}
    >
      Finalizar a compra
    </Button>
  )
}
