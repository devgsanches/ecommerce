'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'

const formSchema = z
  .object({
    name: z.string().min(3, {
      message: 'O nome deve conter pelo menos 3 caracteres.',
    }),
    email: z.email({
      message: 'E-mail inválido.',
    }),
    password: z.string().min(8, {
      message: 'A senha deve conter pelo menos 8 caracteres.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'A senha deve conter pelo menos 8 caracteres.',
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      error: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    },
  )

type formValues = z.infer<typeof formSchema>

export function SignUpForm() {
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  async function onSubmit(values: formValues) {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    })

    if (error) {
      if (error.code === 'USER_ALREADY_EXISTS') {
        form.setError('email', {
          message: 'E-mail já cadastrado.',
        })
        return toast.error('E-mail já cadastrado.')
      }
      toast.error('Erro ao criar conta.')
    }

    toast.success('Conta criada com sucesso.')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mt-2">Crie sua conta</CardTitle>
        <CardDescription className="text-justify">
          Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se
          veste com personalidade.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@email.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirme sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button type="submit">Criar conta</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}
