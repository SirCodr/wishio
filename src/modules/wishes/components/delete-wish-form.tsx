'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

interface DeleteWishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  wishTitle: string
}

export function DeleteWishDialog({
  open,
  onOpenChange,
  onConfirm,
  wishTitle
}: DeleteWishDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar este wish?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar{' '}
            <span className='font-semibold text-foreground'>"{wishTitle}"</span>
            . Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className='bg-destructive hover:bg-destructive/90'
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
