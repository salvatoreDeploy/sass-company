import { Role } from '@saas-company/auth'
import { api } from './api-client'

interface UpdateMemberRoleRequest {
  org: string
  memberId: string
  role: Role
}

type UpdateMemberRoleResponse = void

export async function updateMemberRole({
  org,
  memberId,
  role
}: UpdateMemberRoleRequest): Promise<UpdateMemberRoleResponse> {
  await api
    .put(`organizations/${org}/members/${memberId}`, {
      json: {
        role
      },
    })
}
