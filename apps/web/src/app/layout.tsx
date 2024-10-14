import type { Metadata } from 'next'
import './globals.css'
import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }

  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
