import { ability } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OrganizationForm } from '../../organization-form'
import { ShutdownOrganiztaionButton } from './shutdown-organization-button'

export default async function Project() {
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm />
            </CardContent>
          </Card>
        )}
      </div>

      {canGetBilling && <h1 className="text-2xl font-bold">Billing</h1>}

      {canUpdateOrganization && (
        <div className="space-y-4">
          {canUpdateOrganization && (
            <Card>
              <CardHeader>
                <CardTitle>Shutdown organization</CardTitle>
                <CardDescription>
                  This wil delete all organization all projetcs. You cannot undo
                  this action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShutdownOrganiztaionButton />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
