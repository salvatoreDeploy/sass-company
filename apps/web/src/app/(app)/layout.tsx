import type { Metadata } from 'next'
import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">{children}</main>
    </div>
  )
}
