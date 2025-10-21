'use client'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Switch } from '@components/ui/switch'
import { Textarea } from '@components/ui/textarea'
import { Label } from '@components/ui/label'
import { Button } from '@components/ui/button'
import { useState } from 'react'

type Props = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  onSubmit?: () => void
}

export default function WishForm({ isOpen, setOpen }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agrega un deseo</DialogTitle>
          <DialogDescription>
            Llena el formulario para agregar un nuevo deseo
          </DialogDescription>
        </DialogHeader>
        <form className='grid gap-4'>
          <div className='grid gap-3'>
            <Label htmlFor='title'>Título*</Label>
            <Input id='title' name='title' required />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='description'>Descripción</Label>
            <Textarea id='description' name='description' />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='url'>Url*</Label>
            <Input type='url' id='url' name='url' required />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='favorite'>Favorito</Label>
            <Switch id='favorite' name='favorite' />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </DialogClose>
          <Button type='submit'>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
