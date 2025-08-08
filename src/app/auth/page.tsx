import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { SignInForm } from './components/sign-in-form'
import { SignUpForm } from './components/sign-up-form'

export default function Auth() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 p-5">
      <Tabs defaultValue="signin">
        <TabsList>
          <TabsTrigger value="signin">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Crie sua conta</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
