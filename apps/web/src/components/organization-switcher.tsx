import { ChevronsUpDown, LogOut, PlusCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { getOrganizaation } from '@/http/get-organizations'
import { getCurrentOrganization } from '@/auth/auth'

export async function OrganizationSwitcher() {
  const currentOrganizationValue = getCurrentOrganization()
  const { organizations } = await getOrganizaation()

  const currentOrganizationActivity = organizations.find(
    (org) => org.slug === currentOrganizationValue
  )

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 
        focus-visible:ring-primary"
        >
          {currentOrganizationActivity ? (
            <>
              <Avatar className="mr-2 size-5">
                {currentOrganizationActivity.avatarUrl && (
                  <AvatarImage src={currentOrganizationActivity.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>
              <span className="truncate text-left">
                {currentOrganizationActivity.name}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Select organization</span>
          )}

          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-16}
          sideOffset={12}
          className="w-[200px]"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>Organizations</DropdownMenuLabel>
            {organizations.map((organization) => {
              return (
                <DropdownMenuItem key={organization.id} asChild>
                  <Link href={`/org/${organization.slug}`}>
                    <Avatar className="mr-2 size-5">
                      {organization.avatarUrl && (
                        <AvatarImage src={organization.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="line-clamp-1">{organization.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/create-organization">
              <PlusCircle className="mr-2 size-5" />
              Sign Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
