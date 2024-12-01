import { api } from './api-client'


interface GetInvitesResponse {
  invites: {
    id: string;
    email: string;
    role: "ADMIN" | "MEMBER" | "BILLING";
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
    } | null;
  }[]
}

export async function getInvites(org: string) {

  const result = await api
    .get(`organization/${org}/invite`, {
      next: {
        tags: [`${org}-invites`]
      }
    })
    .json<GetInvitesResponse>()

  return result
}