type Props = {
  title: string
}

export default function WishCardImagePlaceHolder({ title }: Props) {
  const initials = title
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 relative overflow-hidden'>
      <div className='absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]' />
      <span className='text-4xl md:text-3xl font-bold text-primary/60 z-10'>
        {initials}
      </span>
    </div>
  )
}
