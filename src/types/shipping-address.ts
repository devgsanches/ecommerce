export interface ShippingAddressType {
  id: string
  userId: string
  recipientName: string
  street: string
  number: string
  complement: string | null
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
  cpfOrCnpj: string
  createdAt: string | Date
}
