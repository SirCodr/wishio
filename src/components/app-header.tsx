'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export function AppHeader() {
  return (
    <header className='mx-auto sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between px-6 mx-auto max-w-11/12'>
        <div className='flex items-center space-x-8'>
          <Link href='/' className='flex items-center space-x-2'>
            <h1 className='text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
              Wishio
            </h1>
          </Link>
        </div>

        <div className='flex items-center space-x-4'>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
