import { AddWishModal } from '@/components/AddWishModal'
import EmptyDataCard from '@/components/ui/empty-data-card'
import Loader from '@/components/ui/loader'
import WishItem from '@/components/WishItem'
import { getSharedByWishlist } from '@/services/wishes'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const SharedWishesPage = () => {
  const { id = '' } = useParams()
  const { data: wishes, isLoading, refetch } = useQuery({
    queryKey: ['wishes'],
    queryFn: async() => getSharedByWishlist(id)
  })

  return (
    <>
      <div className='w-full flex justify-between pb-6'>
        <h2 className='text-3xl font-bold'>Shared wishes</h2>
      </div>

      {isLoading && (
        <div className='w-full h-full'>
          <Loader />
        </div>
      )}

      {!isLoading && !wishes?.length && (
        <section className='flex flex-col items-center justify-center w-full h-[calc(100%-24px)] overflow-auto'>
          <EmptyDataCard
            chidlren={<AddWishModal wishlist_id={id} onSubmit={refetch} />}
          />
        </section>
      )}

      {!isLoading && wishes && (
        <section className='flex flex-wrap gap-8 w-full p-4'>
          {wishes.map((wish) => (
            <div key={wish.id} className='max-w-80'>
              <WishItem
                item={wish}
                wishlist_id={id}
                onEdit={refetch}
                onDelete={refetch}
                allowActions={false}
              />
            </div>
          ))}
        </section>
      )}
    </>
  )
}

export default SharedWishesPage
