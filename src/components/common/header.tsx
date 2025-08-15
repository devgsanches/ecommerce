'use client'

import { AlignJustify, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { authClient } from '@/lib/auth-client'

import { Button } from '../ui/button'
import { Sheet, SheetTrigger } from '../ui/sheet'
import { BagContent } from './bag-content'
import { SidebarContent } from './sidebar-content'

export function Header() {
  const { data: session } = authClient.useSession()
  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Link href="/">
        <Image src={'/logo.svg'} alt="logo" width={100} height={100} />
      </Link>
      <div className="flex items-center gap-3">
        <Sheet>
          {session?.user && (
            <>
              <SheetTrigger>
                <ShoppingBag color="#656565" strokeWidth={1.66667} />
              </SheetTrigger>
              <div className="h-3.5 rounded-xl border-r-2 border-[#F1F1F1]"></div>
            </>
          )}
          <BagContent />
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <AlignJustify color="#656565" strokeWidth={1.66667} />
            </Button>
          </SheetTrigger>
          <SidebarContent />
        </Sheet>
      </div>
    </header>
  )
}
