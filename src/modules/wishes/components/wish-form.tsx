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
import { useActionState, useEffect } from 'react'
import { WishActionState } from '../types/wish'
import { createWish } from '../../../app/(protected)/wishes/actions'

type Props = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  onSubmit?: () => void
}

export default function WishForm({ isOpen, setOpen, onSubmit }: Props) {
  const initialState: WishActionState = {
    success: false,
    error: {},
    values: {
      title: '',
      url: '',
      isFavorite: 'false',
      description: ''
    }
  }

  const [state, formAction, isPending] = useActionState(
    createWish,
    initialState
  )

  useEffect(() => {
    if (state.success && onSubmit) {
      onSubmit()
    }
  }, [state.success, onSubmit])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agrega un deseo</DialogTitle>
          <DialogDescription>
            Llena el formulario para agregar un nuevo deseo
          </DialogDescription>
        </DialogHeader>
        <form className='grid gap-4' action={formAction}>
          <div className='grid gap-3'>
            <Label htmlFor='title'>Título*</Label>
            <Input id='title' name='title' defaultValue={state.values.title} />
            {state.error?.title && !isPending && (
              <p className='text-sm text-red-600'>{state.error.title}</p>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='description'>Descripción</Label>
            <Textarea
              id='description'
              name='description'
              defaultValue={state.values.description}
            />
            {state.error?.description && !isPending && (
              <p className='text-sm text-red-600'>{state.error.description}</p>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='url'>Url*</Label>
            <Input
              type='url'
              id='url'
              name='url'
              defaultValue={state.values.url}
            />
            {state.error?.url && !isPending && (
              <p className='text-sm text-red-600'>{state.error.url}</p>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='favorite'>Favorito</Label>
            <Switch
              id='favorite'
              name='isFavorite'
              defaultChecked={state.values.isFavorite === 'true'}
            />
            {state.error?.isFavorite && !isPending && (
              <p className='text-sm text-red-600'>{state.error.isFavorite}</p>
            )}
            <input
              type='hidden'
              name='isFavorite'
              defaultValue={state.values.isFavorite}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
