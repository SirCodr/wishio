import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Loader, Plus } from 'lucide-react'

export default function WishesHeaderLoader() {
  return (
    <div className='flex items-center justify-between mb-6'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-semibold text-foreground'>Mis Deseos</h2>
        <Badge variant='secondary' className='text-sm'>
          <Loader className='h-4 w-4 animate-spin' />
        </Badge>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Heart className='h-4 w-4 fill-red-500 text-red-500' />
          <Loader className='h-4 w-4 animate-spin' />
          <span>favoritos</span>
        </div>
      </div>
      <Button className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'>
        <Plus className='h-4 w-4 mr-2' />
        Agregar Deseo
      </Button>
    </div>
  )
}
