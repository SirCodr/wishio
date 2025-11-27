'use client'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useState } from 'react'
import { WishActionState } from '../types/wish'
import { createWish, updateWish } from '../../../app/(protected)/wishes/actions'
import { Tables } from '@/lib/supabase/database.types'
import { PRIORITY_CONFIG, STATUS_CONFIG } from '../constants/wishes'
import { CheckCircle2 } from 'lucide-react'

type Props = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  wish?: Tables<'wishes'>
  onSubmit?: () => void
}

export default function WishForm({ isOpen, setOpen, wish, onSubmit }: Props) {
  const initialState: WishActionState = {
    success: false,
    error: {},
    values: {
      id: wish?.id || '',
      title: wish?.title || '',
      url: wish?.url || '',
      is_favorite: `${wish?.is_favorite}` || 'false',
      description: wish?.description || '',
      status: wish?.status || 'wishlist',
      image_url: wish?.image_url || '',
      price: wish?.price || '',
      priority: wish?.priority || 'low'
    }
  }

  const [state, formAction, isPending] = useActionState(
    wish ? updateWish : createWish,
    initialState
  )

  const [status, setStatus] = useState<string>(
    wish?.status || initialState.values.status
  )
  const [priority, setPriority] = useState<string>(
    wish?.priority || initialState.values.priority
  )

  useEffect(() => {
    if (state.success && onSubmit) {
      onSubmit()
    }
  }, [state.success, onSubmit])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[550px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {wish ? 'Editar Deseo' : 'Agregar Nuevo Deseo'}
          </DialogTitle>
          <DialogDescription>
            {wish
              ? 'Modifica los detalles de tu deseo a continuación.'
              : 'Completa el formulario para agregar un nuevo deseo.'}
          </DialogDescription>
        </DialogHeader>
        <form className='grid gap-4' action={formAction}>
          <input type='hidden' name='id' value={wish?.id} />
          <div className='grid gap-3'>
            <Label htmlFor='title' className='label-required'>
              Título
            </Label>
            <Input
              id='title'
              name='title'
              defaultValue={state.values.title}
              placeholder='Ej: iPhone 15 Pro Max 256GB'
            />
            {state.error?.title && !isPending && (
              <p className='text-sm text-red-600'>{state.error.title}</p>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='url' className='label-required'>
              Url
            </Label>
            <Input
              type='url'
              id='url'
              name='url'
              defaultValue={state.values.url}
              placeholder='https://ejemplo.com/producto'
            />
            {state.error?.url && !isPending && (
              <p className='text-sm text-red-600'>{state.error.url}</p>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='description'>Descripción</Label>
            <Textarea
              id='description'
              name='description'
              defaultValue={state.values.description}
              placeholder='Agrega detalles sobre el producto...'
            />
            {state.error?.description && !isPending && (
              <p className='text-sm text-red-600'>{state.error.description}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='image_url' className='text-base font-semibold'>
              URL de la imagen
            </Label>
            <Input
              id='image_url'
              name='image_url'
              type='url'
              defaultValue={state.values.image_url}
              placeholder='https://ejemplo.com/imagen.jpg'
              className={state.error.image_url ? 'border-destructive' : ''}
            />
            {state.error.image_url && (
              <p className='text-sm text-destructive'>
                {state.error.image_url}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='price' className='text-base font-semibold'>
              Precio
            </Label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                $
              </span>
              <Input
                id='price'
                name='price'
                type='number'
                step='0.01'
                placeholder='0.00'
                defaultValue={state.values.price}
                className={`pl-7 ${
                  state.error.price ? 'border-destructive' : ''
                }`}
              />
            </div>
            {state.error.price && (
              <p className='text-sm text-destructive'>{state.error.price}</p>
            )}
          </div>

          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Prioridad</Label>
            <div className='flex gap-2'>
              {Object.keys(PRIORITY_CONFIG).map((priorityKey) => {
                const config =
                  PRIORITY_CONFIG[priorityKey as keyof typeof PRIORITY_CONFIG]
                const isSelected = priority === priorityKey
                return (
                  <button
                    key={priorityKey}
                    type='button'
                    onClick={() => setPriority(priorityKey)}
                    className={`flex-1 relative px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                      isSelected ? config.activeColor : config.color
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className='absolute top-2 right-2 w-4 h-4' />
                    )}
                    {config.label}
                  </button>
                )
              })}
            </div>
            <input type='hidden' name='priority' value={priority} />
          </div>

          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Estado</Label>
            <div className='flex gap-2'>
              {Object.keys(STATUS_CONFIG).map((statusKey) => {
                const config =
                  STATUS_CONFIG[statusKey as keyof typeof STATUS_CONFIG]
                const isSelected = status === statusKey
                return (
                  <button
                    key={statusKey}
                    type='button'
                    onClick={() => setStatus(statusKey)}
                    className={`flex-1 relative px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium ${
                      isSelected ? config.activeColor : config.color
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className='absolute top-2 right-2 w-4 h-4' />
                    )}
                    {config.label}
                  </button>
                )
              })}
            </div>
            <input type='hidden' name='status' value={status} />
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
