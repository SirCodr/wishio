'use client'

import { Button } from '@components/ui/button'
import WishForm from '@modules/wishes/components/wish-form'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function AddWish() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button
        className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
        onClick={() => setOpen(true)}
      >
        <Plus className='h-4 w-4 mr-2' />
        Agregar wish
      </Button>
      {isOpen && <WishForm isOpen={isOpen} setOpen={setOpen} />}
    </>
  )
}
