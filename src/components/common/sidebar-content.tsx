import {
  AlignJustify,
  House,
  LogIn,
  LogOut,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { authClient } from '@/lib/auth-client'
import { categoryItems } from '@/utils/category-items'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

export function SidebarContent() {
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
    <>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <AlignJustify color="#656565" strokeWidth={1.66667} />
        </Button>
      </SheetTrigger>
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
                    {session.user.name.split('')[0][0]}
                    {session.user.name.split('')[1][0]}
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
          <Button
            className="flex items-center justify-start gap-3"
            variant="ghost"
            asChild
          >
            <Link href="/">
              <Truck size={16} />
              Meus Pedidos
            </Link>
          </Button>
          <Button
            className="flex items-center justify-start gap-3"
            variant="ghost"
            asChild
          >
            <Link href="/">
              <ShoppingBag size={16} />
              Sacola
            </Link>
          </Button>
        </div>

        <div className={session?.user ? 'w-full border-b pb-6' : ''}>
          {categoryItems.map((category) => {
            return (
              <p key={category.id} className="p-4 text-sm font-medium">
                {category.name}
              </p>
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
