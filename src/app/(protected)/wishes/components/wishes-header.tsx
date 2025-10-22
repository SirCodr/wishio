import { Badge } from '@components/ui/badge'
import { Heart } from 'lucide-react'
import { Tables } from '@lib/supabase/database.types'
import { createServerClient } from '@lib/supabase/server'
import AddWish from '@modules/wishes/components/add-wish'
import { auth } from '@clerk/nextjs/server'

export default async function WishesHeader() {
  const supabase = await createServerClient()
  const { userId } = await auth()
  const { data: wishes } = await supabase
    .from('wishes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .overrideTypes<Tables<'wishes'>[]>()

  return (
    <div className='flex items-center justify-between mb-6'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-semibold text-foreground'>Mis Wishes</h2>
        <Badge variant='secondary' className='text-sm'>
          {wishes?.length ?? 0} productos
        </Badge>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Heart className='h-4 w-4 fill-red-500 text-red-500' />
          <span>{wishes?.filter((w) => w.isFavorite).length} favoritos</span>
        </div>
      </div>
      {wishes && wishes.length > 0 && <AddWish />}
    </div>
  )
}
