export type Wish = {
  id: string
  title: string
  description: string
  web_url: string
  image_url: string
  acquired: boolean
  user_id?: string
}

export type WishCreateDto = {
  wish: {
    title: string
    description: string
    web_url: string
    acquired: boolean
    user_id: string
  }
  wishlist_id: string
}