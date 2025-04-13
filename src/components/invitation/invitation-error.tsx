import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Button } from '../ui/button'
import { AlertTriangle } from "lucide-react"
import { useNavigate } from 'react-router-dom'

export default function InvitationError({ message }: { message?: string }) {
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-center h-full bg-gradient-to-b from-primary/10 to-background'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center flex items-center justify-center'>
            <AlertTriangle className='h-5 w-5 mr-2 text-amber-500' />
            Invitation Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center text-muted-foreground'>
            {message || 'This invitation may have expired or been removed.'}
          </p>
        </CardContent>
        <CardFooter>
          <Button className='w-full' onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
