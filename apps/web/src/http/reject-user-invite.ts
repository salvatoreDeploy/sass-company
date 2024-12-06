import { api } from './api-client'

interface RejectUserInviteRequest {
  inviteId: string
}

type RejectUserInviteResponse = never

export async function rejectUserInvite({
  inviteId
}: RejectUserInviteRequest) {
  await api
    .delete(`invite/${inviteId}/reject`)

}