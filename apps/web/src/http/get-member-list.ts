import { Role } from '@saas-company/auth';
import { api } from './api-client'


interface GetMembersResponse {
  members: {
    userId: string;
    id: string;
    role: Role;
    name: string | null;
    email: string;
    avatarUrl?: string | null | undefined;
  }[]
}

export async function getMembers(org: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const result = await api
    .get(`organizations/${org}/members`, {
      next: {
        tags: [`${org}-members`]
      }
    })
    .json<GetMembersResponse>()

  return result
}