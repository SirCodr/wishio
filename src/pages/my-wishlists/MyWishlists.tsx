import { useQuery } from '@tanstack/react-query'
import { getByUser } from '@/services/wishlists'
import Loader from '@/components/ui/loader'
import useAuth from '@/hooks/useAuth'
import { AddWishlistModal } from '@/components/AddWishlistModal'
import EmptyDataCard from '@/components/ui/empty-data-card'
import WishlistItem from '@/components/wishlist-item'

export default function MyWishlistsPage() {
  const { user } = useAuth()
  const { data: wishlists, refetch, isFetching } = useQuery({
    queryKey: ['wishlists'],
    queryFn: () => getByUser(user!.id)
  })

  return (
    <>
      <div className='w-full flex justify-between pb-6'>
        <h2 className='text-3xl font-bold'>My wishlists</h2>
        {wishlists && wishlists.length > 0 && <AddWishlistModal onSubmit={refetch} />}
      </div>

      {
        isFetching && (
          <div className='w-full h-full'>
            <Loader />
          </div>
        )
      }

      {!isFetching && !wishlists?.length && (
          <section className='flex flex-col items-center justify-center w-full h-full'>
            <EmptyDataCard chidlren={<AddWishlistModal onSubmit={refetch} />} />
          </section>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {!isFetching && wishlists &&
          wishlists.map((wishlist) => (
            <WishlistItem key={wishlist.id} wishlist={wishlist} onSubmit={refetch} />
          ))}
      </div>
    </>
  )
}
