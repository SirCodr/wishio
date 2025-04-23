import { useQuery } from '@tanstack/react-query'
import { getSharedToUser } from '@/services/wishlists'
import useAuth from '@/hooks/useAuth'
import WishlistSharedItem from '@/components/wishlist-shared-item'
import EmptyDataCard from '@/components/ui/empty-data-card'
import Loader from '@/components/ui/loader'

export default function SharedWishlistsPage() {
  const { user } = useAuth()
  const { data: wishlists = [], isFetching } = useQuery({
    queryKey: ['wishlists-shared-to-user'],
    queryFn: () => getSharedToUser(user!.id)
  })

  return (
    <>
      <h2 className='text-3xl font-bold pb-6'>Shared wishlists</h2>

      {
        isFetching && (
          <div className='w-full h-full'>
            <Loader />
          </div>
        )
      }

      {!isFetching && !wishlists?.length && (
          <section className='flex flex-col items-center justify-center w-full h-full'>
            <EmptyDataCard />
          </section>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {!isFetching && wishlists &&
          wishlists.map((wishlist) => (
            <WishlistSharedItem key={wishlist.id} wishlist={wishlist} />
          ))}
      </div>
    </>
  )
}
