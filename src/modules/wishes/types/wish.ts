export type WishFormPayload = {
  title: string
  url: string
  is_favorite: boolean
  status: WISH_STATUS
  id?: string
  description?: string
  image_url?: string
  price?: string
  priority?: WISH_PRIORITY
}

export type WishActionState = {
  success: boolean
  error: Partial<Record<keyof WishFormPayload, string[]>>
  values: Record<keyof WishFormPayload, string>
}

export type WISH_STATUS = 'wishlist' | 'purchased' | 'discarded'
export type WISH_PRIORITY = 'low' | 'medium' | 'high'
