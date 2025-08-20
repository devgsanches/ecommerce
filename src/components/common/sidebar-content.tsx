'use client'

import { House, LogIn, LogOut, ShoppingBag, Truck } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { authClient } from '@/lib/auth-client'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'

interface Category {
  id: string
  name: string
  slug: string
}

export function SidebarContent() {
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
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription> </SheetDescription>
          {session?.user ? (
            <>
              <div className="mt-6 flex items-center gap-3 border-b pb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.user.image ?? ''} />
                  <AvatarFallback className="bg-[#007981] text-white uppercase">
                    {session.user.name?.split(' ')[0]?.[0]}
                    {session.user.name?.split(' ')[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-[#323232]">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-[#656565]">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-6 flex w-full items-center justify-between border-b pb-6">
              <h2 className="max-w-[9.9375rem] text-sm font-semibold">
                Olá. Faça seu login!
              </h2>
              <SheetClose asChild>
                <Button className="rounded-full bg-[#5131E8] px-6 py-4" asChild>
                  <Link href="/auth">
                    Login <LogIn />
                  </Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </SheetHeader>
        <div className="flex flex-col border-b pb-6">
          <div>
            {pathname === '/' ? (
              <SheetClose asChild>
                <Button
                  className="flex w-full items-center justify-start gap-3"
                  variant="ghost"
                >
                  <House size={16} />
                  Início
                </Button>
              </SheetClose>
            ) : (
              <SheetClose asChild>
                <Button
                  className="flex items-center justify-start gap-3"
                  variant="ghost"
                  asChild
                >
                  <Link href="/">
                    <House size={16} />
                    Início
                  </Link>
                </Button>
              </SheetClose>
            )}
          </div>

          <Button
            className="flex items-center justify-start gap-3"
            variant="ghost"
            asChild
          >
            <Link href="/orders">
              <Truck size={16} />
              Meus Pedidos
            </Link>
          </Button>
        </div>

        <div
          className={session?.user ? 'flex w-full flex-col border-b pb-6' : ''}
        >
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/category?name=${category.slug}`}
                className="p-4 text-sm font-medium"
              >
                {category.name}
              </Link>
            )
          })}
        </div>
        <div>
          {session?.user && (
            <Button
              variant="ghost"
              className="gap-3 text-[#656565]"
              onClick={handleSignOut}
            >
              <LogOut />
              Sair da conta
            </Button>
          )}
        </div>
      </SheetContent>
    </>
  )
}
