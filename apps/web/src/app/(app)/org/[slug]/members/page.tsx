import { ability } from '@/auth/auth'
import { Invites } from './invites'
import { MembersList } from './member-list'

export default async function MembersPage() {
  const permissinons = await ability()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Members</h1>

      <div className="space-y-4">
        {permissinons?.can('get', 'Invite') && <Invites />}
        {permissinons?.can('get', 'User') && <MembersList />}
      </div>
    </div>
  )
}
