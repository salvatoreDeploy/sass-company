import type { Metadata } from 'next'
import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'
export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}
