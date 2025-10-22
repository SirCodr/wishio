import WishesView from './components/wishes-view'
import { Suspense } from 'react'
import WishesSkeletonLoader from '../../../modules/wishes/components/wishes-skeleton-loader'
import WishesHeaderLoader from '../../../modules/wishes/components/wishes-header-loader'
import WishesHeader from './components/wishes-header'

export default async function Home() {
  return (
    <>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-foreground mb-2 text-balance'>
          Wishio
        </h1>
        <p className='text-muted-foreground text-lg'>
          Centraliza todos tus deseos de compra en un solo lugar
        </p>
      </div>

      <Suspense fallback={<WishesHeaderLoader />}>
        <WishesHeader />
      </Suspense>

      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <Suspense fallback={<WishesSkeletonLoader />}>
          <WishesView />
        </Suspense>
      </div>
    </>
  )
}
