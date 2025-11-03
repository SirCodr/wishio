'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MinimalEmptyProps {
  title?: string
  description?: string
  cta?: string
  onCta?: () => void
}

export function EmptyState({
  title,
  description,
  cta,
  onCta
}: MinimalEmptyProps) {
  return (
    <div className='flex flex-col items-center justify-center py-24 px-4'>
      <div className='w-12 h-12 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mb-6'>
        <Plus className='h-6 w-6 text-muted-foreground/50' />
      </div>

      <h3 className='text-xl font-medium text-foreground mb-2'>
        {title || 'Sin contenido aún'}
      </h3>

      <p className='text-muted-foreground text-center mb-6 max-w-sm'>
        {description || 'Parece que no hay nada aquí.'}
      </p>

      <Button
        onClick={onCta}
        variant='outline'
        className='border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent'
      >
        {cta || 'Agregar'}
      </Button>
    </div>
  )
}
