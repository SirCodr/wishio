'use client'

import { deleteWish } from '@/app/(protected)/wishes/actions'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Tables } from '@/lib/supabase/database.types'
import { useActionState } from 'react'

interface DeleteWishDialogProps {
  wish: Tables<'wishes'>
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteWishDialog({
  wish,
  open,
  onOpenChange
}: DeleteWishDialogProps) {
  const [, formAction, isPending] = useActionState(
    async (_: unknown, payload: string) => await deleteWish(payload),
    {
      success: false,
      error: {},
      id: wish.id
    }
  )

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <form action={() => formAction(wish.id)}>
          <input type='hidden' name='id' value={wish.id} />
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este Deseo?</AlertDialogTitle>
            <AlertDialogDescription className='pb-3'>
              Estás a punto de eliminar{' '}
              <span className='font-semibold text-foreground'>
                {wish.title}
              </span>
              . Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <Button
              type='submit'
              variant='outline'
              disabled={isPending}
              className='text-white bg-destructive hover:bg-destructive/90 hover:text-white'
            >
              {isPending ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
