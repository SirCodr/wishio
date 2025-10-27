import type React from 'react'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk'
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: 'Wishio',
  description: 'Manage your wishes'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang='es' suppressHydrationWarning>
        <body
          className={`font-sans ${spaceGrotesk.variable} ${dmSans.variable} theme-modern antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
