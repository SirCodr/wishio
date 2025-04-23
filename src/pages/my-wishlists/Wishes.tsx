import { AddWishModal } from '@/components/AddWishModal'
import EmptyDataCard from '@/components/ui/empty-data-card'
import Loader from '@/components/ui/loader'
import WishItem from '@/components/WishItem'
import { getByWishlist } from '@/services/wishes'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const WishesPage = () => {
  const { id = '' } = useParams()
  const { data: wishes, isFetching, refetch } = useQuery({
    queryKey: ['wishes'],
    queryFn: async() => getByWishlist(id)
  })

  return (
    <>
      <div className='w-full flex justify-between pb-6'>
        <h2 className='text-3xl font-bold'>Wishes</h2>
        {!isFetching && wishes && wishes.length > 0 && (
          <AddWishModal wishlist_id={id} onSubmit={refetch} />
        )}
      </div>

      {isFetching && (
        <div className='w-full h-full'>
          <Loader />
        </div>
      )}

      {!isFetching && !wishes?.length && (
        <section className='flex flex-col items-center justify-center w-full h-[calc(100%-24px)] overflow-auto'>
          <EmptyDataCard
            chidlren={<AddWishModal wishlist_id={id} onSubmit={refetch} />}
          />
        </section>
      )}

      {!isFetching && wishes && (
        <section className='flex flex-wrap gap-8 w-full p-4'>
          {wishes.map((wish) => (
            <div key={wish.id} className='max-w-80'>
              <WishItem
                item={wish}
                wishlist_id={id}
                onEdit={refetch}
                onDelete={refetch}
              />
            </div>
          ))}
        </section>
      )}
    </>
  )
}

export default WishesPage
