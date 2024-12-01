import { api } from './api-client'

interface RevokeInviteMemberRequest {
  org: string
  inviteId: string
}

type RevokeInviteMemberResponse = never

export async function revokeInviteMember({
  org,
  inviteId
}: RevokeInviteMemberRequest) {
  await api
    .delete(`organization/${org}/invite/${inviteId}`)

}