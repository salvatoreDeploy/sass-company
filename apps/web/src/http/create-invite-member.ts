import { Role } from '@saas-company/auth'
import { api } from './api-client'

interface CreateInviteMemberRequest {
  org: string
  email: string,
  role: Role
}

type CreateInviteMemberResponse = void

export async function createInviteMember({
  org,
  email,
  role
}: CreateInviteMemberRequest): Promise<CreateInviteMemberResponse> {
  await api
    .post(`organization/${org}/invite`, {
      json: {
        email,
        role
      },
    })
}