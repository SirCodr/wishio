import { Gift, TrendingUp, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  const wishlists = [
    {
      id: 1,
      title: 'Birthday Wishlist',
      items: 5,
      shared: false,
      owner: 'You'
    },
    {
      id: 2,
      title: 'Christmas Wishlist',
      items: 8,
      shared: true,
      owner: 'Alice Johnson'
    },
    {
      id: 3,
      title: 'Wedding Registry',
      items: 12,
      shared: true,
      owner: 'Bob Smith'
    },
    {
      id: 4,
      title: 'Housewarming Wishlist',
      items: 6,
      shared: true,
      owner: 'Charlie Brown'
    },
    {
      id: 5,
      title: 'Baby Shower Wishlist',
      items: 15,
      shared: true,
      owner: 'Diana Prince'
    }
  ]

  const wishItems = [
    {
      id: 1,
      title: 'New Laptop',
      description: 'MacBook Pro 16-inch',
      url: 'https://apple.com',
      imageUrl: '/placeholder.svg?height=100&width=100',
      completed: false
    },
    {
      id: 2,
      title: 'Cake Stand',
      description: 'Ceramic cake stand with dome',
      url: 'https://cakestand.com',
      imageUrl: '/placeholder.svg?height=100&width=100',
      completed: true
    }
  ]

  return (
    <>
      <h2 className='text-3xl font-bold'>Dashboard</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Gift className='mr-2 h-5 w-5' />
              Total Wishlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{wishlists.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <TrendingUp className='mr-2 h-5 w-5' />
              Completed Wishes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>
              {wishItems.filter((item) => item.completed).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Calendar className='mr-2 h-5 w-5' />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>2</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
