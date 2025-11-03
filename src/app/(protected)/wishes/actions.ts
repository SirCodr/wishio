'use server'

import { createServerClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { WishActionState, WishFormPayload } from '@/modules/wishes/types/wish'

export async function createWish(prevState: WishActionState, data: FormData) {
  const postCreationSchema: z.ZodType<WishFormPayload> = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    url: z.string().url('La URL no es válida'),
    isFavorite: z.coerce.boolean(),
    description: z.string().optional()
  })
  const values = Object.fromEntries(data.entries()) as Record<
    keyof WishFormPayload,
    string
  >

  try {
    const parsedData = postCreationSchema.safeParse(values)

    if (!parsedData.success) {
      return {
        success: false,
        error: parsedData.error.flatten().fieldErrors,
        values
      }
    }

    const { userId } = await auth()
    const supabase = await createServerClient()

    await supabase.from('wishes').insert({
      title: parsedData.data.title,
      url: parsedData.data.url,
      isFavorite: parsedData.data.isFavorite,
      description: parsedData.data.description,
      user_id: userId
    })

    revalidatePath('/wishes')
    return { success: true, error: {}, values }
  } catch (error) {
    console.log('Error on create record action', error)
    return {
      success: false,
      error: { title: ['Error al crear el deseo'] },
      values
    }
  }
}
