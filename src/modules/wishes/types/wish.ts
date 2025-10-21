export type WishFormPayload = {
  title: string
  url: string
  isFavorite: boolean
  description?: string
}

export type WishActionState = {
  success: boolean
  error: Partial<Record<keyof WishFormPayload, string[]>>
  values: Record<keyof WishFormPayload, string>
}
