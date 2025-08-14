export function handleNoSpaceInput(e: Event) {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/\s/g, '')
}