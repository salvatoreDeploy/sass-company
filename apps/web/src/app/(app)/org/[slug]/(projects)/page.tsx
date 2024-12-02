import { ability, getCurrentOrganization } from '@/auth/auth'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ProjectList } from './project-list'

export default async function Projects() {
  const permissions = await ability()
  const currentOrg = getCurrentOrganization()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projetos da Organização</h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`organization/${currentOrg}/project`}>
              <Plus className="mr-2 size-4" />
              Create Project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          You do not have permission to view the organization projects
        </p>
      )}
    </div>
  )
}
