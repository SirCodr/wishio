import { Tables } from '@lib/supabase/database.types'
import { createServerClient } from '@lib/supabase/server'
import { WishCardStandard } from '@modules/wishes/components/wish-card-standard'
import { EmptyWishes } from '../../../../modules/wishes/components/empty-wishes'

export default async function WishesView() {
  const supabase = await createServerClient()
  const { data: wishes } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false })
    .overrideTypes<Tables<'wishes'>[]>()

  if (!wishes || wishes.length === 0) {
    return (
      <div className="col-span-full">
        <EmptyWishes />
      </div>
    )
  }

  return wishes.map((wish) => (
    <WishCardStandard
      key={wish.id}
      title={wish.title}
      url={wish.url}
      description={wish.description || ''}
      isFavorite={wish.isFavorite}
    />
  ))
}
