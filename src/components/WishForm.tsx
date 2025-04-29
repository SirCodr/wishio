import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { useQuery } from '@tanstack/react-query'
import { getByUser } from '@/services/wishlists'
import { WishList } from '@/types/wishlists'
import { Spinner } from '@chakra-ui/react'
import { WishCreateDto } from '@/types/wishes'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { wishCreateSchema } from '@/schema/wishSchema'
import { toast } from 'sonner'
import useAuth from '@/hooks/useAuth'
import { Switch } from './ui/switch'

interface WishFormProps {
  onSubmit: (wish: WishCreateDto) => Promise<void>
  initialData?: Partial<WishCreateDto>,
  isLoading?: boolean
  editMode?: boolean
}

export function WishForm({
  onSubmit,
  isLoading,
  initialData,
  editMode
}: WishFormProps) {
  const { user } = useAuth()
  const { data: wishlists, isFetching: isWishlistQuerying } = useQuery({
    queryKey: ['user-wishlist'],
    queryFn: () => getByUser(user!.id)
  })
  const { control, register, handleSubmit, formState: { errors } } = useForm<WishCreateDto>({
    resolver: zodResolver(wishCreateSchema),
    defaultValues: initialData
  })

  const [isFormLoading, setFormLoading] = useState(false)

  const _onSubmit: SubmitHandler<WishCreateDto> = (data) => {
    setFormLoading(true)
    try {
      onSubmit(data)
    } catch (error) {
      console.error(error)
    } finally {
      setFormLoading(false)
    }
  }

  const WishSelectItems = ({wishlists }: { wishlists: WishList[] }) => {
    return wishlists.map((wishlist) => (
      <SelectItem value={wishlist.id}>{wishlist.name}</SelectItem>
    ))
  }

  useEffect(() => {
    setFormLoading(Boolean(isLoading))
  }, [isLoading])

  useEffect(() => {
    const _errors = Object.entries(errors)
    if (_errors.length) toast.error(_errors[0][1].message)
  }, [errors])

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='title' className='text-right'>
            Title
          </Label>
          <Input
            {...register('wish.title')}
            required
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          <Textarea
           {...register('wish.description')}
            className='col-span-3'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='wishlist' className='text-right'>
            Wishlist
          </Label>
          {isWishlistQuerying ? (
            <Spinner />
          ) : (
            <Controller
                name="wishlist_id"
                control={control}
                rules={{ required: 'Please select a wishlist' }}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a wishlist" />
                        </SelectTrigger>
                        <SelectContent>
                            <WishSelectItems wishlists={wishlists || []} />
                        </SelectContent>
                    </Select>
                )}
            />
          )}
        </div>
        {
          editMode && (
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='wish.acquired' className='text-right'>
                Acquired
              </Label>
              <Controller
                name="wish.acquired"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='col-span-3'
                />
                )}
              />
            </div>
          )
        }
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='web-url' className='text-right'>
            Web Url
          </Label>
          <Input
          {...register('wish.web_url')}
            className='col-span-3'
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button type='submit' disabled={isWishlistQuerying || isFormLoading}>
          {isFormLoading ? (
            <div className='flex items-center gap-x-2'>
              <span>{editMode ? 'Updating' : 'Saving'}</span>
              <Spinner size='xs' />
            </div>
          ) : (
            editMode ? 'Update' : 'Save'
          )}
        </Button>
      </div>
    </form>
  )
}
