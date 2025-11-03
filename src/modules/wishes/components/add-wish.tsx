'use client'

import { Button } from '@/components/ui/button'
import useBreakpoint from '@/hooks/useBreakpoint'
import WishForm from '@/modules/wishes/components/wish-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function AddWish() {
  const [isOpen, setOpen] = useState(false)
  const { xs } = useBreakpoint()

  return (
    <>
      <Button
        className='flex items-center bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
        onClick={() => setOpen(true)}
      >
        <Plus className='h-4 w-4' />
        {!xs && 'Agregar Deseo'}
      </Button>
      {isOpen && (
        <WishForm
          isOpen={isOpen}
          setOpen={setOpen}
          onSubmit={() => setOpen(false)}
        />
      )}
    </>
  )
}
