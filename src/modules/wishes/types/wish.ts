export type WishFormPayload = {
  id?: string
  title: string
  url: string
  is_favorite: boolean
  description?: string
}

export type WishActionState = {
  success: boolean
  error: Partial<Record<keyof WishFormPayload, string[]>>
  values: Record<keyof WishFormPayload, string>
}
