'use client'

import { AlignJustify, LogIn, LogOut, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { authClient } from '@/lib/auth-client'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

export function Header() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

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
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src={'/logo.svg'} alt="logo" width={100} height={100} />
      <div className="flex items-center gap-3">
        <ShoppingBag color="#656565" strokeWidth={1.66667} />
        <div className="h-3.5 rounded-xl border-r-2 border-[#F1F1F1]"></div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <AlignJustify color="#656565" strokeWidth={1.66667} />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[85%]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription> </SheetDescription>
              {session?.user ? (
                <>
                  <div className="mt-6 flex items-center gap-3 border-b pb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.user.image ?? ''} />
                      <AvatarFallback className="bg-[#007981] text-white uppercase">
                        {session.user.name.split('')[0][0]}
                        {session.user.name.split('')[1][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
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
                <div className="mt-6 flex items-center justify-between border-b pb-6">
                  <h2 className="max-w-[9.9375rem] text-sm font-semibold">
                    Olá. Faça seu login!
                  </h2>
                  <SheetClose asChild>
                    <Button className="rounded-full bg-[#5131E8] px-6 py-4">
                      Login <LogIn />
                    </Button>
                  </SheetClose>
                </div>
              )}
            </SheetHeader>
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
        </Sheet>
      </div>
    </header>
  )
}
