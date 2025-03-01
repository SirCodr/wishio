import { z } from 'zod'

export const wishCreateSchema = z.object({
  title: z.string().max(200).min(1, { message: 'Title is required' }),
  description: z.string().max(200).optional(),
  web_url: z.string().optional(),
  acquired: z.boolean(),
  user_id: z.string(),
  wishlist_id: z.string().min(1, { message: 'Wishlist is required' })
})