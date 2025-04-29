import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { WishForm } from './WishForm'
import { Edit } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { update } from '@/services/wishes'
import { Wish, WishCreateDto } from '@/types/wishes'
import useAuth from '@/hooks/useAuth'

type Props = {
  wish: Wish
  wishlist_id?: string
  onSubmit?: () => void
}

export function EditWishModal(props: Props) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: (wish: Partial<Wish>) => update(wish),
    onSuccess: () => {
      if (props.onSubmit) props.onSubmit()
      setIsOpen(false)
    }
  })

  const initialData = {
   wish: {
     ...props.wish,
    user_id: user!.id,
   },
    wishlist_id: props.wishlist_id
  }

  async function handleWishSubmit(wishData: Partial<WishCreateDto>) {
    const newWishData = { ...wishData };
    delete newWishData.wishlist_id;

    mutate({
      ...newWishData,
      id: props.wish.id
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
            <Edit className='h-4 w-4' />
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Wish</DialogTitle>
          <DialogDescription>
            Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <WishForm onSubmit={handleWishSubmit} isLoading={isPending} initialData={initialData} editMode />
      </DialogContent>
    </Dialog>
  )
}