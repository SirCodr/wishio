import SupabaseProvider from '@/lib/supabase/client-provider'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AppHeader } from '@/components/app-header'

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) redirect('/sign-in')

  return (
    <SupabaseProvider>
      <div>
        <AppHeader />
        <div className='min-h-screen bg-background transition-all duration-500 theme-modern'>
          <div className='container mx-auto px-4 py-8 max-w-11/12'>
            {children}
          </div>
        </div>
      </div>
    </SupabaseProvider>
  )
}
