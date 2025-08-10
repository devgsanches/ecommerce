'use client'

import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Sheet } from '../ui/sheet'
import { SidebarContent } from './sidebar-content'

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Link href="/">
        <Image src={'/logo.svg'} alt="logo" width={100} height={100} />
      </Link>
      <div className="flex items-center gap-3">
        <ShoppingBag color="#656565" strokeWidth={1.66667} />
        <div className="h-3.5 rounded-xl border-r-2 border-[#F1F1F1]"></div>
        <Sheet>
          <SidebarContent />
        </Sheet>
      </div>
    </header>
  )
}
