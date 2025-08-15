'use client'

import { ShoppingBag } from 'lucide-react'

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { BagItem } from './bag-item'

export function BagContent() {
  return (
    <>
      <SheetContent className="w-[85%] px-5">
        <SheetHeader className="px-0 pt-6">
          <SheetTitle className="flex items-center gap-2.5">
            <ShoppingBag color="#656565" /> Sacola
          </SheetTitle>
          <SheetDescription> </SheetDescription>
        </SheetHeader>
        <div className="space-y-8">
          <BagItem />
          <BagItem />
        </div>
      </SheetContent>
    </>
  )
}
