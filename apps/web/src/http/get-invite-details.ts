import { Role } from '@saas-company/auth';
import { api } from './api-client'


interface GetInviteDetailsResponse {
  invite: {
    id: string;
    email: string;
    role: Role;
    createdAt: string;
    author: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    } | null;
    organization: {
      name: string;
    };
  }
}

export async function getInviteDetails(inviteId: string) {

  const result = await api
    .get(`invite/${inviteId}`)
    .json<GetInviteDetailsResponse>()

  return result
}