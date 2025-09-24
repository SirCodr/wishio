import WishesView from "./components/wishes-view"
import { Suspense } from "react"
import WishesSkeletonLoader from "./components/wishes-skeleton-loader"
import WishesHeaderLoader from "./components/wishes-header-loader"
import WishesHeader from "./components/wishes-header"

export default async function Home() {
  return (
    <div className="min-h-screen bg-background transition-all duration-500 theme-modern">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Wishio</h1>
          <p className="text-muted-foreground text-lg">Centraliza todos tus deseos de compra en un solo lugar</p>
        </div>

        <Suspense fallback={<WishesHeaderLoader />}>
          <WishesHeader />
        </Suspense>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<WishesSkeletonLoader />}>
            <WishesView />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
