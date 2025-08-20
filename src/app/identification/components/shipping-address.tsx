import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ShippingAddressType } from '@/types/shipping-address'

export function ShippingAddress({
  setNewAddress,
  address,
  onSelect,
  isSelected,
}: {
  setNewAddress: (newAddress: boolean) => void
  address: ShippingAddressType
  onSelect: () => void
  isSelected: boolean
}) {
  return (
    <RadioGroup className="w-full">
      <Card className="w-full">
        <CardContent className="flex px-6">
          <div className="flex items-center gap-6 text-sm font-medium">
            <RadioGroupItem
              value="address"
              id="address"
              className="h-4 w-4"
              checked={isSelected}
              onClick={() => {
                setNewAddress(false)
                onSelect()
              }}
            />
            <Label htmlFor="address">
              {address.street}, {address.number}. <br />
              {address.complement}, {address.neighborhood}. <br />{' '}
              {address.city}, {address.state}, {address.zipCode}
            </Label>
          </div>
        </CardContent>
      </Card>
      <Card className="flex h-12.5 items-center">
        <CardContent className="flex h-full w-full px-6">
          <div className="flex items-center gap-6 text-sm font-medium">
            <RadioGroupItem
              value="new-address"
              id="new-address"
              className="h-4 w-4"
              onClick={() => setNewAddress(true)}
            />
            <Label htmlFor="new-address">Adicionar novo endereço</Label>
          </div>
        </CardContent>
      </Card>
    </RadioGroup>
  )
}
