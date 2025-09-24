export function SkeletonWishLoader() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-4/5 bg-muted animate-pulse rounded" />
          <div className="h-4 w-3/5 bg-muted animate-pulse rounded" />
        </div>

        {/* Domain skeleton */}
        <div className="h-3 w-20 bg-muted animate-pulse rounded-full" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted animate-pulse rounded" />
          <div className="h-3 w-full bg-muted animate-pulse rounded" />
          <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-muted animate-pulse rounded" />
            <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WishesSkeletonLoader() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonWishLoader key={i} />
      ))}
    </>
  )
}
