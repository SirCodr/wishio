import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { WishForm } from './WishForm'
import { Plus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { create } from '@/services/wishes'
import { WishCreateDto } from '@/types/wishes'
import useAuth from '@/hooks/useAuth'

type Props = {
  wishlist_id?: string,
  onSubmit?: () => void
}

export function AddWishModal(props: Props) {
  const { user } = useAuth()
  const initialData: Partial<WishCreateDto> = {
    wish: {
      title: '',
      description: '',
      web_url: '',
      acquired: false,
      user_id: user!.id
    },
    wishlist_id: props.wishlist_id
  }

  const [isOpen, setIsOpen] = React.useState(false)
  const { mutate, isPending } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      if (props.onSubmit) props.onSubmit()
      setIsOpen(false)
    }
  })

  async function handleWishSubmit(wishData: WishCreateDto) {
    mutate(wishData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Wish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wish</DialogTitle>
          <DialogDescription>
            Create a new wish item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <WishForm onSubmit={handleWishSubmit} isLoading={isPending} initialData={initialData} />
      </DialogContent>
    </Dialog>
  )
}