import { Divide } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { getCurrentOrganization } from '@/auth/auth'
import { NavActivityLink } from './nav-activity-link'

export function Tabs() {
  const currentOrg = getCurrentOrganization()

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
        >
          <NavActivityLink href={`/org/${currentOrg}`}>
            Projects
          </NavActivityLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
        >
          <NavActivityLink href={`/org/${currentOrg}/members`}>
            Members
          </NavActivityLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
        >
          <NavActivityLink href={`/org/${currentOrg}/settings`}>
            Settings & Billing
          </NavActivityLink>
        </Button>
      </nav>
    </div>
  )
}
