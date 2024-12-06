import { Role } from '@saas-company/auth'
import { api } from './api-client'


interface GetPendingUserInvitesResponse {
  invites: {
    organization: {
      name: string;
    };
    id: string;
    email: string;
    role: "ADMIN" | "MEMBER" | "BILLING";
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    } | null;
  }[]
}

export async function getPendingUserInvites() {

  const result = await api
    .get(`invite/pending-invite`)
    .json<GetPendingUserInvitesResponse>()

  return result
}