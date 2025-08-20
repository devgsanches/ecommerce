export function formatCpfOrCnpj(value: string) {
  let newValue: string = ''

  for (let i = 0; i < value.length; i++) {
    if (i <= 5) {
      newValue += value[i]
    }
    if (i > 5) {
      newValue += '*'
    }
  }
  return newValue
}
