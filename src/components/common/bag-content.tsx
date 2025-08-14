'use client'

import { ShoppingBag } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { authClient } from '@/lib/auth-client'

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { BagItem } from './bag-item'

interface Category {
  id: string
  name: string
}

export function BagContent() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const pathname = usePathname()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth')
        },
      },
    })
  }

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
