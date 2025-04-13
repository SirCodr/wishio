import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Check, Gift, Loader2, User, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Invitation, InvitationStatus } from '@/types/invitation'
import { useEffect, useState } from 'react'

type Props = {
  invitation: Invitation | undefined
  handleAnswer?: (status: InvitationStatus) => void
  isAnswering?: boolean
}

export default function ReceiverInvitation({ invitation, isAnswering, handleAnswer = () => {} }: Props) {
  const navigate = useNavigate()
  const [optionSelected, setOptionSelected] = useState<InvitationStatus | undefined>()

  useEffect(() => {
    if (optionSelected) handleAnswer(optionSelected)
  }, [optionSelected])

  return (
    <div className='flex items-center justify-center h-full bg-gradient-to-b from-primary/10 to-background p-4'>
      <Card className='w-full max-w-md shadow-lg border-t-4 border-t-primary'>
        <CardHeader className='text-center pb-2'>
          <CardTitle className='text-2xl font-bold'>
            Wishlist Invitation
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Sender Information */}
          <div className='flex items-center justify-center'>
            <Avatar className='h-16 w-16 mr-4'>
              <AvatarImage
                src='/placeholder.svg'
                alt={invitation?.sender_name}
              />
              <AvatarFallback className='bg-primary/10'>
                <User className='h-8 w-8 text-primary' />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='text-lg font-medium'>{invitation?.sender_name}</p>
              <p className='text-sm text-muted-foreground'>
                Has invited you to view their wishlist
              </p>
            </div>
          </div>

          {/* Wishlist Information */}
          <div className='bg-primary/5 rounded-lg p-6 text-center'>
            <Gift className='h-10 w-10 mx-auto mb-2 text-primary' />
            <h3 className='text-xl font-bold mb-1'>
              {invitation?.wishlist_name}
            </h3>
            <p className='text-muted-foreground'>
              {invitation?.wishes_count}{' '}
              {invitation?.wishes_count === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Status Messages */}
          {invitation?.status === 'accepted' && (
            <div className='bg-green-50 text-green-700 rounded-lg p-6 text-center'>
              <div className='rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center'>
                <Check className='h-8 w-8' />
              </div>
              <p className='font-medium text-lg'>
                You've accepted this invitation
              </p>  
            </div>
          )}

          {invitation?.status === 'rejected' && (
            <div className='bg-red-50 text-red-700 rounded-lg p-6 text-center'>
              <div className='rounded-full bg-red-100 p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center'>
                <X className='h-8 w-8' />
              </div>
              <p className='font-medium text-lg'>
                You've declined this invitation
              </p>
              <p className='text-sm mt-2'>You can close this page now</p>
            </div>
          )}
        </CardContent>

        {invitation?.status === 'pending' && (
          <CardFooter className='flex flex-col space-y-4'>
            <p className='text-center text-sm text-muted-foreground mb-2'>
              Would you like to join this wishlist?
            </p>
            <div className='flex w-full space-x-4'>
              <Button
                variant='outline'
                size='lg'
                className='flex-1 rounded-full border-2 border-red-200 hover:bg-red-50 hover:text-red-700 transition-all duration-200'
                onClick={() => setOptionSelected('rejected')}
                disabled={isAnswering}
              >
                {isAnswering && optionSelected === 'rejected' ? (
                  <>
                    <Loader2 className='h-5 w-5 mr-2 animate-spin' />
                    Declining...
                  </>
                ) : (
                  <>
                    <X className='h-5 w-5 mr-2' />
                    Decline
                  </>
                )}
              </Button>
              <Button
                size='lg'
                className='flex-1 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-200'
                onClick={() => setOptionSelected('accepted')}
                disabled={isAnswering}
              >
                {isAnswering && optionSelected === 'accepted' ? (
                  <>
                    <Loader2 className='h-5 w-5 mr-2 animate-spin' />
                    Accepting...
                  </>
                ) : (
                  <>
                    <Check className='h-5 w-5 mr-2' />
                    Accept
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        )}

        {invitation?.status === 'accepted' && (
          <CardFooter>
            <Button
              variant='outline'
              className='w-full rounded-full'
              onClick={() => navigate(`/shared/${invitation?.wishlist_id}`)}
            >
              Go to wishlist
            </Button>
          </CardFooter>
        )}

        {invitation?.status === 'rejected' && (
          <CardFooter>
            <Button
              variant='outline'
              className='w-full rounded-full'
              onClick={() => navigate('/')}
            >
              Close
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
