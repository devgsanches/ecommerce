import { z } from 'zod'

export const addShippingAddressSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  cpfOrCnpj: z.string().min(11),
  phone: z.string().min(11),
  cep: z.string().min(8),
  address: z.string().min(3),
  number: z.string().min(1),
  complement: z.string().optional(),
  neighborhood: z.string().min(3),
  city: z.string().min(3),
  state: z.string().min(2),
})

export type AddShippingAddressSchema = z.infer<typeof addShippingAddressSchema>
