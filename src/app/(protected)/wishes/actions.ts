'use server'

import { createServerClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { WishActionState, WishFormPayload } from '@/modules/wishes/types/wish'
import { BASE_PATH } from '@/constants/paths'

export async function createWish(prevState: WishActionState, data: FormData) {
  const postCreationSchema: z.ZodType<WishFormPayload> = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    url: z.string().url('La URL no es válida'),
    is_favorite: z.coerce.boolean(),
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

    const { userId, getToken } = await auth()
    const token = await getToken()
    const supabase = await createServerClient()

    const targetResponse = await fetch(
      `${BASE_PATH}/api/metascraper?targetUrl=` + parsedData.data.url,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const { imageUrl } = await targetResponse.json()

    await supabase.from('wishes').insert({
      title: parsedData.data.title,
      url: parsedData.data.url,
      is_favorite: parsedData.data.is_favorite,
      description: parsedData.data.description,
      image_url: imageUrl,
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

export async function updateWish(prevState: WishActionState, data: FormData) {
  const updateSchema: z.ZodType<WishFormPayload> = z.object({
    id: z.string().min(1, 'El ID es obligatorio'),
    title: z.string().min(1, 'El título es obligatorio'),
    url: z.string().url('La URL no es válida'),
    is_favorite: z.coerce.boolean(),
    description: z.string().optional()
  })
  const values = Object.fromEntries(data.entries()) as Record<
    keyof WishFormPayload,
    string
  >

  try {
    const parsedData = updateSchema.safeParse(values)

    if (!parsedData.success) {
      return {
        success: false,
        error: parsedData.error.flatten().fieldErrors,
        values
      }
    }

    const supabase = await createServerClient()

    await supabase
      .from('wishes')
      .update({
        title: parsedData.data.title,
        url: parsedData.data.url,
        isFavorite: parsedData.data.is_favorite,
        description: parsedData.data.description
      })
      .eq('id', parsedData.data.id)

    revalidatePath('/wishes')
    return { success: true, error: {}, values }
  } catch (error) {
    console.log('Error on update record action', error)
    return {
      success: false,
      error: { title: ['Error al actualizar el deseo'] },
      values
    }
  }
}

export async function deleteWish(id: string) {
  const deleteSchema = z.string().min(1, 'El ID es obligatorio')

  try {
    const parsedData = deleteSchema.safeParse(id)

    if (!parsedData.success) {
      return {
        success: false,
        error: parsedData.error.flatten().fieldErrors,
        id
      }
    }

    const supabase = await createServerClient()

    await supabase.from('wishes').delete().eq('id', parsedData.data)

    revalidatePath('/wishes')
    return { success: true, error: {}, id }
  } catch (error) {
    console.log('Error on delete record action', error)
    return {
      success: false,
      error: { title: ['Error al eliminar el deseo'] },
      id
    }
  }
}
