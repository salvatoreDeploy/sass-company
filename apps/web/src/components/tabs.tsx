import { Divide } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ability, getCurrentOrganization } from '@/auth/auth'
import { NavActivityLink } from './nav-activity-link'

export async function Tabs() {
  const currentOrg = getCurrentOrganization()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canGetMembers = permissions?.can('get', 'User')
  const canGetProjects = permissions?.can('get', 'Project')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {canGetProjects && (
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
        )}

        {canGetMembers && (
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
        )}

        {(canUpdateOrganization || canGetBilling) && (
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
        )}
      </nav>
    </div>
  )
}
